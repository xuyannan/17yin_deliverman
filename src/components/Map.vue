<template>
  <div class="container">
    <h5>{{query}}</h5>
  </div>

  <div id="map" style="width: 100%; height: 100%"><div>
</template>
<script>
export default {
  data: function () {
    return {
      query: undefined
    }
  },
  created: function () {
    let query = this.$route.params.query
    this.query = query
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=jscginsPhRMiZeZUQwIkW6WD&callback=initMap'
    window.initMap = function () {
      let BMap = window.BMap
      let map = new BMap.Map('map')
      map.centerAndZoom(new BMap.Point(113.922871, 22.740285), 15)
      let local = new window.BMap.LocalSearch(map, {
        renderOptions: {
          map: map
        }
      })
      local.search(query)
    }
    window.document.body.appendChild(script)
  }
}
</script>

<style>

</style>
