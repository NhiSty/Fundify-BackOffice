<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable max-len -->
<template>
  <form name="login-form" class="max-w-sm mx-auto">
    <h2 class="my-2 text-2xl">Connexion marchand</h2>
    <div class="mb-4">
      <label for="contactEmail" class="block text-sm font-medium text-gray-700"
        >Email:</label
      >
      <input
        type="contactEmail"
        id="contactEmail"
        v-model="input.contactEmail"
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
  <h3 class="text-lg text-center font-medium text-red-600 mt-8" v-if="this.output">
    {{ this.output }}
  </h3>
</template>

<script>
export default {
  name: 'MerchantLoginView',
  data() {
    return {
      input: {
        contactEmail: '',
        password: '',
      },
      output: '',
    };
  },
  methods: {
    async login() {
      // Make sure all fields are filled
      if (!this.input.contactEmail || !this.input.password) {
        this.output = 'Veuillez remplir tous les champs';
        console.log(this.input);
        return;
      }

      // Send a POST request to your server to login the user
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/merchant/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.input),
        credentials: 'include',
      });

      if (response.ok) {
        this.output = 'Connexion réussie !';
        this.$router.push('/');
      } else if (response.status === 401) {
        this.output = 'Email ou mot de passe incorrect';
      } else {
        this.output = 'Une erreur est survenue';
      }
    },
  },
};
</script>
