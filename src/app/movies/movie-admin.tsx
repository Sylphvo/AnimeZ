'use client'
import React, { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import type { ColDef } from 'ag-grid-community'

type Movie = {
  id: number
  title: string
  year: number
  genre: string
}

const initialMovies: Movie[] = [
  { id: 1, title: 'Your Name', year: 2016, genre: 'Romance' },
  { id: 2, title: 'Spirited Away', year: 2001, genre: 'Fantasy' },
  { id: 3, title: 'Demon Slayer: Mugen Train', year: 2020, genre: 'Action' }
]

export default function MovieAdminPage() {
  const [rowData, setRowData] = useState<Movie[]>(initialMovies)

  const columnDefs = useMemo<ColDef<Movie>[]>(() => [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', editable: true, flex: 1 },
    { field: 'year', headerName: 'Year', editable: true, width: 120 },
    { field: 'genre', headerName: 'Genre', editable: true, width: 150 }
  ], [])

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: 24 }}>
      <h2>Movie Admin</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
        onCellValueChanged={params => {
          const updated = rowData.map(row =>
            row.id === params.data.id ? { ...params.data } : row
          )
          setRowData(updated)
        }}
        domLayout="autoHeight"
      />
    </div>
  )
}