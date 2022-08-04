<template>
  <div>
    <h1>Connexion</h1>
    <label for="register"></label>
    <form v-on:submit.prevent="onSubmit" action="register">
      <h2>Email :</h2>
      <br />
      <input type="text" name="email" id="email" v-model="email" />
      <br />
      <h2>Mot de passe :</h2>
      <br />
      <input type="password" name="password" id="password" v-model="password" />
      <br />
      <button type="submit" v-on:click="verifyLogin()">Se connecter</button>
      <p id="response"></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    verifyLogin() {
      axios.post("http://localhost:5000/api/user/login/", {
        email: this.email,
        password: this.password,
      })
        .then(function (data) {
          response.textContent = `Connexion réussie`
          response.style.color = 'green'
          document.cookie = `jwt=${data.data.token}; domain=localhost; secure; path=/`
          axios.get(`http://localhost:5000/jwtid/${data.data.token}`)
            .then(() => {
              setTimeout(() => {
                window.location.href = `../`
              },500)
              })
            .catch(err => {
              response.textContent = `La connexion a échouée`
              response.style.color = 'red'
            })
        })
        .catch(function (error) {
          response.textContent = `La connexion a échouée`
          response.style.color = 'red'
        });
    },
  },
};
</script>

<style>
</style>
