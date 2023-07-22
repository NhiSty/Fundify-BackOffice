<!-- eslint-disable max-len -->
<script setup>
import { onMounted, ref } from 'vue';

let isLoggedIn = ref(false);

onMounted(() => {
  if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('token='))) {
    isLoggedIn.value = true;
    console.log('Navbar is ' + isLoggedIn.value);
  } else {
    isLoggedIn.value = false;
    console.log('Navbar is ' + isLoggedIn.value);
  }
});

const logout = async () => {
  // Send a get request to the server to logout the user
  const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/auth/logout', {
    method: 'GET',
    credentials: 'include',
  });
  if (response.ok) {
    isLoggedIn.value = false;
    console.log('Navbar is ' + isLoggedIn.value);
    window.location.href = '/';
  } else {
    console.log('Une erreur est survenue');
  }
};
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a href="/" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Fundify</span
          >
        </a>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="/"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
                >Accueil</a
              >
            </li>
            <li>
              <!-- Dropdown menu -->
              <div
                id="dropdownNavbar"
                class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="/dashboard"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Dashboard</a
                    >
                  </li>

                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Earnings</a
                    >
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >Sign out</a
                  >
                </div>
              </div>
            </li>
            <li>
              <a
                href="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Produits</a
              >
            </li>
            <li>
              <a
                href="/register"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                v-if="!isLoggedIn"
                >Inscription</a
              >
            </li>
            <li>
              <a
                href="/login"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                v-if="!isLoggedIn"
                >Connexion</a
              >
            </li>
            <li>
              <button
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                v-if="isLoggedIn"
                v-on:click.prevent="logout()"
                >Déconnexion</button
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
