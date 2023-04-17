import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Form from "../views/Form.vue";
import Page from "../views/site.vue";

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
