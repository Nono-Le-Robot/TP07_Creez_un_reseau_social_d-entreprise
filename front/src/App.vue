<template>
  <div id="App">
    <link rel="icon" href="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
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

#top-nav {
  background-color: rgb(255, 68, 6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: 0px 0px 15px 10px;
  margin-bottom: 30px;
  position: fixed;
  top:0;
  z-index: 999;


}

#logo {
  width: 200px;
  padding-top: 5px;
  margin-left: 20px;
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
</style>
