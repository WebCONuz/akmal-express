<template>
  <div>
    <button :type="props.type" class="h-[50px] px-6">
      {{ props.text }}
    </button>
  </div>
</template>
<script setup>
const props = defineProps(["text", "type"]);
</script>
<style lang=""></style>
