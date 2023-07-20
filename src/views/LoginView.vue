<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable max-len -->
<template>
    <form name="login-form" class="max-w-sm mx-auto">
      <h2 class="my-2 text-2xl">Connexion</h2>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Username:</label
        >
        <input
          type="text"
          id="username"
          v-model="input.username"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password:</label
        >
        <input
          type="password"
          id="password"
          v-model="input.password"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        v-on:click.prevent="login()"
      >
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
        password: '',
      },
      output: '',
    };
  },
  methods: {
    login() {
      // make sure username OR password are not empty
      if (this.input.username !== '' || this.input.password !== '') {
        this.output = 'Authentication complete';
        this.$router.push('/');
      } else {
        this.output = 'Nom / Mot de passe incorrect !';
      }
    },
  },
};
</script>
