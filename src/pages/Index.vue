<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">学习计算机笔记</h2>
          <p class="text-xl font-medium text-center">
            好记性不如烂笔头
            <br />
            <!-- <strong class="text-ui-primary">Got a minute?</strong> -->
          </p>
        </div>
        <!-- <h1 class="text-4xl text-center lg:text-5xl">
          Great Documentation starts here.
        </h1>
        <p class="text-xl font-medium text-center">
          Perfect Lighthouse score out of the box. Easy to set-up. Dark mode included.
          <br>
          <strong class="text-ui-primary">Got a minute?</strong>
        </p>

        <div class="py-4">
          <code class="block px-4 py-1 select-all bg-ui-border text-ui-typo">gridsome create your-project https://github.com/mrcrmn/docc</code>
        </div>

        <div class="flex justify-center mt-8">
          <g-link
            to="/docs/"
            class="flex items-center px-6 py-4 ml-auto text-2xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
          >
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>

        <p class="mt-8 text-center">
          Open Source. MIT License. <span class="border-b border-dashed border-ui-primary text-ui-primary">Make it your own</span>.
        </p>-->
      </div>

      <div
        class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"
      ></div>

      <div class="flex flex-wrap justify-center -mx-4">
        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <CodeIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">代码片段</h3>
          <p class="text-lg text-left">个人代码记录库</p>
        </g-link>

        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <ChromeIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">浏览器</h3>
          <p class="text-lg text-left">浏览器相关知识</p>
        </g-link>

        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <WifiIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">网络</h3>
          <p class="text-lg text-left">网络</p>
        </g-link>

        <g-link
          to="/data-structure/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <MapIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">数据结构</h3>
          <p class="text-lg text-left">用JavaScript实现数据结构</p>
        </g-link>

        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <HashIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">算法</h3>
          <p class="text-lg text-left">记录刷LeetCode的笔记</p>
        </g-link>

        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <CoffeeIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">JS</h3>
          <p class="text-lg text-left">深入理解JavaScript</p>
        </g-link>

        <g-link
          to="/code-snippet/"
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3"
        >
          <TriangleIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary pt-8">vue</h3>
          <p class="text-lg text-left">主要是阅读vue源码笔记</p>
        </g-link>

        <!-- <div class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/3">
          <MoonIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">Lights out</h3>
          <p
            class="text-lg text-left"
          >Working late at night again? Enable dark mode with the click of a button.</p>
        </div>-->
      </div>
    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ChromeIcon, CodeIcon, CoffeeIcon, HashIcon, MapIcon, MoonIcon, SearchIcon, TriangleIcon, WifiIcon, ZapIcon } from 'vue-feather-icons';

export default {
  components: {
    CodeIcon,
    ChromeIcon,
    WifiIcon,
    MapIcon,
    HashIcon,
    CoffeeIcon,
    TriangleIcon,

    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    MoonIcon,
    SearchIcon
  },

  metaInfo() {
    const title = 'Great Documentation starts here';
    const description = 'DOCC is a starter theme with instant search and dark mode for writing great technical documentation. Based on Gridsome!';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ]
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
