<template>
  <div id="card">
    <h1>Inscription</h1>
    <label for="register"></label>
    <form v-on:submit.prevent="onSubmit" action="register">
      <h2><i class="fa-solid fa-user-pen"></i>   Nom :</h2>
      <br />
      <input type="text" autocomplete="off"  name="lastname" id="lastname" v-model="lastname" />
      <br />
      <h2><i class="fa-solid fa-user-pen"></i>  Prénom :</h2>
      <br />
      <input type="text" autocomplete="off" name="firstname" id="firstname" v-model="firstname" />
      <br>
      <h2><i class="fa-solid fa-at"></i>   Email :</h2>
      <br />
      <input type="email"  name="email" id="email" v-model="email" />
      <br />
      <h2><i class="fa-solid fa-key"></i>   Mot de passe :</h2>
      <br />
      <input type="password" name="password" id="password" v-model="password" />
      <br />
      <button type="submit" v-on:click="sendUserData()"><i class="fa-solid fa-user-plus"></i>S'inscrire</button>

      <div id="response">

      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import topNav from '@/components/LinkNav.vue'
export default {
  components:{
    topNav
  },
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
          response.innerHTML = `<p>Création réussie !<br>  redirection dans 3 secondes...</p><br>`;
          response.style.color = "rgb(63, 211, 61)";

          let timerToRedirect = 3;
          setInterval(() => {
            timerToRedirect--;
            if (timerToRedirect === 0) {
              window.location.href = "./login";
            } else {
              response.innerHTML = `<p>Création réussie !<br> redirection dans ${timerToRedirect} secondes...</p><br>`;
              response.style.color = "rgb(63, 211, 61)";
            }
          }, 1000);
        })
        .catch(function (error) {
          response.innerHTML ="<p>Données invalide(s) et/ou email déjà enregistré.</p><br>";
          response.style.color = "rgb(211, 61, 61)";
        });
    },
  },
};
</script>

<style lang="scss">
#card{

  background-color: #4E5566;
  color: rgb(255, 255, 255);
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  padding: 50px 0px 0px 0px;
  margin-top: 0;
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
  width: 250px;
  padding: 0px 10px;
  font-weight: 600;
  &:focus{
    outline: none;
  }
}
button{
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 20px;
  border: 1px solid black;
  background-color: #6f85ba;
  color: black;
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
  padding-bottom: 10px;
  padding-top: 20px;
  font-size: 20px;
  font-weight: 800;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.fa-user-plus{
    
    transform: scale(0.8);
}
.fa-solid{
margin-right: 5px;
}
#card > form > button > i{
  margin-left: 0px;
}

.fa-key{
  margin-top: 0;
}


</style>


