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
//

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
  <section id="content">
  <div class="container">
    <div class="logo">
      <div class="logo__image">
        <img width="48" height="48" src="https://img.icons8.com/color/48/call-list.png" alt="call-list"/>
      </div>
      <div>
        <h1>Bem-vindo!</h1>
        <p class="logo__lema">Lista telefônica online</p>
      </div>
    </div>

    <form @submit.prevent="adicionarNovo">
      <div class="form__field-only">
        <input type="text" placeholder="Nome completo" v-model="formulario.nome" class="field"/>
      <button type="submit" class="btn btn__solid-add">Adicionar</button>
      </div>
    </form>

    <p class="nenhum__contato" v-if="usuarios.length<1">Nenhum contato cadastrado</p>

    <ul class="cards__usuarios">
      <li v-for="usuario in usuarios" :key="usuario.id" class="card__usuario">
        <p><strong>Nome: </strong>{{ usuario.nome }}</p>
        <button @click="deletarUsuario(usuario.id)" class="btn__delete">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/FF6347/24/filled-trash.png" alt="filled-trash"/>
        </button>
      </li>
    </ul>
  </div>
</section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root{
  --ms:.2rem;
  --cor-desfoque:#00000060;


  --mini:.6rem;
  --base:.8rem;
  --meddium:2rem;
  --larger:3rem;
  --larger-x:4.5rem;

  --box-shadow: 0 0 5px #00000050;

  --primary:blue;
  --light:#FFFFFF;
  --fosco:#f2f2f2;
  --dark:#000000;
}

html {
  font-family: 'Roboto', sans-serif;
}

#content{
  background:var(--fosco);
  min-height:100vh;
  display:flex;
  align-items:center;
  padding: var(--base);
}

.container {
  background-color: var(--light);
  padding: 1rem 10%;
  max-width:768px;
  width:100%;
  padding:1rem;
  margin:0 auto;
  min-height:90vh;
}

.logo{
  display:flex;
  gap:var(--ms);
  align-items:center;
  margin: 0 0 var(--meddium);
}

.logo__lema{
  color:var(--cor-desfoque);
  font-size:(--font-ms);
}

.form__field-only{
  display:flex;
  align-items:center;
}

.nenhum__contato{
padding:2rem;
text-align:center;
color:red;
}

.cards__usuarios{
  padding:1rem 0;
  height:400px;
  overflow-y:auto;
  display:flex;
  flex-direction:column;
  gap:1rem;
}

.card__usuario {
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding: var(--base);
  box-shadow: var(--box-shadow);
 }


 .btn__delete{
  border:0;
  background:transparent;
 }

button {
  cursor: pointer;
}
.field{
  padding:var(--base);
  width:100%;
}

.btn__solid-add{
  border:2px solid var(--primary);
  border-radius:0 var(--base) var(--base) 0;
  background:var(--primary);
  color:var(--light);
  padding:var(--base);
}
</style>
