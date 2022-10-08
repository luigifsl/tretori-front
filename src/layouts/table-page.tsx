import { Typography } from '@mui/material'
import Breadcrumb from 'ui/navigation/breadcrumbs'
import Loading from 'ui/feedback/loading'
import Table from 'ui/data-display/table'
import TitlePage from 'ui/data-display/title/title-page'
import { BreadcrumbType, Column } from 'utils/types'

interface TablePageProps<T> {
  title: string
  breadcrumbs: BreadcrumbType[]
  columns: Column[]
  rows: T[]
  isLoading: boolean
  detailRoute?: string
  onNewClick?: () => void
}

export default function TablePage<T>({
  title,
  breadcrumbs,
  columns,
  rows,
  isLoading,
  detailRoute,
  onNewClick,
}: TablePageProps<T>) {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <TitlePage title={title} onNew={onNewClick}></TitlePage>
      {/* // ! fix this isLoading condition */}
      {!isLoading && rows.length <= 0 && (
        <Typography align='center' marginBottom='1em'>
          Nada aqui para ser mostrado
        </Typography>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <Table detailRoute={detailRoute} columns={columns} rows={rows}></Table>
      )}
    </>
  )
}