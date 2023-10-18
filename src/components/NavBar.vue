<template lang="">
  <!-- Main navigation container -->
  <header class="sticky top-0 shadow-lg min-h-16">
    <nav class="bg-black lg:py-5 px-4">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <!-- Hamburger button for mobile view -->
        <button
          class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <!-- Hamburger icon -->
          <span class="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-7 w-7">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>

        <!-- Collapsible navigation container -->
        <div
          class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item>
          <!-- Logo -->
          <router-link
            class="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:pl-10 lg:mb-0 lg:mt-0"
            to="/">
            <img
              src="../assets/logos/logospotifyBranca.png"
              style="height: 42px"
              alt="Spotify Logo"
              loading="lazy" />
          </router-link>
          
          <ul
            class="list-style-none ml-auto flex flex-col pl-0 lg:flex-row"
            data-te-navbar-nav-ref>
            <li class="mb-4 lg:mb-0 lg:pr-2 nav-text" data-te-nav-item-ref>
              <router-link
                  to="/recomendations"
                  class="text-white lg:px-1 text-lg font-bold"
                  data-te-nav-link-ref
                >
                Web Player
                </router-link>
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2 nav-text" data-te-nav-item-ref>
              <router-link
              to="/faq"
              class="text-white lg:px-1 text-lg font-bold"
              data-te-nav-link-ref
              >
              FAQ
            </router-link>
          </li>
          <li class="mb-4 lg:mb-0 nav-text" data-te-nav-item-ref>
            <router-link
              to="/register"
              class="text-white lg:px-1 text-lg font-bold"
              data-te-nav-link-ref
            >
            Cadastro
            </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
  .nav-text a:hover {
    color: rgb(147 51 234 / var(--tw-text-opacity));
  }
</style>
