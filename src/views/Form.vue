<template>
  <div>
    <div class="container">
      <div class="rounded p-4 border">
        <h2 class="text-2xl font-bold mb-4">Novo Registro</h2>
        <form @submit.prevent="enviarRegistro" class="max-w-md mx-auto">
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="titulo" class="form-label">Título:</label>
              <input
                type="text"
                id="titulo"
                v-model="registro.titulo"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="local" class="form-label">Local:</label>
              <input
                type="text"
                id="local"
                v-model="registro.local"
                required
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="data" class="form-label">Data:</label>
              <input
                type="text"
                id="data"
                v-model="registro.data"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="fornecedor" class="form-label">Fornecedor:</label>
              <input
                type="text"
                id="fornecedor"
                v-model="registro.fornecedor"
                required
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="peca" class="form-label">Peça:</label>
              <input
                type="text"
                id="peca"
                v-model="registro.peca"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="codigo" class="form-label">Código:</label>
              <input
                type="text"
                id="codigo"
                v-model="registro.codigo"
                required
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="defeito" class="form-label">Defeito:</label>
              <input
                type="text"
                id="defeito"
                v-model="registro.defeito"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="quantidade_total" class="form-label"
                >Quantidade Total:</label
              >
              <input
                type="number"
                id="quantidade_total"
                v-model="registro.quantidade_total"
                required
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="aprovados" class="form-label">Aprovados:</label>
              <input
                type="number"
                id="aprovados"
                v-model="registro.aprovados"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="rejeitados" class="form-label">Rejeitados:</label>
              <input
                type="number"
                id="rejeitados"
                v-model="registro.rejeitados"
                required
                class="form-control"
              />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6">
              <label for="retrabalhados" class="form-label"
                >Retrabalhados:</label
              >
              <input
                type="number"
                id="retrabalhados"
                v-model="registro.retrabalhados"
                required
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label for="operadores" class="form-label">Operadores:</label>
              <select
                id="operadores"
                v-model="registro.operadores"
                multiple
                required
                class="form-select"
              >
                <option
                  v-for="operador in operadores"
                  :value="operador.id"
                  :key="operador.id"
                >
                  {{ operador.username }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toastInjectionKey, useToast } from "vue-toastification";

export default {
  data() {
    return {
      registro: {
        titulo: "",
        local: "",
        data: "",
        fornecedor: "",
        peca: "",
        codigo: "",
        defeito: "",
        quantidade_total: null,
        aprovados: null,
        rejeitados: null,
        retrabalhados: null,
        operadores: [],
      },
      operadores: [],
    };
  },
  mounted() {
    this.carregarOperadores();
  },
  methods: {
    carregarOperadores() {
      axios
        .get("http://localhost:8000/users/")
        .then((response) => {
          this.operadores = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    enviarRegistro() {
      axios
        .post("http://localhost:8000/registros/", this.registro)
        .then((response) => {
          const toast = useToast();
          toast.success("Registro postado!");
          this.$router.push("/registros");
        })
        .catch((error) => {
          const toast = useToast();
          toast.error("Preencha todos os campos corretamente!");
          console.error(error);
        });
    },
  },
};
</script>
