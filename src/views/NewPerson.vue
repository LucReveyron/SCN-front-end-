<template>
<div>
<h2> Add new person to the database </h2>
<ul>
    <li>Take picture of your face with different angles and expressions.</li>
    <li>Please add and remove possible <strong>accessories</strong> you currently use.</li>
</ul>
<TakePicture/>
</div>
</template>

<script>
// @ is an alias to /src
import TakePicture from '@/components/TakePicture.vue'

export default {
  name: 'Connection',
  components: {
    TakePicture
  }
}
</script>