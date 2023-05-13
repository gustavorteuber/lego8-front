<template>
  <div class="bg-white p-8 rounded shadow">
    <div class="flex justify-between items-center mb-8">
      <div>
        <img src="../assets/leg8.png" alt="Logo" class="w-32 h-auto" />
      </div>
      <h1 class="text-2xl font-bold">Registros</h1>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="py-2 px-4 bg-gray-200 text-gray-700">Título</th>
          <th class="py-2 px-4 bg-gray-200 text-gray-700">Local</th>
          <th class="py-2 px-4 bg-gray-200 text-gray-700">Operadores</th>
          <th class="py-2 px-4 bg-gray-200 text-gray-700">Data</th>
          <th class="py-2 px-4 bg-gray-200 text-gray-700">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registro in registros" :key="registro.id">
          <td class="py-2 px-4 border border-gray-200">
            {{ registro.titulo }}
          </td>
          <td class="py-2 px-4 border border-gray-200">{{ registro.local }}</td>
          <td class="py-2 px-4 border border-gray-200">
            <span v-for="operador in registro.operadores" :key="operador.id">
              {{ operador.username }}&nbsp;
            </span>
          </td>
          <td class="py-2 px-4 border border-gray-200">{{ registro.data }}</td>
          <td class="py-2 px-4 border border-gray-200">
            <div class="container">
              <div class="box rounded-lg bg-white">
                <div
                  v-if="registro.mostrarFormulario"
                  class="fixed inset-0 flex items-center justify-center z-50"
                >
                  <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
                  <div class="relative max-w-lg mx-auto">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                      <div
                        v-for="operador in registro.operadores"
                        :key="operador.id"
                      >
                        <label
                          :for="`horaInicio-${operador.id}`"
                          class="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Hora de Início ({{ operador.username }}):
                        </label>
                        <input
                          :id="`horaInicio-${operador.id}`"
                          type="time"
                          v-if="
                            registro.registroOperador[operador.id] &&
                            registro.registroOperador[operador.id].hora_inicio
                          "
                          v-model="
                            registro.registroOperador[operador.id].hora_inicio
                          "
                          class="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                        />

                        <label
                          :for="`horaFim-${operador.id}`"
                          class="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Hora de Fim ({{ operador.username }}):
                        </label>

                        <input
                          :id="`horaFim-${operador.id}`"
                          type="time"
                          v-if="
                            registro.registroOperador[operador.id] &&
                            registro.registroOperador[operador.id].hora_fim
                          "
                          v-model="
                            registro.registroOperador[operador.id].hora_fim
                          "
                          class="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                        />
                      </div>

                      <div class="flex justify-end mt-4">
                        <button
                          @click="salvarHora(registro)"
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                        >
                          Salvar
                        </button>
                        <button
                          @click="cancelarHora(registro)"
                          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  @click="registro.mostrarFormulario = true"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Adicionar Hora
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registros: [],
      operadores: [],
      registroOperador: [],
    };
  },
  mounted() {
    this.carregarRegistros();
    this.carregarOperadores();
  },
  methods: {
    carregarRegistros() {
      axios
        .get("http://localhost:8000/registros/")
        .then((response) => {
          this.registros = response.data.map((registro) => ({
            ...registro,
            mostrarFormulario: false,
            registroOperador: [],
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    adicionarHora(registro) {
      const operadorId = registro.operadores[0].id;
      const registroOperador = {
        id: null,
        registro: null,
        operador: operadorId,
        hora_inicio: null,
        hora_fim: null,
      };
      registro.registroOperador.push(registroOperador);

      registro.registroOperador.forEach((operador) => {
        this.$set(operador, "hora_inicio", null);
        this.$set(operador, "hora_fim", null);
      });

      registro.mostrarFormulario = true;
    },

    cancelarHora(registro) {
      registro.mostrarFormulario = false;
      registro.registroOperador = [];
    },
    salvarHora(registro) {
      const registrosOperadores = registro.registroOperador
        .map((registroOperador) => {
          const { operador, hora_inicio, hora_fim } = registroOperador;
          if (!hora_inicio || !hora_fim) {
            console.error("Preencha todos os campos");
            return null;
          }
          return {
            id: registroOperador.id,
            registro: registro.id,
            operador,
            hora_inicio,
            hora_fim,
          };
        })
        .filter(Boolean);

      axios
        .all(
          registrosOperadores.map((registroOperador) => {
            const url = registroOperador.id
              ? `http://localhost:8000/registroop/${registroOperador.id}/`
              : `http://localhost:8000/registroop/`;

            return registroOperador.id
              ? axios.put(url, registroOperador)
              : axios.post(url, registroOperador);
          })
        )
        .then((responseArr) => {
          console.log("Horas de trabalho atualizadas com sucesso");
          registro.mostrarFormulario = false;
          registro.registroOperador = [];
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.container {
  max-width: 600px; /* Defina a largura máxima desejada */
  margin: 0 auto; /* Centraliza o container horizontalmente */
}
</style>
