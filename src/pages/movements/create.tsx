import { Button } from '@mui/material'
import FormMovement from 'features/movements/form-movement'
import { useRouter } from 'next/router'

export default function CreateMovement() {
  const router = useRouter()

  return (
    <>
      <Button
        onClick={() => {
          const link = router.query.contractId
            ? `/contracts/${router.query.contractId}`
            : '/movements'
          router.push(link)
        }}
      >
        Voltar
      </Button>
      <FormMovement
        contractId={router.query.contractId?.toString() || undefined}
        shouldCreateNewMovement={true}
      ></FormMovement>
    </>
  )
}
