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
    <div id="userInfos">
        <br>
        <h1>Mon compte</h1>
        <br>
        <img id="picture-profil" :src='picture' alt="" srcset="">
        <br>
        <p>Nom : {{ lastname }} </p>
        <br>
        <p>Prénom : {{ firstname }} </p>
        <br>
        <p>Email : {{ email }} </p>
        <br>
        <form id="newPost" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="newPost" >
        <br>
        <input type="file" name="picture-profil-edit" id="picture-profil-edit"/><p style="font-size:10px">(format : png,jpg,gif)</p>
        <br>
        <button id="send-modified-profil" v-on:click="editProfil()">Changer ma photo de profil</button>
        </form>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logged: false,
      firstname : '',
      lastname : '',
      email : '',
      picture : '',
      connectedId: ''
    };
  },
  methods: {
    editProfil() {
        let imgPictureEdit =  document.querySelector("#picture-profil-edit")
        let formData = new FormData()
        formData.append('file', imgPictureEdit.files[0])
        axios.put(`http://localhost:5000/api/user/${this.connectedId}`,formData)
        .then(() => {
          window.location.reload()
        })
        .catch()
         
    },
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    }
  },
  mounted() {
    let token = document.cookie.slice(4);
    axios.get(`http://localhost:5000/jwtid/${token}`)
      .then((res) => {
        this.logged = true;
        axios.get(`http://localhost:5000/api/user/${res.data}`)
          .then((user) => {
            this.firstname = user.data.firstname
            this.lastname = user.data.lastname
            this.email = user.data.email
            this.picture = user.data.picture
            this.connectedId = user.data._id
          })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
      });
  },
}
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
