<template>
  <div>
    <form @submit.prevent="editar ? updateLibro() : addLibro()">
      <p>
        <span>Titulo: </span>
        <input type="text" v-model="titulo">
      </p>
      <p>
        <span>Autor: </span>
        <input type="text" v-model="autor">
      </p>
      <button type="submit">{{ editar ? "Editar": "Agregar"}}</button>
      <button v-if="editar" @click="editar= false, titulo= '', autor=''">Cancelar</button>
    </form>

    <img src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg" v-if="cargando">

    <ul style="list-style-type:none">
      <li v-for="libro in Libros" :key="libro.id">
        {{libro.titulo}} - {{libro.autor}}
        <button @click="deleteLibro(libro)">Eliminar</button>
        <button @click="selectLibro(libro)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>

import {db} from './firebase.js'

export default {
  name: 'App',
  data() {
    return {
      Libros: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      editar: false,
    }
  },
  created() {
    this.listarLibros();
  },
  methods: {
    async listarLibros(){
      this.cargando = true;
      const data = await db.collection("Libros").get();
      this.Libros = data.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      console.log(this.Libros);
      this.cargando = false;
    },
    async addLibro(){
      await db.collection("Libros").add(
        {
          titulo: this.titulo,
          autor: this.autor,
        }
      )
      this.titulo = "";
      this.autor = "";
      this.listarLibros();
    },
    async deleteLibro(libro){
      if(confirm(`Estas seguro que deseas eliminar ${libro.titulo}`)){
        await db.collection("Libros").doc(libro.id).delete();
        this.listarLibros();
      }
    },
    selectLibro(libro){
      this.editar = true;
      this.id = libro.id;
      this.titulo = libro.titulo;
      this.autor = libro.autor;
    },
    async updateLibro(){
      await db.collection("Libros").doc(this.id).set(
        {
          titulo: this.titulo,
          autor: this.autor,
        }
      )
      this.editar = false;
      this.titulo = "";
      this.autor = "";
      this.listarLibros();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
