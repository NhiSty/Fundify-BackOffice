<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable max-len -->
<template>
    <form name="login-form" class="max-w-sm mx-auto">
      <h2 class="my-2 text-2xl">Inscription Marchand</h2>

      <div class="mb-4">
        <label for="companyName" class="block text-sm font-medium text-gray-700">Nom de l'entreprise <span style="color: red;">*</span></label>
        <input
          type="text"
          id="companyName"
          v-model="input.companyName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="kbis" class="block text-sm font-medium text-gray-700">KBIS <span style="color: red;">*</span></label>
        <input
          type="text"
          id="kbis"
          v-model="input.kbis"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="contactLastName" class="block text-sm font-medium text-gray-700">Nom <span style="color: red;">*</span></label>
        <input
          type="text"
          id="contactLastName"
          v-model="input.contactLastName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="contactFirstName" class="block text-sm font-medium text-gray-700">Prénom <span style="color: red;">*</span></label>
        <input
          type="text"
          id="contactFirstName"
          v-model="input.contactFirstName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="contactEmail" class="block text-sm font-medium text-gray-700">Email <span style="color: red;">*</span></label>
        <input
          type="email"
          id="contactEmail"
          v-model="input.contactEmail"
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
        <label for="contactPhone" class="block text-sm font-medium text-gray-700">Numéro de téléphone<span style="color: red;">*</span></label>
        <input
          type="tel"
          id="contactPhone"
          v-model="input.contactPhone"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="confirmationRedirectUrl" class="block text-sm font-medium text-gray-700">Url de confirmation<span style="color: red;">*</span></label>
        <input
          type="text"
          id="confirmationRedirectUrl"
          v-model="input.confirmationRedirectUrl"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="cancellationRedirectUrl" class="block text-sm font-medium text-gray-700">Url d'annulation<span style="color: red;">*</span></label>
        <input
          type="text"
          id="cancellationRedirectUrl"
          v-model="input.cancellationRedirectUrl"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
      </div>

      <div class="mb-4">
        <label for="currency" class="block text-sm font-medium text-gray-700">Devise<span style="color: red;">*</span></label>
        <select
          id="currency"
          v-model="input.currency"
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="EUR" selected>EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <button
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        v-on:click.prevent="register()">
        Register
      </button>

    </form>
    <h3 class="text-lg text-center font-medium text-red-600 mt-8">
      {{ this.output }}
    </h3>
  </template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      input: {
        companyName: '',
        kbis: '',
        contactLastName: '',
        contactFirstName: '',
        contactEmail: '',
        password: '',
        contactPhone: '',
        confirmationRedirectUrl: '',
        cancellationRedirectUrl: '',
        currency: '',
      },
      output: '',
    };
  },
  methods: {
    async register() {
      // Make sure all fields are filled
      if (!this.input.companyName || !this.input.kbis || !this.input.contactLastName || !this.input.contactFirstName || !this.input.contactEmail || !this.input.password || !this.input.contactPhone || !this.input.confirmationRedirectUrl || !this.input.cancellationRedirectUrl || !this.input.currency) {
        this.output = 'Veuillez remplir tous les champs';
        console.log(this.input);
        return;
      }

      // Send a POST request to your server to login the user
      const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/auth/merchant/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.input),
      });

      if (response.ok) {
        this.output = 'Inscription réussie !';
        this.$router.push('/merchant/login');
      } else if (response.status === 409) {
        this.output = 'Cet email est déjà utilisé';
      } else {
        this.output = 'Une erreur est survenue';
      }
    },
  },
};
</script>
