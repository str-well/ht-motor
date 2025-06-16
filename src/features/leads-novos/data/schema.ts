import { z } from 'zod'

export const leadSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  representante: z.string().optional(),
  contatos: z.array(z.any()).optional(),
  cliente: z.string().optional(),
  tipo_energia: z.string().optional(),
  consumo_mensal: z.string().optional(),
  status_observacoes: z.string().optional(),
  data_atualizacao: z.date().optional(),
  proximo_fup: z.string().optional(),
})

export const leadListSchema = z.array(leadSchema)

export type Lead = z.infer<typeof leadSchema> 