<template>
  <section class="card-container">
    <a class="card" :href="item.url" v-for="item in menu" ::key="item.url">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </a>
  </section>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const menu = ref([
      { name: '数据结构与算法', url: '/data-structure/', description: '用JavaScript实现数据结构' },
      { name: '浏览器', url: '/browser/', description: '浏览器相关知识' },
      { name: '网络', url: '/network/', description: '网络' },
    ])
    return { menu }
  },
});
</script>

<style lang="scss">
.card-container {
  margin-left: -1rem;
  margin-right: -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition-property: color, background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.card {
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: 30%;
  }
}
</style>
