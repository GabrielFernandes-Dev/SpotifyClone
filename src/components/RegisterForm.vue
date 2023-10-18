<script>
import { ref } from "vue";
import { z } from "zod";

export default {
    setup() {
        const form = ref({
            emailInput: "",
            passwordInput: "",
        });

        const formSchema = z.object({
            emailInput: z.string().email({ message: "Formato de email inválido!" }),
            passwordInput: z
                .string()
                .min(6, { message: "A senha deve ter no mínimo 6 caracteres!" })
                .max(12, { message: "A senha deve ter no máximo 12 caracteres!" }),
        });

        const errors = ref(null);
        const onSubmit = () => {
            const validSchema = formSchema.safeParse(form.value);


            if (!validSchema.success) {
                errors.value = validSchema.error.format();
            } else {
                errors.value = null;
                console.log({
                    email: form.value.emailInput,
                    password: form.value.passwordInput
                })
            }
        };

        return {
            form,
            errors,
            onSubmit,
        };
    },
};
</script>

<template>
  <main class="m-auto w-[800px]">
    <form class="py-[20px] m-auto flex flex-col w-[50%]">
      <img class="my-[20px]" src="/svg/spotify.svg" alt="spotify-logo" />
      <h1 class="text-center text-[20px] font-bold">Inscreva-se grátis e comece a curtir.</h1>

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
        <label class="font-bold" for="email-input">Qual é o seu email?</label>
        <input type="text"
          class="w-[100%] p-[8px] text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none focus:border-black"
          id="email-input" />
        <a class="text-[12px] text-[#1db954] underline" href="#!">Usar número de telefone.</a>
      </div>

      <div class="mb-[15px]">
        <label class="font-bold" for="password-input">Crie uma senha</label>
        <input type="password"
          class="w-[100%] p-[8px] text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none focus:border-black" />
      </div>

      <div class="mb-[15px]">
        <label class="font-bold" for="email-input">Como devemos chamar você?</label>
        <input type="text"
          class="w-[100%] p-[8px] text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none focus:border-black" />
        <p class="text-[12px]">Isso aparece no seu perfil.</p>
      </div>

      <div class="mb-[15px] font-bold">
        <label for="date-container">Qual sua data de nascimento?</label>

        <div class="flex justify-center mt-[5px]" name="date-container">
          <div class="flex flex-col mr-[20px]">
            <label for="day-input">Dia</label>
            <input type="text"
              class="w-[100px] font-normal p-[8px] outline-none border-2 border-solid border-[#cccccc] rounded-[3px] focus:border-black"
              name="day-input" placeholder="DD" maxlength="2" />
          </div>

          <div class="flex flex-col mr-[20px]">
            <label for="month-input">Mês</label>
            <select class="w-[150px] h-[44px] p-[8px] font-normal outline-none border-2 border-solid border-[#cccccc] rounded-[3px] bg-white focus:border-black
" name="months">
              <option value="janeiro">janeiro</option>
              <option value="fevereiro">fevereiro</option>
              <option value="março">março</option>
              <option value="abril">abril</option>
              <option value="maio">maio</option>
              <option value="junho">junho</option>
              <option value="julho">julho</option>
              <option value="agosto">agosto</option>
              <option value="setembro">setembro</option>
              <option value="outubro">outubro</option>
              <option value="novembro">novembro</option>
              <option value="dezembro">dezembro</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="year-input">Ano</label>
            <input type="text"
              class="w-[100%] p-[8px] font-normal outline-none border-2 border-solid border-[#cccccc] rounded-[3px]"
              placeholder="AAAA" name="year-input" maxlength="4" />
          </div>
        </div>
      </div>

      <label class="font-bold" for="gender-container">Qual é o seu gênero?</label>
      <div class="flex space-x-5 my-5" id="gender-container">
        <div class="flex items-center">
          <input class="mr-2" type="radio" name="gender" value="Masculino" id="male-option" />
          <label class="text-[12px]" for="male-option">Masculino</label>
        </div>

        <div class="flex items-center">
          <input class="mr-2" type="radio" name="gender" value="Feminino" id="female-option" />
          <label class="text-[12px]" for="female-option">Feminino</label>
        </div>

        <div class="flex items-center mr-20">
          <input class="mr-2" type="radio" name="gender" value="Prefiro não informar" id="none-option" />
          <label class="text-[12px]" for="none-option">Prefiro não informar</label>
        </div>
      </div>


      <div class="  w-[100%] flex flex-col">
        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label>Não quero receber mensagens de marketing do Spotify
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label>Compartilhar meus dados cadastrais com os provedores de conteúdo
            do Spotify para fins de marketing.
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label>
            Eu concordo com os <span class="text-[#1db954] underline">Termos e Condições de Uso do Spotify</span>.
          </label>
        </div>
      </div>

      <p class="text-[10px] text-center">
        Para saber mais sobre como o Spotify coleta, utiliza, compartilha e
        protege seus dados pessoais, leia a
        <span class="text-[#1db954]">Política de Privacidade do Spotify</span>.
      </p>

      <button type="button"
        class="border-none rounded-[25px] py-[15px] px-[40px] bg-[#1db954] text-[15px] font-bold w-[50%] m-auto my-[20px] hover:scale-[1.04]">
      Inscrever-se
    </button>

    <h6 class="text-center">
      Já tem uma conta?
      <router-link class="text-[#1db954]" to="/login">Faça login</router-link>
    </h6>
  </form>
</main></template>
