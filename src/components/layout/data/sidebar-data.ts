import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Leaf, GalleryVerticalEnd } from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Wellington',
    email: 'htecosolutions@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Wellington',
      logo: Leaf,
      plan: 'HT Ecosolutions',
    },
  ],
  navGroups: [
    {
      title: 'Geral',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Tarefas',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Aplicativos',
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Usuários',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: 'Projetos ativos',
          url: '/projetos-ativos',
          icon: IconPackages,
        },
        {
          title: 'Projetos fechados',
          url: '/projetos-fechados',
          icon: IconPackages,
        },
        {
          title: 'Leads novos',
          url: '/leads-novos',
          icon: IconPackages,
        },
        {
          title: 'Gerar proposta',
          url: '/propostas',
          icon: GalleryVerticalEnd,
        },
      ],
    },
  ],
}
