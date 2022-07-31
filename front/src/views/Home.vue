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
      <form id="newPost" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="newPost" >
        <p>Que voulez vous partager ? :</p>
        <br>
         <input type="file" name="picture" id="picture">
        <input type="text" name="message" id="" placeholder="Que souhaitez vous dire ?" v-model="message" />
        <br>
        <button v-on:click="sendPost()">Envoyer</button>
      </form>
    </div>
    <br>

    <div id="posts"></div>
  </div>
</template>

<script>

import { file } from "@babel/types";
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
        axios.get(`http://localhost:5000/jwtid/${token}`)
          .then((user) => {
                let img =  document.getElementById('picture').files[0]
                console.log(img);
  
                let formData = new FormData()
                console.log(img);
                formData.append('posterId', user.data)
                formData.append('file', img)
                formData.append('message', this.message)
        // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
        axios.post('http://localhost:5000/api/post/', formData)
          .then((resp) => {
            location.reload()
          })
          .catch((err) => {
            console.log(err.response)
          })
                console.log(img);
          })
          .catch();
      }
    },
  },
mounted(){
    let token = document.cookie.slice(4);
    axios
      .get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true;
        axios.get("http://localhost:5000/api/post/")
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              axios
                .get(`http://localhost:5000/api/user/${res.data[i].posterId}`)
                .then((user) => {
                  var d = new Date();
                  var date = d.getDate()+'-'+0+(d.getMonth()+1)+'-'+d.getFullYear();
                  var hours = d.getHours() + ":" + d.getMinutes();
                  var fullDate = date + ' à ' + hours;
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
                  <img class="post-picture" src="${res.data[i].picture}" alt="">
                  <br>
                  <p>posté le : ${fullDate}</p>
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

.post-picture{
    width: 200px;

}
</style>
