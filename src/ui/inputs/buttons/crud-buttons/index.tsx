import { Button } from '@mui/material'
import { useState } from 'react'

interface CrudButtonsProps {
  id?: string
  onNew?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export default function CrudButtons({
  id,
  onNew,
  onEdit,
  onDelete,
  onCancel,
  onSave,
}: CrudButtonsProps) {
  const [isEditing, setIsEditing] = useState(false)

  const newButton = () => {
    if (onNew) {
      return (
        <Button id='newBtn' style={{ margin: 8 }} variant='contained' onClick={onNew}>
          Novo
        </Button>
      )
    }
  }

  const deleteButton = () => {
    if (!isEditing) {
      if (onDelete) {
        return (
          <Button id='deleteBtn' style={{ margin: 8 }} variant='contained' onClick={onDelete}>
            Deletar
          </Button>
        )
      }
    }
  }
  const editButton = () => {
    if (onEdit && onCancel) {
      return (
        <Button
          id='editBtn'
          style={{ margin: 8 }}
          variant='contained'
          onClick={() => {
            if (!isEditing) {
              setIsEditing(true)
              onEdit()
              return
            }
            setIsEditing(false)
            onCancel()
          }}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      )
    }
  }

  const saveButton = () => {
    const button = (
      <Button id='saveBtn' style={{ margin: 8 }} variant='contained' onClick={onSave}>
        Salvar
      </Button>
    )
    if (onSave) {
      if (onEdit && isEditing) {
        return (
          <Button
            id='saveBtn'
            style={{ margin: 8 }}
            variant='contained'
            onClick={() => {
              setIsEditing(false)
              onSave()
            }}
          >
            Salvar
          </Button>
        )
      } else if (!onEdit) {
        return button
      }
    }
  }
  return (
    <div id={id}>
      {newButton()}
      {deleteButton()}
      {editButton()}
      {saveButton()}
    </div>
  )
}
