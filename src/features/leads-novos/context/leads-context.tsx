import React, { createContext, useContext, useState } from 'react'
import { leadSchema } from '../data/schema'

interface LeadsContextProps {
    open: boolean
    setOpen: (open: boolean) => void
    currentRow: typeof leadSchema | null
    setCurrentRow: (row: typeof leadSchema | null) => void
}

const LeadsContext = createContext<LeadsContextProps | undefined>(undefined)

export function LeadsProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [currentRow, setCurrentRow] = useState<typeof leadSchema | null>(null)
    return (
        <LeadsContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
            {children}
        </LeadsContext.Provider>
    )
}

export function useLeadsContext() {
    const context = useContext(LeadsContext)
    if (!context) throw new Error('useLeadsContext deve ser usado dentro de LeadsProvider')
    return context
} 