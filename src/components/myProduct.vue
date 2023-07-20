<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const addToCart = () => {
  const product = {
    title: props.title,
    description: props.description,
    price: props.price,
  };

  store.dispatch('setProduct', product);
  router.push('/cart');
};
</script>

<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200
     rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img
        class="p-8 rounded-t-lg"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal.webstorage.gr%2FProduct-Images%2F1421066%2Fiphone11-black-1000-1421066.jpg&f=1&nofb=1&ipt=ecf1760f540b8ba823b6105f207c085e32aaf8164be7263966f6c3bc327d1dce&ipo=images"
        alt="product image"
      />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5
          class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
        <p>{{ description }}</p>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>First star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
             00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
              00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
               1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Second star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
             00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
              00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
               1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Third star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
             00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
              00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
               1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Fourth star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
             00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
              00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
               1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Fifth star</title>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
             00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
              00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
               1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1
                 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold
           mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
          >5.0</span
        >
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white"
          >${{ price }}</span
        >
        <a
          href="#"
          @click="addToCart"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
           focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center dark:bg-blue-600
             dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Acheter</a
        >
      </div>
    </div>
  </div>
</template>
