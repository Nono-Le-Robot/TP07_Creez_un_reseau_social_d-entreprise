<template>
  <div>
    <div id="top-nav">
      <router-link to="/">
        <img id="logo" src="../assets/logo.png"
          alt="Photo du logo de groupomania, représentant une planéte en line-art" />
      </router-link>
      <nav v-if="logged === false">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/auth/login">Connexion</router-link> |
        <router-link to="/auth/register">Inscription</router-link>
      </nav>
      <nav v-if="logged === true">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/account">Mon compte</router-link> |
        <router-link to="/auth/login" v-on:click="disconnectUser()">Deconnexion</router-link>
      </nav>
    </div>
    <div id="userInfos"></div>
    <br />
    <!-- <p v-on:click="deleteUser()" id="deleteAccount">supprimer le compte</p> -->
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
    deleteUser() {
      let token = document.cookie.slice(4);
      axios
        .get(`http://localhost:5000/jwtid/${token}`)
        .then((result) => {
          if (
            confirm(
              "Etes vous sur de vouloir supprimer le compte ? l'action est irréversible"
            ) == true
          ) {
            axios
              .delete(`http://localhost:5000/api/user/${result.data}`)
              .then((deletedUser) => console.log(deletedUser))
              .catch();
            alert("compte supprimé");
            this.logged = false;
            document.cookie = "jwt=;max-age=0";
            window.location.href = `../`;
          } else {
          }
        })
        .catch();
    },
  },
  mounted() {
    let token = document.cookie.slice(4);
    axios
      .get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true;
        axios
          .get(`http://localhost:5000/api/user/${res.data}`)
          .then((user) => {
            userInfos.innerHTML = `
          <br>
          <h1>Mon compte</h1>
          <br>
          <img id="picture-profil" src="${user.data.picture}" alt="" srcset="">
          <br>
          <p>Nom : ${user.data.lastname} </p>
          <br>
          <p>Prénom : ${user.data.firstname} </p>
          <br>
          <p>Email : ${user.data.email} </p>
          <br>
          `;
          console.log(user.data.picture);
          })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
      });
  },
};
</script>

<style lang="scss">
#deleteAccount {
  color: red;

  &:hover {
    color: rgb(192, 0, 0);
    cursor: pointer;
  }
}

#userInfos {
  margin-top: 50px;
  font-size: 20px;
  padding: 25px;
  background-color: rgb(59, 66, 83);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.34);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

#picture-profil{
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>
