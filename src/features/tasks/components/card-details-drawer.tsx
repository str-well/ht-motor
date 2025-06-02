import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  getPipefyCardDetails,
  PipefyCardDetails,
} from '../../../lib/pipefyService'

interface CardDetailsDrawerProps {
  cardId: string | null
  open: boolean
  onClose: () => void
}

export function CardDetailsDrawer({
  cardId,
  open,
  onClose,
}: CardDetailsDrawerProps) {
  const [card, setCard] = useState<PipefyCardDetails | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && cardId) {
      setLoading(true)
      getPipefyCardDetails(cardId)
        .then(setCard)
        .finally(() => setLoading(false))
    } else {
      setCard(null)
    }
  }, [cardId, open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className='w-full max-w-lg p-0'
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <DialogHeader></DialogHeader>
        <Card className='border-none shadow-none'>
          <CardContent className='p-6'>
            {loading && <div>Carregando...</div>}
            {!loading && card && (
              <div>
                <h2 className='mb-2 text-3xl leading-tight font-extrabold'>
                  {card.title}
                </h2>
                <div className='mb-4 flex flex-wrap gap-2'>
                  {card.labels &&
                    card.labels.length > 0 &&
                    Array.isArray(card.labels) &&
                    card.labels.map((l: any, i: number) => (
                      <Badge key={l.id || i} className='bg-gray-500 text-white'>
                        {typeof l === 'string'
                          ? l
                          : l.name || JSON.stringify(l)}
                      </Badge>
                    ))}
                  {card.summary_attributes &&
                    card.summary_attributes.length > 0 &&
                    card.summary_attributes.map((f, i) => (
                      <Badge key={i} variant='outline' className='text-xs'>
                        {typeof f === 'string' ? f : f.title}
                      </Badge>
                    ))}
                  {card.due_date && (
                    <Badge variant='secondary'>
                      Vencimento: {new Date(card.due_date).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                {card.summary && (
                  <div className='text-muted-foreground mb-4 text-base italic'>
                    {typeof card.summary === 'string'
                      ? card.summary
                      : card.summary?.text || JSON.stringify(card.summary)}
                  </div>
                )}
                <div className='text-muted-foreground mb-2 text-sm'>
                  <b>Fase:</b> {card.current_phase?.name}
                </div>
                {card.assignees && card.assignees.length > 0 && (
                  <div className='mb-2 text-sm'>
                    <b>Responsáveis:</b>{' '}
                    {card.assignees
                      .map((a) => a.name || a.displayName)
                      .join(', ')}
                  </div>
                )}
                {card.fields && card.fields.length > 0 && (
                  <div className='mt-4'>
                    <b>Campos:</b>
                    <div className='mt-2 grid grid-cols-1 gap-2'>
                      {card.fields.map((f) => (
                        <div
                          key={f.name}
                          className='flex flex-col rounded border bg-white px-3 py-2 text-sm shadow-sm'
                        >
                          <span className='text-muted-foreground font-semibold'>
                            {f.name}
                          </span>
                          <span>{f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {card.pipe && (
                  <div className='mt-4 text-sm'>
                    <b>Pipe:</b> {card.pipe.name}
                    {card.pipe.members && card.pipe.members.length > 0 && (
                      <div className='mt-1'>
                        <b>Membros:</b>{' '}
                        {card.pipe.members
                          .map((m) => m.user.displayName)
                          .join(', ')}
                      </div>
                    )}
                  </div>
                )}
                {card.attachments && card.attachments.length > 0 && (
                  <div className='mt-4 text-sm'>
                    <b>Anexos:</b>
                    <ul className='mt-2 space-y-1'>
                      {card.attachments.map((a, i) => (
                        <li key={i}>
                          <span>{a.field?.label || 'Arquivo'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {card.phases_history && card.phases_history.length > 0 && (
                  <div className='mt-8'>
                    <b>Histórico de Fases:</b>
                    <ul className='border-primary/30 mt-3 space-y-3 border-l-4 pl-6'>
                      {card.phases_history.map((h, i) => (
                        <li
                          key={i}
                          className='text-muted-foreground relative text-xs'
                        >
                          <span className='bg-primary/80 absolute top-2 -left-6 h-3 w-3 rounded-full border-2 border-white'></span>
                          <span className='font-semibold'>
                            {h?.phase?.name}
                          </span>
                          {h.moved_at && (
                            <span className='text-muted-foreground ml-2'>
                              {new Date(h.moved_at).toLocaleString()}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {card.parent_relations && card.parent_relations.length > 0 && (
                  <div className='mt-4'>
                    <b>Cards Relacionados:</b>
                    <ul className='mt-2 space-y-1'>
                      {card.parent_relations.map((rel, i) => (
                        <li key={i} className='text-xs'>
                          {rel?.name || rel?.id || JSON.stringify(rel)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Separator className='my-8' />
                <CardComments comments={card.comments || []} />
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

function CardComments({ comments }: { comments: any[] }) {
  if (!comments.length)
    return <div className='text-muted-foreground text-sm'>Sem comentários.</div>
  return (
    <div>
      <b>Comentários:</b>
      <ul className='mt-2 space-y-6'>
        {comments.map((c) => (
          <li
            key={c.id}
            className='bg-muted flex items-start gap-3 rounded p-3'
          >
            <Avatar className='h-8 w-8'>
              <AvatarFallback>
                {c.author?.name?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className='font-medium'>{c.author?.name || 'Usuário'}</span>
              <span className='ml-2 text-sm'>{c.text}</span>
              <div className='text-muted-foreground mt-1 text-xs'>
                {new Date(c.created_at).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
