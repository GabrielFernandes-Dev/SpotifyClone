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
        <input type="text"
          class="w-[100%] text-black p-[8px] text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none"
          id="email-input" />
        <a class="text-[12px] text-purple-100 font-bold underline" href="#!">Usar número de telefone.</a>
      </div>

      <div class="mb-[15px]">
        <label class="font-bold text-white" for="password-input">Crie uma senha</label>
        <input type="password"
          class="w-[100%] p-[8px] text-black text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none" />
      </div>

      <div class="mb-[15px]">
        <label class="font-bold text-white" for="email-input">Como devemos chamar você?</label>
        <input type="text"
          class="w-[100%] p-[8px] text-black text-[14px] rounded-[3px] border-2 border-solid border-[#cccccc] focus:outline-none" />
        <p class="text-[12px] text-white font-bold">Isso aparece no seu perfil.</p>
      </div>

      <div class="mb-[15px] text-white">
        <label class="font-bold" for="date-container">Qual sua data de nascimento?</label>

        <div class="flex justify-center mt-[5px]" name="date-container">
          <div class="flex flex-col mr-[20px]">
            <label class="font-bold" for="day-input">Dia</label>
            <input type="text"
              class="w-[100px] text-black font-normal p-[8px] outline-none border-2 border-solid border-[#cccccc] rounded-[3px]"
              name="day-input" placeholder="DD" maxlength="2" />
          </div>

          <div class="flex flex-col mr-[20px]">
            <label class="font-bold" for="month-input">Mês</label>
            <select class="w-[150px] text-black h-[44px] p-[8px] font-normal outline-none border-2 border-solid border-[#cccccc] rounded-[3px] bg-white
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
            <label class="font-bold" for="year-input">Ano</label>
            <input type="text"
              class="w-[100%] text-black p-[8px] font-normal outline-none border-2 border-solid border-[#cccccc] rounded-[3px]"
              placeholder="AAAA" name="year-input" maxlength="4" />
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
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label class="font-bold text-white">Não quero receber mensagens de marketing do Spotify
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label class="font-bold text-white">Compartilhar meus dados cadastrais com os provedores de conteúdo
            do Spotify para fins de marketing.
          </label>
        </div>

        <div class="flex w-[100%] text-[12px] mb-[30px]">
          <input class="mr-2" type="checkbox" value="Masculino" />
          <label class="font-bold text-white">
            Eu concordo com os <span class="text-purple-100 underline">Termos e Condições de Uso do Spotify</span>.
          </label>
        </div>
      </div>

      <p class="text-[10px] text-center font-bold text-white">
        Para saber mais sobre como o Spotify coleta, utiliza, compartilha e
        protege seus dados pessoais, leia a
        <span class="text-purple-100 underline font-bold">Política de Privacidade do Spotify</span>.
      </p>

      <button type="button"
        class="border-none rounded-[25px] py-[15px] px-[40px] bg-purple-400 text-[15px] font-bold w-[50%] m-auto my-[20px] hover:scale-[1.04] text-white">
        Inscrever-se
      </button>

      <h6 class="text-center text-white font-bold">
        Já tem uma conta?
        <router-link class="text-purple-100 font-bold underline" to="/login">Faça login</router-link>
      </h6>
    </form>
  </main>
</template>
