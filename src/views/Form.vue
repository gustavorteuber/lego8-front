<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Novo Registro</h2>
    <form @submit.prevent="enviarRegistro" class="max-w-md mx-auto">
      <div class="mb-4">
        <label for="titulo" class="block font-medium">Título:</label>
        <input type="text" id="titulo" v-model="registro.titulo" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="local" class="block font-medium">Local:</label>
        <input type="text" id="local" v-model="registro.local" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="data" class="block font-medium">Data:</label>
        <input type="text" id="data" v-model="registro.data" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="fornecedor" class="block font-medium">Fornecedor:</label>
        <input type="text" id="fornecedor" v-model="registro.fornecedor" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="peca" class="block font-medium">Peça:</label>
        <input type="text" id="peca" v-model="registro.peca" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="codigo" class="block font-medium">Código:</label>
        <input type="text" id="codigo" v-model="registro.codigo" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="defeito" class="block font-medium">Defeito:</label>
        <input type="text" id="defeito" v-model="registro.defeito" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="quantidade_total" class="block font-medium">Quantidade Total:</label>
        <input type="number" id="quantidade_total" v-model="registro.quantidade_total" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="aprovados" class="block font-medium">Aprovados:</label>
        <input type="number" id="aprovados" v-model="registro.aprovados" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="rejeitados" class="block font-medium">Rejeitados:</label>
        <input type="number" id="rejeitados" v-model="registro.rejeitados" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="retrabalhados" class="block font-medium">Retrabalhados:</label>
        <input type="number" id="retrabalhados" v-model="registro.retrabalhados" required class="w-full border-gray-300 rounded-md px-4 py-2">
      </div>
      <div class="mb-4">
        <label for="operadores" class="block font-medium">Operadores:</label>
        <select id="operadores" v-model="registro.operadores" multiple required class="w-full border-gray-300 rounded-md px-4 py-2">
          <option v-for="operador in operadores" :value="operador.id" :key="operador.id">
            {{ operador.username }}
          </option>
        </select>
      </div>
      <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registro: {
        titulo: '',
        local: '',
        data: '',
        fornecedor: '',
        peca: '',
        codigo: '',
        defeito: '',
        quantidade_total: null,
        aprovados: null,
        rejeitados: null,
        retrabalhados: null,
        operadores: []
      },
      operadores: []
    };
  },
  mounted() {
    this.carregarOperadores();
  },
  methods: {
    carregarOperadores() {
      axios.get('http://localhost:8000/users/')
        .then(response => {
          this.operadores = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    enviarRegistro() {
      axios.post('http://localhost:8000/registros/', this.registro)
        .then(response => {
          // Redirecionar para a página de registros
          this.$router.push('/registros');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
