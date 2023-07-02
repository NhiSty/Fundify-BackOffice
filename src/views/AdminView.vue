<script setup>
import { ref } from 'vue';

const marchands = ref([
  { name: 'John', lastname: 'Doe', status: 'Validé' },
  { name: 'Jane', lastname: 'Smith', status: 'En attente de probation' },
  { name: 'John', lastname: 'Doe', status: 'Validé' },
  { name: 'Jane', lastname: 'Smith', status: 'En attente de probation' },
]);
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h2 class="my-2 text-2xl">Page admin</h2>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Nom</th>
          <th scope="col" class="px-6 py-3">Prénom</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marchand in marchands"
            v-bind:key="marchand"
            class="bg-white border-b dark:bg-gray-800
            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

          <th scope="row" class="px-6 py-4 text-gray-900 whitespace-nowrap">
            {{ marchand.lastname }}
          </th>
          <td class="px-6 py-4">{{ marchand.name }}</td>
          <td class="px-6 py-4">{{ marchand.status }}</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Modifier</a
            >
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white
            border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700
             dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
             dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293
                 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white
             border border-gray-300 hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
               dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white
             border border-gray-300 hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
               dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="z-10 px-3 py-2 leading-tight text-blue-600 border
             border-blue-300 bg-blue-50 hover:bg-blue-100
              hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white border
             border-gray-300 hover:bg-gray-100 hover:text-gray-700
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
               dark:hover:bg-gray-700 dark:hover:text-white"
            >...</a
          >
        </li>
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white border
            border-gray-300 hover:bg-gray-100 hover:text-gray-700
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
             dark:hover:bg-gray-700 dark:hover:text-white"
            >100</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-3 py-2 leading-tight text-gray-500 bg-white border
            border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
             dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293
                 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
