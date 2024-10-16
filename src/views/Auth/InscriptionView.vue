<template>
  <div>
    <div class="registration-container">
      <div class="form-section">
        <div class="container">
          <div class="left-panel col-md-5">
            <router-link class="btn-retour d-flex align-items-center gap-2" :to="{ name: 'Portail' }">
              <img src="../../../public/image/retour.svg" alt="retour">Retour
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
            <h3>Se créer un compte</h3>
            <form @submit.prevent="handleSubmit">
              <div class="row mb-3">
                <div class="col">
                  <label for="prenom" class="form-label">Prénom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                    v-model="formData.prenom"
                    @input="validateField('prenom')"
                  />
                  <span v-if="errors.prenom" class="text-danger">{{ errors.prenom }}</span>
                </div>
                <div class="col">
                  <label for="nom" class="form-label">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nom"
                    placeholder="Nom"
                    v-model="formData.nom"
                    @input="validateField('nom')"
                  />
                  <span v-if="errors.nom" class="text-danger">{{ errors.nom }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="telephone"
                  placeholder="77 123 45 67"
                  v-model="formData.telephone"
                  @input="validateField('telephone')"
                />
                <span v-if="errors.telephone" class="text-danger">{{ errors.telephone }}</span>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="exemple@exemple.com"
                  v-model="formData.email"
                  @input="validateField('email')"
                />
                <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
              </div>
              <div class="row mb-3">
                <div class="col">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Mot de passe"
                    v-model="formData.password"
                    @input="validateField('password')"
                  />
                  <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
                </div>
                <div class="col">
                  <label for="confirmPassword" class="form-label">Confirmer mot de passe</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    placeholder="Confirmer mot de passe"
                    v-model="formData.password_confirmation"
                    @input="validateField('password_confirmation')"
                  />
                  <span v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</span>
                </div>
              </div>
              <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
              <div class="d-grid">
                <button type="submit" class="btn btn-custom">S'inscrire</button>
              </div>
              <div class="already-account">
                <p>Déjà un compte ? <router-link :to="{ name: 'Connexion' }">Se connecter ici</router-link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import "@/assets/css/auth/InscriptionView.css";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref("");

// Données du formulaire
const formData = reactive({
  prenom: '',
  nom: '',
  telephone: '',
  email: '',
  password: '',
  password_confirmation: ''
});

// Erreurs de validation
const errors = reactive({
  prenom: null,
  nom: null,
  telephone: null,
  email: null,
  password: null,
  password_confirmation: null
});

// Validation des champs
const validateField = (field) => {
  switch (field) {
    case 'prenom':
      errors.prenom = formData.prenom ? null : 'Le prénom est requis.';
      break;
    case 'nom':
      errors.nom = formData.nom ? null : 'Le nom est requis.';
      break;
    case 'telephone': {
      const phoneRegex = /^[0-9]{9}$/;
      errors.telephone = phoneRegex.test(formData.telephone) ? null : 'Le téléphone doit être au format correct.';
      break;
    }
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = emailRegex.test(formData.email) ? null : 'L\'email doit être valide.';
      break;
    }
    case 'password':
      errors.password = formData.password.length >= 6 ? null : 'Le mot de passe doit comporter au moins 6 caractères.';
      break;
    case 'password_confirmation':
      errors.password_confirmation = (formData.password === formData.password_confirmation) ? null : 'Les mots de passe ne correspondent pas.';
      break;
  }
};

// Soumission du formulaire
const handleSubmit = async () => {
  validateField('prenom');
  validateField('nom');
  validateField('telephone');
  validateField('email');
  validateField('password');
  validateField('password_confirmation');

  // Si des erreurs existent, empêcher la soumission
  if (Object.values(errors).some(error => error !== null)) {
    errorMessage.value = "Veuillez corriger les erreurs avant de soumettre.";
    return;
  }

  // Si tout est valide, procéder à l'inscription
  errorMessage.value = "";
  try {
    await authStore.authenticate('register/patient', formData);

    // Afficher une SweetAlert à l'inscription réussie
    Swal.fire({
      title: 'Inscription réussie!',
      text: 'Votre compte a été créé avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Redirection vers la page de connexion après la fermeture de l'alerte
      router.push({ name: 'Connexion' });
    });
  } catch (error) {
    // Gérer les erreurs d'inscription
    Swal.fire({
      title: 'Erreur!',
      text: 'Une erreur est survenue lors de l\'inscription.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};
</script>

<style scoped>
.registration-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}
.form-section {
  background-color: #2980B9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.form-section .container {
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
.form-panel h3 {
  color: #2980B9;
  margin-bottom: 20px;
}
.form-panel input {
  padding: 10px 15px;
}
.btn-custom {
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
.already-account a {
  color: #2980B9;
}
.already-account a:hover {
  text-decoration: underline;
}
.form-control {
  border-radius: 5px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}
</style>