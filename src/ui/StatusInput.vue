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
  value: String,
  inputClass: String,
  elmWidth: String,
  disabledValue: Boolean,
});
</script>

<template>
  <div :class="props.elmWidth">
    <label :for="props.inputID">
      <p class="mb-4">{{ props.text }}</p>
      <input
        :type="props.type"
        :id="props.inputID"
        :placeholder="props.placeholder"
        :value="props.value"
        class="w-full h-[50px] border text-[#4f4e4e] font-bold border-[#aaaaaa] outline-none rounded-[3px] uppercase"
        :class="props.inputClass"
        :disabled="props.disabledValue"
      />
    </label>
  </div>
</template>

<style lang=""></style>
