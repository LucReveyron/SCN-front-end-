<template>
  <div class="Stream">
    <Camera/>
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import Camera from '@/components/Camera.vue'

export default {
  name: 'Stream',
  components: {
    Map,Camera
  }
}
</script>

