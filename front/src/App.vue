<template>
<div id="App">
  <h1>Logo</h1>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <router-link to="/auth/login">Connexion</router-link> |
    <router-link to="/auth/register">Inscription</router-link>
  </nav>
  <router-view />

  <!-- <RegisterForm @registered="saveUser" /> -->
</div>
</template>

<script>
import RegisterForm from './components/RegisterForm.vue'
export default {
  name: 'App',
  components: {
    RegisterForm,
  },
  setup() {
    const saveUser = function(data) {
      console.log("user registered! " + '\nemail : ' + data.email + '\npassword : ' + data.password);
      
    }
    return{
      saveUser
    }
  }
};
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

a {
  text-decoration: none;
  color: rgb(78, 78, 78);
}
.router-link-active{
  font-weight: bold;
  color: blueviolet;
}
</style>
