import React, { useEffect, useState } from 'react'
import { getAllPipefyCards } from '@/lib/pipefyService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { leadSchema, Lead } from '@/features/leads-novos/data/schema'
import { LeadAutocomplete } from './components/lead-autocomplete'
import { ConsumoRealForm } from './consumo-real-form'

const PIPE_ID = 718890

const emptyLead: Partial<Lead> = {
  nome: '',
  tipo: '',
  representante: '',
  contatos: [],
  cliente: '',
  tipo_energia: '',
  consumo_mensal: '',
}

export default function PropostaInicio() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [step, setStep] = useState<'select' | 'form' | 'consumo'>('select')
  const [selectedLeadId, setSelectedLeadId] = useState<string>('')
  const [formData, setFormData] = useState<Partial<Lead>>(emptyLead)
  const [error, setError] = useState<string>('')
  const [consumoData, setConsumoData] = useState<Record<string, string> | null>(
    null
  )

  useEffect(() => {
    getAllPipefyCards(PIPE_ID).then((cards) => {
      setLeads(
        cards.map((card: any) => {
          return {
            id: card.id,
            nome:
              card.fields?.find((f: any) => f.name.includes('Nome'))?.value ||
              card.title,
            tipo:
              card.fields?.find((f: any) => f.name.includes('Tipo'))?.value ||
              '',
            representante:
              card.assignees?.map((a: any) => a.name).join(', ') || '',
            contatos: [
              card.fields?.find((f: any) => f.name.includes('Contato'))
                ?.value || '',
            ],
            cliente:
              card.fields?.find((f: any) => f.name.includes('Cliente'))
                ?.value || '',
            tipo_energia:
              card.fields?.find((f: any) => f.name.includes('Energia'))
                ?.value || '',
            consumo_mensal:
              card.fields?.find((f: any) => f.name.includes('Consumo'))
                ?.value || '',
          }
        })
      )
    })
  }, [])

  function handleSelectLead(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value
    setSelectedLeadId(id)
    if (id === 'novo') {
      setStep('form')
      setFormData(emptyLead)
    } else {
      const lead = leads.find((l) => l.id === id)
      if (lead) setFormData(lead)
      setStep('form')
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    if (name === 'contatos') {
      setFormData((prev) => ({ ...prev, contatos: [value] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = leadSchema.safeParse({
      ...formData,
      contatos: formData.contatos || [],
    })
    if (!parsed.success) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    setError('')
    setStep('consumo')
  }

  function handleConsumoSubmit(data: Record<string, string>) {
    setConsumoData(data)
    // Aqui você pode avançar para a próxima etapa do fluxo (ex: resumo ou geração de proposta)
    alert('Dados de consumo real salvos!')
  }

  function handleBackToForm() {
    setStep('form')
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h1 className='mb-2 text-2xl font-bold'>Gerar Proposta</h1>
      <p className='text-muted-foreground mb-6'>
        Selecione um lead existente ou cadastre um novo cliente/projeto para
        iniciar a geração de proposta.
      </p>
      {step === 'select' && (
        <div className='space-y-4'>
          <label className='mb-2 block font-medium'>
            Selecione um lead existente:
          </label>
          <div className='flex items-center gap-2'>
            <select
              className='w-full max-w-[260px] rounded-md border p-2'
              value={selectedLeadId}
              onChange={handleSelectLead}
            >
              <option value=''>Selecione...</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.nome}
                </option>
              ))}
              <option value='novo'>Cadastrar novo cliente/projeto</option>
            </select>
            <span className='text-gray-400'>ou</span>
            <div className='flex-1'>
              <LeadAutocomplete
                leads={leads}
                onSelect={(lead) => {
                  setSelectedLeadId(lead.id || '')
                  setFormData(lead)
                  setStep('form')
                }}
                onNew={(nome) => {
                  setFormData({ ...emptyLead, nome })
                  setStep('form')
                }}
              />
            </div>
            <Button
              type='button'
              variant='outline'
              className='ml-2 whitespace-nowrap'
              onClick={() => {
                setFormData(emptyLead)
                setStep('form')
              }}
            >
              Novo cadastro
            </Button>
          </div>
        </div>
      )}
      {step === 'form' && (
        <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
          <Input
            name='nome'
            placeholder='Nome Empreendimento / Empresa / Pessoa Física*'
            value={formData.nome || ''}
            onChange={handleChange}
            required
          />
          <Input
            name='tipo'
            placeholder='Tipo do Prospect / Cliente*'
            value={formData.tipo || ''}
            onChange={handleChange}
            required
          />
          <Input
            name='representante'
            placeholder='Representante Comercial'
            value={formData.representante || ''}
            onChange={handleChange}
          />
          <Input
            name='contatos'
            placeholder='Contatos do Cliente'
            value={formData.contatos?.[0] || ''}
            onChange={handleChange}
          />
          <Input
            name='cliente'
            placeholder='Cliente'
            value={formData.cliente || ''}
            onChange={handleChange}
          />
          <Input
            name='tipo_energia'
            placeholder='Tipo da Energia'
            value={formData.tipo_energia || ''}
            onChange={handleChange}
          />
          <Input
            name='consumo_mensal'
            placeholder='Valor aprox. de Consumo Mensal'
            value={formData.consumo_mensal || ''}
            onChange={handleChange}
          />
          {error && <div className='text-sm text-red-500'>{error}</div>}
          <Button type='submit' className='mt-2 w-full'>
            Próxima etapa
          </Button>
        </form>
      )}
      {step === 'consumo' && (
        <ConsumoRealForm
          onBack={handleBackToForm}
          onSubmit={handleConsumoSubmit}
        />
      )}
    </div>
  )
}
