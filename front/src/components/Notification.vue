<template>
  <div class="notifications">
    <div
      v-for="item in getNotifications"
      :key="item.id"
      class="notification-item"
      :class="item.status"
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Notification',

  computed: {
    ...mapGetters(['getNotifications'])
  }
}
</script>
