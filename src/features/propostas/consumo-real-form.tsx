import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ConsumoRealFormProps {
  onBack: () => void
  onSubmit: (data: Record<string, string>) => void
  initialData?: Record<string, string>
}

export function ConsumoRealForm({
  onBack,
  onSubmit,
  initialData,
}: ConsumoRealFormProps) {
  const [form, setForm] = React.useState<Record<string, string>>(
    initialData || {
      ocupacao: '',
      energia: '',
      piscina_adulto: '',
      piscina_infantil: '',
      hidromassagem: '',
      aquecimento_uh: '',
      lavanderia: '',
      cozinhas: '',
      jacuzzis: '',
      quartos: '',
      banheira: '',
      calefacao: '',
      temp_min: '',
      temp_max: '',
      temp_media: '',
      precipitacao: '',
    }
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <h2 className='mb-2 text-xl font-bold'>Inputs de Consumo Real</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Tx Ocupação (%)
          </label>
          <Input
            name='ocupacao'
            placeholder='Ex: 49,00'
            value={form.ocupacao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Tarifa de Energia Elétrica
          </label>
          <Input
            name='energia'
            placeholder='Ex: COPEL/MATRIX (MLE)'
            value={form.energia}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Piscina adulto (m²)
          </label>
          <Input
            name='piscina_adulto'
            placeholder='Ex: 133m²'
            value={form.piscina_adulto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Piscina infantil (m²)
          </label>
          <Input
            name='piscina_infantil'
            placeholder='Ex: 22m²'
            value={form.piscina_infantil}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Hidromassagem (m³)
          </label>
          <Input
            name='hidromassagem'
            placeholder='Ex: 4'
            value={form.hidromassagem}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Aquecimento de UH (Banho)
          </label>
          <Input
            name='aquecimento_uh'
            placeholder='Ex: 275'
            value={form.aquecimento_uh}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Lavanderia</label>
          <Input
            name='lavanderia'
            placeholder='Ex: 0'
            value={form.lavanderia}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Cozinhas</label>
          <Input
            name='cozinhas'
            placeholder='Ex: 0'
            value={form.cozinhas}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Jacuzzis Externas
          </label>
          <Input
            name='jacuzzis'
            placeholder='Ex: 11'
            value={form.jacuzzis}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Quartos</label>
          <Input
            name='quartos'
            placeholder='Ex: 261'
            value={form.quartos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Banheira</label>
          <Input
            name='banheira'
            placeholder='Ex: 0'
            value={form.banheira}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Calefação</label>
          <Input
            name='calefacao'
            placeholder='Ex: 332'
            value={form.calefacao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Temp. Mínima (°C)
          </label>
          <Input
            name='temp_min'
            placeholder='Ex: 9,0'
            value={form.temp_min}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Temp. Máxima (°C)
          </label>
          <Input
            name='temp_max'
            placeholder='Ex: 27,0'
            value={form.temp_max}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Temp. Média (°C)
          </label>
          <Input
            name='temp_media'
            placeholder='Ex: 22,5'
            value={form.temp_media}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>
            Precipitação (mm)
          </label>
          <Input
            name='precipitacao'
            placeholder='Ex: 222'
            value={form.precipitacao}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='mt-4 flex gap-2'>
        <Button type='button' variant='outline' onClick={onBack}>
          Voltar
        </Button>
        <Button type='submit'>Avançar</Button>
      </div>
    </form>
  )
}
