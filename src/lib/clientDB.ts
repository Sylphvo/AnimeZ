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

export type CategoryRecord = {
  id: string
  name: string
  slug?: string
  description?: string
  parent_id?: string | null
  created_at?: string
  updated_at?: string
}

const DB_NAME = 'animez-client'
const DB_VERSION = 2
const STORE_FILMS = 'films'
const STORE_CATEGORIES = 'categories'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not available'))
      return
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      // create films store if missing
      if (!db.objectStoreNames.contains(STORE_FILMS)) {
        const store = db.createObjectStore(STORE_FILMS, { keyPath: 'id' })
        store.createIndex('title_local', 'title_local', { unique: false })
        store.createIndex('title_original', 'title_original', { unique: false })
        store.createIndex('status', 'status', { unique: false })
        store.createIndex('release_date', 'release_date', { unique: false })
      }
      // create categories store
      if (!db.objectStoreNames.contains(STORE_CATEGORIES)) {
        const c = db.createObjectStore(STORE_CATEGORIES, { keyPath: 'id' })
        c.createIndex('name', 'name', { unique: false })
        c.createIndex('slug', 'slug', { unique: true })
        c.createIndex('parent_id', 'parent_id', { unique: false })
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
    alternate_titles: f.alternate_titles,
    year: f.year,
    country: f.country,
    language_primary: f.language_primary,
    other_languages: f.other_languages,
    director: f.director,
    producers: f.producers,
    main_cast: f.main_cast,
    genre: f.genre,
    duration_seconds: f.duration_seconds,
    synopsis_short: f.synopsis_short,
    synopsis_long: f.synopsis_long,
    tags: f.tags,
    production_company: f.production_company,
    external_ids: f.external_ids,
    rating: f.rating,
    release_date: f.release_date,
    status: f.status ?? 'draft',
    created_by: f.created_by,
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
// --------------------
// Categories store helpers
// --------------------

async function withCategoryStore<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => Promise<T> | T): Promise<T> {
  const db = await openDB()
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_CATEGORIES, mode)
    const store = tx.objectStore(STORE_CATEGORIES)
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

export async function getAllCategories(): Promise<CategoryRecord[]> {
  return withCategoryStore('readonly', store => {
    return new Promise<CategoryRecord[]>((resolve, reject) => {
      const req = store.getAll()
      req.onsuccess = () => resolve(req.result as CategoryRecord[])
      req.onerror = () => reject(req.error)
    })
  })
}

export async function getCategory(id: string): Promise<CategoryRecord | undefined> {
  return withCategoryStore('readonly', store => {
    return new Promise<CategoryRecord | undefined>((resolve, reject) => {
      const req = store.get(id)
      req.onsuccess = () => resolve(req.result as CategoryRecord | undefined)
      req.onerror = () => reject(req.error)
    })
  })
}

export async function putCategory(c: Partial<CategoryRecord> & { id?: string }): Promise<CategoryRecord> {
  const now = new Date().toISOString()
  const record: CategoryRecord = {
    id: c.id ?? (crypto && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`),
    name: c.name ?? 'Untitled',
    slug: c.slug ?? (c.name ? (c.name as string).toLowerCase().replace(/\s+/g, '-') : undefined),
    description: c.description,
    parent_id: c.parent_id,
    created_at: c.created_at ?? now,
    updated_at: now
  }
  await withCategoryStore('readwrite', store => {
    return new Promise<void>((resolve, reject) => {
      const req = store.put(record)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })
  return record
}

export async function deleteCategory(id: string): Promise<void> {
  await withCategoryStore('readwrite', store => {
    return new Promise<void>((resolve, reject) => {
      const req = store.delete(id)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })
}

export async function seedCategories(items: CategoryRecord[], force = false): Promise<void> {
  const exists = await getAllCategories()
  if (!force && exists.length > 0) return
  if (force && exists.length > 0) {
    // clear existing
    const db = await openDB()
    const tx = db.transaction(STORE_CATEGORIES, 'readwrite')
    const store = tx.objectStore(STORE_CATEGORIES)
    store.clear()
    await new Promise<void>((res, rej) => { tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error) })
  }
  for (const it of items) {
    const rec = { ...it, id: it.id ?? (crypto && (crypto as any).randomUUID ? (crypto as any).randomUUID() : `${Date.now()}-${Math.random()}`) } as CategoryRecord
    await putCategory(rec)
  }
}

// --------------------
// Export / import / clear helpers
// --------------------

export async function exportAll(): Promise<{ films: FilmRecord[]; categories: CategoryRecord[] }> {
  const films = await getAllFilms()
  const categories = await getAllCategories()
  return { films, categories }
}

export async function clearAll(): Promise<void> {
  const db = await openDB()
  // clear films
  if (db.objectStoreNames.contains(STORE_FILMS)) {
    const tx1 = db.transaction(STORE_FILMS, 'readwrite')
    tx1.objectStore(STORE_FILMS).clear()
    await new Promise<void>((res, rej) => { tx1.oncomplete = () => res(); tx1.onerror = () => rej(tx1.error) })
  }
  // clear categories
  if (db.objectStoreNames.contains(STORE_CATEGORIES)) {
    const tx2 = db.transaction(STORE_CATEGORIES, 'readwrite')
    tx2.objectStore(STORE_CATEGORIES).clear()
    await new Promise<void>((res, rej) => { tx2.oncomplete = () => res(); tx2.onerror = () => rej(tx2.error) })
  }
}

export async function importAll(payload: { films?: Partial<FilmRecord>[]; categories?: Partial<CategoryRecord>[]; clearBefore?: boolean } ): Promise<void> {
  if (payload.clearBefore) {
    await clearAll()
  }
  if (Array.isArray(payload.films)) {
    for (const f of payload.films) {
      await putFilm(f as any)
    }
  }
  if (Array.isArray(payload.categories)) {
    for (const c of payload.categories) {
      await putCategory(c as any)
    }
  }
}