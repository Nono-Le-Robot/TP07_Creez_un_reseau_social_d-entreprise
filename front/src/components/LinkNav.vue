<template>

<div id="top-nav">
      <router-link to="/groupomania/">
        <img id="logo" src="../assets/logo.png"
          alt="Photo du logo de groupomania, représentant une planéte en line-art" />
      </router-link>
      <nav>
        <router-link to="/groupomania/">Accueil</router-link> |
        <router-link to="/groupomania/login">Connexion</router-link> |
        <router-link to="/groupomania/register">Inscription</router-link>
      </nav>
    </div>

</template>


<script>
export default{
    name:'topNav'
} 

</script>