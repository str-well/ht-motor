import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from '@tabler/icons-react'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Funcionalidade',
  },
  {
    value: 'documentation',
    label: 'Documentação',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: 'A fazer',
    icon: IconCircle,
  },
  {
    value: 'in progress',
    label: 'Em andamento',
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: 'Feito',
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: 'Cancelado',
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    label: 'Baixa',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Média',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'Alta',
    value: 'high',
    icon: IconArrowUp,
  },
]
