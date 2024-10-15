<template>
  <div>
    <div class="connexion-container">
      <div class="form-login-section">
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
// import "@/assets/css/auth/ConnexionView.css";
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

<style scoped>
.connexion-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}
.connexion-container .form-login-section {
  background-color: #f1948a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.form-login-section .container {
  display: flex;
  flex-direction: row;
}
.left-panel {
  color: white;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.left-panel .btn-retour {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}
.left-panel h2 {
  font-size: 24px;
  font-weight: bold;
}
.left-panel p {
  font-size: 16px;
  margin-top: 10px;
}
.left-panel .img-fluid {
  transform: scaleX(-1);
}
.form-panel {
  margin: auto;
  padding: 40px;
  width: auto;
  background-color: #fff;
}
.connexion-container .form-panel h3 {
  color: #2980B9;
  margin-bottom: 20px;
}
.connexion-container .form-panel input {
  padding: 10px 15px;
  min-width: 400px;
}
.connexion-container .btn-custom {
  background-color: #2980B9;
  color: white;
  border-radius: 5px;
}
.btn-custom:hover {
  background-color: #135a85;
}
.already-account {
  text-align: center;
  margin-top: 15px;
}
.connexion-container.already-account a {
  color: #2980B9;
}
.already-account a:hover {
  text-decoration: underline;
}
.form-control {
  border-radius: 5px;
}

</style>