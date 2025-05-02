<script setup>
import { ref } from "vue";
import { useAuthStore } from '../stores/auth';

const username = ref("");
const password = ref("");
const alwaysSignedIn = ref(false);
const loginMessage = ref("");

const authStore = useAuthStore();

const authenticateUser = () => {
    authStore.handleLogin(username.value, password.value, alwaysSignedIn.value);
};

</script>


<template>
    <div class="d-flex justify-content-end align-items-end min-vh-100" style="padding: 0;">
        <div class="row container-fluid d-flex justify-content-center box-area" style="padding: 0;">
            <!-- Left Box -->
            <div class="col-md-6 d-flex justify-content-center align-items-center flex-column min-vh-100 left-box"
                style="background: #fafafa; width: 65%;">
                <div class="feature-image mb-3">
                    <img src="../assets/logo-NewCity.png" class="logo-img" style="width: 500px;" />
                </div>
            </div>

            <!-- Right Box -->
            <div class="col-md-4 d-flex flex-column justify-content-center align-items-center min-vh-100 right-box"
                style="background: #3A5A40;">
                <div class="d-flex flex-column justify-content-center align-items-center title mb-5">
                    <p class="text-white text-wrap text-center fs-1 mb-0" style="font-weight: 600;">Selamat Datang</p>
                    <small class="text-white text-wrap mt-0" style="width: 21rem;">Masukkan Username dan Password Anda!</small>
                </div>

                <div id="loginForm" class="mb-5 input">
                    <label for="input-username" class="form-label text-white">Username</label>
                    <input v-model="username" type="text" class="form-control mt-0" id="input-username"
                        placeholder="Masukkan Username"
                        style="width: 21rem; height: 50px; background: transparent; color: #fafafa;"
                        @keydown.enter="authenticateUser" />
                    <label for="input-password" class="form-label text-white mt-3">Password</label>
                    <input v-model="password" type="password" class="form-control mt-0" id="input-password"
                        placeholder="Masukkan Password"
                        style="width: 21rem; height: 50px; background: transparent; color: #fafafa;"
                        @keydown.enter="authenticateUser" />
                </div>

                <div id="loginMessage" class="mt-3">
                    <p v-if="authStore.error" class="text-danger">{{ authStore.error }}</p>
                </div>

                <div class="form-check mt-3">
                    <input v-model="alwaysSignedIn" type="checkbox" class="form-check-input" id="alwaysSignedIn" />
                    <label for="alwaysSignedIn" class="form-check-label text-white">Always Signed-In</label>
                </div>

                <div class="submit-btn">
                    <button class="btn btn-primary mt-3 btn-outline-light bg-light fs-6" id="button-submit"
                        type="button" @click.prevent="authenticateUser"
                        style="width: 21rem; height: 50px; font-weight: 700; color: #3A5A40; border-radius: 20px;">
                        Masuk
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

* {
    margin: 0 !important;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #FAFAFA;
}

#input-username::-webkit-input-placeholder,
#input-password::-webkit-input-placeholder {
    color: white;
}

#loginMessage {
    color: red;
    margin-top: 0px;
    margin-bottom: -10px;
    font-size: 0.9rem;
}

.box-area {
    display: flex;
    flex-direction: row;
}

/* Untuk tampilan kecil */
@media only screen and (max-width: 1024px) {
    .box-area {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .left-box,
    .right-box {
        min-height: auto;
    }

    .right-box {
        width: 100%;
    }

    .left-box {
        height: auto;
        justify-content: center;
        padding: 20px;
    }

    .logo-img {
        width: 80%;
        max-width: 300px;
    }
}
</style>
