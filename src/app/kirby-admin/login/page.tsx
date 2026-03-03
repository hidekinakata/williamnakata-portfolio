"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "./actions/login";

const formSchema = z.object({
  email: z.email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await login(values);
      if (result?.error) {
        setErrorMessage(result.error);
      }

      if (result?.data?.token) {
        router.push("/kirby-admin/panel");
      }
    } catch (error) {
      setErrorMessage("Ocorreu um erro inesperado ao fazer login.");
    }

    setLoading(false);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 font-mono">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-zinc-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Kirby Admin</CardTitle>
          <CardDescription className="text-zinc-400">
            Entre com suas credenciais para acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@exemplo.com"
                        {...field}
                        className="border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="border-zinc-800 bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-300"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-center text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} William Nakata. Todos os direitos
            reservados.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
