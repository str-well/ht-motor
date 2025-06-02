import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export function BarChartProjetosPorCliente({ data }: any) {
  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cliente" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="projetos" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
