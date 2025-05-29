'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { leadSchema } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: typeof leadSchema
}

export function LeadsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.nome) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'O seguinte lead foi deletado:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.nome}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Deletar lead
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Tem certeza que deseja deletar{' '}
            <span className='font-bold'>{currentRow.nome}</span>?
            <br />
            Esta ação irá deletar permanentemente o lead do sistema. Esta ação não pode ser revertida.
          </p>

          <Label className='my-2'>
            Nome do lead:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Digite o nome do lead para confirmar a exclusão.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Por favor, seja cuidadoso, esta operação não pode ser revertida.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Deletar'
      destructive
    />
  )
}
