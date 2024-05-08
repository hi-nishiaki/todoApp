import { createApp } from 'vue'
import App from './App.vue'
// bootstrap-vueからBootstrapVue,IconPluginをインポートする
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Bootstrap と BootstrapVueのCSSファイルをインポート（順序はBootstrap⇒BootstrapVue）
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// BootstrapVueをプロジェクト全体で利用できるようにする
// createApp.use(BootstrapVue)
// BootstrapVueアイコンコンポーネントプラグインの使用
// createApp.use(IconsPlugin)

// createApp.config.productionTip = false

createApp(App).mount('#app')
