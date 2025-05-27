interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='bg-primary-foreground container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <img src="/logo-ht-verde.svg" alt="HT Ecosolutions" className="w- md:w-32" />

        </div>
        {children}
      </div>
    </div>
  )
}
