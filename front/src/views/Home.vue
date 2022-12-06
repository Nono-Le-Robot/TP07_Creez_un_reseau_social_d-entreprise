<template>
  <div>
    <div id="createnew-post">
      <form
        id="new-post"
        v-if="logged === true"
        enctype="multipart/form-data"
        v-on:submit.prevent="onSubmit"
        action="new-post"
      >
        <br />
        <input
          type="text"
          maxlength="300"
          name="message"
          id="message-input"
          placeholder="Que souhaitez vous partager ?"
          v-model="message"
          autocomplete="off"
        />
        <br />
        <label id="design-input-file" for="picture">
          <i class="fa-solid fa-file-arrow-up"></i> Choisir un fichier...</label
        >
        <input
          class="input-file-new-post"
          type="file"
          name="picture"
          id="picture"
        />
        <p style="font-size: 12px; margin-bottom: 20px">
          (format : png,jpg,gif)
        </p>
        <span>
          <strong id="new-file-name">Nom du fichier : </strong>
          <span id="file-name">Aucun</span>
        </span>
        <button id="btn-new-post" @click="createPost()">
          <i class="fa-solid fa-paper-plane"></i> Envoyer
        </button>
        <br />
      </form>
    </div>
    <div v-if="logged === true">
      <div v-for="(post, index) in posts" :key="post.id" id="posts">
        <div class="one-post">
          <br />
          <div class="user-infos load">
            <img
              id="picture-profil-post"
              :src="post.posterProfil"
              alt=""
              srcset=""
            />
            <p>{{ post.posterFirstname }} {{ post.posterLastname }} :</p>
          </div>
          <br />
          <p class="message-post">{{ post.message }}</p>
          <br />
          <img class="post-picture" :src="post.picture" alt="" />
          <div class="separator"></div>
          <br />
          <p class="post-id" hidden>{{ post._id }}</p>
          <div class="post-footer">
            <form
              id="editPost"
              v-if="post.selected === true"
              enctype="multipart/form-data"
              v-on:submit.prevent="onSubmit"
              action="editPost"
            >
              <span class="new-file-input">
                <div class="inputs-user">
                  <p class="p-modify">que voulez vous modifier ?</p>
                  <input
                    type="text"
                    name="message-edit"
                    class="message-input-edit"
                    autocomplete="off"
                    v-model="messageEdit"
                  />
                  <button class="new-design-edit">
                    <p>
                      <i class="fa-solid fa-file-arrow-up"></i> Choisir un
                      fichier...
                    </p>
                    <input
                      @change="previewFiles"
                      id="picture-edit"
                      type="file"
                      name="picture-edit"
                      class="input-file-new-post picture-edit-select"
                    />
                  </button>
                  <p
                    class="supported-formats"
                    style="font-size: 12px; margin-bottom: 20px"
                  >
                    (format : png,jpg,gif)
                  </p>
                </div>
                <strong id="new-file-name">Nom du fichier : </strong>
                <span class="get-name" id="file-name">{{ file.name }}</span>
              </span>
            </form>
            <button
              v-if="
                post.selected === true &&
                post.picture !=
                  'https://sannier-renaud.fr/portfolio/groupomania/images/default/deleted-picture.jpg' &&
                deletePictureChecked === false
              "
              class="delete-picture-edit"
              @click="deletePicture(post._id, index), (file = [])"
            >
              <i class="fa-solid fa-trash-can"></i> Supprimer la photo
            </button>
            <button
              v-else-if="
                post.selected === true &&
                post.picture !=
                  'https://sannier-renaud.fr/portfolio/groupomania/images/default/deleted-picture.jpg' &&
                deletePictureChecked === true
              "
              class="delete-picture-edit"
            >
              <i id="btnDeleteChecked" class="fa-solid fa-check"></i> La photo a
              bien été supprimée
            </button>
            <br />
            <div v-if="post.selected === true" class="separator2"></div>
            <div class="post-options-btn">
              <i
                :class="
                  userLikedPosts.includes(post._id)
                    ? 'fa-heart'
                    : 'fa-thumbs-up'
                "
                @click="likeRequest(index, post._id)"
                v-if="post.selected === false"
                class="btn-like fa-solid"
                ><span class="bubble-likes">{{ post.likers.length }}</span></i
              >
              <i
                @click="
                  editPost(index, posts),
                    hideBubble(),
                    (post.selected = true),
                    (messageEdit = post.message)
                "
                v-if="
                  (post.posterId === connectedUserId &&
                    post.selected === false) ||
                  (connectedUserId === '62f2ae7fd2fc5c1305443984' &&
                    post.selected === false)
                "
                class="fa-solid fa-pen-to-square"
              ></i>
              <i
                @click="deletePost(post._id), showBubble()"
                v-if="
                  (post.posterId === connectedUserId &&
                    post.selected === false) ||
                  (connectedUserId === '62f2ae7fd2fc5c1305443984' &&
                    post.selected === false)
                "
                class="fa-solid fa-trash"
              ></i>
              <i
                @click="
                  sendPost(post._id, index, file),
                    showBubble(),
                    (file = []),
                    showOtherBtn(post._id, index),
                    (deletePictureChecked = false)
                "
                v-if="post.selected === true"
                class="fa-solid fa-check confirm-btn"
              ></i>
              <i
                @click="
                  (post.selected = false),
                    (file = []),
                    (messageEdit = post.message),
                    getPosts(),
                    showBubble(),
                    showOtherBtn(post._id, index),
                    (deletePictureChecked = false)
                "
                v-if="post.selected === true"
                class="fa-solid fa-xmark"
              ></i>
            </div>
            <p class="date-post">posté le : {{ post.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deletePictureChecked: false,
      logged: false,
      message: "",
      messageEdit: "",
      posts: [],
      posterFirstname: "",
      posterLastname: "",
      posterProfil: "",
      connectedUserId: "",
      selectedPost: "",
      userLikedPosts: [],
      file: [],
    };
  },
  methods: {
    hideOtherBtn() {
      const likeBtn = document.querySelectorAll(".btn-like");
      const editBtn = document.querySelectorAll(".fa-pen-to-square");
      const deleteBtn = document.querySelectorAll(".fa-trash");
      for (let n = 0; n < likeBtn.length; n++) {
        likeBtn[n].classList.add("hidden");
      }
      for (let n = 0; n < editBtn.length; n++) {
        editBtn[n].classList.add("hidden");
      }
      for (let n = 0; n < deleteBtn.length; n++) {
        deleteBtn[n].classList.add("hidden");
      }
      this.hideBubble();
    },
    showOtherBtn(postId, index) {
      const imgDeleted = document.querySelectorAll(".post-picture");
      imgDeleted[index].classList.remove("deleted-picture");
      const likeBtn = document.querySelectorAll(".btn-like");
      const editBtn = document.querySelectorAll(".fa-pen-to-square");
      const deleteBtn = document.querySelectorAll(".fa-trash");
      for (let n = 0; n < likeBtn.length; n++) {
        likeBtn[n].classList.remove("hidden");
      }
      for (let n = 0; n < editBtn.length; n++) {
        editBtn[n].classList.remove("hidden");
      }
      for (let n = 0; n < deleteBtn.length; n++) {
        deleteBtn[n].classList.remove("hidden");
      }
      this.showBubble();
      this.updateLike();
    },
    hideBubble() {
      const likeBubbleOwnPost = document.querySelectorAll(
        ".design-like-number"
      );
      const likeBubble = document.querySelectorAll(
        ".design-like-number-own-post"
      );
      for (let n = 0; n < likeBubbleOwnPost.length; n++) {
        likeBubbleOwnPost[n].classList.add("hidden");
      }
      for (let n = 0; n < likeBubble.length; n++) {
        likeBubble[n].classList.add("hidden");
      }
    },
    showBubble() {
      const likeBubbleOwnPost = document.querySelectorAll(
        ".design-like-number"
      );
      const likeBubble = document.querySelectorAll(
        ".design-like-number-own-post"
      );
      for (let n = 0; n < likeBubbleOwnPost.length; n++) {
        likeBubbleOwnPost[n].classList.remove("hidden");
      }
      for (let n = 0; n < likeBubble.length; n++) {
        likeBubble[n].classList.remove("hidden");
      }
    },
    previewFiles(event) {
      this.file = event.target.files[0];
    },
    editPost() {
      this.hideOtherBtn();
    },
    sendPost(postId, index, file) {
      let formData = new FormData();
      formData.append("posterId", this.connectedUserId);
      formData.append("message", this.messageEdit);
      formData.append("file", file);
      axios
        .put(
          `https://sannier-renaud.fr/portfolio/groupomania/api/post/${postId}`,
          formData
        )
        .then(() => this.getPosts())
        .catch((err) => console.log(err));
    },
    deletePicture(postId, index) {
      if (
        window.confirm(
          "Voulez vous vraiment supprimer cette photo ? \n\n ⚠️ Cette action est irrévérsible ⚠️"
        )
      ) {
        this.deletePictureChecked = true;
        axios
          .put(
            `https://sannier-renaud.fr/portfolio/groupomania/api/post/${postId}`,
            {
              picture:
                "https://sannier-renaud.fr/portfolio/groupomania/images/default/deleted-picture.jpg",
            }
          )
          .then(() => {
            const imgDeleted = document.querySelectorAll(".post-picture");
            imgDeleted[index].classList.add("deleted-picture");
          })
          .catch();
      }
    },
    getUsers() {
      axios
        .get("https://sannier-renaud.fr/portfolio/groupomania/api/user")
        .then()
        .catch((err) => console.log(err));
    },
    getPosts() {
      axios
        .get("https://sannier-renaud.fr/portfolio/groupomania/api/post")
        .then((posts) => {
          this.posts = posts.data.allPosts;
          this.updateLike();
        })
        .catch((err) => console.log(err.message));
    },
    updateLike() {
      axios
        .get(
          `https://sannier-renaud.fr/portfolio/groupomania/api/user/${this.connectedUserId}`
        )
        .then((user) => {
          this.userLikedPosts = user.data.likes;
        })
        .catch();
    },
    createPost() {
      const img = document.getElementById("picture");
      if (img.files[0]) {
        if (img.files[0].name.includes('"')) {
          alert(
            "Nom de fichier incorrect, supprimer les accents ou caractères spéciaux"
          );
        } else {
          let formData = new FormData();
          formData.append("posterId", this.connectedUserId);
          formData.append("posterFirstname", this.posterFirstname);
          formData.append("posterLastname", this.posterLastname);
          formData.append("posterProfil", this.posterProfil);
          formData.append("message", this.message);
          formData.append("file", img.files[0]);
          axios
            .post(
              `https://sannier-renaud.fr/portfolio/groupomania/api/post`,
              formData
            )
            .then(() => {
              window.location.reload();
            })
            .catch();
        }
      } else {
        let test = this.message.split(" ").join("");
        if (test === "") {
          alert("Vous ne pouvez pas créer un post vide.");
        } else {
          let formData = new FormData();
          formData.append("posterId", this.connectedUserId);
          formData.append("posterFirstname", this.posterFirstname);
          formData.append("posterLastname", this.posterLastname);
          formData.append("posterProfil", this.posterProfil);
          formData.append("message", this.message);
          axios
            .post(
              `https://sannier-renaud.fr/portfolio/groupomania/api/post`,
              formData
            )
            .then(() => {
              window.location.reload();
            })
            .catch();
        }
      }
    },
    deletePost(postId) {
      if (
        window.confirm(
          "Voulez vous vraiment supprimer ce post ? \n\n ⚠️ Cette action est irrévérsible ⚠️"
        )
      ) {
        axios
          .delete(
            `https://sannier-renaud.fr/portfolio/groupomania/api/post/${postId}`
          )
          .then((deletedPost) => {
            deletedPost.data.deletedPost.likers.forEach(
              (userIdLikeToDelete) => {
                axios.patch(
                  `https://sannier-renaud.fr/portfolio/groupomania/api/post/unlike-post/${postId}`,
                  { id: userIdLikeToDelete }
                );
              }
            );
            this.getPosts();
          })
          .catch((err) => console.log(err));
      }
    },
    likeRequest(index, postId) {
      const likeBtn = document.querySelectorAll(".btn-like");
      if (likeBtn[index].classList.contains("fa-thumbs-up")) {
        axios
          .patch(
            `https://sannier-renaud.fr/portfolio/groupomania/api/post/like-post/${postId}`,
            { id: this.connectedUserId }
          )
          .then(() => {
            this.updateLike();
            this.getPosts();
          })
          .catch((err) => console.log(err));
        likeBtn[index].classList.replace("fa-thumbs-up", "fa-heart");
      } else if (likeBtn[index].classList.contains("fa-heart")) {
        axios
          .patch(
            `https://sannier-renaud.fr/portfolio/groupomania/api/post/unlike-post/${postId}`,
            { id: this.connectedUserId }
          )
          .then(() => this.getPosts())
          .catch((err) => console.log(err));
        likeBtn[index].classList.replace("fa-heart", "fa-thumbs-up");
      }
    },
  },
  mounted() {
    axios
      .get(`https://sannier-renaud.fr/portfolio/groupomania/api/user/me`)
      .then((user) => {
        this.connectedUserId = user.data.data._id;
        axios
          .get(
            `https://sannier-renaud.fr/portfolio/groupomania/api/user/${user.data.data._id}`
          )
          .then((result) => {
            this.posterFirstname = result.data.firstname;
            this.posterLastname = result.data.lastname;
            this.posterProfil = result.data.picture;
            this.userLikedPosts = result.data.likes;
          })
          .catch();
        this.logged = true;
        axios
          .get("https://sannier-renaud.fr/portfolio/groupomania/api/post/")
          .then((res) => {
            this.posts = res.data.allPosts;
            let inputFile = document.querySelector("#picture");
            let fileName = document.querySelector("#file-name");
            inputFile.addEventListener("change", () => {
              fileName.textContent = inputFile.files[0].name;
            });
          })
          .catch();
      })
      .catch((err) => {
        document.cookie = "jwt=;max-age=0";
        this.logged = false;
        const posts = document.querySelector("#p-not-connected");
      });
  },
};
</script>

<style lang="scss">
@import "../sass/variables/colors.scss";
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
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.631);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}

.hidden {
  opacity: 0;
}

#new-post {
  margin-bottom: 50px;
  font-size: 20px;
  padding: 25px;
  background-color: $independence;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.34);
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

body {
  padding-bottom: 10px;
}

.test,
.test2 {
  margin-top: 20px;
}

#picture-profil-post {
  transition: 0.2s;
  margin-right: 20px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transform: scale(2);
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(8.8) translateX(-2px) translateY(12%);
    position: absolute;
    left: 50%;
    background: rgb(73, 70, 86);
    transition: 0.2s;
  }
}

.user-infos {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: scale(1.2);
}

.post-picture {
  width: 80%;
  border-radius: 8px;
  margin-bottom: 40px;
  &:hover {
    cursor: nesw-resize;
    transition: 0.2s ease-in-out;
  }
  &:active {
    width: 100%;
    transition: 0.2s ease-in-out;
  }
}
#message-input {
  width: 50%;
  margin-bottom: 20px;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus {
    outline: none;
  }
}

.message-input-edit {
  width: 50%;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus {
    outline: none;
  }
}

.message-input-edit {
  margin-bottom: 20px;
  width: 400px;
  height: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.447);
  transform: scale(1.1);
  border: none;
  &:focus {
    outline: none;
  }
}

.fa-heart {
  transition: 0.2s;
  width: 20px;
  background-color: rgb(244, 128, 255);
  padding: 10px 10px 10px 10px;
  border-radius: 50px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    background-color: rgb(122, 19, 148);
    color: white;
  }
}

.fa-thumbs-up {
  transition: 0.6s;
  width: 20px;
  background-color: rgb(130, 242, 255);
  padding: 10px;
  border-radius: 50%;
  color: rgb(0, 0, 0);
  cursor: pointer;
  &:hover {
    transition: 0.6s;
    background-color: rgb(10, 94, 113);
    color: white;
  }
}

.fa-pen-to-square {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(255, 219, 165);
  padding: 10px;
  border-radius: 50%;
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
  border-radius: 50%;
  color: rgb(0, 0, 0);
  cursor: pointer;
  &:hover {
    transition: 0.4s;
    background-color: rgb(168, 35, 35);
    color: white;
  }
}

.confirm-btn {
  transition: 0.4s;
  width: 20px;
  background-color: rgb(118, 255, 113);
  padding: 10px;
  border-radius: 50%;
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
  border-radius: 50%;
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

.hidden-input,
.picture-edit-select {
  position: relative;
  top: -25px;
  left: -15px;
  width: 160px;
  height: 30px;
  border-radius: 8px;
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
  word-wrap: break-word;
  width: 85%;
  line-height: 40px;
}

#top-nav > nav > a:nth-child(3) {
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
  color: rgb(0, 0, 0);
  background-color: rgb(105, 166, 239);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(20, 45, 79);
    color: rgb(255, 251, 251);
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
  color: rgb(0, 0, 0);
  background-color: rgb(105, 166, 239);
  border: solid 1px black;
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  height: 40px;
  width: 200px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(20, 45, 79);
    color: rgb(255, 255, 255);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

.delete-picture-edit {
  transition: 0.5s;
  color: rgb(0, 0, 0);
  border: solid 1px black;
  background-color: rgb(239, 105, 105);
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(79, 20, 20);
    color: rgb(255, 247, 247);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

#btn-new-post {
  margin-top: 20px;
  transition: 0.5s;
  color: rgb(0, 0, 0);
  border: solid 1px black;
  background-color: rgb(105, 161, 239);
  font-weight: bold;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    transition: 0.5s;
    background-color: rgb(20, 51, 79);
    color: rgb(255, 247, 247);
    transform: scale(1.03);
    box-shadow: 1px 1px 1px black;
  }
}

.post-footer {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  width: 80%;
}

.design-like-number-own-post {
  position: relative;
  top: -63px;
  left: -37px;
  font-weight: bold;
  box-shadow: 1px 1px 2px rgba(18, 14, 14, 0.291);
  background: rgb(251, 255, 201);
  color: rgb(0, 0, 0);
  padding: 1px 4px;
  font-size: 13px;
  border-radius: 100px;
}

.design-like-number {
  position: relative;
  top: -63px;
  left: 13px;
  font-weight: bold;
  box-shadow: 1px 1px 2px rgba(18, 14, 14, 0.291);
  background: rgb(251, 255, 201);
  color: rgb(0, 0, 0);
  padding: 1px 4px;
  font-size: 13px;
  border-radius: 100px;
}

.deleted-picture {
  transition: 0.5s;
  opacity: 0.4;
  filter: grayscale(2);
}

.p-modify {
  margin-bottom: 20px;
}

.picture-edit-select {
  padding: 0;
}

#p-not-connected {
  font-size: 30px;
  font-weight: bold;
  position: absolute;
  top: 150px;
  left: 50px;
}
.fa-arrow-left-long {
  transform: rotate(45deg);
  position: fixed;
  top: 100px;
  left: 100px;
}

.separator {
  width: 80%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.198);
  margin-bottom: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.227);
}

.separator2 {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.198);
  margin-bottom: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.227);
}

.bubble-likes {
  position: relative;
  top: -34px;
  left: 18px;
  font-size: 11px;
  background-color: rgb(251, 215, 147);
  border-radius: 50%;
  padding: 4px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

#posts > div > div.post-footer > div > i.fa-heart.btn-like.fa-solid,
#posts > div > div.post-footer > div > i.fa-thumbs-up.btn-like.fa-solid {
  height: 20px;
}
</style>