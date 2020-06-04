<template>
  <transition-group 
    tag="div"
    name="notice"
    class="notifications"
  >
    <div
      v-for="item in getNotifications"
      :key="item.id"
      class="notification-item"
      :class="item.status"
    >
      {{ item.message }}
      <span class="notification-item__icon"></span>
    </div>
  </transition-group>
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
