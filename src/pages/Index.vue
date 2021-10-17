<template>
  <Layout>
    <ul v-for="edge in this.$page.allBlogPost.edges" :key="edge.node.id">
      <li>
        <g-link :to="edge.node.path">{{edge.node.title}}</g-link>
      </li>
    </ul>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!-- <g-image alt="Example image" src="~/imgs/Target.png" width="1000px" /> -->

    <!-- <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p> -->
    
  </Layout>
</template>

<page-query>
query {
  allBlogPost {
    edges {
      node {
        path,
        title,
        tag
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    console.log(this.$page.allBlogPost.edges)
    return {
      list: this.$page.allBlogPost.edges
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
