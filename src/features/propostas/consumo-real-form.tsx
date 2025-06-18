import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EnergyItem {
  label: string
  value: string
}
interface GasItem {
  local: string
  account: string
  mesAno: string
  porcentagem: string
}
interface OcupacaoItem {
  mesAno: string
  porcentagem: string
}

interface ConsumoRealFormProps {
  onBack: () => void
  onSubmit: (data: {
    energyItems: EnergyItem[]
    gasItems: GasItem[]
    ocupacaoItems: OcupacaoItem[]
  }) => void
  initialData?: {
    energyItems?: EnergyItem[]
    gasItems?: GasItem[]
    ocupacaoItems?: OcupacaoItem[]
  }
}

export function ConsumoRealForm({
  onBack,
  onSubmit,
  initialData,
}: ConsumoRealFormProps) {
  const [energyItems, setEnergyItems] = useState<EnergyItem[]>(
    initialData?.energyItems || [{ label: '', value: '' }]
  )
  const [gasItems, setGasItems] = useState<GasItem[]>(
    initialData?.gasItems || [
      { local: '', account: '', mesAno: '', porcentagem: '' },
    ]
  )
  const [ocupacaoItems, setOcupacaoItems] = useState<OcupacaoItem[]>(
    initialData?.ocupacaoItems || [{ mesAno: '', porcentagem: '' }]
  )

  function handleEnergyChange(
    index: number,
    field: keyof EnergyItem,
    val: string
  ) {
    const items = [...energyItems]
    items[index][field] = val
    setEnergyItems(items)
  }

  function addEnergyItem() {
    setEnergyItems([...energyItems, { label: '', value: '' }])
  }
  function removeEnergyItem(idx: number) {
    setEnergyItems(energyItems.filter((_, i) => i !== idx))
  }

  function handleGasChange(index: number, field: keyof GasItem, val: string) {
    const items = [...gasItems]
    items[index][field] = val
    setGasItems(items)
  }
  function addGasItem() {
    setGasItems([
      ...gasItems,
      { local: '', account: '', mesAno: '', porcentagem: '' },
    ])
  }
  function removeGasItem(idx: number) {
    setGasItems(gasItems.filter((_, i) => i !== idx))
  }

  function handleOcupacaoChange(
    index: number,
    field: keyof OcupacaoItem,
    val: string
  ) {
    const items = [...ocupacaoItems]
    items[index][field] = val
    setOcupacaoItems(items)
  }
  function addOcupacaoItem() {
    setOcupacaoItems([...ocupacaoItems, { mesAno: '', porcentagem: '' }])
  }
  function removeOcupacaoItem(idx: number) {
    setOcupacaoItems(ocupacaoItems.filter((_, i) => i !== idx))
  }

  function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ energyItems, gasItems, ocupacaoItems })
  }

  return (
    <form className='space-y-6' onSubmit={handleFinalSubmit}>
      <h2 className='text-xl font-bold'>Consumo Real Dinâmico</h2>
      {/* Seção Energia */}
      <section className='space-y-2'>
        <h3 className='font-semibold'>Energia</h3>
        {energyItems.map((item, idx) => (
          <div key={idx} className='flex items-center gap-2'>
            <Input
              placeholder='Nome do Item'
              value={item.label}
              onChange={(e) => handleEnergyChange(idx, 'label', e.target.value)}
            />
            <Input
              placeholder='Valor'
              value={item.value}
              onChange={(e) => handleEnergyChange(idx, 'value', e.target.value)}
            />
            <button
              type='button'
              onClick={() => removeEnergyItem(idx)}
              className='text-red-500'
            >
              Remover
            </button>
          </div>
        ))}
        <Button type='button' variant='outline' onClick={addEnergyItem}>
          Adicionar Energia
        </Button>
      </section>
      {/* Seção Gás */}
      <section className='space-y-2'>
        <h3 className='font-semibold'>Contas de Gás em Uso</h3>
        {gasItems.map((item, idx) => (
          <div key={idx} className='grid grid-cols-2 gap-2'>
            <Input
              placeholder='Local'
              value={item.local}
              onChange={(e) => handleGasChange(idx, 'local', e.target.value)}
            />
            <Input
              placeholder='Nº Conta'
              value={item.account}
              onChange={(e) => handleGasChange(idx, 'account', e.target.value)}
            />
            <Input
              placeholder='Mês/Ano'
              value={item.mesAno}
              onChange={(e) => handleGasChange(idx, 'mesAno', e.target.value)}
            />
            <Input
              placeholder='%'
              value={item.porcentagem}
              onChange={(e) =>
                handleGasChange(idx, 'porcentagem', e.target.value)
              }
            />
            <button
              type='button'
              onClick={() => removeGasItem(idx)}
              className='col-span-2 text-left text-red-500'
            >
              Remover
            </button>
          </div>
        ))}
        <Button type='button' variant='outline' onClick={addGasItem}>
          Adicionar Conta de Gás
        </Button>
      </section>
      {/* Seção Ocupação */}
      <section className='space-y-2'>
        <h3 className='font-semibold'>Ocupação</h3>
        {ocupacaoItems.map((item, idx) => (
          <div key={idx} className='flex items-center gap-2'>
            <Input
              placeholder='Mês/Ano'
              value={item.mesAno}
              onChange={(e) =>
                handleOcupacaoChange(idx, 'mesAno', e.target.value)
              }
            />
            <Input
              placeholder='%'
              value={item.porcentagem}
              onChange={(e) =>
                handleOcupacaoChange(idx, 'porcentagem', e.target.value)
              }
            />
            <button
              type='button'
              onClick={() => removeOcupacaoItem(idx)}
              className='text-red-500'
            >
              Remover
            </button>
          </div>
        ))}
        <Button type='button' variant='outline' onClick={addOcupacaoItem}>
          Adicionar Ocupação
        </Button>
      </section>
      {/* Ações */}
      <div className='mt-4 flex gap-2'>
        <Button type='button' variant='outline' onClick={onBack}>
          Voltar
        </Button>
        <Button type='submit'>Salvar Consumo</Button>
      </div>
    </form>
  )
}
