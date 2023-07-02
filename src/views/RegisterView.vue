<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable max-len -->
<template>
    <form name="login-form" class="max-w-sm mx-auto">
      <h2 class="my-2 text-2xl">Inscription</h2>

      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700">Nom <span style="color: red;">*</span></label>
        <input
          type="text"
          id="username"
          v-model="input.username"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom  <span style="color: red;">*</span></label>
        <input
          type="text"
          id="firstName"
          v-model="input.firstName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="companyName" class="block text-sm font-medium text-gray-700">Societé  <span style="color: red;">*</span></label>
        <input
          type="text"
          id="companyName"
          v-model="input.companyName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="kBis" class="block text-sm font-medium text-gray-700">KBIS  <span style="color: red;">*</span></label>
        <input
          type="text"
          id="kBis"
          v-model="input.kBis"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="devise" class="block text-sm font-medium text-gray-700">Devise  <span style="color: red;">*</span></label>
        <input
          type="text"
          id="devise"
          v-model="input.devise"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe <span style="color: red;">*</span></label>
        <input
          type="password"
          id="password"
          v-model="input.password"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmez le mot de passe <span style="color: red;">*</span></label>
        <input
          type="confirmPassword"
          id="confirmPassword"
          v-model="input.confirmPassword"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <button
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        v-on:click.prevent="login()">
        Login
      </button>

    </form>
    <h3 class="text-lg text-center font-medium text-red-600 mt-8">
      {{ this.output }}
    </h3>
  </template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: '',
        firstName: '',
        password: '',
        companyName: '',
        kBis: '',
        devise: '',
        confirmPassword: '',
      },
      output: '',
    };
  },
  methods: {
    login() {
      // make sure username OR password are not empty
      if (this.input.username !== '' || this.input.firstName !== '' || this.input.password !== ''
          || this.input.companyName !== '' || this.input.kBis !== '' || this.input.devise !== ''
          || this.input.confirmPassword !== '') {
        this.output = 'Authentication complete';
        this.$router.push('/home');
      } else {
        this.output = 'Certains champs ne sont pas renseignés';
      }
    },
  },
};
</script>
