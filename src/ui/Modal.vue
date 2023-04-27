<script setup>
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
const props = defineProps({
  modalId: String,
  textContent: String,
  isChecked: Function,
});

onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <div
    :id="props.modalId"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
  >
    <div class="relative w-full h-full max-w-md md:h-auto">
      <div
        class="relative bg-[#ffffff8b] backdrop-blur-sm rounded-lg shadow dark:bg-gray-700"
      >
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          :data-modal-hide="props.modalId"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6">
          <h3
            class="mb-8 text-lg text-gray-700 font-semibold dark:text-gray-400"
          >
            {{ textContent }}
          </h3>
          <button
            @click="(e) => props.isChecked(true)"
            :data-modal-hide="props.modalId"
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Ha
          </button>
          <button
            @click="(e) => props.isChecked(false)"
            :data-modal-hide="props.modalId"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Yo'q
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
