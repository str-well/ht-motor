import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Main } from '@/components/layout/main'



export const Route = createFileRoute('/_authenticated/projetos-ativos')({
    component: ProjetosAtivos,
})

function ProjetosAtivos() {
    return (
        <>
            <Header fixed>
                <Search />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
            <Main>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Projetos Ativos</h1>
                    <div className="flex gap-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Novo Projeto
                        </button>
                        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Filtrar
                        </button>
                    </div>
                </div>
                <div className="grid gap-6">
                    {/* Aqui será implementada a tabela de projetos ativos */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-500">Nenhum projeto ativo encontrado.</p>
                    </div>
                </div>
            </Main>
        </>
    )
} 