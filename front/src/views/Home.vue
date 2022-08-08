<template>
  <div id="createnew-post">
    <form id="new-post" v-if="logged === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit"
      action="new-post">
      <input type="text" maxlength="300" name="message" id="message-input" placeholder="Que souhaitez vous dire ?" v-model="message"
        autocomplete="off" />
      <label id="design-input-file" for="picture">Choisissez un fichier...</label>
      <input class="input-file-new-post" type="file" name="picture" id="picture" />
      <p style="font-size:10px; margin-bottom: 20px;">(format : png,jpg,gif)</p>
      <span>
        <strong id="new-file-name">Nom du fichier : </strong>
        <span id="file-name">Aucun</span>
      </span>
      <button id="btn-new-post" @click="createPost()">Envoyer</button>
    </form>
  </div>



  <p id='p-not-connected' v-if="logged === false">Veuillez vous connecter</p>
  <div v-for="(post,index) in posts" :key="post.id" v-if="logged === true" id="posts">
    <div @mouseleave="post.selected = false" class='one-post' >
      <div class='user-infos'>
        <img id='picture-profil-post' :src="post.posterProfil" alt="" srcset="">
        <p>{{ post.posterFirstname }} {{ post.posterLastname }} à posté : </p>
      </div>
      <p class="message-post">{{ post.message }}</p>
      <img class="post-picture" :src="post.picture" alt="">
      
      
      
      <p class="post-id" hidden>{{ post._id }}</p>



    <div class="post-footer">
      <form  id="editPost" v-if="post.selected === true" enctype="multipart/form-data" v-on:submit.prevent="onSubmit" action="editPost">
        <span class="new-file-input">
          <div class="inputs-user">
            <input type="text" name="message-edit" class="message-input-edit" autocomplete="off" v-model="messageEdit"/>
            <button class="new-design-edit">
              <p>Choisir un fichier...</p>
              <input @change="previewFiles" id="picture-edit" type="file" name="picture-edit" class="input-file-new-post picture-edit-select" />
            </button>
          <p class='supported-formats' style="font-size:10px; margin-bottom:20px;">(format : png,jpg,gif)</p>
          </div>
          <strong id="new-file-name">Nom du fichier : </strong>
          <span class='get-name' id="file-name">{{ file.name }}</span>
        </span>
      </form>
      <button v-if="post.selected === true && post.picture != 'http://localhost:5000/images/default/deleted-picture.jpg'" class="delete-picture-edit" @click="deletePicture(post._id), file = []">Supprimer la photo</button>
      <div class="post-options-btn">
        <button hidden></button>
        <i @click="likeRequest(index, post._id)" v-if="post.selected === false"  :class="userLikedPosts.includes(post._id) ? 'fa-heart' : 'fa-thumbs-up'" class="btn-like fa-solid"></i>
        <i @click="editPost(index, posts), post.selected = true, messageEdit = post.message"  v-if="post.posterId === connectedUserId && post.selected === false  || connectedUserId === '62e7ac92ec5d36273c96911e'&& post.selected === false"  class="fa-solid fa-pen-to-square"></i>
        <i @click="deletePost(post._id)" v-if="post.posterId === connectedUserId && post.selected === false || connectedUserId === '62e7ac92ec5d36273c96911e'&& post.selected === false" class="fa-solid fa-trash"></i>
        <i @click="sendPost(post._id,file), file = []" v-if="post.selected === true" class='fa-solid fa-check'></i>
        <i @click="post.selected = false, file = [],messageEdit = post.message" v-if="post.selected === true" class="fa-solid fa-xmark"></i>
      </div>
      <p class="date-post">posté le : {{ post.date }}</p>
    </div>
    
    </div>
  </div>


</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logged: false,
      message: "",
      messageEdit: "",
      posts: [],
      connectedUserId: "",
      selectedPost: "",
      userLikedPosts: [],
      file : [],
    };
  },
  methods: {
   previewFiles(event) {
      this.file = event.target.files[0];
      console.log(this.file)
   },
    editPost(index, posts) {

    },
   sendPost(postId, file){
    let formData = new FormData()
    formData.append('posterId', this.connectedUserId)
    formData.append('message', this.messageEdit)
    formData.append('file', file)
    axios.put(`http://localhost:5000/api/post/${postId}`,formData)
    .then(() => this.getPosts())
    .catch((err) => console.log(err))

   },


    deletePicture(postId){
        axios.put(`http://localhost:5000/api/post/${postId}`, {
          picture : 'http://localhost:5000/images/default/deleted-picture.jpg'
        })
        .then(() => {
          this.getPosts()
        })
        .catch()

    },
    //================= Fetch data functions ================
    //====================== Users =====================
    getUsers() {
      axios.get('http://localhost:5000/api/user')
        .then()
        .catch((err) => console.log(err))
    },
    //====================== Posts =====================
    getPosts() {
      axios.get('http://localhost:5000/api/post')
        .then((posts) => {
          this.posts = posts.data
        })
        .catch((err) => console.log(err.message))
    },
    createPost() {
      const img = document.getElementById('picture')
      if (img.files[0]) {
        if (img.files[0].name.includes('"')) {
          alert('Nom de fichier incorrect, supprimer les accents ou caractères spéciaux')
        }
        else {
          let formData = new FormData()
          formData.append('posterId', this.connectedUserId)
          formData.append('posterFirstname', this.posterFirstname)
          formData.append('posterLastname', this.posterLastname)
          formData.append('posterProfil', this.posterProfil)
          formData.append('message', this.message)
          formData.append('file', img.files[0])
          axios.post(`http://localhost:5000/api/post`, formData)
            .then(() => {
              window.location.reload()
            })
            .catch()
        }
      }
      else {
        let formData = new FormData()
        formData.append('posterId', this.connectedUserId)
        formData.append('posterFirstname', this.posterFirstname)
        formData.append('posterLastname', this.posterLastname)
        formData.append('posterProfil', this.posterProfil)
        formData.append('message', this.message)
        axios.post(`http://localhost:5000/api/post`, formData)
          .then(() => {
            window.location.reload()
          })
          .catch()
      }
    },
    deletePost(postId) {
      if (window.confirm("Voulez vous vraiment supprimer ce post ? \n\n ⚠️ Cette action est irrévérsible ⚠️")) {
        axios.delete(`http://localhost:5000/api/post/${postId}`)
          .then((deletedPost) => {
            deletedPost.data.likers.forEach(userIdLikeToDelete => {
              axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`, { 
                id: userIdLikeToDelete })
            });
            this.getPosts()
          })
          .catch((err) => console.log(err))
      }
    },
    //====================== Auth =====================
    likeRequest(index, postId) {

    const likeBtn = document.querySelectorAll('.btn-like')
    if(likeBtn[index].classList.contains("fa-thumbs-up")){
      axios.patch(`http://localhost:5000/api/post/like-post/${postId}`,{id : this.connectedUserId})
      .then(() => this.getPosts())
      .catch((err) => console.log(err))
      likeBtn[index].classList.replace('fa-thumbs-up','fa-heart')
    } 
    else if(likeBtn[index].classList.contains("fa-heart")){
      axios.patch(`http://localhost:5000/api/post/unlike-post/${postId}`,{id : this.connectedUserId})
      .then(() => this.getPosts())
      .catch((err) => console.log(err))

      likeBtn[index].classList.replace('fa-heart','fa-thumbs-up')
    } 
    },
  },
  mounted() {
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
.one-post {
  
  font-size: 20px;
  padding: 25px;
  padding-bottom: 20px;
  background-color: $independence;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.631);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}

.hidden {
  display: none;

}

#new-post {
  margin-bottom: 50px;
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

.test,
.test2 {
  margin-top: 20px;
}

#picture-profil-post {
  transition: 0.5s;
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  transform: scale(1.3);
  margin-bottom: 15px;
  object-fit: cover;
   &:hover {
    transition: 0.5s;
    transform: scale(2);
    margin-bottom: 20px;
    margin-top: 10px;
  }
}

.user-infos {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transform: scale(1.2);
}

.post-picture {
  width: 80%;
  border-radius: 20px;

  &:hover {
    cursor: nesw-resize;
    transition: 0.2s ease-in-out;
  }

  &:active {
    width: 100%;
    transition: 0.2s ease-in-out;
  }
}
#message-input{
  width:50%;
  margin-bottom: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus{
        outline:  none;
  }
}

.message-input-edit {
  width:50%;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus{
        outline:  none;
  }
}

.message-input-edit {
  margin-bottom: 20px;
  width:400px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus{
        outline:  none;
  }
}

.fa-heart {
  transition: 0.5s;
  width: 20px;
  background-color: rgb(244, 128, 255);
  padding: 10px 10px 10px 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: rgb(122, 19, 148);
    color: white;
  }
}

.fa-thumbs-up {
  transition: 0.5s;
  width: 20px;
  background-color: rgb(130, 242, 255);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: rgb(10, 94, 113);
    color: white;
  }
}

.fa-pen-to-square {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(255, 219, 165);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: rgb(175, 113, 7);
    color: white;
  }
}

.fa-trash {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(255, 106, 106);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: rgb(168, 35, 35);
    color: white;
  }
}

.fa-check {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(118, 255, 113);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    transition: 0.4s;
    background-color: rgb(17, 105, 27);
    color: white;
  }
}

.fa-xmark {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(255, 129, 129);
  padding: 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: rgb(105, 17, 17);
    color: white;
  }
}

.post-options-btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
  position: relative;
  top: -20px;

}

.hidden-input,.picture-edit-select{
  position: relative;
  top: -25px;
  left: -15px;
  width: 160px;
  height: 30px;
  border-radius: 30px;
  opacity: 0;


}
.confirm-delete {
  margin-bottom: 20px;
  font-size: 15px;
  color: rgb(255, 131, 131);
}

.confirm-edit {
  margin-top: 20px;
  font-size: 15px;
  color: rgb(255, 249, 131);
}

.date-post {
  font-size: 15px;
  color: rgb(224, 224, 224);
}

.message-post {
  font-size: 25px;
  font-weight: bold;
  color: rgb(224, 224, 224);
  margin-bottom: 20px;
}

#top-nav>nav>a:nth-child(3) {
  margin-right: 25px;
}

.inputs-user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#picture {
  display: none;
}

label#design-input-file {
  margin-bottom: 20px;
  transition: 0.5s;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 45, 79);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(105, 166, 239);
    color: rgb(0, 0, 0);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

#file-name.get-name {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;

}

#new-file-name {
  margin-bottom: 20px;
  font-size: 15px;
}
.new-design-edit {
  margin-bottom: 20px;
  transition: 0.5s;
  color: rgb(255, 255, 255);
  background-color: rgb(20, 45, 79);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 30px;
  height: 40px;
  width: 170px;
  overflow: hidden;
   
  cursor: pointer;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(105, 166, 239);
    color: rgb(0, 0, 0);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

.delete-picture-edit {
  transition: 0.5s;
  color: rgb(255, 255, 255);
  background-color: rgb(79, 20, 20);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 30px;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(239, 105, 105);
    color: rgb(0, 0, 0);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

#btn-new-post{
  margin-top: 20px;

}

.post-footer{
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 40px;
}
</style>