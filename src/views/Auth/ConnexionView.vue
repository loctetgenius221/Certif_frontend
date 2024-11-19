<template>
  <div>
    <div class="connexion-container">
      <div class="form-login-section">
        <div class="container">
          <div class="left-panel col-md-5">
            <router-link
              class="btn-retour d-flex align-items-center gap-2"
              :to="{ name: 'Portail' }"
            >
              <img src="../../../public/image/retour.svg" alt="retour" />Retour
            </router-link>
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

            <!-- Message d'erreur d'authentification -->
            <div
              v-if="authStore.errorMessages.length"
              class="alert alert-danger"
              role="alert"
            >
              <ul>
                <li
                  v-for="(message, index) in authStore.errorMessages"
                  :key="index"
                >
                  {{ message }}
                </li>
              </ul>
            </div>

            <form @submit.prevent="handleSubmit">
              <!-- Champ email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="exemple@exemple.com"
                  v-model="formData.email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              <!-- Champ mot de passe -->
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  v-model="formData.password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>

              <!-- Bouton de soumission -->
              <div class="d-grid">
                <button type="submit" class="btn btn-custom">
                  Se connecter
                </button>
              </div>

              <!-- Lien pour inscription -->
              <div class="already-account">
                <p>
                  Pas encore de compte ?
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

// Les données du formulaire
const formData = reactive({
  email: "",
  password: "",
});

// Les erreurs de validation
const errors = reactive({
  email: "",
  password: "",
  auth: [],
});

// Fonction de validation des champs
const validateForm = () => {
  let isValid = true;

  // Réinitialisation des erreurs
  errors.email = "";
  errors.password = "";
  errors.auth = [];

  // Validation de l'email
  if (!formData.email) {
    errors.email = "L'email est requis.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "L'email n'est pas valide.";
    isValid = false;
  }

  // Validation du mot de passe
  if (!formData.password) {
    errors.password = "Le mot de passe est requis.";
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    isValid = false;
  }

  return isValid;
};

// Gestion de la soumission du formulaire
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    // Authentification via le store
    await authStore.authenticate("login", formData);

    // Vérifier le rôle de l'utilisateur et rediriger en fonction
    const userRole = authStore.user?.role[0];

    // if (!userRole) {
    //   errors.auth.push("Erreur: rôle non défini pour l'utilisateur.");
    //   return;
    // }

    // Rediriger selon le rôle
    const roleRoutes = {
      administrateur: "AdminDashboard",
      medecin: "MedecinDashboard",
      patient: "PatientDashboard",
      assistant: "AssistantDashboard",
    };

    const targetRoute = roleRoutes[userRole];
    if (targetRoute) {
      router.push({ name: targetRoute });
    } else {
      errors.auth.push("Erreur: rôle non reconnu.");
    }
  } catch (error) {
    // Gestion améliorée des erreurs
    if (error.response?.data?.message) {
      errors.auth.push(error.response.data.message);
    } else if (error.message) {
      errors.auth.push(error.message);
    } else {
      errors.auth.push("Une erreur s'est produite lors de la connexion.");
    }
    console.error("Erreur lors de la connexion:", error);
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

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
  filter: drop-shadow(55px 5px 10px rgba(67, 66, 66, 0.219));
  cursor: pointer;
  /* transform: scaleX(-1); */
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scaleX(-1); /* Position de départ et de fin */
  }
  50% {
    transform: translateY(-20px) scaleX(-1); /* Déplacement vers le haut */
  }
}

.form-panel {
  margin: auto;
  padding: 40px;
  width: auto;
  background-color: #fff;
}
.connexion-container .form-panel h3 {
  color: #2980b9;
  margin-bottom: 20px;
}
.connexion-container .form-panel input {
  padding: 10px 15px;
  min-width: 400px;
}
.connexion-container .btn-custom {
  background-color: #2980b9;
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
  color: #2980b9;
}
.already-account a:hover {
  text-decoration: underline;
}
.form-control {
  border-radius: 5px;
}

/* Mobile */
/* Mobile */
@media (max-width: 768px) {
  .connexion-container {
    padding: 0;
    height: 100vh;
    align-items: flex-start;
  }

  .connexion-container .form-login-section {
    border-radius: 0;
    min-height: 100vh;
    width: 100%;
  }

  .connexion-container .container {
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
  }

  .left-panel {
    padding: 0 1rem;
    text-align: center;
  }

  .left-panel .btn-retour {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .left-panel h2 {
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .left-panel p {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .left-panel .img-fluid {
    display: none;
  }

  .form-panel {
    padding: 1.5rem 1rem;
    margin: 0;
    width: 100%;
  }

  .form-panel form {
    width: 100%;
  }

  .connexion-container .form-panel input {
    min-width: unset;
    width: 100%;
    padding: 0.75rem;
  }

  .form-panel h3 {
    font-size: 1.25rem;
    text-align: center;
  }

  .btn-custom {
    width: 100%;
    padding: 0.75rem;
  }

  .already-account {
    margin-top: 1.5rem;
  }
}

/* Pour les très petits écrans */
@media (max-width: 375px) {
  .connexion-container .container {
    padding: 10px;
  }

  .form-panel {
    padding: 1rem;
  }

  .left-panel {
    display: none;
  }
}
</style>