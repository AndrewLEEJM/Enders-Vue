<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { http } from '@/utils/http';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    this.getBranch();
  },
  methods: {
    async getBranch() {
      console.log('gdgd', http);
    },
  },
};
</script>
