import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Lead } from '@/features/leads-novos/data/schema'

interface LeadAutocompleteProps {
  leads: Lead[]
  onSelect: (lead: Lead) => void
  onNew: (nome: string) => void
}

export function LeadAutocomplete({
  leads,
  onSelect,
  onNew,
}: LeadAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [showList, setShowList] = useState(false)
  const filtered =
    query.length > 0
      ? leads.filter((l) => l.nome.toLowerCase().includes(query.toLowerCase()))
      : []

  return (
    <div className='relative w-full'>
      <Input
        placeholder='Buscar lead por nome...'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setShowList(true)
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
      />
      {showList && filtered.length > 0 && (
        <ul className='absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border bg-white shadow'>
          {filtered.map((lead) => (
            <li
              key={lead.id}
              className='cursor-pointer px-3 py-2 hover:bg-gray-100'
              onMouseDown={() => {
                onSelect(lead)
                setQuery(lead.nome)
                setShowList(false)
              }}
            >
              {lead.nome}
            </li>
          ))}
        </ul>
      )}
      {showList && query.length > 0 && filtered.length === 0 && (
        <div className='absolute z-10 mt-1 w-full rounded border bg-white px-3 py-2 text-gray-500 shadow'>
          Nenhum lead encontrado.{' '}
          <button
            className='ml-1 text-blue-600 underline'
            type='button'
            onMouseDown={() => onNew(query)}
          >
            Cadastrar novo
          </button>
        </div>
      )}
    </div>
  )
}
