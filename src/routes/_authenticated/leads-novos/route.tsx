import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Main } from '@/components/layout/main'
import Leads from '@/features/leads-novos'


export const Route = createFileRoute('/_authenticated/leads-novos')({
    component: Leads,
})

function LeadsNovos() {
    return (
        <>
            <Header>
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
            <Main>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Leads Novos</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Novo Lead
                    </button>
                </div>
                <div className="grid gap-6">
                    {/* Aqui será implementada a tabela de leads novos */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-500">Nenhum lead novo encontrado.</p>
                    </div>
                </div>
            </Main>
        </>
    )
} 