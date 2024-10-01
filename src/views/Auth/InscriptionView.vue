<template>
  <div>
    <div class="registration-container">
      <div class="form-section">
        <div class="container">
          <div class="left-panel col-md-5">
            <h2>Rejoignez la santé de demain, aujourd'hui !</h2>
            <p>
              Inscrivez-vous dès maintenant pour accéder à des consultations
              médicales en ligne, suivre votre dossier médical, et bénéficier de
              conseils de santé, où que vous soyez.
            </p>
            <img
              src="../../../public/image/illustration01.png"
              alt="medical image"
              class="img-fluid mt-4"
            />
          </div>
          <div class="form-panel col-md-7">
            <h3>Se créer un compte</h3>
            <form>
              <div class="row mb-3">
                <div class="col">
                  <label for="prenom" class="form-label">Prénom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                  />
                </div>
                <div class="col">
                  <label for="nom" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Nom"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="telephone"
                  placeholder="77 123 45 67"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="exemple@exemple.com"
                />
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Mot de passe"
                  />
                </div>
                <div class="col">
                  <label for="confirmPassword" class="form-label"
                    >Confirmer mot de passe</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    placeholder="Confirmer mot de passe"
                  />
                </div>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-custom">S'inscrire</button>
              </div>
              <div class="already-account">
                <p>Déjà un compte ? <a href="#">Se connecter ici</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/auth/InscriptionView.css";
</script>
