<template>
  <div class="main-input">
    <input
      type="text"
      placeholder="Find or create product"
      :value="getSearchText"
      @input="inputHandler"
      @keydown="keydownHandler"
      @focus="focusHandler"
    >
    <button
      type="button"
      class="add-button color_base"
      @click="checkCreateProduct"
    >Add</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  name: 'InputMain',

  computed: {
    ...mapGetters(['getSearchText'])
  },

  methods: {
    ...mapMutations([
      'inputSearchText',
      // 'createProduct',
      'clearSearchText',
      'editList'
    ]),

    ...mapActions(['checkCreateProduct']),

    focusHandler() {
      this.clearSearchText(),
      this.editList(false)
    },

    inputHandler(event) {
      const str = event.target.value.trim().toLowerCase()
      this.inputSearchText(str)
    },

    keydownHandler(event) {
      if (event.code === 'Enter') {
        this.checkCreateProduct()
      }
    }
  },
}
</script>
