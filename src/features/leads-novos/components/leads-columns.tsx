import { ColumnDef, CellContext } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Lead } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { leadTypes } from '../data/data'

export const columns: ColumnDef<Lead>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Selecionar todos'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Selecionar linha'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome do lead' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('nome')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'tipo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo de lead' />
    ),
    cell: ({ row }) => {
      const lead = row.original
      const leadType = leadTypes.find(({ id }) => id === lead.tipo)
      if (!leadType) return null
      return (
        <div className='flex items-center gap-x-2'>
          <span className='text-sm capitalize'>{leadType.nome}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'representante',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Representante' />
    ),
    cell: ({ row }) => <span>{row.getValue('representante')}</span>,
  },
  {
    accessorKey: 'consumo_mensal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Consumo Mensal' />
    ),
    cell: ({ row }) => <span>{row.getValue('consumo_mensal')}</span>,
  },
  {
    accessorKey: 'data_atualizacao',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Última atualização' />
    ),
    cell: ({ row }) => <span>{row.getValue('data_atualizacao')}</span>,
  },
  {
    id: 'actions',
    cell: (props: CellContext<Lead, unknown>) => <DataTableRowActions row={props.row} />,
  },
]
