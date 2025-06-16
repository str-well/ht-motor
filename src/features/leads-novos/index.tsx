import { useEffect, useState } from 'react'
import { getAllPipefyCards, getPipefyCardDetails } from '@/lib/pipefyService'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CardDetailsDrawer } from '@/features/tasks/components/card-details-drawer'
import { DataTableColumnHeader } from './components/data-table-column-header'
import { DataTableRowActions } from './components/data-table-row-actions'
import { columns } from './components/leads-columns'
import { LeadsDialogs } from './components/leads-dialogs'
import { LeadsPrimaryButtons } from './components/leads-primary-buttons'
import { LeadsTable } from './components/leads-table'
import { LeadsProvider } from './context/leads-context'

const PIPE_ID = 718890 // Substitua pelo ID do pipe de leads

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [leadDetails, setLeadDetails] = useState<any | null>(null)
  const [leadList, setLeadList] = useState<any[]>([])

  useEffect(() => {
    getAllPipefyCards(PIPE_ID)
      .then((cards) => setLeads(cards.map(mapPipefyCardToLead)))
      .finally(() => setLoading(false))
  }, [])

  // Função para abrir modal ao clicar no nome
  function handleLeadClick(leadId: string) {
    setSelectedLeadId(leadId)
  }

  function getDynamicColumns(
    leads: any[],
    handleLeadClick: (id: string) => void
  ) {
    if (!leads.length) return []
    const keys = Object.keys(leads[0]).filter((k) => !['id', 'raw'].includes(k))
    const columns = [
      {
        id: 'select',
        header: ({ table }: any) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Selecionar todos'
            className='translate-y-[2px]'
          />
        ),
        cell: ({ row }: any) => (
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
      ...keys.map((key) => ({
        accessorKey: key,
        header: ({ column }: any) => (
          <DataTableColumnHeader
            column={column}
            title={key
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          />
        ),
        cell: ({ row }: any) => {
          if (key === 'nome') {
            return (
              <span
                className='text-primary cursor-pointer underline'
                onClick={() => handleLeadClick(row.original.id)}
              >
                {row.getValue('nome')}
              </span>
            )
          }
          if (key === 'status_observacoes') {
            const val = row.getValue('status_observacoes') || ''
            return (
              <span
                title={val}
                style={{
                  maxWidth: 180,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {val.length > 40 ? val.slice(0, 40) + '...' : val}
              </span>
            )
          }
          return <span>{row.getValue(key)}</span>
        },
      })),
      {
        id: 'actions',
        cell: (props: any) => <DataTableRowActions row={props.row} />,
      },
    ]
    return columns
  }

  function mapPipefyCardToLead(card: any) {
    const getField = (name: string) =>
      card.fields?.find((f: any) => f.name === name)?.value || ''
    return {
      id: card.id,
      nome:
        getField('Nome Empreendimento \\ Empresa \\ Pessoa Fisica') ||
        card.title,
      status: card.current_phase?.name || '',
      status_observacoes:
        getField('Status \\ Observações') || getField('Status') || '',
      representante: card.assignees?.map((a: any) => a.name).join(', ') || '',
      consumo_mensal: getField('Valor aprox. de Consumo Mensal') || '',
      data_atualizacao: card.created_at
        ? new Date(card.created_at).toLocaleDateString()
        : '',
      raw: card,
    }
  }

  const customColumns = getDynamicColumns(leads, handleLeadClick)

  return (
    <LeadsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Leads Novos</h2>
            <p className='text-muted-foreground'>
              Gerencie seus leads e oportunidades aqui.
            </p>
          </div>
          <LeadsPrimaryButtons />
          <LeadsDialogs />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <LeadsTable data={leads} columns={customColumns} />
        </div>
      </Main>

      <CardDetailsDrawer
        cardId={selectedLeadId}
        open={!!selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
      />
    </LeadsProvider>
  )
}
