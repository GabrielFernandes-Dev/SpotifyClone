<template>
  <main class="m-auto w-[700px] bg-black rounded-md my-20">
    <div v-if="showAlert" class="bg-red-500 rounded-md text-white p-4 fixed top-24 right-4 font-bold">
      Usuário já possui cadastro
    </div>

    <form class="py-[20px] m-auto flex flex-col w-[60%]" @submit.prevent="onSubmit">
      <img class="my-[20px]" src="/svg/spotify.svg" alt="spotify-logo" />
      <h1 class="text-center text-[20px] font-bold text-white">Inscreva-se grátis e comece a curtir.</h1>

      <div class="flex flex-col w-[80%] m-auto my-[30px]">
        <button type="button"
          class="flex items-center justify-center border-none text-white py-[8px] rounded-[20px] bg-[#3b5998] hover:brightness-95 hover:scale-[1.04]">
          <img class="mr-2" src="/svg/facebook-logo.svg" alt="facebook-logo" />
          <span class="text-[15px] font-bold">Inscrever-se com o Facebook</span>
        </button>

        <button type="button"
          class="mt-[15px] flex items-center bg-white justify-center py-[8px] rounded-[20px] border-2 border-solid border-black hover:scale-[1.04]">
          <img class="mr-2" src="/svg/google-logo.svg" alt="google-logo" />
          <span class="text-[15px] font-bold text-gray-700">Inscrever-se com o Google</span>
        </button>
      </div>

      <hr class="mb-[30px]" />

      <div class="mb-[15px] flex flex-col">
        <label class="font-bold text-white" for="email-input">Qual é o seu email?</label>
        <input v-model="form.email" type="text"
          class="w-[100%] border-zinc-400 hover:border-white focus:border-white text-white p-[8px] text-[14px] rounded-[3px] border-2 border-solid focus:outline-none bg-[#131313]"
          id="email-input" />
        <router-link class="text-[12px] text-purple-700 font-bold underline" to="#!">Usar número de
          telefone.</router-link>
        <p class="text-red-500 text-sm mt-1" v-if="errors && errors.email">
          {{ errors.email._errors[0] }}
        </p>
      </div>

      <div class="mb-[15px]">
        <label class="font-bold text-white" for="password-input">Crie uma senha</label>
        <input v-model="form.password" type="password"
          class="w-[100%] p-[8px] border-zinc-400 hover:border-white focus:border-white text-white text-[14px] rounded-[3px] border-2 border-solid  bg-[#131313] focus:outline-none" />
        <p class="text-red-500 text-sm mt-1" v-if="errors && errors.password">
          {{ errors.password._errors[0] }}
        </p>
      </div>

      <div class="mb-[15px]">
        <label class="font-bold text-white" for="firstName">Como devemos chamar você?</label>
        <input type="text"
          class="w-[100%] hover:border-white focus:border-white p-[8px] text-white text-[14px] rounded-[3px] border-2 border-solid bg-[#131313] border-zinc-400 focus:outline-none"
          id="firstName" v-model="form.firstName" />
        <p class="text-[12px] text-white font-bold">Isso aparece no seu perfil.</p>
        <p class="text-red-500 text-sm mt-1" v-if="errors && errors.firstName">
          {{ errors.firstName._errors[0] }}
        </p>
      </div>

      <div class="mb-[15px] text-white">
        <label class="font-bold" for="date-container">Qual sua data de nascimento?</label>

        <div class="flex justify-center mt-[5px]" name="date-container">
          <div class="flex flex-col mr-[20px]">
            <label class="font-bold" for="day-input">Dia</label>
            <input type="text"
              class="bg-[#131313] w-[100px] text-white font-normal p-[8px] outline-none border-2 border-solid border-zinc-400 hover:border-white focus:border-white rounded-[3px]"
              name="day-input" placeholder="DD" maxlength="2" v-model="form.birthday.day" />
            <p class="text-red-500 text-sm mt-1">{{ errors && errors.birthday && errors.birthday.day._errors[0] }}</p>
          </div>

          <div class="flex flex-col mr-[20px]">
            <label class="font-bold" for="month-input">Mês</label>
            <select v-model="form.birthday.month" class="w-[150px] h-[44px] p-[8px] border-zinc-400 hover:border-white focus:border-white font-normal outline-none border-2 border-solid bg-[#131313] rounded-[3px] text-white
" name="months">
              <option value=1>janeiro</option>
              <option value=2>fevereiro</option>
              <option value=3>março</option>
              <option value=4>abril</option>
              <option value=5>maio</option>
              <option value=6>junho</option>
              <option value=7>julho</option>
              <option value=8>agosto</option>
              <option value=9>setembro</option>
              <option value=10>outubro</option>
              <option value=11>novembro</option>
              <option value=12>dezembro</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="font-bold" for="year-input">Ano</label>
            <input type="text"
              class="w-[100%] border-zinc-400 hover:border-white focus:border-white p-[8px] font-normal outline-none border-2 border-solid rounded-[3px] bg-[#131313] text-white"
              placeholder="AAAA" v-model="form.birthday.year" name="year-input" maxlength="4" />
            <p class="text-red-500 text-sm mt-1">{{ errors && errors.birthday && errors.birthday.year._errors[0] }}</p>
          </div>
        </div>
      </div>

      <label class="font-bold text-white" for="gender-container">Qual é o seu gênero?</label>
      <div class="flex space-x-5 my-5" id="gender-container">
        <div class="flex items-center">
          <input class="mr-2" type="radio" name="gender" value="Masculino" id="male-option" />
          <label class="text-[12px] font-bold text-white" for="male-option">Masculino</label>
        </div>

        <div class="flex items-center">
          <input class="mr-2" type="radio" name="gender" value="Feminino" id="female-option" />
          <label class="text-[12px] font-bold text-white" for="female-option">Feminino</label>
        </div>

        <div class="flex items-center mr-20">
          <input class="mr-2" type="radio" name="gender" value="Prefiro não informar" id="none-option" />
          <label class="text-[12px] font-bold text-white" for="none-option">Prefiro não informar</label>
        </div>
      </div>


      <div class="  w-[100%] flex flex-col">
        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="" />
          <label class="font-bold text-white">Não quero receber mensagens de marketing do Spotify
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="" />
          <label class="font-bold text-white">Compartilhar meus dados cadastrais com os provedores de conteúdo
            do Spotify para fins de marketing.
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" v-model="form.terms" type="checkbox" value="true" />
          <label class="font-bold text-white">
            Eu concordo com os <span class="text-purple-700 underline font-bold">Termos e Condições de Uso do
              Spotify</span>.
          </label>
        </div>
        <p class="text-red-500 text-sm mt-1">{{ errors && errors.terms && errors.terms._errors[0] }}</p>
      </div>

      <p class="text-[10px] text-center font-bold text-white">
        Para saber mais sobre como o Spotify coleta, utiliza, compartilha e
        protege seus dados pessoais, leia a
        <span class="text-purple-700 underline font-bold">Política de Privacidade do Spotify</span>.
      </p>

      <button type="submit"
        class="border-none rounded-[25px] py-[15px] px-[40px] bg-purple-700 text-[15px] font-bold w-[50%] m-auto my-[20px] hover:scale-[1.04] text-white">
        Inscrever-se
      </button>

      <h6 class="text-center text-white font-bold">
        Já tem uma conta?
        <router-link class="text-purple-700 font-bold underline" to="/login">Faça login</router-link>
      </h6>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import { z } from "zod";

export default {
  data() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()

    return {
      form: {
        email: '',
        password: '',
        firstName: '',
        terms: false,
        birthday: {
          day: '',
          month: '',
          year: ''
        },
        registerdate: `${day}/${month}/${year}`,
        playlists: [
          2,
          3,
          9
        ]
      },
      errors: null,
      hasRegistration: false,
      showAlert: false,
    };
  },
  methods: {
    onSubmit: async function () {
      const formSchema = z.object({
        email: z.string().email({ message: 'Formato de email inválido!' }),
        password: z
          .string()
          .min(6, { message: 'A senha deve ter no mínimo 6 caracteres!' })
          .max(12, { message: 'A senha deve ter no máximo 12 caracteres!' }),
        firstName: z.string().min(3, { message: 'Você deve escrever pelo menos o primeiro nome!' }),
        birthday: z.object({
          //day: z.string().min(),
          //month: z.string().refine((month) => month.trim() !== '', { message: 'O mês é obrigatório.' }),
          //year: z.string().refine((year) => {
          //const numericYear = parseInt(year, 10)
          //return numericYear >= 1900 && numericYear <= new Date().getFullYear()
          //}, { message: `Ano inválido. Digite um valor entre 1900 e ${new Date().getFullYear()}.` }),
        }),
        terms: z.boolean().refine((value) => value === true, {
          message: 'Você deve concordar com os termos para se inscrever.',
        }),
      })

      const validSchema = formSchema.safeParse(this.form)

      if (!validSchema.success) {
        this.errors = validSchema.error.format()
      } else {
        this.errors = null;
        const request = {
          email: this.form.email,
          password: this.form.password,
          firstName: this.form.firstName,
          terms: this.form.terms,
          birthday: this.form.birthday,
          registerdate: this.form.registerdate,
          playlists: [
            2,
            3,
            9
          ]
        }

        const responseGet = await axios.get("http://localhost:3000/users", request);
        const userDb = responseGet.data;

        userDb.forEach((element) => {
          if (element["email"] === request.email) {
            this.hasRegistration = true;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 5000);
          }
        })

        if (!this.hasRegistration) {
          const responsePost = await axios.post("http://localhost:3000/users", request)
          if (responsePost.status === 201) {
            this.$router.push('/login')
          }
        }
      }
    },
  },
}
</script>
