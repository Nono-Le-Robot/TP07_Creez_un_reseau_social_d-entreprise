<template>
    <form @submit.prevent>
        <label for="inscription">Inscription</label>
        <p>Email :</p>
        <input type="text" name="email" v-model="email">
        <p>Mot de passe :</p>
        <input type="text" name="password" v-model="password">
        <br>
        <button type="submit" @click="register">S'inscrire</button>
    </form>
</template>

<script>
import { ref } from 'vue';
export default {
    setup(props, ctx) {
        let email = ref("")
        let password = ref("")
        const register = function() {
            let userData = {
                'email' : email.value,
                'password' : password.value
            }
            ctx.emit("newUser", userData)
            userData = {}
            email.value = "";
            password.value = "";
        }
        return{
            email,
            password,
            register,
        }
    }
}
</script>

<style>

</style>