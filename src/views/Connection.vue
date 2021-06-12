<template>
  <div class='connection'>
    <h1> Presence status : </h1>
    <Presence/>
  </div>
</template>

<script>
// @ is an alias to /src
import Presence from '@/components/Presence.vue'

export default {
  name: 'Connection',
  components: {
    Presence
  }
}
</script>