<template>
  <div>{{ name }}</div>
</template>
<script setup>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const name = ref("test");
  },
});
</script>
