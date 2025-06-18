import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FloorItem {
  pavimento: string
  aptos: string
  quartos: string
  banheiros: string
  chuveiros: string
  lavatorios: string
  piaCozinha: string
  especificacao: string
  populacao: string
}

interface Construction {
  id: string
  nome: string
  type: 'Torre' | 'Casa' | 'Resort' | 'Piscina'
  floors: FloorItem[]
}

interface QuantitativoFormProps {
  onBack: () => void
  onSubmit: (data: Construction[]) => void
  initialData?: Construction[]
}

export function QuantitativoForm({
  onBack,
  onSubmit,
  initialData,
}: QuantitativoFormProps) {
  const [constructions, setConstructions] = useState<Construction[]>(
    initialData || []
  )
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<Construction['type']>('Torre')

  function addConstruction() {
    if (!newName) return
    setConstructions([
      ...constructions,
      { id: Date.now().toString(), nome: newName, type: newType, floors: [] },
    ])
    setNewName('')
    setNewType('Torre')
  }

  function handleNameChange(id: string, name: string) {
    setConstructions(
      constructions.map((c) => (c.id === id ? { ...c, nome: name } : c))
    )
  }

  function handleTypeChange(id: string, type: Construction['type']) {
    setConstructions(
      constructions.map((c) => (c.id === id ? { ...c, type } : c))
    )
  }

  function addFloor(constrId: string) {
    setConstructions(
      constructions.map((c) => {
        if (c.id !== constrId) return c
        return {
          ...c,
          floors: [
            ...c.floors,
            {
              pavimento: '',
              aptos: '',
              quartos: '',
              banheiros: '',
              chuveiros: '',
              lavatorios: '',
              piaCozinha: '',
              especificacao: '',
              populacao: '',
            },
          ],
        }
      })
    )
  }

  function removeFloor(constrId: string, idx: number) {
    setConstructions(
      constructions.map((c) =>
        c.id !== constrId
          ? c
          : { ...c, floors: c.floors.filter((_, i) => i !== idx) }
      )
    )
  }

  function handleFloorChange(
    constrId: string,
    idx: number,
    field: keyof FloorItem,
    value: string
  ) {
    setConstructions(
      constructions.map((c) => {
        if (c.id !== constrId) return c
        const floors = [...c.floors]
        floors[idx] = { ...floors[idx], [field]: value }
        return { ...c, floors }
      })
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(constructions)
  }

  // Cálculo de totais de todos os pavimentos
  const totals = constructions.reduce(
    (acc, c) => {
      c.floors.forEach((f) => {
        acc.aptos += Number(f.aptos) || 0
        acc.quartos += Number(f.quartos) || 0
        acc.banheiros += Number(f.banheiros) || 0
        acc.chuveiros += Number(f.chuveiros) || 0
        acc.lavatorios += Number(f.lavatorios) || 0
        acc.piaCozinha += Number(f.piaCozinha) || 0
        acc.populacao += Number(f.populacao) || 0
      })
      return acc
    },
    {
      aptos: 0,
      quartos: 0,
      banheiros: 0,
      chuveiros: 0,
      lavatorios: 0,
      piaCozinha: 0,
      populacao: 0,
    }
  )

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-xl font-bold'>Input Quantitativo</h2>
      <div className='flex gap-2'>
        <Input
          placeholder='Nome da Construção'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select
          className='rounded border p-2'
          value={newType}
          onChange={(e) => setNewType(e.target.value as Construction['type'])}
        >
          <option value='Torre'>Torre</option>
          <option value='Casa'>Casa</option>
          <option value='Resort'>Resort</option>
          <option value='Piscina'>Piscina</option>
        </select>
        <Button type='button' variant='outline' onClick={addConstruction}>
          Adicionar
        </Button>
      </div>
      {constructions.map((c) => (
        <div key={c.id} className='space-y-2 border p-4'>
          <div className='flex items-center gap-2'>
            <select
              className='rounded border p-2'
              value={c.type}
              onChange={(e) =>
                handleTypeChange(c.id, e.target.value as Construction['type'])
              }
            >
              <option value='Torre'>Torre</option>
              <option value='Casa'>Casa</option>
              <option value='Resort'>Resort</option>
              <option value='Piscina'>Piscina</option>
            </select>
            <Input
              placeholder='Nome'
              value={c.nome}
              onChange={(e) => handleNameChange(c.id, e.target.value)}
            />
          </div>
          {/* Renderizar seção de pavimentos para todos os tipos de construção */}
          <div className='space-y-4'>
            {c.floors.map((f, i) => (
              <div key={i} className='space-y-2 rounded border p-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-semibold'>
                    Pavimento {f.pavimento || i + 1}
                  </span>
                  <button
                    type='button'
                    onClick={() => removeFloor(c.id, i)}
                    className='text-red-500'
                  >
                    Remover Pavimento
                  </button>
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    Número Pavimento
                  </label>
                  <Input
                    value={f.pavimento}
                    onChange={(e) =>
                      handleFloorChange(c.id, i, 'pavimento', e.target.value)
                    }
                  />
                </div>
                {/* Bloco de inputs numéricos */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
                  {[
                    'aptos',
                    'quartos',
                    'banheiros',
                    'chuveiros',
                    'lavatorios',
                    'piaCozinha',
                  ].map((field) => (
                    <div key={field} className='flex flex-col'>
                      <label className='mb-1 block text-sm font-medium capitalize'>
                        {field === 'piaCozinha'
                          ? 'Pia Cozinha'
                          : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <Input
                        value={f[field as keyof FloorItem]}
                        onChange={(e) =>
                          handleFloorChange(
                            c.id,
                            i,
                            field as keyof FloorItem,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                {/* Bloco de inputs textuais */}
                <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='flex flex-col'>
                    <label className='mb-1 block text-sm font-medium'>
                      Especificação
                    </label>
                    <Input
                      value={f.especificacao}
                      onChange={(e) =>
                        handleFloorChange(
                          c.id,
                          i,
                          'especificacao',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className='mb-1 block text-sm font-medium'>
                      População
                    </label>
                    <Input
                      value={f.populacao}
                      onChange={(e) =>
                        handleFloorChange(c.id, i, 'populacao', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              onClick={() => addFloor(c.id)}
            >
              Adicionar Pavimento
            </Button>
          </div>
        </div>
      ))}
      {/* Totais Dinâmicos */}
      <section className='mt-6 border-t pt-6'>
        <h3 className='mb-4 text-lg font-semibold'>Totais Gerais</h3>
        <div className='grid grid-cols-2 gap-10 rounded-lg bg-white p-4 shadow sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
          {Object.entries(totals).map(([key, value]) => (
            <div key={key} className='flex flex-col items-center rounded-l p-8'>
              <span className='w-full text-center text-2xl font-bold text-gray-800'>
                {value}
              </span>
              <span className='mt-1 w-full text-center text-sm text-gray-500'>
                {key === 'piaCozinha'
                  ? 'Pia Cozinha'
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </section>
      <div className='flex gap-2'>
        <Button type='button' variant='outline' onClick={onBack}>
          Voltar
        </Button>
        <Button type='submit'>Avançar</Button>
      </div>
    </form>
  )
}
