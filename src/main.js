import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import Toast, { POSITION } from "vue-toastification";
import router from "./router/index";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
});
app.use(router);
app.mount("#app");
