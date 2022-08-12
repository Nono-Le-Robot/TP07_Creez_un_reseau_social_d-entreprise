<template>
  <div id="App">
    
    <div id="englobe-logo">
      <router-link to="/"><img id="logo" src="./assets/logo.png" alt="Photo du logo de groupomania, représentant une planéte en line-art" /></router-link>
    </div>
    <link rel="icon" href="./assets/logo.png" />
    <nav class="menu">
      <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
      <label class="menu-open-button" for="menu-open">
        <span class="hamburger hamburger-1"></span>
        <span class="hamburger hamburger-2"></span>
        <span class="hamburger hamburger-3"></span>
      </label>
      <router-link title="Social" v-if="logged === true" to="/" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-house-chimney"></i> </router-link>
      <router-link title="Social" v-else to="/" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-house-chimney"></i> </router-link>
      <router-link title="Mon compte" v-if="logged === true" to="/account" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-user-gear"></i> </router-link>
      <router-link title="Se connecter" v-else to="/auth/login" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-key login-btn"></i> </router-link>
      <router-link title="Se déconnecter" @click="disconnectUser()" v-if="logged === true" to="/" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-power-off"></i></router-link>
      <router-link title="S'enregistrer" v-else to="/auth/register" href="#" class="menu-item"> <i style ='transform: scale(1.5);' class="fa-solid fa-user-plus"></i></router-link>
    </nav>
  </div>
  <router-view />
</template>
<script src="https://kit.fontawesome.com/0fa8c4bbfb.js" crossorigin="anonymous"></script>
<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    disconnectUser() {
      localStorage.removeItem('token')
      window.location.reload()
      this.logged = false;
    },
  },
  data(){
    return{
      logged:false
    } 
  },
  mounted(){
    axios.get('http://localhost:5000/api/user/me')
    .then(() => this.logged=true)
    .catch((err) => console.log(error))
  }
}
</script>

<style lang="scss">
//===COLORS===
//$scarlet
//$pale-pink
//$independence
//$maximum-yellow
//$french-sky-blue
@import "./sass/reset.scss";
@import "./sass/variables/colors.scss";
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

* {
  font-family: "Lato", sans-serif;
}

html {
  margin: 0;
  padding: 0;
  background-attachment: fixed;
  background-image: radial-gradient(circle at 29% 55%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 4%,
      transparent 4%,
      transparent 44%,
      transparent 44%,
      transparent 100%),
    radial-gradient(circle at 85% 89%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 51%,
      transparent 51%,
      transparent 52%,
      transparent 52%,
      transparent 100%),
    radial-gradient(circle at 6% 90%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 53%,
      transparent 53%,
      transparent 64%,
      transparent 64%,
      transparent 100%),
    radial-gradient(circle at 35% 75%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 6%,
      transparent 6%,
      transparent 98%,
      transparent 98%,
      transparent 100%),
    radial-gradient(circle at 56% 75%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 16%,
      transparent 16%,
      transparent 23%,
      transparent 23%,
      transparent 100%),
    radial-gradient(circle at 42% 0%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 3%,
      transparent 3%,
      transparent 26%,
      transparent 26%,
      transparent 100%),
    radial-gradient(circle at 29% 28%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 51%,
      transparent 51%,
      transparent 75%,
      transparent 75%,
      transparent 100%),
    radial-gradient(circle at 77% 21%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 35%,
      transparent 35%,
      transparent 55%,
      transparent 55%,
      transparent 100%),
    radial-gradient(circle at 65% 91%,
      rgba(255, 255, 255, 0.09) 0%,
      rgba(255, 255, 255, 0.09) 46%,
      transparent 46%,
      transparent 76%,
      transparent 76%,
      transparent 100%),
    linear-gradient(45deg, rgb(253, 45, 1), rgb(245, 247, 73));
  background-repeat: no-repeat;
  height: 900px;
}

#logo {
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  transform: scale(0.4);
}

#englobe-logo{
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  h1 {
    font-size: 30px;
    font-weight: bold;
  }
}

a {
  text-decoration: none;
  color: rgb(35, 35, 35);
  padding-right: 5px;
}

.router-link-active {
  font-weight: bold;
  color: rgb(121, 20, 204);
}

.fa-arrow-right-to-bracket{
  font-weight: 800;
  font-size: 25px;
  margin-left: 5px;
  margin-top: 28px;
}

#btn-new-post, #send-modified-profil{
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

a {
  color: inherit;
}

.menu-item, .menu-open-button {
  transition: 1s;
  background: #a243fc;
  color: white;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  position: absolute;
  top: 20px;
  color: black;
  text-align: center;
  line-height: 80px;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 200ms;
  &:hover{
    transition: 1s;
      background: #b464ff;
  }
  transition: 1s;
}

.menu-open {
  display: none;
}

.menu-open-button{
  border: 3px rgb(0, 0, 0) solid;
}

.hamburger {
  width: 25px;
  height: 3px;
  background: black;
  display: block;
  color: #fcfcfc;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12.5px;
  margin-top: -1.5px;
  transition: transform 200ms;
}

.hamburger-1 {
  transform: translate3d(0, -8px, 0);
}

.hamburger-2 {
  transform: translate3d(0, 0, 0);
}

.hamburger-3 {
  transform: translate3d(0, 8px, 0);
}

.menu-open:checked + .menu-open-button .hamburger-1 {
  transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-open:checked + .menu-open-button .hamburger-2 {
  transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-open:checked + .menu-open-button .hamburger-3 {
  transform: translate3d(0, 0, 0) rotate(-45deg);
}

.menu {
  
  position:fixed;
  color: #fcfcfc;
  left: 38px;
  top: -55px;
  margin-left: -190px;
  padding-top: 20px;
  padding-left: 190px;
  width: 380px;
  height: 250px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: left;
  transform: scale(0.5);
}

.menu-item:hover {
  background: #c10000;
  color: #fcfcfc;
}

.menu-item:nth-child(3) {
  transition-duration: 70ms;
}

.menu-item:nth-child(4) {
  transition-duration: 130ms;
}

.menu-item:nth-child(5) {
  transition-duration: 190ms;
}

.menu-item:nth-child(6) {
  transition-duration: 250ms;
}

.menu-item:nth-child(7) {
  transition-duration: 310ms;
}

.menu-open-button:hover {
  transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu-open:checked + .menu-open-button {
  transition-timing-function: linear;
  color: white;
  transition-duration: 200ms;
  transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu-open:checked ~ .menu-item {
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu-open:checked ~ .menu-item:nth-child(3) {
  transition-duration: 160ms;
  transform: translate3d(114.42548px, 11.48084px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(4) {
  transition-duration: 240ms;
  transform: translate3d(77.18543px, 85.2491px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(5) {
  transition-duration: 320ms;
  transform: translate3d(0.09158px, 114.99996px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(6) {
  transition-duration: 400ms;
  transform: translate3d(-77.04956px, 85.37192px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(7) {
  transition-duration: 480ms;
  transform: translate3d(-114.40705px, 11.66307px, 0);
}

#App > nav > a:nth-child(4){
  background-color: rgb(139, 195, 255);
  &:hover{
  transition: 0.2s;
    background-color: rgb(84, 112, 156);
  }
  transition: 0.2s;
}

#App > nav > a:nth-child(3){
  background-color: rgb(115, 255, 141);
    &:hover{
  transition: 0.2s;
      background-color: rgb(70, 154, 86);
  }
  transition: 0.2s;
}

#App > nav > a:nth-child(5){
  background-color: rgb(251, 193, 59);
      &:hover{
  transition: 0.2s;
  background-color: rgb(183, 104, 0);
  }
}

#App > nav > label{
  transform: scale(1.3);
}

.fa-house-chimney  {
  margin-left: 8px;
}

.fa-power-off{
margin-left: 10px;
padding-top: 10px;
}

.fa-user-plus{
margin-left: 12px;
}

.fa-user-gear{
margin-left: 20px;
}

.login-btn{
  font-weight: 800;
  font-size: 23px;
  margin-left: 14px;
  margin-top: 32px;
}

.menu-open-button {
  z-index: 2;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-duration: 400ms;
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  cursor: pointer;
  color: white;
}


</style>
