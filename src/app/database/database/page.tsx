'use client'

import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import * as clientDB from '@/lib/clientDB'

export default function DatabaseAdminPage() {
  const [counts, setCounts] = useState({ films: 0, categories: 0 })
  const [loading, setLoading] = useState(true)
  const [sampleFilms, setSampleFilms] = useState<any[]>([])
  const [sampleCategories, setSampleCategories] = useState<any[]>([])
  const [busy, setBusy] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const films = await clientDB.getAllFilms()
      const cats = await clientDB.getAllCategories()
      setCounts({ films: films.length, categories: cats.length })
      setSampleFilms(films.slice(0, 8))
      setSampleCategories(cats.slice(0, 8))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  async function handleExport() {
    setBusy(true)
    try {
      const all = await clientDB.exportAll()
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `animez-db-export-${new Date().toISOString().slice(0,19)}.json`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('Export thất bại')
      console.error(err)
    } finally { setBusy(false) }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const txt = String(reader.result ?? '')
        const json = JSON.parse(txt)
        if (!confirm('Import sẽ thêm vào DB (chọn OK để tiếp tục). Nếu muốn xóa trước, tick "clear before" bên dưới.')) return
        // default no clear; show small prompt for clear
        const clearBefore = confirm('Bạn muốn xóa toàn bộ DB trước khi import? OK = xóa trước, Cancel = thêm vào')
        setBusy(true)
        await clientDB.importAll({ films: json.films ?? [], categories: json.categories ?? [], clearBefore })
        await refresh()
        alert('Import hoàn tất')
      } catch (err) {
        alert('Import thất bại: file không hợp lệ')
        console.error(err)
      } finally { setBusy(false) }
    }
    reader.readAsText(f)
    // reset input
    e.currentTarget.value = ''
  }

  async function handleClear() {
    if (!confirm('Xác nhận xóa toàn bộ dữ liệu trong IndexedDB?')) return
    setBusy(true)
    try {
      await clientDB.clearAll()
      await refresh()
      alert('Đã xóa')
    } catch (err) {
      alert('Xóa thất bại')
      console.error(err)
    } finally { setBusy(false) }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Database manager (client)</h1>
            <p className="text-sm text-slate-500 mt-1">Quản lý IndexedDB client: export/import/clear & xem sample</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-slate-500">Films</div>
            <div className="mt-2 text-2xl font-semibold">{counts.films}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-slate-500">Categories</div>
            <div className="mt-2 text-2xl font-semibold">{counts.categories}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-slate-500">Actions</div>
            <div className="mt-3 flex gap-2">
              <button onClick={refresh} disabled={loading || busy} className="px-3 py-2 border rounded text-sm">Refresh</button>
              <button onClick={handleExport} disabled={busy} className="px-3 py-2 bg-slate-700 text-white rounded text-sm">Export JSON</button>
              <label className="inline-flex items-center px-3 py-2 border rounded text-sm cursor-pointer">
                Import JSON
                <input type="file" accept="application/json" onChange={handleFile} className="hidden" />
              </label>
              <button onClick={handleClear} disabled={busy} className="px-3 py-2 bg-red-600 text-white rounded text-sm">Clear DB</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium mb-3">Sample Films ({sampleFilms.length})</h3>
            {sampleFilms.length === 0 ? (
              <div className="text-sm text-slate-500">No sample</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {sampleFilms.map(f => (
                  <li key={f.id} className="flex items-start gap-3">
                    <div className="w-10 h-12 bg-gray-100 overflow-hidden rounded">
                      <img src={(f as any).poster ?? '/placeholder-poster.png'} alt="" className="object-cover w-full h-full" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder-poster.png'}}/>
                    </div>
                    <div>
                      <div className="font-medium">{f.title_local ?? f.title_original}</div>
                      <div className="text-xs text-slate-500">{f.id} · {f.year ?? '-'}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium mb-3">Sample Categories ({sampleCategories.length})</h3>
            {sampleCategories.length === 0 ? (
              <div className="text-sm text-slate-500">No sample</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {sampleCategories.map(c => (
                  <li key={c.id}>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.slug} · {c.id}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}