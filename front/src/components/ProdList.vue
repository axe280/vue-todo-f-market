<template>
  <div class="prod-list-wrapper">
    <loader v-if="loading"></loader>
    
    <transition-group
      tag="ul"
      name="prod-list"
      class="prod-list"
      :class="{'edit-list-active': isListEdit}"
    >
      <prod-item
        v-for="item in filterSearch"
        :key="item.id"
        :item="item"
      ></prod-item>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
import ProdItem from './ProdItem.vue'
import Loader from './Loader.vue'

export default {
  name: 'ProdList',
  components: {
    ProdItem,
    Loader
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters([
      'getSortProdList',
      'getSearchText',
      'isListEdit'
    ]),

    filterSearch() {
      const searchStr = this.getSearchText

      if (searchStr === '') {
        return this.getSortProdList
      } else {
        return this.getSortProdList.filter(item => {
          const stringPosition = item.title.search(searchStr)
          return stringPosition !== -1
        })
      }
    }
  },

  methods: {
    ...mapMutations(['addProducts']),
    ...mapActions(['addNotificationTiming']),

    test(list) {
      console.log(list);
    }
  },

  async mounted() {
    this.loading = true

    try {

      const data = await fetch('http://localhost:3000/api/products')
      const prodList = await data.json()
      this.addProducts(prodList)

    } catch {

      this.addNotificationTiming({
        status: 'error',
        message: `Products list hasn't been downloaded`
      })

    }
    
    this.loading = false
  }
}
</script>
