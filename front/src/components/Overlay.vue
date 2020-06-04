<template>
  <transition name="fade">
    <div 
      v-if="isOverlay"
      class="overlay"
    ></div>
  </transition>
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
