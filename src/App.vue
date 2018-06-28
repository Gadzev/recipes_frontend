<template>
  <div id="app">
    <div class="recipes">
      <sidebar></sidebar>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/common/sidebar'

export default {
  name: 'app',

  components: {
    'sidebar': Sidebar
  }
}
</script>

<style lang="scss">
  @import './assets/styles/_global.scss';

  .recipes {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .content {
    margin-left: $sidebar-width;
  }
</style>
