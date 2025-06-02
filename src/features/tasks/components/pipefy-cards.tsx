import { useEffect, useState } from 'react'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Dialog } from '@/components/ui/dialog'
import {
  getPipefyPhasesAndAllCards,
  PipefyCard,
  PipefyPhase,
} from '../../../lib/pipefyService'
import { CardDetailsDrawer } from './card-details-drawer'

const PIPE_ID = 718890

export default function PipefyCards() {
  const [phases, setPhases] = useState<PipefyPhase[]>([])
  const [cards, setCards] = useState<PipefyCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getPipefyPhasesAndAllCards(PIPE_ID)
      .then(({ phases, cards }) => {
        setPhases(phases)
        setCards(cards)
      })
      .catch(() => setError('Erro ao buscar dados do Pipefy'))
      .finally(() => setLoading(false))
  }, [])

  // Agrupa os cards por fase
  const cardsByPhase: Record<string, PipefyCard[]> = {}
  phases.forEach((phase) => {
    cardsByPhase[phase.id] = []
  })
  cards.forEach((card) => {
    if (cardsByPhase[card.current_phase.id]) {
      cardsByPhase[card.current_phase.id].push(card)
    }
  })

  function handleDragEnd(event: DragEndEvent) {
    // Drag & drop visual apenas (não move no Pipefy)
    const { active, over } = event
    if (!over || active.id === over.id) return
    setCards((prev) => {
      // Encontra o card e a fase
      const card = prev.find((c) => c.id === active.id)
      if (!card) return prev
      const fromPhaseId = card.current_phase.id
      const toPhaseId = over.data?.current?.phaseId || fromPhaseId
      if (fromPhaseId === toPhaseId) {
        // Move dentro da mesma fase
        const phaseCards = cardsByPhase[fromPhaseId]
        const oldIdx = phaseCards.findIndex((c) => c.id === active.id)
        const newIdx = phaseCards.findIndex((c) => c.id === over.id)
        if (oldIdx !== -1 && newIdx !== -1) {
          const newCards = [...prev]
          const phaseCardsCopy = [...phaseCards]
          phaseCardsCopy.splice(newIdx, 0, phaseCardsCopy.splice(oldIdx, 1)[0])
          // Atualiza a ordem dos cards na fase
          let i = 0
          for (let idx = 0; idx < newCards.length; idx++) {
            if (newCards[idx].current_phase.id === fromPhaseId) {
              newCards[idx] = phaseCardsCopy[i++]
            }
          }
          return newCards
        }
      }
      // Para mover entre fases, seria necessário atualizar no Pipefy via API
      return prev
    })
  }

  if (loading) return <div>Carregando kanban do Pipefy...</div>
  if (error) return <div>{error}</div>

  // Cores para fases (padrão Pipefy)
  const phaseColors: Record<string, string> = {
    blue: '#3b82f6',
    gray: '#6b7280',
    pink: '#ec4899',
    sky: '#0ea5e9',
    lime: '#84cc16',
    orange: '#f59e42',
    cyan: '#06b6d4',
    purple: '#a21caf',
    red: '#ef4444',
    yellow: '#eab308',
    indigo: '#6366f1',
  }

  return (
    <div style={{ margin: '2rem 0', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: 16 }}>Kanban Pipefy</h2>
      <div style={{ display: 'flex', gap: 24 }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {phases.map((phase) => (
            <div
              key={phase.id}
              style={{
                minWidth: 280,
                background: '#fff',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 2px 8px #0001',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 600,
                overflowY: 'auto',
                borderTop: `6px solid ${phaseColors[phase.color || 'gray'] || '#6b7280'}`,
              }}
            >
              <h3
                style={{
                  marginBottom: 12,
                  color: phaseColors[phase.color || 'gray'] || '#6b7280',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: 0.5,
                }}
              >
                {phase.name}
              </h3>
              <SortableContext
                items={cardsByPhase[phase.id].map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {cardsByPhase[phase.id].map((card) => (
                  <div
                    key={card.id}
                    id={card.id}
                    style={{
                      background: '#f4f4f5',
                      borderRadius: 8,
                      marginBottom: 12,
                      padding: 14,
                      boxShadow: '0 1px 4px #0002',
                      cursor: 'pointer',
                      borderLeft: `4px solid ${phaseColors[phase.color || 'gray'] || '#6b7280'}`,
                      transition: 'box-shadow 0.2s',
                    }}
                    onClick={() => setSelectedCardId(card.id)}
                  >
                    <strong style={{ fontSize: 16 }}>{card.title}</strong>
                    <br />
                    <small style={{ color: '#555' }}>
                      Criado em: {new Date(card.created_at).toLocaleString()}
                    </small>
                  </div>
                ))}
                {cardsByPhase[phase.id].length === 0 && (
                  <div
                    style={{
                      color: '#bbb',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      marginTop: 16,
                    }}
                  >
                    Nenhum card nesta fase
                  </div>
                )}
              </SortableContext>
            </div>
          ))}
        </DndContext>
      </div>
      {/* Drawer/Modal de detalhes do card */}
      <CardDetailsDrawer
        cardId={selectedCardId}
        open={!!selectedCardId}
        onClose={() => setSelectedCardId(null)}
      />
    </div>
  )
}
