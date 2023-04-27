<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  inputID: String,
  inputClass: String,
  send: String,
});
</script>

<template>
  <div class="w-[24%]">
    <label :for="props.inputID" class="">
      <p class="mb-4">{{ props.text }}</p>
      <input
        :type="props.type"
        :id="props.inputID"
        :placeholder="props.placeholder"
        class="w-full h-[50px] border border-[#aaaaaa] outline-none rounded-[3px] dark:bg-gray-700 dark:text-white"
        :class="props.inputClass"
        :value="props.send"
        @input="(e) => $emit('getDataFromInput', e.target.value)"
      />
    </label>
  </div>
</template>

<style lang=""></style>
