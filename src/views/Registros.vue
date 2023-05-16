<template>
  <div
    class="h-screen bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600"
  >
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <div class="flex">
            <a class="navbar-brand" href="#">
              <span class="font-bold text-gray-500">Leg</span>
              <span class="font-bold text-gray-200">8</span>
              <span class="font-bold text-orange-500"> Serviços</span>
            </a>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="text-center mt-4"></div>
      <h1 class="text-2xl font-bold text-center">Registros</h1>
      <div class="table-responsive">
        <table
          class="table table-secondary table-light table-sm table-bordered table-hover"
        >
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Local</th>
              <th scope="col">Defeito</th>
              <th scope="col">Quantidade Total</th>
              <th scope="col">Aprovados</th>
              <th scope="col">Rejeitados</th>
              <th scope="col">Retrabalhados</th>
              <th scope="col">Operadores</th>
              <th scope="col">Data</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registro in registros" :key="registro.id">
              <td class="font-bold">{{ registro.titulo }}</td>
              <td class="font-bold">{{ registro.local }}</td>
              <td class="font-bold">{{ registro.defeito }}</td>
              <td class="font-bold">{{ registro.quantidade_total }}</td>
              <td class="font-bold">{{ registro.aprovados }}</td>
              <td class="font-bold">{{ registro.rejeitados }}</td>
              <td class="font-bold">{{ registro.retrabalhados }}</td>
              <td class="font-bold">
                <span
                  v-for="operador in registro.operadores"
                  :key="operador.id"
                >
                  {{ operador.username }}&nbsp;
                </span>
              </td>
              <td class="font-bold">{{ registro.data }}</td>
              <td>
                <button
                  @click="abrirModal(registro)"
                  class="btn btn-outline-success m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Adicionar
                </button>
                <button
                  @click="editar(registro)"
                  class="btn btn-outline-dark m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa fa-pencil"></i>
                </button>
                <button
                  @click="excluir(registro)"
                  class="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adicionar Hora</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-for="operador in registro.operadores" :key="operador.id">
              <label :for="`horaInicio-${operador.id}`" class="form-label">
                Hora de Início ({{ operador.username }}):
              </label>
              <input
                :id="`horaInicio-${operador.id}`"
                type="time"
                v-model="getRegistroOperador(operador.id).hora_inicio"
                class="form-control"
              />

              <label :for="`horaFim-${operador.id}`" class="form-label">
                Hora de Fim ({{ operador.username }}):
              </label>
              <input
                :id="`horaFim-${operador.id}`"
                type="time"
                v-model="getRegistroOperador(operador.id).hora_fim"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="salvarHora(registro)"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      registros: [],
      operadores: [],
      registroOperadorMap: {},
      registro: {},
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
    async carregarOperadores() {
      try {
        const response = await axios.get("http://localhost:8000/users/");
        this.operadores = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    abrirModal(registro) {
      this.registroOperadorMap = {};
      this.registro = registro; // Definir o registro atual

      registro.operadores.forEach((operador) => {
        const registroOperador = this.getRegistroOperador(operador.id);
        if (registroOperador) {
          this.registroOperadorMap[operador.id] = {
            id: registroOperador.id,
            hora_inicio: registroOperador.hora_inicio,
            hora_fim: registroOperador.hora_fim,
          };
        } else {
          this.registroOperadorMap[operador.id] = {
            id: null,
            hora_inicio: null,
            hora_fim: null,
          };
        }
      });
    },

    getRegistroOperador(operadorId) {
      return this.registroOperadorMap[operadorId];
    },
    salvarHora(registro) {
      const registrosOperadores = this.operadores.map((operador) => {
        const registroOperador = this.getRegistroOperador(operador.id);
        if (!registroOperador.hora_inicio || !registroOperador.hora_fim) {
          const toast = useToast();
          toast.error("Preencha todos os campos!");
        }
        return {
          id: registroOperador.id,
          registro: registro.id,
          operador: operador.id,
          hora_inicio: registroOperador.hora_inicio,
          hora_fim: registroOperador.hora_fim,
        };
      });

      axios
        .all(
          registrosOperadores.map((registroOperador) => {
            if (registroOperador) {
              const url = registroOperador.id
                ? `http://localhost:8000/registroop/${registroOperador.id}/`
                : "http://localhost:8000/registroop/";
              return registroOperador.id
                ? axios.put(url, registroOperador)
                : axios.post(url, registroOperador);
            }
          })
        )
        .then((responseArr) => {
          const toast = useToast();
          toast.success("Horas de trabalho atualizadas com sucesso");
          console.log("Horas de trabalho atualizadas com sucesso");
          this.registroOperadorMap = {};
          this.carregarRegistros(); // Recarrega os registros após a atualização bem-sucedida
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
