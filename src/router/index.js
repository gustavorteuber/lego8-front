import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Form from "../views/Form.vue";
import Page from "../views/site.vue";
import Registros from "../views/Registros.vue"

const routes = [
  {
    path: "/",
    name: "Page",
    component: Page,
  },
  {
    path: "/admin",
    name: "Login",
    component: Login,
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
  },
  {
    props: true,
    path: "/registros",
    name: "Registros",
    component: Registros,
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
