import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      cart: {}
  },
  mutations: {
      addCart(state, goods){
          if(state.cart[goods.id]){
              state.cart[goods.id].count++
          }else{
              Vue.set(state.cart, goods.id, goods)
          }
      },
      subItem(state, id){
        state.cart[id].count--
      },
      addItem(state, id){
        state.cart[id].count++
      },
      delItem(state, id){
          Vue.delete(state.cart, id)
      }
  },
  actions: {
  },
  modules: {
  }
})
