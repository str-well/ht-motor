import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Main } from '@/components/layout/main'



export const Route = createFileRoute('/_authenticated/projetos-fechados')({
    component: ProjetosFechados,
})

function ProjetosFechados() {
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
                <h1 className="text-2xl font-bold mb-6">Projetos Fechados</h1>
                <div className="grid gap-6">
                    {/* Aqui será implementada a tabela de projetos fechados */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-500">Nenhum projeto fechado encontrado.</p>
                    </div>
                </div>
            </Main>
        </>
    )
} 