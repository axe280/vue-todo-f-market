<template>
  <div 
    v-if="isOverlay"
    class="overlay"
  ></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Overlay',

  computed: {
    ...mapGetters(['isOverlay'])
  },
}
</script>
