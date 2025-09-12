'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'
import * as clientDB from '@/lib/clientDB'

type Movie = {
  id: string
  title: string
  originalTitle?: string
  year?: number
  durationMinutes?: number
  director?: string
  genres?: string[]
  country?: string
  language?: string
  poster?: string
  status?: 'published' | 'draft' | 'archived' | string
  createdAt?: string
  rating?: number
  description?: string
}

const SAMPLE_MOVIES: Movie[] = [
  {
    id: 'one-piece-movie',
    title: 'One Piece: The Grand Adventure',
    originalTitle: 'ワンピース：グランドアドベンチャー',
    year: 2022,
    durationMinutes: 112,
    director: 'Hiroaki Takahashi',
    genres: ['Action', 'Adventure', 'Fantasy'],
    country: 'Japan',
    language: 'Japanese',
    poster: '/posters/one-piece.jpg',
    status: 'published',
    createdAt: '2023-01-15',
    rating: 8.2,
    description: 'A new adventure with the Straw Hat crew.'
  },
  {
    id: 'spirited-away-remastered',
    title: 'Spirited Away (Remastered)',
    originalTitle: '千と千尋の神隠し',
    year: 2001,
    durationMinutes: 125,
    director: 'Hayao Miyazaki',
    genres: ['Animation', 'Fantasy'],
    country: 'Japan',
    language: 'Japanese',
    poster: '/posters/spirited-away.jpg',
    status: 'published',
    createdAt: '2021-11-02',
    rating: 9.1,
    description: 'A young girl enters a world of spirits and magic.'
  },
  {
    id: 'robot-express',
    title: 'Robot Express',
    originalTitle: 'Robot Express',
    year: 2019,
    durationMinutes: 98,
    director: 'A. Director',
    genres: ['Sci-Fi'],
    country: 'USA',
    language: 'English',
    poster: '/posters/robot-express.jpg',
    status: 'draft',
    createdAt: '2024-03-12',
    rating: 7.0,
    description: 'A small robot tries to save its city.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  },
  {
    id: 'cesium-man',
    title: 'Cesium Man',
    originalTitle: 'Cesium Man',
    year: 2018,
    durationMinutes: 105,
    director: 'Studio X',
    genres: ['Drama', 'Action'],
    country: 'USA',
    language: 'English',
    poster: '/posters/cesium-man.jpg',
    status: 'archived',
    createdAt: '2020-06-20',
    rating: 6.5,
    description: 'An experimental film about identity.'
  }
]

function StatCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {hint && <div className="text-xs text-green-500 mt-1">{hint}</div>}
    </div>
  )
}

/** Form component for add/edit */
function MovieForm({
  initial,
  onSave,
  onCancel
}: {
  initial?: Partial<Movie>
  onSave: (m: Movie) => Promise<void> | void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Partial<Movie>>(initial ?? {})

  useEffect(() => {
    setForm(initial ?? {})
  }, [initial])

  function update<K extends keyof Movie>(k: K, v: Movie[K] | string | undefined) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault()
    const id = (form.id as string) ?? `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
    const record: Movie = {
      id,
      title: (form.title || form.originalTitle || 'Untitled') as string,
      originalTitle: form.originalTitle,
      year: form.year ? Number(form.year) : undefined,
      durationMinutes: form.durationMinutes ? Number(form.durationMinutes) : undefined,
      director: form.director,
      genres: typeof form.genres === 'string' ? (form.genres as unknown as string).split(',').map(s => s.trim()) : (form.genres ?? []),
      country: form.country,
      language: form.language,
      poster: form.poster,
      status: form.status ?? 'draft',
      createdAt: form.createdAt,
      rating: form.rating,
      description: form.description
    }
    await onSave(record)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-2xl bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Thông tin phim</h3>
          <button type="button" onClick={onCancel} className="text-sm text-slate-600">Đóng</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-600">Tiêu đề gốc</label>
            <input value={form.originalTitle ?? ''} onChange={e => update('originalTitle', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>
          <div>
            <label className="text-xs text-slate-600">Tiêu đề</label>
            <input value={form.title ?? ''} onChange={e => update('title', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Năm</label>
            <input type="number" value={form.year ?? ''} onChange={e => update('year', e.target.value ? Number(e.target.value) : undefined)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Thời lượng (phút)</label>
            <input type="number" value={form.durationMinutes ?? ''} onChange={e => update('durationMinutes', e.target.value ? Number(e.target.value) : undefined)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Đạo diễn</label>
            <input value={form.director ?? ''} onChange={e => update('director', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Thể loại (phân cách bằng ,)</label>
            <input value={Array.isArray(form.genres) ? form.genres.join(', ') : (form.genres as any ?? '')} onChange={e => update('genres', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Quốc gia</label>
            <input value={form.country ?? ''} onChange={e => update('country', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div>
            <label className="text-xs text-slate-600">Ngôn ngữ</label>
            <input value={form.language ?? ''} onChange={e => update('language', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div className="col-span-2">
            <label className="text-xs text-slate-600">Poster URL</label>
            <input value={form.poster ?? ''} onChange={e => update('poster', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" />
          </div>

          <div className="col-span-2">
            <label className="text-xs text-slate-600">Mô tả ngắn</label>
            <textarea value={form.description ?? ''} onChange={e => update('description', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded text-sm" rows={3} />
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

function MovieAdminPageContent() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // form state
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Movie | null>(null)

  // pagination state
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  // reset page when filter changes
  useEffect(() => { setPage(1) }, [query, perPage])

  useEffect(() => {
    // load from IndexedDB client-side; seed with SAMPLE_MOVIES if empty
    let mounted = true
    ;(async () => {
      try {
        const films = await clientDB.getAllFilms()
        if (!mounted) return
        if (!films || films.length === 0) {
          // seed and reload
          await clientDB.seedFilms(
            SAMPLE_MOVIES.map(m => ({
              id: m.id,
              title_original: m.originalTitle ?? m.title,
              title_local: m.title,
              year: m.year,
              country: m.country,
              language_primary: m.language,
              director: m.director,
              producers: null,
              main_cast: null,
              genre: m.genres,
              duration_seconds: m.durationMinutes ? m.durationMinutes * 60 : undefined,
              synopsis_short: m.description,
              poster: m.poster as any,
              status: m.status,
              created_at: m.createdAt
            } as any))
          )
        }
        const after = await clientDB.getAllFilms()
        if (!mounted) return
        // map records to Movie shape used by UI
        setMovies(
          after.map(f => ({
            id: f.id,
            title: (f.title_local ?? f.title_original) as string,
            originalTitle: f.title_original,
            year: f.year ?? undefined,
            durationMinutes: f.duration_seconds ? Math.round(f.duration_seconds / 60) : undefined,
            director: f.director,
            genres: Array.isArray(f.genre) ? f.genre : (typeof f.genre === 'string' && f.genre ? [f.genre] : []),
            country: f.country,
            language: f.language_primary,
            poster: (f as any).poster ?? undefined,
            status: f.status,
            createdAt: f.created_at,
            rating: f.rating ? Number(f.rating) : undefined,
            description: f.synopsis_short ?? f.synopsis_long
          }))
        )
      } catch (err: any) {
        setError(err?.message || 'Failed to load movies')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  async function reloadList() {
    const after = await clientDB.getAllFilms()
    setMovies(
      after.map(f => ({
        id: f.id,
        title: (f.title_local ?? f.title_original) as string,
        originalTitle: f.title_original,
        year: f.year ?? undefined,
        durationMinutes: f.duration_seconds ? Math.round(f.duration_seconds / 60) : undefined,
        director: f.director,
        genres: Array.isArray(f.genre) ? f.genre : (typeof f.genre === 'string' && f.genre ? [f.genre] : []),
        country: f.country,
        language: f.language_primary,
        poster: (f as any).poster ?? undefined,
        status: f.status,
        createdAt: f.created_at,
        rating: f.rating ? Number(f.rating) : undefined,
        description: f.synopsis_short ?? f.synopsis_long
      }))
    )
  }

  async function handleDelete(id: string) {
    if (!confirm('Xác nhận xoá phim này?')) return
    setDeletingId(id)
    try {
      await clientDB.deleteFilm(id)
      setMovies(prev => prev.filter(m => m.id !== id))
    } catch (err: any) {
      alert('Xoá thất bại: ' + (err?.message || 'unknown'))
    } finally {
      setDeletingId(null)
    }
  }

  function openNew() {
    setEditing(null)
    setShowForm(true)
  }

  async function openEdit(id: string) {
    const rec = await clientDB.getFilm(id)
    if (!rec) return
    setEditing({
      id: rec.id,
      title: (rec.title_local ?? rec.title_original) as string,
      originalTitle: rec.title_original,
      year: rec.year ?? undefined,
      durationMinutes: rec.duration_seconds ? Math.round(rec.duration_seconds / 60) : undefined,
      director: rec.director,
      genres: Array.isArray(rec.genre) ? rec.genre : (typeof rec.genre === 'string' ? (rec.genre as string).split(',').map(s => s.trim()) : []),
      country: rec.country,
      language: rec.language_primary,
      poster: (rec as any).poster ?? undefined,
      status: rec.status,
      createdAt: rec.created_at,
      description: rec.synopsis_short ?? rec.synopsis_long
    })
    setShowForm(true)
  }

  async function handleSave(m: Movie) {
    // map Movie -> clientDB.FilmRecord shape
    const rec = {
      id: m.id,
      title_original: m.originalTitle ?? m.title,
      title_local: m.title,
      year: m.year,
      country: m.country,
      language_primary: m.language,
      director: m.director,
      genre: m.genres,
      duration_seconds: m.durationMinutes ? (m.durationMinutes * 60) : 0,
      synopsis_short: m.description,
      poster: (m as any).poster,
      status: m.status ?? 'draft',
      created_at: m.createdAt ?? new Date().toISOString()
    } as any
    await clientDB.putFilm(rec)
    await reloadList()
    setShowForm(false)
    setEditing(null)
  }

  const stats = useMemo(() => {
    const total = movies.length
    const published = movies.filter(m => m.status === 'published').length
    const drafts = movies.filter(m => m.status === 'draft').length
    const archived = movies.filter(m => m.status === 'archived').length
    return { total, published, drafts, archived }
  }, [movies])

  const filtered = useMemo(() => {
    if (!query) return movies
    const q = query.toLowerCase()
    return movies.filter(
      m =>
        (m.title || '').toLowerCase().includes(q) ||
        (m.originalTitle || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q) ||
        (m.director || '').toLowerCase().includes(q) ||
        (m.genres || []).join(' ').toLowerCase().includes(q)
    )
  }, [movies, query])

  // pagination helpers
  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const paged = useMemo(() => {
    const p = Math.max(1, Math.min(page, totalPages))
    const start = (p - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, perPage, totalPages])
  useEffect(() => { if (page > totalPages) setPage(totalPages) }, [totalPages, page])

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý phim</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý danh sách phim, thêm/sửa/xoá và xem chi tiết</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
            Thêm phim mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Tổng phim" value={stats.total} />
        <StatCard title="Đã xuất bản" value={stats.published} />
        <StatCard title="Bản nháp" value={stats.drafts} />
        <StatCard title="Lưu trữ" value={stats.archived} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm kiếm phim, đạo diễn, thể loại..."
              className="px-3 py-2 border rounded text-sm w-80 focus:outline-none focus:ring"
            />
            <button onClick={() => setQuery('')} className="text-sm text-slate-600 hover:underline">
              Xoá
            </button>
          </div>
          <div className="text-sm text-slate-500">Tổng: {totalItems}</div>
        </div>

        <div className="p-4 overflow-x-auto">
          {loading && <div className="text-sm text-slate-500">Đang tải danh sách phim...</div>}
          {error && <div className="text-sm text-red-500">Lỗi: {error}</div>}

          {!loading && !error && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poster</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Năm</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời lượng</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đạo diễn</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thể loại</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quốc gia</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngôn ngữ</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tạo</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {totalItems === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-8 text-center text-sm text-slate-500">
                      Không tìm thấy phim
                    </td>
                  </tr>
                )}

                {paged.map(movie => (
                  <tr key={movie.id}>
                    <td className="px-4 py-4 align-middle">
                      <div className="w-16 h-24 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        <img
                          src={movie.poster ?? '/placeholder-poster.png'}
                          alt={movie.title}
                          className="object-cover w-full h-full"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder-poster.png' }}
                        />
                      </div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                      {movie.originalTitle && <div className="text-xs text-slate-500">{movie.originalTitle}</div>}
                      <div className="text-xs text-slate-400 mt-1">ID: {movie.id}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{movie.year ?? '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{movie.durationMinutes ? `${movie.durationMinutes} phút` : '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{movie.director ?? '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{(movie.genres || []).join(', ') || '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{movie.country ?? '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm">{movie.language ?? '-'}</div>
                    </td>

                    <td className="px-4 py-4 align-middle">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          movie.status === 'published' ? 'bg-green-100 text-green-800' : movie.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {movie.status ?? 'unknown'}
                      </span>
                    </td>

                    <td className="px-4 py-4 align-middle text-sm text-slate-500">{movie.createdAt ?? '-'}</td>

                    <td className="px-4 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link href={`/movies/${movie.id}`} className="text-blue-600 text-sm hover:underline">Xem</Link>
                        <button onClick={() => openEdit(movie.id)} className="text-amber-600 text-sm hover:underline">Sửa</button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          disabled={deletingId === movie.id}
                          className="text-red-600 text-sm hover:underline disabled:opacity-50"
                        >
                          {deletingId === movie.id ? 'Đang xoá...' : 'Xoá'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* pagination controls */}
        <div className="p-4 border-t flex items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            Hiển thị {(totalItems === 0) ? 0 : ( (page-1)*perPage + 1 )} - {Math.min(page*perPage, totalItems)} của {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }} className="px-2 py-1 border rounded text-sm">
              {[5,10,20,50].map(n => <option key={n} value={n}>{n} / trang</option>)}
            </select>

            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page <= 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Prev
            </button>

            {/* page numbers (compact window) */}
            <div className="flex items-center gap-1">
              {(() => {
                const pages = []
                const start = Math.max(1, page - 3)
                const end = Math.min(totalPages, page + 3)
                for (let i = start; i <= end; i++) pages.push(i)
                return pages.map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`px-2 py-1 text-sm rounded ${p===page ? 'bg-slate-200' : 'hover:bg-slate-100'}`}>{p}</button>
                ))
              })()}
            </div>

            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages} className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
       </div>
     </>
   )
 }
 
export default function MovieAdminPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <MovieAdminPageContent />
      </div>
    </DashboardLayout>
  )
}