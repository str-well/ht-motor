import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useLeadsContext } from '../context/leads-context'
import { LeadForm } from './lead-form'

export function LeadsDialogs() {
    const { open, setOpen } = useLeadsContext()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Nova oportunidade</DialogTitle>
                </DialogHeader>
                <LeadForm />
            </DialogContent>
        </Dialog>
    )
} 