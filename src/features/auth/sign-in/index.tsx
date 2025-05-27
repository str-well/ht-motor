import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { z } from 'zod'
import { useForm, type ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, insira seu email' })
    .email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(1, {
      message: 'Por favor, insira sua senha',
    })
    .min(7, {
      message: 'A senha deve ter pelo menos 7 caracteres',
    }),
})

export default function SignIn({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <>
      <div className={cn("flex flex-col gap-8 items-center justify-center h-screen", className)} {...props}>
        <Card className="overflow-hidden shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md border-0 max-w-3xl w-full">
          <CardContent className="grid md:grid-cols-2 p-0">
            <div className="flex items-center justify-center p-8 md:p-0 bg-white border-r border-cinza">
              <img
                src="/logo-ht-verde.svg"
                alt="HT Motor"
                className="w-48 md:w-64"
              />
            </div>
            <div className="flex flex-col gap-8 p-8 md:p-12">
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-4xl font-black text-azul mb-1">Bem-vindo</h1>
                <p className="text-cinza text-base font-normal">Faça login para acessar sua conta</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel className="text-black font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="mail@htecosolutions.com"
                            className="rounded-xl border border-cinza bg-white text-black placeholder:text-cinza shadow focus:border-turquesa focus:ring-2 focus:ring-turquesa/30 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }: { field: any }) => (
                      <FormItem className="relative">
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-black font-semibold">Senha</FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-black hover:text-turquesa-dark underline-offset-2 hover:underline font-medium"
                          >
                            Esqueceu a senha?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput
                            placeholder="********"
                            className="rounded-xl border border-cinza bg-white text-black placeholder:text-cinza shadow focus:border-turquesa focus:ring-2 focus:ring-turquesa/30 transition-all"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-green-800 text-white rounded-xl py-3 hover:bg-green-900 transition-colors"
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
