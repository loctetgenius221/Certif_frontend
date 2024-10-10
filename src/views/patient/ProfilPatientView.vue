<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container mb-5">
        <div class="profil-section">
          <h1 class="mb-4">Profil</h1>
          <div class="profil-heading d-flex align-items-center gap-3 mb-4">
            <img
              src="../../../public/image/portrait-3d-female-doctor.jpg"
              alt=""
            />
            <h3>Assane Sall</h3>
            -
            <p class="m-0">Patient</p>
          </div>

          <div class="form-content">
            <form>
              <div class="d-flex flex-wrap gap-3">
                <div class="mb-3 col-3">
                  <label for="prenom" class="form-label">Prénom:</label>
                  <input
                    placeholder="Assane"
                    type="text"
                    class="form-control"
                    id="prenom"
                  />
                </div>
                <div class="mb-3 col-3">
                  <label for="nom" class="form-label">Nom:</label>
                  <input
                    placeholder="Sall"
                    type="text"
                    class="form-control"
                    id="nom"
                  />
                </div>
                <div class="mb-3 col-3">
                  <label for="telephone" class="form-label">Téléphone:</label>
                  <input
                    placeholder="77 777 77 77"
                    type="tel"
                    class="form-control"
                    id="telephone"
                  />
                </div>
                <div class="mb-3 col-3">
                  <label for="email" class="form-label">Email:</label>
                  <input
                    placeholder="assane.sall@gmail.com"
                    type="email"
                    class="form-control"
                    id="email"
                  />
                </div>
                <div class="mb-3 col-3">
                  <label for="password" class="form-label">Mot de passe:</label>
                  <input
                    placeholder="mon mot de passe"
                    type="password"
                    class="form-control"
                    id="password"
                  />
                </div>
              </div>

              <div class="mt-4 d-flex align-items-center gap-4">
                <button type="submit" class="btn btn-primary">
                  Enregistrer
                </button>
                <router-link to="">Annuler</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
</script>

<style scoped></style>
