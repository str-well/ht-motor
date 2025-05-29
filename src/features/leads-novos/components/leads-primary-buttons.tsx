import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useLeadsContext } from '../context/leads-context'

export function LeadsPrimaryButtons() {
    const { setOpen } = useLeadsContext()
    return (
        <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Novo Lead
            </Button>
        </div>
    )
} 