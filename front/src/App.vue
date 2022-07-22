<template>
  <div id="App">
    <div id="top-nav">
      <img id="logo" src="./assets/logo.png" alt="Photo du logo de groupomania, représentant une planéte en line-art">
        <nav>
          <router-link to="/">Accueil</router-link> |
          <router-link to="/auth/login">Connexion</router-link> |
          <router-link to="/auth/register">Inscription</router-link>
        </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>

<style>
#top-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

#logo {
  width: 200px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a{
  text-decoration: none;
  color: rgb(78, 78, 78);
}

.router-link-active{
  font-weight: bold;
  color: blueviolet;
}

</style>
