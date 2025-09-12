'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import * as clientDB from '@/lib/clientDB'
import Link from 'next/link'

type Category = {
  id: string
  name: string
  slug?: string
  description?: string
  parent_id?: string | null
}

function CategoryForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Category>
  onSave: (c: Category) => Promise<void> | void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Partial<Category>>(initial ?? {})
  useEffect(() => setForm(initial ?? {}), [initial])

  function update<K extends keyof Category>(k: K, v: any) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault()
    const id = form.id ?? `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
    const rec: Category = {
      id,
      name: (form.name || 'Untitled') as string,
      slug: (form.slug && String(form.slug)) || (String(form.name || '').toLowerCase().replace(/\s+/g, '-')),
      description: form.description,
      parent_id: form.parent_id ?? null,
    }
    await onSave(rec)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Danh mục phim</h3>
          <button type="button" onClick={onCancel} className="text-sm text-slate-600">Đóng</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-600">Tên</label>
            <input value={form.name ?? ''} onChange={e => update('name', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Slug</label>
            <input value={form.slug ?? ''} onChange={e => update('slug', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Mô tả</label>
            <textarea value={form.description ?? ''} onChange={e => update('description', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" rows={3} />
          </div>

          <div>
            <label className="text-xs text-slate-600">Parent (ID)</label>
            <input value={form.parent_id ?? ''} onChange={e => update('parent_id', e.target.value || null)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
            <div className="text-xs text-slate-400 mt-1">Bạn có thể dán ID của danh mục cha hoặc để trống.</div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded border text-sm">Hủy</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Lưu</button>
        </div>
      </form>
    </div>
  )
}

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // seed a couple of sample categories if empty
        const list = await clientDB.getAllCategories()
        if (!list || list.length === 0) {
          await clientDB.seedCategories([
            { id: 'cat-action', name: 'Action', slug: 'action', description: 'Hành động', parent_id: null },
            { id: 'cat-fantasy', name: 'Fantasy', slug: 'fantasy', description: 'Huyền ảo', parent_id: null },
            { id: 'cat-anime', name: 'Anime', slug: 'anime', description: 'Phim anime', parent_id: null }
          ], false)
        }
        const after = await clientDB.getAllCategories()
        if (!mounted) return
        setCategories(after.map(c => ({ id: c.id, name: c.name, slug: c.slug, description: c.description, parent_id: c.parent_id })))
      } catch (err: any) {
        setError(err?.message || 'Failed to load categories')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  async function reload() {
    const after = await clientDB.getAllCategories()
    setCategories(after.map(c => ({ id: c.id, name: c.name, slug: c.slug, description: c.description, parent_id: c.parent_id })))
  }

  async function handleSave(c: Category) {
    await clientDB.putCategory({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      parent_id: c.parent_id
    } as any)
    await reload()
    setShowForm(false)
    setEditing(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Xác nhận xoá danh mục này?')) return
    try {
      await clientDB.deleteCategory(id)
      await reload()
    } catch (err: any) {
      alert('Xoá thất bại: ' + (err?.message || 'unknown'))
    }
  }

  function openNew() {
    setEditing(null)
    setShowForm(true)
  }

  function openEdit(id: string) {
    const rec = categories.find(c => c.id === id)
    if (!rec) return
    setEditing(rec)
    setShowForm(true)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý danh mục phim</h1>
            <p className="text-sm text-slate-500 mt-1">Thêm, sửa, xoá danh mục (thể loại)</p>
          </div>
          <div>
            <button onClick={openNew} className="px-4 py-2 bg-blue-600 text-white rounded">Thêm danh mục</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          {loading && <div className="text-sm text-slate-500">Đang tải...</div>}
          {error && <div className="text-sm text-red-500">Lỗi: {error}</div>}

          {!loading && !error && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Tên</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Slug</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Parent ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Mô tả</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">Không có danh mục</td>
                  </tr>
                )}
                {categories.map(c => (
                  <tr key={c.id}>
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.slug}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.parent_id ?? '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{c.description ?? '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openEdit(c.id)} className="text-amber-600 text-sm">Sửa</button>
                        <button onClick={() => handleDelete(c.id)} className="text-red-600 text-sm">Xoá</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <CategoryForm
          initial={editing ?? undefined}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
        />
      )}
    </DashboardLayout>
  )
}