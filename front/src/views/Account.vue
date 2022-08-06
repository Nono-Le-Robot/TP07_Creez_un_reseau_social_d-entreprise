<template>
  <div>
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

        <input class="input-file-new-post" type="file" name="picture-profil-edit" id="picture-profil-edit"/>
        <label class="input-file-design" for="picture-profil-edit">Choisissez un fichier...</label>
        <br>
          <p style="font-size:10px">(format : png,jpg,gif)</p>
        <br>
        <span>
          <strong id="new-file-name">Nom du fichier : </strong>
          <span id="file-name">Aucun</span>
        </span>
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
                  .then(window.location.reload())
                  .catch(err => console.log(err))
            }


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
  object-fit:cover;
}
#picture-profil-edit{
  display: none;
}
#newPost > label{
      transition: 0.5s;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 45, 79);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 30px;
  &:hover{
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(105, 166, 239);
    color: rgb(0, 0, 0);
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
</style>
