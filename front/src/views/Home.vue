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
        <router-link to="/auth/Account">Mon compte</router-link> |
        <router-link to="/auth/login" v-on:click="disconnectUser()"
          >Deconnexion</router-link
        >
      </nav>
    </div>
    <h1>Actualités</h1>
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
    };
  },
  methods: {
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    },
  },
  mounted() {
    let token = document.cookie.slice(4);
    axios.get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true
      })
      .catch((err) => {
          document.cookie = "jwt=;max-age=0";
          this.logged = false
      });
  },
};
</script>

<style></style>
