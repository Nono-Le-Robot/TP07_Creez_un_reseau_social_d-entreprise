<template>
  <div>
    <div id="top-nav">
      <router-link to="/"> 
        <img id="logo" src="../assets/logo.png" alt="Photo du logo de groupomania, représentant une planéte en line-art" />
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
        <br>
        <input type="text" name="message" id="message-input" placeholder="Que souhaitez vous dire ?" v-model="message" /> 
        <br>
        <input type="file" name="picture" id="picture"/><p style="font-size:10px">(format : png,jpg,gif)</p>
        <br>
        <button v-on:click="sendPost()">Envoyer</button>
      </form>
    </div>
    <br>
  </div>
  <p v-if="logged === false">Veuillez vous connecter</p>
  <div v-if="logged === true" v-for="post in posts" id="posts">
    <br>
    <div id='onePost'>
      <div class='user-infos'>
        <img id='picture-profil-post' :src="post.posterProfil" alt="" srcset="">
        <br>
        <p>{{ post.posterFirstname }}  {{ post.posterLastname }} : </p>
      </div>
      <br>
      <p>{{ post.message }}</p>
      <br>
      <img class="post-picture" :src="post.picture" alt="">
      <br>
      <p>posté le : {{ post.date }}</p>
      <br>
      <div class="post-options-btn">
        <i class="fa-solid fa-thumbs-up"></i>
        <i v-if="post.posterId === connectedUserId || connectedUserId === '62e7ac92ec5d36273c96911e' " class="fa-solid fa-pen-to-square"></i>
        <i v-if="post.posterId === connectedUserId || connectedUserId === '62e7ac92ec5d36273c96911e' " class="fa-solid fa-trash"></i>
      </div>
    </div>
    <br>
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
      posts: [],
      postPicture : "",
      connectedUserId: "",
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
          axios.get(`http://localhost:5000/api/user/${user.data}`)
            .then((userInfo) => {
              console.log(userInfo);
              let formData = new FormData()
              formData.append('posterId', user.data)
              formData.append('posterFirstname', userInfo.data.firstname)
              formData.append('posterLastname', userInfo.data.lastname)
              formData.append('posterProfil', userInfo.data.picture)
              formData.append('file', img)
              formData.append('message', this.message)
              axios.post('http://localhost:5000/api/post/', formData)
                .then((resp) => {location.reload()})
                .catch()
            })
            .catch()
        })
        .catch();
      }
    },
  },
  mounted(){
    let token = document.cookie.slice(4);
    axios.get(`http://localhost:5000/jwtid/${token}`)
      .then((user) => {
        this.logged = true;
        this.connectedUserId = user.data
        axios.get("http://localhost:5000/api/post/")
          .then((res) => {this.posts = res.data})
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
        this.logged = false;
        posts.innerHTML += `<p> veuillez vous connecter<p>`;
      });
  },
} ;
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
  width: 25px;
  height: 25px;
  border-radius: 50px;
}
.user-infos{
  display: flex;
  align-items: center;
  img{
    margin-right: 10px;
  }
}
.post-picture{
    width: 80%;
    border-radius: 20px;
    margin-bottom: 20px;
    &:hover{
      cursor: nesw-resize;
    }
    &:active{
    width: 100%;
    transition : 0.2s ease-in-out;
    }
}
#message-input{
  width: 40%;
  text-align: center;
}
.fa-thumbs-up {
  background-color: white;
  padding: 10px;
  border-radius: 50px;
  color: rgb(146, 132, 253);
  cursor: pointer;
}
.fa-pen-to-square{
  background-color: white;
  padding: 10px;
  border-radius: 50px;
  color: rgb(13, 84, 84);
  cursor: pointer;
}
.fa-trash{
  background-color: white;
  padding: 10px;
  border-radius: 50px;
  color: rgb(253, 132, 132);
  cursor: pointer;
}
.post-options-btn{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
}
</style>
