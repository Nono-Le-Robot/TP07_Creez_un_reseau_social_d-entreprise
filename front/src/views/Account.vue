<template>
  <div>
    <div id="userInfos">
      <br>
      <h1><i class="fa-solid fa-file-user"></i>Mon compte :</h1>
      <br>
      <span>
        <img :style="picture === 'https://sannier-renaud.fr/portfolio/groupomania/images/default/default.png' ? 'left: 0px;' : '' " id="picture-profil" :src='picture' alt="" srcset="">
        <i v-if="(picture != 'https://sannier-renaud.fr/portfolio/groupomania/images/default/default.png')" @click="setDefault()" class="fa-solid fa-xmark default-picture"></i>
      </span>
      <br>
      <p>Nom : {{ lastname }} </p>
      <br>
      <p>Prénom : {{ firstname }} </p>
      <br>
      <p>Email : {{ email }} </p>
      <br>
      <br>
      <div class="separator"></div>
      <br>
      <br>
      <form id="newPost" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="newPost" >
        <input class="input-file-new-post" type="file" name="picture-profil-edit" id="picture-profil-edit"/>
        <label class="input-file-design" for="picture-profil-edit"><i class="fa-solid fa-arrows-rotate"></i> Changer ma photo de profil</label>
        <br>
        <br>
        <br>   
        <span>
          <p style="font-size:10px">(format : png,jpg,gif)</p>
          <strong id="new-file-name">Nom du fichier : </strong>
          <span id="file-name">Aucun</span>
          <br>
        </span>
        <br>
        <button id="send-modified-profil" v-on:click="editProfil()"><i class="fa-solid fa-check"></i> Valider</button>
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
    setDefault(){
      axios.put(`https://sannier-renaud.fr/portfolio/groupomania/api/user/${this.connectedId}`,{picture : ''})
      .then(() => {
        axios.get('https://sannier-renaud.fr/portfolio/groupomania/api/post')
        .then((res) => {
          let posts = res.data.allPosts
          let postedByUser = posts.filter(p => p.posterId === this.connectedId)
          if(postedByUser.length > 0){
          for (let i = 0; i < postedByUser.length; i++) {
                axios.put(`https://sannier-renaud.fr/portfolio/groupomania/api/post/${postedByUser[i]._id}`, {posterProfil : "https://sannier-renaud.fr/portfolio/groupomania/images/default/default.png"})
                .then(() => window.location.reload())
                .catch((err) => {
                  console.log(err)
                })
            }
          }
            else{
              window.location.reload()
            }
        })
      })
      .catch()
    },
    editProfil() {
      let imgPictureEdit =  document.querySelector("#picture-profil-edit")
      if(imgPictureEdit.files[0]){
        if(imgPictureEdit.files[0].name.includes('"')){
          alert('Nom de fichier incorrect, supprimer les accents ou caractères spéciaux')
        }
        else{
        let formData = new FormData()
        formData.append('file', imgPictureEdit.files[0])
        axios.put(`https://sannier-renaud.fr/portfolio/groupomania/api/user/${this.connectedId}`,formData)
        .then((updatedUser) => {
          axios.get('https://sannier-renaud.fr/portfolio/groupomania/api/post')
          .then((res) => {
            let posts = res.data.allPosts
            let postedByUser = posts.filter(p => p.posterId === this.connectedId)
            for (let i = 0; i < postedByUser.length; i++) {
                  axios.put(`https://sannier-renaud.fr/portfolio/groupomania/api/post/${postedByUser[i]._id}`, {posterProfil : updatedUser.data.picture})
                  .then()
                  .catch(err => console.log(err))
            }
            window.location.reload()
          })
          .catch(err => console.log(err))
        })
        .catch()
      }
    }
    else{
      alert('Aucun fichier chargé')
      }         
    },
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    }
  },
  mounted() {
    axios.get('https://sannier-renaud.fr/portfolio/groupomania/api/user/me')
    .then((userConnected) => {
      console.log(userConnected)
        this.logged = true;
        axios.get(`https://sannier-renaud.fr/portfolio/groupomania/api/user/${userConnected.data.data._id}`)
        .then((user) => {
          this.firstname = user.data.firstname
          this.lastname = user.data.lastname
          this.email = user.data.email
          this.picture = user.data.picture
          this.connectedId = user.data._id
          let inputFile = document.querySelector('#picture-profil-edit')
          let fileName = document.querySelector('#file-name')
          inputFile.addEventListener('change', () => {
            fileName.textContent = inputFile.files[0].name
          })
        })
        .catch();
      })
    .catch((err) => console.log(err))
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
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.34);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

html{
  height: 700px;
}

#picture-profil{
  width: 210px;
  height: 210px;
  border: 1px  black solid;
  position: relative;
  left: 25px;
  object-fit:cover;
  border-radius: 50%;
  margin-bottom: 20px;
}

#picture-profil-edit{
  display: none;
}

#newPost > label{
  transition: 0.5s;
  color: black;
  background-color: rgb(105, 161, 239);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  &:hover{
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(20, 51, 79);
    color: rgb(255, 255, 255);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
    }
}

#file-name{
  font-size: 15px;
  font-weight: bold;
}

#new-file-name{
  font-size: 15px;
}

#send-modified-profil{
  background-color: rgb(105, 161, 239);
  color: black;
  margin-top: 3px;
  margin-bottom: 10px;
  border-radius: 4px;
  &:hover{
    transition: 0.5s;
    background-color: rgb(20, 51, 79);
    color: white;
  }
  transition: 0.5s;
  border-radius: 8px;
}

.default-picture{
    position: relative;
    left: -25px;
    transform: scale(0.9);
    top: -195px;
}


</style>