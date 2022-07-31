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
      <nav>
        <router-link to="/">Accueil</router-link> |
        <router-link to="/auth/login">Connexion</router-link> |
        <router-link to="/auth/register">Inscription</router-link>
      </nav>
    </div>
    <h1>Inscription</h1>
    <label for="register"></label>
    <form v-on:submit.prevent="onSubmit" action="register">
      <h2>Prénom :</h2>
      <br />
      <input type="text" name="firstname" id="firstname" v-model="firstname" />
      <br />
      <h2>Nom :</h2>
      <br />
      <input type="text" name="lastname" id="lastname" v-model="lastname" />
      <br />
      <h2>Email :</h2>
      <br />
      <input type="text" name="email" id="email" v-model="email" />
      <br />
      <h2>Mot de passe :</h2>
      <br />
      <input type="password" name="password" id="password" v-model="password" />
      <br />
      <button type="submit" v-on:click="sendUserData()">S'inscrire</button>
      <p id="response"></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: null,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  },
  methods: {
    sendUserData() {
      axios
        .post("http://localhost:5000/api/user/register/", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
        .then(function (data) {
          response.textContent = `Création du compte réussie ! redirection vers la page de connexion dans 3 secondes...`;
          response.style.color = "green";

          let timerToRedirect = 3;
          setInterval(() => {
            timerToRedirect--;
            if (timerToRedirect === 0) {
              window.location.href = "./login";
            } else {
              response.textContent = `Création du compte réussie ! redirection vers la page de connexion dans ${timerToRedirect} secondes...`;
              response.style.color = "green";
            }
          }, 1000);
        })
        .catch(function (error) {
          response.textContent =
            "Données invalide(s) et/ou email déjà enregistré.";
          response.style.color = "red";
        });
    },
  },
};
</script>

<style></style>
