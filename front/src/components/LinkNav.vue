<template>

<div id="top-nav">
      <router-link to="/">
        <img id="logo" src="../assets/logo.png"
          alt="Photo du logo de groupomania, représentant une planéte en line-art" />
      </router-link>
      <nav>
        <router-link to="/">Accueil</router-link> |
        <router-link to="/auth/login">Connexion</router-link> |
        <router-link to="/auth/register">Inscription</router-link>
      </nav>
    </div>

</template>


<script>
export default{
    name:'topNav'
} 

</script>