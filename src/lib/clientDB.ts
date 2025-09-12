// ...existing code...
export type FilmRecord = {
  id: string
  title_original: string
  title_local?: string
  alternate_titles?: string[] | string
  year?: number
  country?: string
  language_primary?: string
  other_languages?: string[] | string
  director?: string
  producers?: string[] | string
  main_cast?: string[] | string
  genre?: string[] | string
  duration_seconds?: number
  synopsis_short?: string
  synopsis_long?: string
  tags?: string[] | string
  production_company?: string
  external_ids?: Record<string, any> | string
  rating?: string
  release_date?: string
  status?: string
  created_by?: string | null
  created_at?: string
  updated_at?: string
}

const DB_NAME = 'animez-client'
const DB_VERSION = 1
const STORE_FILMS = 'films'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not available'))
      return
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_FILMS)) {
        const store = db.createObjectStore(STORE_FILMS, { keyPath: 'id' })
        store.createIndex('title_local', 'title_local', { unique: false })
        store.createIndex('title_original', 'title_original', { unique: false })
        store.createIndex('status', 'status', { unique: false })
        store.createIndex('release_date', 'release_date', { unique: false })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => Promise<T> | T): Promise<T> {
  const db = await openDB()
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_FILMS, mode)
    const store = tx.objectStore(STORE_FILMS)
    Promise.resolve(fn(store))
      .then(result => {
        tx.oncomplete = () => resolve(result)
        tx.onabort = tx.onerror = () => reject(tx.error)
      })
      .catch(err => {
        try { tx.abort() } catch {}
        reject(err)
      })
  })
}

export async function getAllFilms(): Promise<FilmRecord[]> {
  return withStore('readonly', store => {
    return new Promise<FilmRecord[]>((resolve, reject) => {
      const req = store.getAll()
      req.onsuccess = () => resolve(req.result as FilmRecord[])
      req.onerror = () => reject(req.error)
    })
  })
}

export async function getFilm(id: string): Promise<FilmRecord | undefined> {
  return withStore('readonly', store => {
    return new Promise<FilmRecord | undefined>((resolve, reject) => {
      const req = store.get(id)
      req.onsuccess = () => resolve(req.result as FilmRecord | undefined)
      req.onerror = () => reject(req.error)
    })
  })
}

export async function putFilm(f: Partial<FilmRecord> & { id?: string }): Promise<FilmRecord> {
  const now = new Date().toISOString()
  const record: FilmRecord = {
    id: f.id ?? (crypto && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`),
    title_original: f.title_original ?? (f.title_local ?? 'Untitled'),
    title_local: f.title_local,
    alternate_titles: f.alternate_titles ?? undefined,
    year: f.year ?? undefined,
    country: f.country ?? undefined,
    language_primary: f.language_primary ?? undefined,
    other_languages: f.other_languages ?? undefined,
    director: f.director ?? undefined,
    producers: f.producers ?? undefined,
    main_cast: f.main_cast ?? undefined,
    genre: f.genre ?? undefined,
    duration_seconds: f.duration_seconds ?? undefined,
    synopsis_short: f.synopsis_short ?? undefined,
    synopsis_long: f.synopsis_long ?? undefined,
    tags: f.tags ?? undefined,
    production_company: f.production_company ?? undefined,
    external_ids: f.external_ids ?? undefined,
    rating: f.rating ?? undefined,
    release_date: f.release_date ?? undefined,
    status: f.status ?? 'draft',
    created_by: f.created_by ?? null,
    created_at: f.created_at ?? now,
    updated_at: now
  }
  await withStore('readwrite', store => {
    return new Promise<void>((resolve, reject) => {
      const req = store.put(record)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })
  return record
}

export async function deleteFilm(id: string): Promise<void> {
  await withStore('readwrite', store => {
    return new Promise<void>((resolve, reject) => {
      const req = store.delete(id)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })
}

export async function seedFilms(items: FilmRecord[]): Promise<void> {
  const exists = await getAllFilms()
  if (exists.length > 0) return
  for (const it of items) {
    // ensure id and timestamps
    const rec = { ...it, id: it.id ?? (crypto && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`) } as FilmRecord
    await putFilm(rec)
  }
}