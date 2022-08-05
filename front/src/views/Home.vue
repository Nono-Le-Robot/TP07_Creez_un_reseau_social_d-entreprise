<template>
    <div id="createNewPost">
      <form id="newPost" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="newPost" >
        <br>
        <input type="text" name="message" id="message-input" placeholder="Que souhaitez vous dire ?" v-model="message" autocomplete="off" /> 
        <br>
              <label id="design-input-file" for="picture">Choisissez un fichier...</label>
              <br>
          <input class="input-file-new-post" type="file" name="picture" id="picture"/><p style="font-size:10px">(format : png,jpg,gif)</p>

<br>
                  <span>
          <strong id="new-file-name">Nom du fichier : </strong>
          <span id="file-name">Aucun</span>
        </span>



              
        <br>
        <button id="btn-new-post" @click="createPost()">Envoyer</button>
      </form>
    </div>
    <br>
  <p id='p-not-connected' v-if="logged === false">Veuillez vous connecter</p>
  <div 
  v-for="post in posts" 
  v-if="logged === true"  
  id="posts">
  <br>
    <div class='one-post'>
      <div class='user-infos'>
        <img id='picture-profil-post' :src="post.posterProfil" alt="" srcset="">
        <br>
        <p>{{ post.posterFirstname }}  {{ post.posterLastname }} : </p>
      </div>
      <br>
      <p class="message-post">{{ post.message }}</p>
      <br>
      <div class="edit-post-input">
      </div> 
      <br>
      <img class="post-picture" :src="post.picture" alt="">
      <p class="confirm-edit"></p>
      <p class="confirm-delete"></p>






        <form id="editPost" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="editPost" >
        <span class="new-file-input hidden">
          <div class="inputs-user">
            <input id="picture-edit" type="file" name="picture-edit" class="hidden input-file-new-post picture-edit-select"/>
            <input type="text" name="message-edit" class="hidden message-input-edit" v-model="messageEdit" autocomplete="off" /> 
            <br>
            <label class="new-design-edit" for="picture-edit">Choisissez un fichier...</label>
            <br>
      <p class = 'supported-formats hidden' style="font-size:10px">(format : png,jpg,gif)</p><br>
      </div>
            <strong id="new-file-name">Nom du fichier : </strong>
          <span class='get-name' id="file-name">Aucun</span>

            <br>
          
        </span>
        
      </form>

<br>









      <p class="post-id" hidden>{{ post._id }}</p>
      <div class="post-options-btn">
        <i @mouseover="likeRequest()" :class="userLikedPosts.includes(post._id) ? 'fa-heart' : 'fa-thumbs-up'" class="btn-like fa-solid"></i>
        <i @mouseover="updatePost(post._id) " v-if="post.posterId === connectedUserId || connectedUserId === '62e7ac92ec5d36273c96911e' " class="fa-solid fa-pen-to-square"></i>
        <i @click="deletePost(post._id)"  v-if="post.posterId === connectedUserId || connectedUserId === '62e7ac92ec5d36273c96911e' " class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-check hidden "></i> 
        
         <i class="fa-solid fa-xmark hidden "></i> 
      </div>
      <br>
      <p class="date-post">posté le : {{ post.date }}</p>
    </div>
    <br>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logged: false,
      message: "",
      messageEdit :"",
      posts: [],
      connectedUserId: "",
      posterLastname : '',
      posterFirstname : "",
      posterProfil : "",
      selectedPost: "",
      userLikedPosts : [],
    };
  },
  methods: {
    //================= Fetch data functions ================
    //====================== Users =====================
    getUsers(){
      axios.get('http://localhost:5000/api/user')
      .then()
      .catch((err) => console.log(err))
    },   
    updateUser(userId, updateUserData){
      axios.put(`http://localhost:5000/api/post/${userId}`, updateUserData)
      .then((updatedUser) => console.log(updatedUser.data))
      .catch((err) => console.log(err))
    },
    deleteUser(userId){
      axios.delete(`http://localhost:5000/api/user/${userId}`)
      .then((deletedUser) => console.log(deletedUser.data))
      .catch((err) => console.log(err))
    },
    //====================== Posts =====================
    getPosts(){
      axios.get('http://localhost:5000/api/post')
      .then((posts) => {
        this.posts = posts.data
      })
      .catch((err) => console.log(err.message))
    },
    createPost(){
            const img = document.getElementById('picture')
            let formData = new FormData()
            formData.append('posterId', this.connectedUserId)
            formData.append('posterFirstname', this.posterFirstname)
            formData.append('posterLastname',this.posterLastname)
            formData.append('posterProfil', this.posterProfil)
            formData.append('message', this.message)
            formData.append('file', img.files[0])
            axios.post(`http://localhost:5000/api/post`, formData)
            .then(() => window.location.reload())
            .catch((err) => console.log(err.message))
    },
    updatePost(postId){
            axios.get(`http://localhost:5000/api/post/${postId}`)
                    .then((post) => {
                      this.messageEdit = post.data.message
                
      const confirmEditText = document.querySelectorAll('.confirm-edit')
      const likeBtn = document.querySelectorAll(".btn-like")
      const newInput = document.querySelectorAll(".new-file-input")
      const editBtn = document.querySelectorAll(".fa-pen-to-square")
      const deleteBtn = document.querySelectorAll(".fa-trash")
      const confirmBtn = document.querySelectorAll('.fa-check')
      const cancelBtn = document.querySelectorAll('.fa-xmark')
      const inputMessageEdit = document.querySelectorAll('.message-input-edit')
      const imgEdit =  document.querySelectorAll(".picture-edit-select")
      const supportedFormats = document.querySelectorAll('.supported-formats')
      const getName = document.querySelectorAll('#file-name.get-name')
      for (let j = 0; j < confirmBtn.length; j++) {
        editBtn[j].addEventListener ('click', () =>{
          newInput[j].classList.remove('hidden')
          imgEdit[j].classList.remove('hidden')
          supportedFormats[j].classList.remove('hidden')
          confirmEditText[j].textContent='Message du post : '
          likeBtn[j].classList.add('hidden')
          editBtn[j].classList.add('hidden')
          deleteBtn[j].classList.add('hidden')
          inputMessageEdit[j].classList.replace('hidden', 'visible')
          confirmBtn[j].classList.replace('hidden', 'visible')
          cancelBtn[j].classList.replace('hidden', 'visible')
          console.log(imgEdit[j]);
          console.log(getName[j]);
          imgEdit[j].addEventListener("change", () => {
              getName[j].textContent = imgEdit[j].files[0].name
          })
          confirmBtn[j].addEventListener('click', () => {
            newInput[j].classList.add('hidden')
            imgEdit[j].classList.add('hidden')
            supportedFormats[j].classList.add('hidden')
            confirmEditText[j].textContent='' 
              likeBtn[j].classList.remove('hidden')
              editBtn[j].classList.remove('hidden')
              deleteBtn[j].classList.remove('hidden')
              inputMessageEdit[j].classList.replace('visible', 'hidden')
              confirmBtn[j].classList.replace('visible' ,'hidden')
              cancelBtn[j].classList.replace('visible', 'hidden')
              
            let formData = new FormData()
            if(imgEdit === null){
                formData.append('message', this.messageEdit)
                formData.append('picture', post.data.picture)
            }
            else{
              formData.append('message', this.messageEdit)
              formData.append('file', imgEdit[j].files[0])
            }
            axios.put(`http://localhost:5000/api/post/${postId}`, formData)
            .then(() => {
            
              this.getPosts()
            })
            .catch((err) => console.log(err.message)
          )})
        })
        cancelBtn[j].addEventListener('click', () => {
          newInput[j].classList.add('hidden')
          imgEdit[j].classList.add('hidden')
          supportedFormats[j].classList.add('hidden')
          confirmEditText[j].textContent=''
          likeBtn[j].classList.remove('hidden')
          editBtn[j].classList.remove('hidden')
          deleteBtn[j].classList.remove('hidden')
          inputMessageEdit[j].classList.replace('visible', 'hidden')
          confirmBtn[j].classList.replace('visible' ,'hidden')
          cancelBtn[j].classList.replace('visible', 'hidden')
        })
        
      }
          })
                    .catch((err) => console.log(err))
      
    },
    deletePost(postId){
      if (window.confirm("Voulez vous vraiment supprimer ce post ? \n\n ⚠️ Cette action est irrévérsible ⚠️")) {
        axios.delete(`http://localhost:5000/api/post/${postId}`)
      .then((deletedPost) => {
        deletedPost.data.likers.forEach(userIdLikeToDelete => {
          axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{id:userIdLikeToDelete})
          .then((result) => console.log(result))
          
        });
          this.getPosts()
        })
      .catch((err) => console.log(err.message))
    }
    },
    //====================== Auth =====================
    verifyToken(){
      const token = document.cookie.slice(4)
      axios.get(`http://localhost:5000/jwtid/${token}`)
      .then()
      .catch((err) => console.log(err.message))
    },
    disconnectUser() {
      document.cookie = "jwt=;max-age=0";
      this.logged = false;
    },
    likeRequest(){
      const postId = document.querySelectorAll('.post-id')
      const btnLike = document.querySelectorAll(".btn-like")
      const token = document.cookie.slice(4)
      axios.get(`http://localhost:5000/jwtid/${token}`)
      .then((user) => {
        axios.get(`http://localhost:5000/api/user/${user.data}`)
        .then((infosUser) => {
          this.userLikedPosts = infosUser.data.likes
        })
        .catch()
      for(let k = 0; k < btnLike.length; k++){
        btnLike[k].addEventListener ('click', (event) =>{ 
          if(btnLike[k].classList.contains('fa-thumbs-up')){
            axios.patch(`http://localhost:5000/api/post/like-post/${postId[k].textContent}`,{id:user.data})
            .then(() => {
              axios.get(`http://localhost:5000/api/user/${user.data}`)
              .then((infosUser) => {
                this.userLikedPosts = infosUser.data.likes
              })
              .catch()
            })
            .catch()      
          }
          else if(btnLike[k].classList.contains('fa-heart')){
            axios.patch(`http://localhost:5000/api/post/unlike-post/${postId[k].textContent}`,{id:user.data})
            .then(() => {
              axios.get(`http://localhost:5000/api/user/${user.data}`)
              .then((infosUser) => {
                this.userLikedPosts = infosUser.data.likes
              })
              .catch()
            })
            .catch()  
          }
        })
      }
         })
      .catch()
},
  },
  mounted(){
    let token = document.cookie.slice(4);
    axios.get(`http://localhost:5000/jwtid/${token}`)
      .then((user) => {
        this.connectedUserId = user.data
    axios.get(`http://localhost:5000/api/user/${user.data}`)
    .then((result) => {
      this.userLikedPosts = result.data.likes;
      this.posterFirstname = result.data.firstname
      this.posterLastname = result.data.lastname
      this.posterProfil = result.data.picture
    })
    .catch()
        this.logged = true;
        axios.get("http://localhost:5000/api/post/")
          .then((res) => {
            this.posts = res.data
            
            let inputFile = document.querySelector('#picture')
            let fileName = document.querySelector('#file-name')
            inputFile.addEventListener('change', () => {

              fileName.textContent = inputFile.files[0].name
            })
            
            })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
        this.logged = false;
        const posts = document.querySelector('#p-not-connected')
        posts.textContent = `veuillez vous connecter`;
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
.one-post {
  font-size: 20px;
  padding: 25px;
  padding-bottom: 40px;
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
.hidden{
  display: none;
  
}
#newPost {
  margin-top: 85px;
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
.test,.test2{
    margin-top: 20px;
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
    &:hover{
      cursor: nesw-resize;
      transition : 0.2s ease-in-out;
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
.message-input-edit{
  width: 300px;
    margin-bottom: 15px;
  text-align: center;
}
.fa-heart {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(244, 128, 255);
  padding: 10px 10px 10px 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
    &:hover{
    transition: 0.4s;
    background-color: rgb(122, 19, 148) ;
    color: white ;
  }
}
.fa-thumbs-up{
  transition: 0.4s;
  width: 20px;
  background-color: rgb(130, 242, 255);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
    &:hover{
    transition: 0.4s;
    background-color: rgb(10, 94, 113) ;
    color: white ;
  }
}
.fa-pen-to-square{
  transition: 0.4s;
    width: 20px;
  background-color: rgb(255, 219, 165);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
    &:hover{
    transition: 0.4s;
    background-color: rgb(175, 113, 7) ;
    color: white ;
  }
}
.fa-trash{
  transition: 0.4s;
    width: 20px;
  background-color: rgb(255, 106, 106);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  &:hover{
    transition: 0.4s;
    background-color: rgb(168, 35, 35) ;
    color: white ;
  }
}
.fa-check{
  transition: 0.4s;
  width: 20px;
  background-color: rgb(118, 255, 113);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  margin-top: 30px;
    &:hover{
    transition: 0.4s;
    background-color: rgb(17, 105, 27) ;
    color: white ;
  }
}
.fa-xmark{
  transition: 0.4s;
  width: 20px;
  background-color: rgb(255, 129, 129);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
    margin-top: 30px;
  cursor: pointer;
    &:hover{
    transition: 0.4s;
    background-color: rgb(105, 17, 17) ;
    color: white ;
  }
}
.post-options-btn{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
  position: relative;
  top: -25px;
  
}
.hidden-input,.picture-edit-select{
  display: none;
  
}
.confirm-delete{
    margin-bottom: 20px;
  font-size: 15px;
  color: rgb(255, 131, 131);
}
.confirm-edit{
  margin-top: 20px;
  margin-bottom: 10px;
    font-size: 15px;
  color: rgb(255, 249, 131);
}
.date-post{
    font-size: 15px;
    color: rgb(224, 224, 224);
}
.message-post{
  font-size: 25px;
  font-weight: bold;
    color: rgb(224, 224, 224);
}
#top-nav > nav > a:nth-child(3){
  margin-right: 25px;
}
.inputs-user{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#picture{
  display: none;
}

label#design-input-file{
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

.new-design-edit{
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

</style>