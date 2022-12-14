/* eslint-disable @typescript-eslint/no-explicit-any */
import { joiResolver } from '@hookform/resolvers/joi'
import { Box, Divider } from '@mui/material'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TitlePage from 'ui/data-display/title/title-page'
import DialogConfirm from 'ui/feedback/dialog/dialog-confirm'
import FormTextField from 'ui/inputs/text-field/text-field'
import { ProductType } from 'utils/types'
import { SERVER_ERROR } from '../../utils/messages/index'
import { ProductMessages } from './product.messages'
import { companySchema } from './products.joi.schema'

interface FormProductProps {
  product?: ProductType
  shouldCreateNewProduct: boolean
}

const FormProduct = ({ product, shouldCreateNewProduct }: FormProductProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductType>({ resolver: joiResolver(companySchema) })
  const { data: session } = useSession()
  const router = useRouter()
  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false)
  const [, setIsLoadingRequest] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleOnCloseDeleteDialog = () => {
    setShouldOpenDeleteDialog(false)
  }

  const handleOnConfirmDeleteDialog = async () => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'DELETE',
        url: `/products/${product?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      setShouldOpenDeleteDialog(false)
      enqueueSnackbar(ProductMessages.deleteSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
      setIsLoadingRequest(false)
    } finally {
      setIsLoadingRequest(false)
      router.push('/products')
    }
  }

  // ! fix this any
  const handleEditProduct = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'PUT',
        url: `products/${product?.id}`,
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(ProductMessages.editSuccess, { variant: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
      setIsEditing(false)
    }
  }

  // ! fix this any
  const handleSaveProduct = async (data: any) => {
    setIsLoadingRequest(true)
    try {
      await axios.request({
        method: 'POST',
        url: '/products',
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        data,
      })
      enqueueSnackbar(ProductMessages.newSuccess, { variant: 'success' })
      router.push('/products')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      } else {
        enqueueSnackbar(SERVER_ERROR, { variant: 'error' })
      }
    } finally {
      setIsLoadingRequest(false)
    }
  }

  const titlePageComponent = () => {
    if (shouldCreateNewProduct) {
      return <TitlePage title={ProductMessages.title} onSave={handleSubmit(handleSaveProduct)} />
    }

    return (
      <TitlePage
        title={isEditing ? ProductMessages.editTitle : ProductMessages.detailTitle}
        onDelete={() => setShouldOpenDeleteDialog(true)}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSubmit(handleEditProduct)}
      />
    )
  }

  return (
    <>
      {titlePageComponent()}
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete='off'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex'>
          <FormTextField
            label={'Nome'}
            name='name'
            control={control}
            errors={errors}
            defaultValue={product?.name}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
          <FormTextField
            label={'Tipo'}
            name='type'
            control={control}
            errors={errors}
            defaultValue={product?.type}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
        </Box>

        <Box display='flex'>
          <FormTextField
            label={'Plano'}
            name='plan'
            control={control}
            errors={errors}
            defaultValue={product?.plan}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
          <FormTextField
            label={'Tamanho'}
            name='size'
            control={control}
            errors={errors}
            defaultValue={product?.size}
            disabled={!isEditing && !shouldCreateNewProduct}
          />
        </Box>
        <Divider style={{ margin: 32 }} />
      </Box>
      <DialogConfirm
        open={shouldOpenDeleteDialog}
        title={ProductMessages.deleteTitle}
        cancelMessage='cancelar'
        confirmMessage='confirmar'
        message={ProductMessages.deleteMessage}
        onClose={handleOnCloseDeleteDialog}
        onConfirm={handleOnConfirmDeleteDialog}
      />
    </>
  )
}

export default FormProduct
