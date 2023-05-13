<template>
    <div class="fixed inset-0 flex items-center justify-center z-50" v-if="aberto">
      <div class="bg-black bg-opacity-50 fixed inset-0"></div>
      <div class="bg-white p-6 rounded-md shadow-md max-w-md">
        <slot></slot>
        <div class="mt-6 flex justify-end">
          <button class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded" @click="fecharModal">Fechar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      aberto: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      fecharModal() {
        this.$emit('fechar');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos adicionais específicos podem ser adicionados aqui */
  </style>
  