<template>
  <div class="p-4">
    <h2 class="my-2 text-2xl">Ajouter un administrateur</h2>
    <form name="login-form" class="max-w-sm mx-auto">
      <div class="mb-4">
        <label for="lastname" class="block text-sm font-medium text-gray-700">Nom <span style="color: red;">*</span></label>
        <input
          type="text"
          id="lastname"
          v-model="input.lastname"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <div class="mb-4">
        <label for="firstname" class="block text-sm font-medium text-gray-700">Prénom  <span style="color: red;">*</span></label>
        <input
          type="text"
          id="firstname"
          v-model="input.firstname"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email <span style="color: red;">*</span></label>
        <input
          type="email"
          id="email"
          v-model="input.email"
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
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmez le mot de passe<span style="color: red;">*</span></label>
        <input
          type="password"
          id="confirmPassword"
          v-model="input.confirmPassword"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>
      <button
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        v-on:click.prevent="register()">
        Register
      </button>
    </form>
    <h3 class="text-lg text-center font-medium text-red-600 mt-8" v-if="this.output">
      {{ this.output }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      input: {
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      output: '',
    };
  },
  methods: {
    async register() {
      // Make sure all fields are filled
      if (!this.input.lastname || !this.input.firstname || !this.input.email || !this.input.password || !this.input.confirmPassword) {
        this.output = 'Veuillez remplir tous les champs';
        console.log(this.input);
        return;
      }

      if (this.input.password !== this.input.confirmPassword) {
        this.output = 'Les mots de passe ne correspondent pas';
        console.log(this.input);
        return;
      }

      // Envoyer une requête POST à votre serveur pour inscrire l'utilisateur
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.input),
      });

      if (response.ok) {
        this.output = 'Inscription réussie !';
        this.$router.push('/login');
      } else if (response.status === 409) {
        this.output = 'Cet email est déjà utilisé';
      } else {
        this.output = 'Une erreur est survenue';
      }
    },
  },
};
</script>
