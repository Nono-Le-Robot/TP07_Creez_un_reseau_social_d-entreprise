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


    <div id="createNewPost">
      <form id="newPost" v-if="logged === true" v-on:submit.prevent="onSubmit" action="newPost">
        <p>Que voulez vous partager ? :</p>
        <br>
        <input v-model="message" type="text" />
        <br>
        <form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
        <br>
        <button v-on:click="sendPost()">Envoyer</button>
      </form>
    </div>
    <br>

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
      message: "",
    };
  },
  methods: {
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    },
    sendPost() {
      if (this.message != "") {
        let token = document.cookie.slice(4);
        axios
          .get(`http://localhost:5000/jwtid/${token}`)
          .then((user) => {
            axios
              .post("http://localhost:5000/api/post/", {
                posterId: user.data,
                message: this.message,
              })
              .then((created) => location.reload())
              .catch();
          })
          .catch();
      }
    },
  },
  mounted() {
    let token = document.cookie.slice(4);
    axios
      .get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true;
        axios
          .get("http://localhost:5000/api/post/")
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              axios
                .get(`http://localhost:5000/api/user/${res.data[i].posterId}`)
                .then((user) => {
                  posts.innerHTML += `
              <br>
              <div id='onePost'>
              <div class='user-infos'>
              <img id='picture-profil-post' src="${user.data.picture}" alt="" srcset="">
              <br>
              <p>${user.data.firstname}  ${user.data.lastname} : <p>
              </div>
              <br>
              <p>${res.data[i].message}<p>
              <br>
              <p>posté le : ${res.data[i].createdAt}</p>
              <br>
              </div>
              <br>
              `;
                })
                .catch();
            }
          })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
        this.logged = false;
        posts.innerHTML += `
          <p> veuillez vous connecter<p>
          `;
      });
  },
};
</script>

<style lang="scss">
@import "../sass/variables/colors.scss";

//===COLORS===
//$scarlet
//$pale-pink
//$independence
//$maximum-yellow
//$french-sky-blue
#onePost {
  font-size: 20px;
  padding: 25px;
  background-color: $independence;
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

#newPost {
  margin-top: 50px;
  font-size: 20px;
  padding: 25px;
  background-color: $independence;
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

#picture-profil-post{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.user-infos{
  display: flex;
  align-items: center;
  img{
    margin-right: 20px;
  }
}
</style>
