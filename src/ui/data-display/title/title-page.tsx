import { Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import CrudButtons from 'ui/inputs/buttons/crud-buttons'

interface TitlePageProps {
  id?: string
  title: string
  onNew?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onCancel?: () => void
  onSave?: () => void
}

const TitlePage = (props: TitlePageProps) => {
  const { title } = props

  return (
    <Box id={props.id} my={4}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2 }}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h4' color='text.primary'>
            {title}
          </Typography>
        </Grid>
        <Grid>
          <CrudButtons {...props} id={`${props.id}-crud-buttons`} />
        </Grid>
      </Grid>
      <Divider />
    </Box>
  )
}

export default TitlePage
