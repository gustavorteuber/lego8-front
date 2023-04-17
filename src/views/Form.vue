<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "RegistroForm",
  components: { Sidebar },
  data() {
    return {
      titulo: "",
      local: "",
      data: "",
      fornecedor: "",
      peca: "",
      codigo: "",
      defeito: "",
      quantidade_total: "",
      aprovados: "",
      rejeitados: "",
      retrabalhados: "",
      operadores: [],
      hora_entrada: "",
      hora_saida: "",
      users: [],
      selectedUser: null,
    };
  },
  created() {
    axios
      .get("http://localhost:8000/users/")
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    addOperator() {
      if (
        this.selectedUser &&
        !this.operadores.includes(this.selectedUser.id)
      ) {
        this.operadores.push(this.selectedUser.id);
      }
    },
    removeOperator(operatorId) {
      const index = this.operadores.indexOf(operatorId);
      if (index !== -1) {
        this.operadores.splice(index, 1);
      }
    },
    submit() {
      const payload = {
        titulo: this.titulo,
        local: this.local,
        data: this.data,
        fornecedor: this.fornecedor,
        peca: this.peca,
        codigo: this.codigo,
        defeito: this.defeito,
        quantidade_total: this.quantidade_total,
        aprovados: this.aprovados,
        rejeitados: this.rejeitados,
        retrabalhados: this.retrabalhados,
        operadores: this.operadores,
        hora_entrada: this.hora_entrada,
        hora_saida: this.hora_saida,
      };
      axios
        .post("http://localhost:8000/registros/", payload)
        .then(() => {
          const toast = useToast();
          toast.success(`O relatório "${this.titulo}" foi postado com sucesso`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<template>
  <!-- <img src="../src/assets/leg8.jpeg" alt="Logo" /> -->
  <Sidebar />
  <div class="formbold-main-wrapper">
    <form @submit.prevent="submit">
      <h2 class="formbold-form-title">Relatório de Serviço:</h2>
      <div>
        <label for="postcode" class="formbold-form-label"> Titulo </label>
        <input
          v-model="titulo"
          type="text"
          name="titulo"
          placeholder="Título"
          required
          class="formbold-form-input"
        />
        <div class="m-4"></div>
      </div>
      <div class="formbold-input-flex">
        <div>
          <label for="firstname" class="formbold-form-label"> Data </label>
          <input
            v-model="data"
            type="date"
            name="data"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <label for="lastname" class="formbold-form-label"> Local </label>
          <input
            v-model="local"
            type="text"
            name="local"
            placeholder="Local"
            required
            class="formbold-form-input"
          />
        </div>
      </div>

      <div class="formbold-input-flex">
        <div>
          <label for="text" class="formbold-form-label"> Fornecedor </label>
          <input
            v-model="fornecedor"
            type="text"
            name="fornecedor"
            placeholder="Fornecedor"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <label for="phone" class="formbold-form-label"> Codigo </label>
          <input
            v-model="codigo"
            type="text"
            name="codigo"
            placeholder="Código"
            required
            class="formbold-form-input"
          />
        </div>
      </div>

      <div class="formbold-input-flex">
        <div>
          <label for="jobtitle" class="formbold-form-label"> Defeito </label>
          <input
            v-model="defeito"
            type="text"
            name="defeito"
            placeholder="Defeito"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <label for="company" class="formbold-form-label">
            Quant. total
          </label>
          <input
            v-model="quantidade_total"
            type="number"
            name="quantidade_total"
            placeholder="Quantidade Total"
            required
            class="formbold-form-input"
          />
        </div>
      </div>

      <div class="formbold-input-flex">
        <div>
          <label for="state" class="formbold-form-label"> Aprovados </label>
          <input
            v-model="aprovados"
            type="number"
            name="aprovados"
            placeholder="Aprovados"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <label for="country" class="formbold-form-label"> Rejeitados </label>
          <input
            v-model="rejeitados"
            type="number"
            name="rejeitados"
            placeholder="Rejeitados"
            required
            class="formbold-form-input"
          />
        </div>
      </div>
      <div class="formbold-input-flex">
        <div>
          <label for="state" class="formbold-form-label"> Retrabalhados </label>
          <input
            v-model="retrabalhados"
            type="number"
            name="retrabalhados"
            placeholder="Retrabalhados"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <select class="formbold-form-input" v-model="selectedUser">
            <option v-for="user in users" :key="user.id" :value="user">
              {{ user.username }}
            </option>
          </select>
          <button @click="addOperator">Adicionar</button>
        </div>
        <div>
          <div v-for="operatorId in operadores" :key="operatorId">
            <span>{{
              users.find((user) => user.id === operatorId).username
            }}</span>
            <button @click="removeOperator(operatorId)">Remover</button>
          </div>
        </div>
      </div>
      <label for="postcode" class="formbold-form-label"> Peça </label>
      <input
        class="formbold-form-input"
        v-model="peca"
        type="text"
        name="peca"
        placeholder="Peça"
        required
      />
      <div class="formbold-input-flex">
        <div>
          <label for="postcode" class="formbold-form-label">
            Hora de Inicio
          </label>
          <input
            v-model="hora_entrada"
            type="time"
            name="hora"
            placeholder="Entrada"
            required
            class="formbold-form-input"
          />
        </div>
        <div>
          <label for="postcode" class="formbold-form-label">
            Hora de saida
          </label>
          <input
            v-model="hora_saida"
            type="time"
            name="hora"
            placeholder="Saida"
            required
            class="formbold-form-input"
          />
        </div>
      </div>
      <button type="submit" class="formbold-btn">Registrar serviço</button>
    </form>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Inter", sans-serif;
}
.formbold-main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.formbold-form-wrapper {
  margin: 0 auto;
  max-width: 550px;
  width: 80%;
  background: white;
}

.formbold-event-wrapper span {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 2.5px;
  color: #6a64f1;
  display: inline-block;
  margin-bottom: 12px;
}
.formbold-event-wrapper h3 {
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  color: #dd8705;
  width: 60%;
  margin-bottom: 15px;
}
.formbold-event-wrapper h4 {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #f38a00;
  width: 60%;
  margin: 25px 0 15px;
}
.formbold-event-wrapper p {
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}

.formbold-event-details {
  background: #fafafa;
  border: 1px solid #dde3ec;
  border-radius: 5px;
  margin: 25px 0 30px;
}
.formbold-event-details h5 {
  color: #07074d;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  padding: 15px 25px;
}
.formbold-event-details ul {
  border-top: 1px solid #edeef2;
  padding: 25px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  row-gap: 14px;
}
.formbold-event-details ul li {
  color: #536387;
  font-size: 16px;
  line-height: 24px;
  width: 50%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.formbold-form-title {
  color: #f97316;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  width: 60%;
  margin-bottom: 30px;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}
.formbold-input-flex > div {
  width: 50%;
}
.formbold-form-input {
  text-align: center;
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  color: #536387;
  outline: none;
  resize: none;
}
.formbold-form-input:focus {
  border-color: #6a64f1;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
.formbold-form-label {
  color: #536387;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
}

.formbold-policy {
  font-size: 14px;
  line-height: 24px;
  color: #536387;
  width: 70%;
  margin-top: 22px;
}
.formbold-policy a {
  color: #6a64f1;
}
.formbold-btn {
  text-align: center;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  padding: 14px 25px;
  border: none;
  font-weight: 500;
  background-color: #f06910;
  color: white;
  cursor: pointer;
  margin-top: 25px;
}
.formbold-btn:hover {
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
</style>
