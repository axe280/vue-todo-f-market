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
        class="btn btn_lg btn_max"
        @click="sendData"
        :disabled="sending"
      >
        {{ sending ? 'Sending...' : 'Update list' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  name: 'BottomPanel',

  data() {
    return {
      sending: false
    }
  },

  computed: {
    ...mapGetters(['getProdList'])
  },

  methods: {
    ...mapActions(['addNotificationTiming']),
    ...mapMutations([
        'editList',
        'clearSearchText'
      ]),

    async sendData() {
      this.sending = true

      try {

        const response = await fetch('http://192.168.0.101:3000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.getProdList)
        })

        const message = await response.text()

        this.editList(false)
        this.clearSearchText()

        this.addNotificationTiming({
          status: 'success',
          message
        })

      } catch {

        this.addNotificationTiming({
          status: 'error',
          message: 'Error'
        })

      }

      this.sending = false
    }
  },
}
</script>
