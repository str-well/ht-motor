import { Button } from '@/components/ui/button'

export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>503</h1>
        <span className='font-medium'>O site está em manutenção!</span>
        <p className='text-muted-foreground text-center'>
          O site não está disponível no momento. <br />
          Estaremos de volta online em breve.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline'>Saiba mais</Button>
        </div>
      </div>
    </div>
  )
}
