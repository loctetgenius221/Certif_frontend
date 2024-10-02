<template>
  <div>
    <div class="connexion-container">
      <div class="form-section">
        <div class="container">
          <div class="left-panel col-md-5">
            <router-link
              class="btn-retour d-flex align-items-center gap-2"
              :to="{ name: 'Portail' }"
              ><img
                src="../../../public/image/retour.svg"
                alt="retour"
              />Retour</router-link
            >
            <h2 class="mt-3">Rejoignez la santé de demain, aujourd'hui !</h2>
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
            <h3>Se connecter à son compte</h3>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="exemple@exemple.com"
                  v-model="formData.email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  v-model="formData.password"
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-custom">
                  Se connecter
                </button>
              </div>
              <div class="already-account">
                <p>
                  Déjà un compte ?
                  <router-link :to="{ name: 'Inscription' }"
                    >S'inscrire ici</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/css/auth/ConnexionView.css";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  email: "",
  password: ""
});

const handleSubmit = async () => {
  try {
    // Authentification via le store
    await authStore.authenticate('login', formData);

    // Vérifier le rôle de l'utilisateur et rediriger en fonction
    const userRole = authStore.user?.role[0]; // Assure-toi que `role` est un tableau

    if (!userRole) {
      console.error("Rôle non défini pour l'utilisateur.");
      return;
    }

    // Rediriger selon le rôle
    switch (userRole) {
      case 'administrateur':
        router.push({ name: 'AdminDashboard' });
        break;
      case 'medecin':
        router.push({ name: 'MedecinDashboard' });
        break;
      case 'patient':
        router.push({ name: 'PatientDashboard' });
        break;
      case 'assistant':
        router.push({ name: 'AssistantDashboard' });
        break;
      default:
        console.error("Rôle non reconnu.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
  }
};
</script>
