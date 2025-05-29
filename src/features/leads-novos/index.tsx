import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { LeadsDialogs } from './components/leads-dialogs'
import { LeadsProvider } from './context/leads-context'
import { LeadsPrimaryButtons } from './components/leads-primary-buttons'
import { LeadsTable } from './components/leads-table'
import { columns } from './components/leads-columns'
import { leads } from './data/leads'
import { leadSchema } from './data/schema'
import { z } from 'zod'
import { useEffect } from 'react'

export default function Leads() {
    const leadList = z.array(leadSchema).parse(leads)


    useEffect(() => {
        console.log(leadList)
    }, [leadList])

    return (
        <LeadsProvider>
            <Header fixed>
                <Search />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Leads Novos</h2>
                        <p className='text-muted-foreground'>
                            Gerencie seus leads e oportunidades aqui.
                        </p>
                    </div>
                    <LeadsPrimaryButtons />
                    <LeadsDialogs />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <LeadsTable data={leadList} columns={columns} />
                </div>
            </Main>

            {/* <LeadsDialogs /> */}
        </LeadsProvider>
    )
} 