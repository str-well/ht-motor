import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['Ativo', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['Inativo', 'bg-neutral-300/40 border-neutral-300'],
  ['Convite enviado', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'Suspenso',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const userTypes = [
  {
    label: 'Super-administrador',
    value: 'Super-administrador',
    icon: IconShield,
  },
  {
    label: 'Administrador',
    value: 'Administrador',
    icon: IconUserShield,
  },
  {
    label: 'Gerente',
    value: 'Gerente',
    icon: IconUsersGroup,
  },
  {
    label: 'Financeiro',
    value: 'Financeiro',
    icon: IconCash,
  },
] as const
