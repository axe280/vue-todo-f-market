<template>
  <main
    class="container"
  >
    <overlay></overlay>
    <notification></notification>

    <div class="logo">
      <a href="/"><img src="./assets/img/logo_transparent.png" alt=""></a>
    </div>

    <input-main></input-main>
    <prod-list></prod-list>
    <bottom-panel></bottom-panel>
  </main>
</template>

<script>
import InputMain from './components/InputMain.vue'
import ProdList from './components/ProdList.vue'
import BottomPanel from './components/BottomPanel.vue'
import Overlay from './components/Overlay.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  components: {
    InputMain,
    ProdList,
    BottomPanel,
    Overlay,
    Notification
  }
}
</script>
