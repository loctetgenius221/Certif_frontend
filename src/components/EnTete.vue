<template>
  <header>
      <div class="container">
        <div class="header-top d-flex justify-content-between align-items-center">
          <!-- <img src="" alt=""> -->
          <h1>Logo</h1>
          <div class="contact-info d-none d-lg-flex">
            <div class="me-4 d-flex align-items-center gap-3">
              <img src="/image/iconmap.png" alt="">
              <div>
                <p class="m-0"><strong>Adresse:</strong></p>
                <p class="m-0">Av Cheikh Anta Diop, Dakar</p>
              </div>
            </div>
            <hr>
            <div class="me-4 d-flex align-items-center gap-3">
            <img src="/image/icontel.png" alt="">
            <div>
                <p class="m-0"><strong>Appelez-nous:</strong></p>
                <p class="m-0">+33 899 20 21 18</p>
              </div>
            </div>
            <hr>
            <div>
              <button class="btn btn-corail">Réserver un rendez-vous</button>
            </div>
          </div>
        </div>

        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <router-link class="nav-link active" aria-current="page" :to="{ name: 'Portail' }">Acceuil</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link active" aria-current="page" :to="{ name: 'Blog' }">Blog</router-link>
                </li>
              </ul>
              <div>
                <router-link :to="{ name: 'Connexion' }" class="btn"><img class="me-1" src="/image/connexion.svg" alt="">Connexion</router-link>
                <router-link :to="{ name: 'Inscription' }" class="btn"><img class="me-1" src="/image/inscription.svg" alt="">Inscription</router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
</template>

<script setup>
import '@/assets/css/HeaderView.css';
import { RouterLink } from 'vue-router';


</script>

<style scoped>

</style>
