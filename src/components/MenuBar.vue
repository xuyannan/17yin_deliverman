<template>
  <div style="padding-top: 15px;">
    <div class="row yin-menubar nomargin">
      <div class="col-md-12 col-xs-12 nopadding">
        <p><i @click="toggleMenu()" class="glyphicon glyphicon-menu-hamburger"></i><span class="yin-page-title">{{$route.title}}</span></p>
      </div>
    </div>
  </div>

</template>
<script>
  var $ = require('jquery')
  export default {
    methods: {
      toggleMenu: function () {
        $('#wrapper').toggleClass('toggled')
      }
    }
  }
</script>
<style>
  .yin-menubar {border-bottom: 1px solid #eee; padding:0 8px;}
  .yin-page-title {margin-left: 1em; line-height: 20px; height: 20px;}
</style>
