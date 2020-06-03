import Vue from 'vue'
import Vuex from 'vuex'
import idGenerate from "../helpers/idGenerate.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prodList: [],
    notifications: [],
    searchText: '',
    isListEdit: false,
    isOverlay: false,
    itemTitleChanged: false,
  },
  getters: {
    getSearchText: state => state.searchText,
    isListEdit: state => state.isListEdit,
    isOverlay: state => state.isOverlay,
    isItemTitleChanged: state => state.itemTitleChanged,
    getNotifications: state => state.notifications,
    getProdLIst: state => state.prodList,
    getSortProdList(state) {
      return state.prodList.sort((a, b) => {
        return a.checked - b.checked
      })
    }
  },

  mutations: {
    addProducts(state, payload) {
      state.prodList = payload
    },

    showOverlay(state, payload) {
      state.isOverlay = payload
    },

    itemTitleChangedDefault(state) {
      state.itemTitleChanged = false
    },

    inputSearchText(state, payload) {
      state.searchText = payload
    },

    createProduct(state) {
      if (state.searchText !== '') {
        const titleExist = state.prodList.find(item => item.title === state.searchText)
      
        if (!titleExist) {
          const newItem = {
            title: state.searchText,
            id: idGenerate(),
            checked: false
          }
    
          state.prodList.unshift(newItem)
          state.searchText = ''
        }
      }
    },

    clearSearchText(state) {
      state.searchText = ''
    },

    checkItem(state, id) {
      const itemProduct = state.prodList.find(item => item.id === id)
      itemProduct.checked = !itemProduct.checked
      state.searchText = ''
      state.isListEdit = false
    },

    editList(state, payload) {
      state.isListEdit = payload
    },

    deleteItem(state, id) {
      const itemIndex = state.prodList.findIndex(item => item.id === id)
      state.prodList.splice(itemIndex, 1)
    },

    editTitleItem(state, { str, id }) {
      const itemProduct = state.prodList.find(item => item.id === id)
      itemProduct.title = str

      state.isListEdit = false
      state.isOverlay = false
      state.itemTitleChanged = true
      state.searchText = ''
    },

    addNotification(state, { status, message }) {
      const item = {
        status,
        message,
        id: idGenerate()
      }

      state.notifications.unshift(item)
    },

    removeLastNotification(state) {
      state.notifications.pop()
    }
  },

  actions: {
    checkEditTitleItem({ dispatch, commit, state }, payload){
      const titleExist = state.prodList.find(item => {
        return item.title === payload.str && item.id !== payload.id
      })
    
      if (!titleExist) {
        commit('editTitleItem', payload)
      } else {
        dispatch('addNotificationTiming', {
          status: 'error',
          message: 'This name alrady exists'
        })
      }
    },

    checkCreateProduct({ dispatch, commit, state }) {
      if (state.searchText !== '') {
        const titleExist = state.prodList.find(item => item.title === state.searchText)
      
        if (!titleExist) {
          commit('createProduct')

          dispatch('addNotificationTiming', {
            status: 'success',
            message: 'New item has been created'
          })
        } else {
          dispatch('addNotificationTiming', {
            status: 'error',
            message: 'This name alrady exists'
          })
        }
      }
    },

    addNotificationTiming({ commit }, payload) {
      commit('addNotification', payload)
      setTimeout(() => {
        commit('removeLastNotification')
      }, 2000)
    }
  },
})
