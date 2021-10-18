<template>
  <Layout>
    <div v-html="$page.blogPost.content"/>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  blogPost(id: $id) {
    title
    content
    tag
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blogPost.title,
    }
  }
};
</script>