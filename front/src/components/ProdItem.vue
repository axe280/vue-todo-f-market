<template>
  <li 
    class="prod-item"
    :class="{checked: item.checked}"
    @click.self="checkItem(item.id)"
  >
    <transition name="slide-width">
      <div
        v-if="isItemEdit"
        class="edit-field-wrapper"
      >
        <input
          type="text"
          ref="inputEdit"
          :value="item.title"
          @input="inputHandler"
          @keydown="keydownHandler"
        >
        <button
          type="button"
          class="btn btn_sm"
          @click="updateItemTitle"
        >Ok</button>
      </div>
    </transition>

    <div 
      v-if="isListEdit"
      class="edit-btns-wrapp"
    >
      <button 
        class="delete-item"
        type="button"
        @click="removeItem(item.id)"
      ></button>
      <button 
        class="edit-item"
        type="button"
        @click="editItem"
      ></button>
    </div>

    {{ item.title }}
  </li>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  name: 'ProdItem',
  props: ['item'],

  data() {
    return {
      isItemEdit: false,
      inputStr: ''
    }
  },

  computed: {
    ...mapGetters([
      'isListEdit',
      'isItemTitleChanged'
    ]),
  },

  methods: {
    ...mapMutations([
      'checkItem', 
      'deleteItem',
      'showOverlay',
      'itemTitleChangedDefault'
    ]),

    ...mapActions(['addNotificationTiming', 'checkEditTitleItem']),

    editItem() {
      this.isItemEdit = true
      this.itemTitleChangedDefault()
      this.showOverlay(true)

      setTimeout(() => {
        this.inputStr = this.$refs.inputEdit.value
        this.$refs.inputEdit.focus()
      }, 0)
    },

    inputHandler(event) {
      this.inputStr = event.target.value.trim().toLowerCase()
    },

    keydownHandler(event) {
      if (event.code === 'Enter') {
        this.updateItemTitle()
      }
    },

    updateItemTitle() {
      if (this.inputStr !== '') {
        this.checkEditTitleItem({
          str: this.inputStr,
          id: this.item.id
        })

        if(this.isItemTitleChanged) {
          this.$refs.inputEdit.blur()
          this.isItemEdit = false
        }
      }
    },

    removeItem(id) {
      this.deleteItem(id)
      this.addNotificationTiming({
        status: 'attention',
        message: 'Deleted'
      })
    }
  }
}
</script>