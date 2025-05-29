export const leadsData = [
  {
    id: '1',
    nome: 'Empresa Exemplo',
    tipo: 'empresa',
    representante: 'João Silva',
    contatos: [
      {
        id: '1',
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        telefone: '11 99999-9999',
      },
    ],
    cliente: 'Empresa Exemplo',
    tipo_energia: 'solar',
    consumo_mensal: '1000',
    status_observacoes: 'Primeiro contato realizado',
    data_atualizacao: '2024-06-01',
    proximo_fup: '2024-06-10',
  },
] 

export const leadTypes = [
  {
    id: '1',
    nome: 'Empresa',
    descricao: 'Empresa',
  },
  {
    id: '2',
    nome: 'Pessoa Física',
    descricao: 'Pessoa Física',
  },
]

export const leadStatus = [
  {
    id: '1',
    nome: 'Ativo',
    descricao: 'Ativo',
  },
]
