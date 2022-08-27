import { h } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  // .vue
  // <template></template>
  // render
  render() {
    // ui
    return h('div', {
      id: 'root',
      class: ['red', 'hard'],
    }, 
    // 'hi, ' + this.msg
    [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
    )
  },

  setup() {
    // composition api
    return {
      msg: 'mini-vue'
    }
  }
}