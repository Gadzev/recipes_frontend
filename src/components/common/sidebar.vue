<template>
  <div class="sidebar" v-if="userIsLoggedIn && renderSidebar">
    <div class="logo logo-sm"></div>
    <div class="menu-items">

      <section class="nav-section">
        <ul>
          <li>
            <router-link :to="{name: 'home'}">Home</router-link>
          </li>

          <li>
            <router-link :to="{name: 'create'}">Create Recipe</router-link>
          </li>
        </ul>
      </section>

      <section class="nav-section">
        <ul>
          <li @click="logout">
            <a class="icon-life-buoy">Logout</a> 
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import { getCookie, removeCookie } from 'tiny-cookie'
  import { mapGetters } from 'vuex'

  export default {

    data() {
      return {
        renderSidebar: true
      }
    },

    methods: {
      logout () {
          removeCookie('RECIPES_AUTH')
          this.renderSidebar = false
          this.$router.push({ name: 'login', query: {redirect: 'home'} })
      }
    },

    computed: {
      ...mapGetters({
        user: 'auth/currentUser'
      }),

      userIsLoggedIn() {
        this.renderSidebar = true
        return this.user != null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/_vars.scss';

  .sidebar {
    width: $sidebar-width;
    height: 100%;
    background: #161A1F;
    color: $white;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: fixed;
    top: 0;
    left: 0;
  }
  a {
    padding: 13px $pad;
    display: block;
    color: $color-light;
    font-size: 15px;
    font-weight: $font-weight-semi;

    &:hover {
      color: $white;
    }
  }
  h5 {
    padding-left: $pad;
    padding-bottom: 8px;
    margin-bottom: 0;
  }
  .logo {
    margin: $pad;
    flex-shrink: 0;
  }
 
  .menu-items {
    overflow-x: hidden;
    overflow-y: auto;

    


    &::-webkit-scrollbar-track
    {
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      // border-radius: 10px;
      // background-color: red;

      background: transparent;


    }

    &::-webkit-scrollbar
    {
      // width: 12px;
      // background-color: #F5F5F5;

      // background: red;

      background: transparent;

      width: 4px;
    }

    &::-webkit-scrollbar-thumb
    {
      // border-radius: 10px;
      // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      // background-color: #555;

      // width: 6px;

      // border-radius: 4px;
      background-color: $color-brand;


      // background: orange;
    }





  }
  .nav-section {
    margin-bottom: 16px;
  }
  [class^="icon-"], [class*=" icon-"] {
    margin-right: 4px;
  }
  .active {
    box-shadow: inset 3px 0 0 $color-brand;
    background: rgba(0,0,0,0.3);

    > a {
      color: $white;
    }
  }
</style>