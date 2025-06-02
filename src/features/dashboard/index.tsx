import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { BarChartProjetosPorCliente } from './components/BarChartProjetosPorCliente'
import { PieChartNovosClientes } from './components/PieChartNovosClientes'
import { LineChartReceitaMensal } from './components/LineChartReceitaMensal'

export default function Dashboard() {
  // Dados fictícios para os gráficos
  const barChartReceitaData = [
    { mes: 'Jan', receita: 12000 },
    { mes: 'Fev', receita: 15000 },
    { mes: 'Mar', receita: 18000 },
    { mes: 'Abr', receita: 21000 },
    { mes: 'Mai', receita: 25000 },
    { mes: 'Jun', receita: 23000 },
  ]
  const pieChartProjetosData = [
    { name: 'AutoTech', value: 12 },
    { name: 'GreenMotors', value: 8 },
    { name: 'SpeedCar', value: 6 },
    { name: 'NovaFrota', value: 4 },
  ]
  const lineChartLeadsData = [
    { mes: 'Jan', leads: 200 },
    { mes: 'Fev', leads: 300 },
    { mes: 'Mar', leads: 500 },
    { mes: 'Abr', leads: 700 },
    { mes: 'Mai', leads: 1200 },
    { mes: 'Jun', leads: 1500 },
  ]
  const barChartProjetosPorClienteData = [
    { cliente: 'AutoTech', projetos: 5 },
    { cliente: 'GreenMotors', projetos: 4 },
    { cliente: 'SpeedCar', projetos: 3 },
    { cliente: 'NovaFrota', projetos: 2 },
  ]
  const lineChartReceitaMensalData = [
    { mes: 'Jan', receita: 12000 },
    { mes: 'Fev', receita: 15000 },
    { mes: 'Mar', receita: 18000 },
    { mes: 'Abr', receita: 21000 },
    { mes: 'Mai', receita: 25000 },
    { mes: 'Jun', receita: 23000 },
  ]
  const pieChartNovosClientesData = [
    { name: 'AutoTech', value: 2 },
    { name: 'NovaFrota', value: 2 },
    { name: 'GreenMotors', value: 2 },
    { name: 'SpeedCar', value: 1 },
    { name: 'FastService', value: 1 },
  ]

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Painel de Controle</h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Visão Geral</TabsTrigger>
              <TabsTrigger value='analytics'>
                Análises
              </TabsTrigger>
              <TabsTrigger value='reports'>
                Relatórios
              </TabsTrigger>
              <TabsTrigger value='notifications'>
                Notificações
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Receita Total
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>R$ 45.231,89</div>
                  <p className='text-muted-foreground text-xs'>
                    +20,1% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Projetos fechados
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2350</div>
                  <p className='text-muted-foreground text-xs'>
                    +180,1% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Leads novos</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12.234</div>
                  <p className='text-muted-foreground text-xs'>
                    +19% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Projetos ativos
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-muted-foreground text-xs'>
                    +201 desde a última hora
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Visão Geral</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Projetos Recentes</CardTitle>
                  <CardDescription>
                    Você realizou 265 projetos este mês.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            {/* Métricas rápidas */}
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>32,4%</div>
                  <p className='text-muted-foreground text-xs'>+3,2% este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>R$ 1.230,00</div>
                  <p className='text-muted-foreground text-xs'>+R$ 120,00 este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tempo Médio de Fechamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>7 dias</div>
                  <p className='text-muted-foreground text-xs'>-1 dia este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Projetos em Andamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>89</div>
                  <p className='text-muted-foreground text-xs'>+12 este mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos principais */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <Card className='col-span-1'>
                <CardHeader>
                  <CardTitle>Receita por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='h-56 flex items-center justify-center'>
                    <LineChartReceitaMensal data={barChartReceitaData} dataKey="receita" xKey="mes" color="#8884d8" height={200} />
                  </div>
                </CardContent>
              </Card>
              <Card className='col-span-1'>
                <CardHeader>
                  <CardTitle>Distribuição de Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='h-56 flex items-center justify-center'>
                    <PieChartNovosClientes data={pieChartProjetosData} />
                  </div>
                </CardContent>
              </Card>
              <Card className='col-span-1'>
                <CardHeader>
                  <CardTitle>Crescimento de Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='h-56 flex items-center justify-center'>
                    <LineChartReceitaMensal data={lineChartLeadsData} dataKey="leads" xKey="mes" color="#00C49F" height={200} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights e tendências */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc pl-4 space-y-1 text-sm text-muted-foreground'>
                    <li>O mês de maio teve o maior crescimento de leads do ano.</li>
                    <li>Projetos fechados aumentaram 15% em relação ao mês anterior.</li>
                    <li>O ticket médio está em tendência de alta nos últimos 3 meses.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tendências</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc pl-4 space-y-1 text-sm text-muted-foreground'>
                    <li>Clientes do setor automotivo estão fechando mais rápido.</li>
                    <li>Projetos de grande porte representam 40% da receita.</li>
                    <li>Maior engajamento em campanhas digitais.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='reports' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              {/* Card de resumo para a weekly */}
              <Card className='lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Resumo Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground text-sm'>
                    "Nesta semana, iniciamos 12 novos projetos, com destaque para os clientes <b>AutoTech</b>, <b>GreenMotors</b> e <b>SpeedCar</b>. Três clientes fecharam contratos acima de R$ 10.000, mostrando um aumento no ticket médio. O tempo médio de resposta caiu para 2h, refletindo maior eficiência do time. Recebemos 5 menções positivas de clientes, reforçando a satisfação. No mês, a receita total cresceu 18%, com 45 projetos finalizados e 8 novos clientes recorrentes, incluindo <b>AutoTech</b> e <b>NovaFrota</b>. O ticket médio subiu para R$ 1.230. Os gráficos ao lado detalham o crescimento de receita, novos clientes e satisfação."
                  </p>
                </CardContent>
              </Card>
              {/* Insights da Semana */}
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>Insights da Semana</CardTitle>
                  <button
                    className='text-xs px-2 py-1 rounded bg-muted hover:bg-muted-foreground/10 transition-colors'
                    onClick={() => {
                      const text = `Insights da Semana:\n- 12 novos projetos iniciados (AutoTech, GreenMotors, SpeedCar)\n- 3 clientes fecharam contratos acima de R$ 10.000 → AutoTech, NovaFrota, SpeedCar\n- Tempo médio de resposta caiu para 2h (↓30%)\n- 5 menções positivas de clientes\n- Satisfação do cliente atingiu 97%\n- Crescimento de leads: +22%`;
                      navigator.clipboard.writeText(text)
                    }}
                  >
                    Exportar texto
                  </button>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc pl-4 space-y-1 text-sm text-muted-foreground'>
                    <li>12 novos projetos iniciados <span className='inline-block ml-1 text-xs text-blue-600'>→ AutoTech, GreenMotors, SpeedCar</span></li>
                    <li>3 clientes fecharam contratos acima de R$ 10.000 <span className='inline-block ml-1 text-xs text-blue-600'>→ AutoTech, NovaFrota, SpeedCar</span></li>
                    <li>Tempo médio de resposta caiu para 2h <span className='inline-block ml-1 text-xs'>(↓30%)</span></li>
                    <li>5 menções positivas de clientes</li>
                    <li>Satisfação do cliente atingiu <b>97%</b></li>
                    <li>Crescimento de leads: <b>+22%</b></li>
                  </ul>
                  {/* Gráfico de barras: Projetos por cliente */}
                  <div className='h-32 flex items-center justify-center mt-4'>
                    <BarChartProjetosPorCliente data={barChartProjetosPorClienteData} />
                  </div>
                </CardContent>
              </Card>
              {/* Insights do Mês */}
              <Card className='lg:col-span-2'>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <CardTitle>Insights do Mês</CardTitle>
                  <button
                    className='text-xs px-2 py-1 rounded bg-muted hover:bg-muted-foreground/10 transition-colors'
                    onClick={() => {
                      const text = `Insights do Mês:\n- Receita total cresceu 18%\n- 45 projetos finalizados\n- 8 novos clientes recorrentes → AutoTech, NovaFrota, GreenMotors, SpeedCar, FastService, MegaAuto, CarPrime, TopDrive\n- Ticket médio subiu para R$ 1.230\n- Satisfação do cliente manteve-se acima de 95%\n- Destaque: AutoTech e NovaFrota com maior volume de contratos`;
                      navigator.clipboard.writeText(text)
                    }}
                  >
                    Exportar texto
                  </button>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc pl-4 space-y-1 text-sm text-muted-foreground'>
                    <li>Receita total cresceu <b>18%</b></li>
                    <li>45 projetos finalizados</li>
                    <li>8 novos clientes recorrentes <span className='inline-block ml-1 text-xs text-blue-600'>→ AutoTech, NovaFrota, GreenMotors, SpeedCar, FastService, MegaAuto, CarPrime, TopDrive</span></li>
                    <li>Ticket médio subiu para <b>R$ 1.230</b></li>
                    <li>Satisfação do cliente manteve-se acima de <b>95%</b></li>
                    <li>Destaque: <b>AutoTech</b> e <b>NovaFrota</b> com maior volume de contratos</li>
                  </ul>
                  {/* Gráficos de insights do mês organizados em grid, visual mais limpo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center justify-center bg-white rounded-md border p-2 shadow-sm h-70">
                    <span className="text-xs text-muted-foreground mt-4">Receita Mensal</span>
                      <LineChartReceitaMensal data={lineChartReceitaMensalData} dataKey="receita" xKey="mes" color="#8884d8" height={220} />
                      
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white rounded-md border p-2 shadow-sm h-70">
                    <span className="text-xs text-muted-foreground mt-1">Novos Clientes</span>
                    <PieChartNovosClientes data={pieChartNovosClientesData} />
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='notifications' className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <Card className='border-l-4 border-blue-500'>
                <CardContent className='py-3 flex items-center gap-3'>
                  <span className='inline-block bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs'>Task</span>
                  Você foi marcado na task <b>#1234</b> por <b>João Silva</b>.
                  <span className='ml-auto text-xs text-muted-foreground'>há 5 min</span>
                </CardContent>
              </Card>
              <Card className='border-l-4 border-green-500'>
                <CardContent className='py-3 flex items-center gap-3'>
                  <span className='inline-block bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs'>Mensagem</span>
                  <b>Maria Souza</b> mencionou você em uma mensagem.
                  <span className='ml-auto text-xs text-muted-foreground'>há 12 min</span>
                </CardContent>
              </Card>
              <Card className='border-l-4 border-yellow-500'>
                <CardContent className='py-3 flex items-center gap-3'>
                  <span className='inline-block bg-yellow-100 text-yellow-700 rounded-full px-2 py-1 text-xs'>Projeto</span>
                  Entrou mais um projeto: <b>Projeto Alpha</b>.
                  <span className='ml-auto text-xs text-muted-foreground'>há 30 min</span>
                </CardContent>
              </Card>
              <Card className='border-l-4 border-red-500'>
                <CardContent className='py-3 flex items-center gap-3'>
                  <span className='inline-block bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs'>Ação</span>
                  Existem projetos esperando sua parte para finalizar.
                  <span className='ml-auto text-xs text-muted-foreground'>há 1h</span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

