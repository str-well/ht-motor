import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "../pages/LoginPage/styles/index.css";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-8 items-center justify-center", className)} {...props}>
      <Card className="overflow-hidden shadow-2xl rounded-2xl bg-white/95 backdrop-blur-md border-0 max-w-3xl w-full">
        <CardContent className="grid md:grid-cols-2 p-0">
          <div className="flex items-center justify-center p-8 md:p-0 bg-white border-r border-cinza">
            <img
              src="/logo-ht-verde.svg"
              alt="HT Motor"
              className="w-48 md:w-64"
            />
          </div>
          <form className="flex flex-col gap-8 p-8 md:p-12">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-4xl font-black text-azul mb-1">Bem-vindo</h1>
              <p className="text-cinza text-base font-normal">Faça login para acessar sua conta</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-black font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@htecosolutions.com"
                  required
                  className="rounded-xl border border-cinza bg-white text-black placeholder:text-cinza shadow focus:border-turquesa focus:ring-2 focus:ring-turquesa/30 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-black font-semibold">Senha</Label>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-turquesa-dark underline-offset-2 hover:underline font-medium"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="rounded-xl border border-cinza bg-white text-black placeholder:text-cinza shadow focus:border-turquesa focus:ring-2 focus:ring-turquesa/30 transition-all"
                />
              </div>
            </div>
            <button type="submit" className="btn-turquesa w-full mt-2">
              Entrar
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
