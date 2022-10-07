import { Card, Table, TableContainer } from '@mui/material'
import React from 'react'
import { Column } from '../../utils/types/table'
import TableBody from './table-body'
import TableHeader from './table-header'
import TablePagination from './table-pagination'

interface TableMainProps<T> {
  columns: Column[]
  rows: T[]
}

export default function TableMain<T>({ columns, rows }: TableMainProps<T>) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  return (
    <>
      <Card>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader size='small' aria-label='sticky table'>
            <TableHeader columns={columns} />
            <TableBody rows={rows} columns={columns} />
          </Table>
        </TableContainer>
        <TablePagination rows={rows} />
      </Card>
    </>
  )
}
