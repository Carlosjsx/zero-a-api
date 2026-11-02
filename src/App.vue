<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Formulario {
  nome: string
}

interface Usuario extends Formulario {
  id: number
}

const formulario = ref<Formulario>({
  nome: '',
})

const usuarios = ref<Usuario[]>([])

//const url = "https://stunning-yodel-jr57ppg5wpv5cpg56-3000.app.github.dev/usuarios"

const url = 'https://6a8529b09c451dc67a6351f4.mockapi.io/usuarios'

onMounted(async () => {
  const response = await axios.get(url)
  usuarios.value = response.data
})

async function deletarUsuario(id: number) {
  if (confirm('Excluir?')) {
    usuarios.value = usuarios.value.filter((u) => u.id !== id)
    await axios.delete(`${url}/${id}`)
  }
}

//ok

async function adicionarNovo() {
  const response = await axios.post(url, {
    nome: formulario.value.nome,
  })

  usuarios.value.push(response.data)
  limparCampos()
}

const limparCampos = () => {
  formulario.value.nome = ''
}
</script>

<template>
  <section class="container">
    <h1>Bem-vindo!</h1>

    <form @submit.prevent="adicionarNovo">
      <input type="text" placeholder="Nome completo" v-model="formulario.nome" />
      <button type="submit">Adicionar</button>
    </form>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id" class="card__usuario">
        <p><strong>Nome: </strong>{{ usuario.nome }}</p>
        <button @click="deletarUsuario(usuario.id)">X</button>
      </li>
    </ul>
  </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

.container {
  padding: 1rem 10%;
}

.card__usuario {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
  max-width: 400px;
}

button {
  cursor: pointer;
}
</style>
