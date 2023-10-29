<template>
    <main className="my-20">
        <div v-if="showAlert" class="bg-red-500 rounded-md text-white p-4 fixed top-24 right-4 font-bold">
            Usuário não possui cadastro
        </div>

        <form className="flex flex-col bg-black w-[700px] h-[950px] mx-auto py-14 px-20 rounded-md items-center"
            @submit.prevent="onSubmit">
            <h1 className="text-white font-bold text-[40px]">Entrar no Spotify</h1>

            <ul className="flex flex-col space-y-2 mt-10 mb-2 px-8 md:px-32">
                <li>
                    <button type="button"
                        className="text-white font-semibold border-2 border-zinc-400 rounded-3xl w-full hover:border-white flex px-4 py-2">
                        <img src="/svg/google-logo.svg" alt="google-logo" />
                        <span className="mx-auto font-bold">Continuar com o google</span>
                    </button>
                </li>

                <li>
                    <button type="button"
                        className="text-white font-semibold border-2 border-zinc-400 rounded-3xl w-full hover:border-white flex px-4 py-2">
                        <img src="/svg/facebook-logo.svg" alt="facebook-logo" />
                        <span className="mx-auto font-bold">Continuar com o facebook</span>
                    </button>
                </li>

                <li>
                    <button type="button"
                        className="text-white font-semibold border-2 border-zinc-400 rounded-3xl w-full hover:border-white flex px-4 py-2">
                        <img src="/svg/apple-logo.svg" alt="apple-logo" />
                        <span className="mx-auto font-bold">Continuar com a apple</span>
                    </button>
                </li>

                <li>
                    <button type="button"
                        className="px-8 py-2 text-white font-semibold border-2 border-zinc-400 rounded-full w-full hover:border-white">
                        Continuar com um número de telefone
                    </button>
                </li>
            </ul>

            <hr className="border-zinc-900 w-full m-10" />

            <div className="w-full flex flex-col px-28">
                <label for="emailInput" className="mb-2 text-white font-semibold">
                    E-mail ou nome de usuário
                </label>
                <input id="emailInput" v-model="form.emailInput" type="email" placeholder="Email ou nome de usuário"
                    className="w-full py-2 px-5 text-white text-sm rounded-sm bg-[#131313] border-2 border-zinc-400 hover:border-white focus:border-white focus:outline-none" />
                <p class="text-red-500 text-sm mt-1" v-if="errors && errors.emailInput">{{ errors.emailInput._errors[0] }}
                </p>

                <label for="passwordInput" className="mt-4 mb-2 text-white font-semibold">
                    Senha
                </label>
                <input id="passwordInput" v-model="form.passwordInput" type="password" placeholder="Senha"
                    className="w-full py-2 px-5 text-white text-sm rounded-sm bg-[#131313] border-2 border-zinc-400 hover:border-white focus:border-white focus:outline-none" />

                <p class="text-red-500 text-sm mt-1" v-if="errors && errors.passwordInput">{{
                    errors.passwordInput._errors[0] }}</p>

                <label className="mt-8 relative inline-flex items-center">
                    <input type="checkbox" className="sr-only peer" />
                    <div
                        className="w-8 h-4 bg-zinc-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-white peer-checked:after:translate-x-4 peer-checked:after:border-none after:absolute after:top-1 after:left-[2px] after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-700">
                    </div>
                    <span className="ml-3 text-sm font-medium text-white">
                        Lembrar de mim
                    </span>
                </label>

                <button type="submit"
                    class="p-3 mt-10 mb-5 text-white hover:scale-[1.04] font-semibold bg-purple-700 rounded-3xl outline-white">
                    Entrar
                </button>

                <a href="https://accounts.spotify.com/en/password-reset?flow_ctx=578b03af-64b8-448c-949e-dfd77fc8fbf5%3A1691979769"
                    className="mb-8 text-white text-center underline underline-offset-1 hover:text-purple-700">
                    Esqueceu sua senha?
                </a>
            </div>

            <hr className="border-zinc-900 w-full mb-5" />

            <p className="mb-5 text-zinc-400 pb-10">
                Não tem uma conta?
                <routerLink to="/register" className="text-white underline underline-offset-1 ml-1 hover:text-purple-700">
                    Inscrever-se no Spotify
                </routerLink>
            </p>
        </form>
    </main>
</template>

<script>
import axios from 'axios'
import { z } from 'zod'

export default {
    data() {
        return {
            form: {
                emailInput: '',
                passwordInput: '',
            },
            errors: null,
            showAlert: false,
        }
    },
    methods: {
        onSubmit: async function () {
            const formSchema = z.object({
                emailInput: z.string().email({ message: 'Formato de email inválido!' }),
                passwordInput: z
                    .string()
                    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
                    .max(12, { message: 'A senha deve ter no máximo 12 caracteres!' }),
            })

            const validSchema = formSchema.safeParse(this.form)

            if (!validSchema.success) {
                this.errors = validSchema.error.format()
            } else {
                this.errors = null;
                const request = {
                    email: this.form.emailInput,
                    password: this.form.passwordInput,
                }

                const response = await axios.get('http://localhost:3000/users', request)
                const userDb = response.data

                let userNotExists = true

                userDb.forEach((element) => {
                    if (element['email'] === request.email && element['password'] === request.password) {
                        userNotExists = false
                    }
                })

                if (userNotExists) {
                    this.showAlert = true
                    setTimeout(() => {
                        this.showAlert = false
                    }, 5000)
                } else {
                    this.$store.commit('login')
                    this.$router.push('/some-view')
                }
            }
        },
    },
}
</script>