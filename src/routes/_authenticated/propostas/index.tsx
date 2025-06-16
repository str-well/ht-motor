import { createFileRoute } from '@tanstack/react-router'
import PropostaInicio from '@/features/propostas'

export const Route = createFileRoute('/_authenticated/propostas/')({
  component: PropostaInicio,
})
