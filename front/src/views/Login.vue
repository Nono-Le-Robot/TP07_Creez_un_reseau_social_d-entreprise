<template>
  <div id="card">
    <h1>Connexion</h1>
    <label for="register"></label>
    <form v-on:submit.prevent="onSubmit" action="register">
      <h2><i class="fa-solid fa-at"></i>   Email :</h2>
      <br />
      <input type="text" name="email" id="email" v-model="email" />
      <br />
      <h2> <i class="fa-solid fa-key"></i>   Mot de passe :</h2>
      <br />
      <input type="password" name="password" id="password" v-model="password" />
      <br />
      <button type="submit" v-on:click="verifyLogin()"><i class="fa-solid fa-right-to-bracket"></i> Se connecter   </button>
      <div id="response"></div>
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
              response.innerHTML = `<p>Connexion réussie</p><br>`
          response.style.color = 'rgb(63, 211, 61)'
          document.cookie = `jwt=${data.data.token}; domain=localhost; secure; path=/`
          axios.get(`http://localhost:5000/jwtid/${data.data.token}`)
            .then(() => {
              setTimeout(() => {
                window.location.href = `../`
              },500)
              })
            .catch(err => {
              response.innerHTML = `<p>La connexion a échouée</p><br>`
              response.style.color = 'rgb(211, 61, 61)'
            })
        })
        .catch(function (error) {
            response.innerHTML = `<p>La connexion a échouée</p><br>`
          response.style.color = 'rgb(211, 61, 61)'
        });
    },
  },
};
</script>

<style lang="scss">
#card{
  margin-top:80px;
  background-color: #4E5566;
  color: rgb(255, 255, 255);
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  padding: 50px 0px 20px 0px;
}
h1{
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  top: -20px;
}
h2{
  font-weight: bold;
}
input{
  margin-bottom: 40px;
  border-radius: 5px;
  height: 30px;
  width: 180px;
  padding: 0px 10px;
}
button{
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 20px;
  border: 1px solid black;
  background-color: #6f85ba;
  color: rgb(255, 255, 255);
  &:hover{
    transition: 0.5s;
    transform: scale(1.03);
    background-color:rgb(39, 57, 111);
    color: white;
    cursor: pointer;
  }
  transition: 0.5s;
}
#response{
  padding-top: 20px;
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 20px;
  
}
fa{}
</style>
