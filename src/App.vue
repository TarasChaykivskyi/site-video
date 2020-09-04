<template>
  <div id="app">
    <div class="top-site"></div>
    <video-page />
    <div class="bottom-site"></div>
  </div>
</template>

<script>
import VideoPage from './components/video-page'

export default {
  name: 'App',
  components: {
    VideoPage
  }
}
</script>

<style>
  @import "~bootstrap/dist/css/bootstrap.min.css";
  @import "~bootstrap-vue/dist/bootstrap-vue.min.css";
</style>
