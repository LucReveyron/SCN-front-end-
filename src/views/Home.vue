<template>
  <div class="home">
    <Map/>
    <CameraStatus/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'
import CameraStatus from '@/components/CameraStatus.vue'

export default {
  name: 'Home',
  components: {
    Map,CameraStatus
  }
}
</script>
