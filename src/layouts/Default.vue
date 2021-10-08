<template>
  <div class="layout">
    <header class="header">
      <div class="header_left">
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </div>
      <div class="header_right">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-right"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
      </div>
      
      <!-- <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav> -->
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: 'layout default'
  },
}
</script>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 var(--space);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}
.header_right svg:last-child {
  margin-left: 10px;
}
.nav__link {
  margin-left: 20px;
}
svg {
  cursor: pointer;
}

</style>
