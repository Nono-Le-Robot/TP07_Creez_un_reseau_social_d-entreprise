<template>
  <div>
    <div id="top-nav">
      <router-link to="/">
        <img
          id="logo"
          src="../assets/logo.png"
          alt="Photo du logo de groupomania, représentant une planéte en line-art"
        />
      </router-link>
      <nav v-if="logged === false">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/auth/login">Connexion</router-link> |
        <router-link to="/auth/register">Inscription</router-link>
      </nav>
      <nav v-if="logged === true">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/account">Mon compte</router-link> |
        <router-link to="/auth/login" v-on:click="disconnectUser()"
          >Deconnexion</router-link
        >
      </nav>
    </div>

    <h1>Actualités</h1>
    <div id="createNewPost">
      <form
        v-if="logged === true"
        v-on:submit.prevent="onSubmit"
        action="newPost"
      >
        <p>Que voulez vous partager ? :</p>
        <input v-model="message" type="text" />
        <button v-on:click="sendPost()">Envoyer</button>
      </form>
    </div>
    <div id="posts"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: null,
      logged: false,
      message: "",
    };
  },
  methods: {
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    },
    sendPost() {
      if(this.message != ""){
          let token = document.cookie.slice(4);
        axios
        .get(`http://localhost:5000/jwtid/${token}`)
        .then((user) => {
          axios
            .post("http://localhost:5000/api/post/", {
              posterId: user.data,
              message: this.message,
            })
            .then((created) => location.reload())
            .catch();
        })
        .catch();
      }
    
    },
  },
  mounted() {
    let token = document.cookie.slice(4);
    axios
      .get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true;
        axios
          .get("http://localhost:5000/api/post/")
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              axios
                .get(`http://localhost:5000/api/user/${res.data[i].posterId}`)
                .then((user) => {
                  posts.innerHTML += `
              <br>
              <p>${user.data.firstname}  ${user.data.lastname} : <p>
              <p>${res.data[i].message}<p>
              <p>posté le : ${res.data[i].createdAt}</p>
              <br>
              `;
                })
                .catch();
            }
          })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
        this.logged = false;
        posts.innerHTML += `
          <p> veuillez vous connecter<p>
          `;
      });
  },
};
</script>

<style></style>
