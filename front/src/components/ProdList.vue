<template>
  <ul 
    class="prod-list"
    :class="{'edit-list-active': isListEdit}"
  >
    <prod-item
      v-for="item in filterSearch"
      :key="item.id"
      :item="item"
    ></prod-item>
  </ul>
</template>

<script>
import { mapGetters } from "vuex"
import ProdItem from './ProdItem.vue'

export default {
  name: 'ProdList',
  components: {
    ProdItem
  },

  computed: {
    ...mapGetters([
      'getProdList',
      'getSearchText',
      'isListEdit'
    ]),

    filterSearch() {
      const searchStr = this.getSearchText

      if (searchStr === '') {
        return this.getProdList
      } else {
        return this.getProdList.filter(item => {
          const stringPosition = item.title.search(searchStr)
          return stringPosition !== -1
        })
      }
    }
  }
}
</script>
