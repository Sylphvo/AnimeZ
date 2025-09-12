'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'

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

function MovieAdminPageContent() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    // For now use local sample data. Replace with fetch('/api/movies') if you have an API.
    let mounted = true
    ;(async () => {
      try {
        // simulate load
        await new Promise(r => setTimeout(r, 150))
        if (!mounted) return
        setMovies(SAMPLE_MOVIES)
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

  async function handleDelete(id: string) {
    if (!confirm('Xác nhận xoá phim này?')) return
    setDeletingId(id)
    try {
      // If you have an API, call delete here. We'll do optimistic update for sample data.
      setMovies(prev => prev.filter(m => m.id !== id))
    } catch (err: any) {
      alert('Xoá thất bại: ' + (err?.message || 'unknown'))
    } finally {
      setDeletingId(null)
    }
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

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Quản lý phim</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý danh sách phim, thêm/sửa/xoá và xem chi tiết</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/movies/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Thêm phim mới
          </Link>
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
          <div className="text-sm text-slate-500">Tổng: {filtered.length}</div>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
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
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-8 text-center text-sm text-slate-500">
                      Không tìm thấy phim
                    </td>
                  </tr>
                )}

                {filtered.map(movie => (
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
                        <Link href={`/movies/${movie.id}/edit`} className="text-amber-600 text-sm hover:underline">Sửa</Link>
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