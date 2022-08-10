<template>
  <div id="not-found">
    <h1>ERREUR 404</h1>
    <p id="return-error">Vous n'etes pas sur la bonne route,<br><br> ouvrez le menu pour revenir sur une route autorisée.</p>
    <i id='arrow-indicator' class="fa-solid fa-arrow-left-long"></i> 
  </div>
</template>

<script>
export default {};
</script>

<style>
#return-error{
  font-size: 30px;
}

#redirectToMain {
  font-weight: bold;
  color: rgb(117, 117, 213);
}

#not-found{
      height: 300px;
      width: 80%;
      margin-top: 110px;
      margin-left: auto;
      margin-right: auto;
}

.fa-arrow-left-long#arrow-indicator{
  position: absolute;
  top: 70px;
  left: 70px;
  z-index: -999;
  font-size: 28px;
}
</style>
