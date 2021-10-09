<template>
  <Layout>
    <g-image :src="$page.imgPost.image" />
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post: imgPost (id: $id) {
    image (width: 720, height: 200, quality: 90)
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