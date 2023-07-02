<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable max-len -->
<template>
    <div class="flex flex-row-screen justify-center items-center">
      <div class="flex flex-col items-center py-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Bonnie Green
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Marchand</span>
        <dl
          class="p-4 max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
        >
          <div class="flex flex-col pb-3" v-for="info in infos">
            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
              {{ info.infoName }}
            </dt>
            <dd class="text-lg font-semibold">{{ info.content }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      infos: [
        {
          infoName: 'Prénom',
          content: 'John',
        },
        {
          infoName: 'Nom',
          content: 'Doe',
        },
        {
          infoName: 'Nom de société du marchand',
          content: 'Infosec Company',
        },
        {
          infoName: 'kbis',
          content: '?',
        },
        {
          infoName: 'Devise',
          content: 'Euros',
        },
        {
          infoName: 'Info de contact',
          content: 'johnemail@gmail.com',
        },
      ],
    };
  },
  methods: {},
};
</script>
