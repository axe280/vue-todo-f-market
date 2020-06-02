<template>
  <div class="bottom-fix">
    <div class="container">
      <button 
        class="edit-button"
        type="button"
        @click="editList(true)"
      >
        Edit grocery list
      </button>
      <button
        type="button"
        class="send-button color_base"
      >
        Update list
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  name: 'BottomPanel',

  methods: {
    ...mapMutations(['editList'])
  },
}
</script>
