'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import * as clientDB from '@/lib/clientDB'

type StoreKey = 'films' | 'categories'

export default function DatabaseTablesPage() {
  const [store, setStore] = useState<StoreKey>('films')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [editingJson, setEditingJson] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => { load() }, [store])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      if (store === 'films') {
        const all = await clientDB.getAllFilms()
        setItems(all)
      } else {
        const all = await clientDB.getAllCategories()
        setItems(all)
      }
      setPage(1)
    } catch (err: any) {
      setError(err?.message || 'Load failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Xác nhận xoá?')) return
    setBusy(true)
    try {
      if (store === 'films') await clientDB.deleteFilm(id)
      else await clientDB.deleteCategory(id)
      await load()
    } catch (err) {
      alert('Xoá thất bại')
    } finally { setBusy(false) }
  }

  function openEdit(rec: any) {
    setEditingId(rec.id ?? null)
    setEditingJson(JSON.stringify(rec, null, 2))
  }

  function openNew() {
    const template = store === 'films'
      ? {
          id: undefined,
          title_original: 'Untitled',
          title_local: 'Untitled',
          year: new Date().getFullYear(),
          director: '',
          genre: [],
          duration_seconds: 0,
          status: 'draft'
        }
      : { id: undefined, name: 'New category', slug: '', description: '' }
    setEditingId(null)
    setEditingJson(JSON.stringify(template, null, 2))
  }

  async function saveJson() {
    if (!editingJson) return
    setBusy(true)
    try {
      const parsed = JSON.parse(editingJson)
      if (store === 'films') {
        // cast to clientDB.FilmRecord shape; putFilm will fill defaults
        await clientDB.putFilm(parsed as any)
      } else {
        await clientDB.putCategory(parsed as any)
      }
      setEditingJson(null)
      setEditingId(null)
      await load()
    } catch (err: any) {
      alert('Lưu thất bại: ' + (err?.message || 'invalid json'))
    } finally { setBusy(false) }
  }

  async function exportStore() {
    setBusy(true)
    try {
      const data = store === 'films' ? await clientDB.getAllFilms() : await clientDB.getAllCategories()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${store}-export-${new Date().toISOString().slice(0,19)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('Export thất bại')
    } finally { setBusy(false) }
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const txt = String(reader.result ?? '')
        const json = JSON.parse(txt)
        if (!Array.isArray(json)) throw new Error('file must be array')
        setBusy(true)
        for (const rec of json) {
          if (store === 'films') await clientDB.putFilm(rec as any)
          else await clientDB.putCategory(rec as any)
        }
        await load()
        alert('Import xong')
      } catch (err) {
        alert('Import thất bại: ' + (err as any)?.message)
      } finally { setBusy(false) }
    }
    reader.readAsText(f)
    e.currentTarget.value = ''
  }

  // filtering + pagination
  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter(i => JSON.stringify(i).toLowerCase().includes(q))
  }, [items, query])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const pageItems = useMemo(() => {
    const p = Math.max(1, Math.min(page, totalPages))
    const s = (p - 1) * perPage
    return filtered.slice(s, s + perPage)
  }, [filtered, page, perPage, totalPages])

  // columns detection
  const columns = useMemo(() => {
    const base = items[0] ?? {}
    return Object.keys(base).slice(0, 10) // show up to 10 columns
  }, [items])

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Quản lý bảng (client DB)</h1>
            <p className="text-sm text-slate-500 mt-1">Chọn bảng, xem/nhập/xuất/ sửa JSON trực tiếp</p>
          </div>

          <div className="flex items-center gap-2">
            <select value={store} onChange={e => setStore(e.target.value as StoreKey)} className="px-3 py-2 border rounded">
              <option value="films">films</option>
              <option value="categories">categories</option>
            </select>

            <button onClick={load} disabled={loading || busy} className="px-3 py-2 border rounded text-sm">Reload</button>
            <button onClick={exportStore} disabled={busy} className="px-3 py-2 bg-slate-700 text-white rounded text-sm">Export</button>

            <label className="inline-flex items-center px-3 py-2 border rounded text-sm cursor-pointer">
              Import
              <input type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
            </label>

            <button onClick={openNew} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Add</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm kiếm (toàn bản ghi)..." className="px-3 py-2 border rounded w-96 text-sm" />
              <button onClick={() => setQuery('')} className="text-sm text-slate-600">Clear</button>
            </div>
            <div className="text-sm text-slate-500">Tổng: {total}</div>
          </div>

          {loading && <div className="text-sm text-slate-500">Đang tải...</div>}
          {error && <div className="text-sm text-red-500">Lỗi: {error}</div>}

          {!loading && !error && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map(col => (
                        <th key={col} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{col}</th>
                      ))}
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {pageItems.length === 0 && (
                      <tr><td colSpan={columns.length + 1} className="px-6 py-8 text-center text-sm text-slate-500">Không có dữ liệu</td></tr>
                    )}
                    {pageItems.map(rec => (
                      <tr key={rec.id ?? JSON.stringify(rec).slice(0,50)}>
                        {columns.map(c => (
                          <td key={c} className="px-4 py-3 align-middle text-sm text-slate-700">
                            {String((rec as any)[c] ?? '-').slice(0,60)}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => openEdit(rec)} className="text-blue-600 text-sm">Edit</button>
                            <button onClick={() => handleDelete(rec.id)} className="text-red-600 text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Hiển thị {total === 0 ? 0 : ((page-1)*perPage + 1)} - {Math.min(page*perPage, total)} của {total}
                </div>
                <div className="flex items-center gap-2">
                  <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }} className="px-2 py-1 border rounded text-sm">
                    {[5,10,20,50].map(n => <option key={n} value={n}>{n}/trang</option>)}
                  </select>
                  <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Prev</button>
                  <div className="text-sm px-2">{page}/{totalPages}</div>
                  <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* JSON editor modal */}
        {editingJson !== null && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/40">
            <div className="w-[90%] max-w-4xl bg-white rounded shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-lg font-medium">{editingId ? `Edit ${editingId}` : 'New record'}</div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setEditingJson(null); setEditingId(null) }} className="px-3 py-1 border rounded text-sm">Close</button>
                  <button onClick={saveJson} disabled={busy} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
                </div>
              </div>
              <textarea value={editingJson} onChange={e => setEditingJson(e.target.value)} className="w-full h-[60vh] border rounded p-2 font-mono text-sm" />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}