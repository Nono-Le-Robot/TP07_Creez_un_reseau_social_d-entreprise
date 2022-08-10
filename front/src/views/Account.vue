<template>
  <div>
    <div id="userInfos">
        <br>
        <h1><i class="fa-solid fa-file-user"></i>Mon compte :</h1>
        <br>
        <img id="picture-profil" :src='picture' alt="" srcset="">
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
    editProfil() {
        let imgPictureEdit =  document.querySelector("#picture-profil-edit")
            if(imgPictureEdit.files[0]){
              if(imgPictureEdit.files[0].name.includes('"')){
                alert('Nom de fichier incorrect, supprimer les accents ou caractères spéciaux')
              }
              else{
                let formData = new FormData()
        formData.append('file', imgPictureEdit.files[0])
        axios.put(`http://localhost:5000/api/user/${this.connectedId}`,formData)
        .then((updatedUser) => {
          axios.get('http://localhost:5000/api/post')
          .then((res) => {
            let posts = res.data
            let postedByUser = posts.filter(p => p.posterId === this.connectedId)
            for (let i = 0; i < postedByUser.length; i++) {
                  axios.put(`http://localhost:5000/api/post/${postedByUser[i]._id}`, {
                      posterProfil : updatedUser.data.picture
                  })
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
            let inputFile = document.querySelector('#picture-profil-edit')
            let fileName = document.querySelector('#file-name')
            inputFile.addEventListener('change', () => {
              fileName.textContent = inputFile.files[0].name
            })
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit:cover;
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
  border-radius: 4px;
  &:hover{
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(20, 51, 79);
    color: rgb(255, 255, 255);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
}
    border-radius: 8px;
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
</style>
