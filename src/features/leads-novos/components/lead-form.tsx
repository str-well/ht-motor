import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function LeadForm() {
    const { register, handleSubmit, formState } = useForm()

    function onSubmit(data: any) {
        // TODO: salvar lead
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="font-medium">* Nome Empreendimento / Empresa / Pessoa Física</label>
                <Input {...register('nome', { required: true })} placeholder="Digite aqui ..." />
                {formState.errors.nome && <span className="text-xs text-red-500">deve ser informado</span>}
            </div>
            <div>
                <label className="font-medium">* Tipo do Prospect / Cliente</label>
                <Select {...register('tipo', { required: true })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Escolha uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                </Select>
                {formState.errors.tipo && <span className="text-xs text-red-500">deve ser informado</span>}
            </div>
            <div>
                <label className="font-medium">Representante Comercial</label>
                <Input {...register('representante')} placeholder="Escolha uma opção" />
            </div>
            <div>
                <label className="font-medium">Contatos do Cliente</label>
                <Button type="button" variant="link" className="p-0 h-auto">+ Criar registro</Button>
            </div>
            <div>
                <label className="font-medium">Cliente</label>
                <Button type="button" variant="link" className="p-0 h-auto">+ Criar registro</Button>
            </div>
            <div>
                <label className="font-medium">Tipo da Energia</label>
                <Select {...register('tipo_energia')}>
                    <SelectTrigger>
                        <SelectValue placeholder="Escolha uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="solar">Solar</SelectItem>
                        <SelectItem value="eolica">Eólica</SelectItem>
                        <SelectItem value="outra">Outra</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="font-medium">Valor aprox. de Consumo Mensal</label>
                <Input {...register('consumo_mensal')} placeholder="Digite aqui ..." />
            </div>
            <div>
                <label className="font-medium">Status / Observações</label>
                <Textarea {...register('status_observacoes')} placeholder="Digite aqui ..." />
            </div>
            <div>
                <label className="font-medium">Data da última atualização:</label>
                <div className="flex items-center gap-2">
                    <Input {...register('data_atualizacao')} placeholder="DD/MM/AAAA" type="date" />
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
            <div>
                <label className="font-medium">Próximo fup</label>
                <div className="flex items-center gap-2">
                    <Input {...register('proximo_fup')} placeholder="DD/MM/AAAA" type="date" />
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
            <Button type="submit" className="w-full mt-2">Criar novo card</Button>
        </form>
    )
} 