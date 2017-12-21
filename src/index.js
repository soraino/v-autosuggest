import AutoSuggest from './components/AutoSuggest.vue'

// Install the components
export function install (Vue) {
  Vue.component('VAutoSuggest', AutoSuggest)
  /* -- Add more components here -- */
}

// Expose the components
export {
  AutoSuggest
  /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
