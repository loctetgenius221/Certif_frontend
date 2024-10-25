<template>
  <Transition name="modal">
    <div v-if="props.isOpen" class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ props.title }}</h5>
            <button type="button" class="btn-close" @click="handleClose"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <!-- Antécédents médicaux -->
              <div v-if="props.type === 'antecedents'" class="mb-3">
                <label for="antecedent" class="form-label">Antécédent médical :</label>
                <textarea 
                  id="antecedent" 
                  v-model="formData.antecedent" 
                  class="form-control" 
                  rows="3"
                  placeholder="Décrivez l'antécédent médical"
                  required 
                ></textarea>
              </div>

              <!-- Traitements -->
              <div v-if="props.type === 'traitements'" class="mb-3">
                <div class="mb-3">
                  <label for="medicament" class="form-label">Nom du médicament :</label>
                  <input 
                    type="text" 
                    id="medicament" 
                    v-model="formData.traitement.nom" 
                    class="form-control" 
                    required 
                  />
                </div>
                <div class="mb-3">
                  <label for="dosage" class="form-label">Dosage :</label>
                  <input 
                    type="text" 
                    id="dosage" 
                    v-model="formData.traitement.dosage" 
                    class="form-control" 
                    placeholder="Ex: 500mg 2x/jour"
                    required 
                  />
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <label for="date_debut" class="form-label">Date de début :</label>
                    <input 
                      type="date" 
                      id="date_debut" 
                      v-model="formData.traitement.date_debut" 
                      class="form-control" 
                      required 
                    />
                  </div>
                  <div class="col">
                    <label for="date_fin" class="form-label">Date de fin :</label>
                    <input 
                      type="date" 
                      id="date_fin" 
                      v-model="formData.traitement.date_fin" 
                      class="form-control" 
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="prescripteur" class="form-label">Prescripteur :</label>
                  <input 
                    type="text" 
                    id="prescripteur" 
                    v-model="formData.traitement.prescripteur" 
                    class="form-control" 
                    required 
                  />
                </div>
              </div>

              <!-- Notes d'observations -->
              <div v-if="props.type === 'notes'" class="mb-3">
                <label for="note" class="form-label">Note d'observation :</label>
                <textarea 
                  id="note" 
                  v-model="formData.note" 
                  class="form-control" 
                  rows="4"
                  placeholder="Saisissez votre observation"
                  required
                ></textarea>
              </div>

              <!-- Interventions chirurgicales -->
              <div v-if="props.type === 'interventions'" class="mb-3">
                <label for="intervention" class="form-label">Intervention chirurgicale :</label>
                <textarea 
                  id="intervention" 
                  v-model="formData.intervention" 
                  class="form-control" 
                  rows="3"
                  placeholder="Décrivez l'intervention chirurgicale"
                  required
                ></textarea>
              </div>

              <!-- Informations supplémentaires -->
              <div v-if="props.type === 'infos'" class="mb-3">
                <label for="info" class="form-label">Information supplémentaire :</label>
                <textarea 
                  id="info" 
                  v-model="formData.info" 
                  class="form-control" 
                  rows="3"
                  placeholder="Ajoutez des informations supplémentaires"
                  required
                ></textarea>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="handleClose">Annuler</button>
                <button type="submit" class="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close', 'submit']);

// Initialisation du formulaire avec une structure plus complexe
const formData = ref({
  antecedent: '',
  traitement: {
    nom: '',
    dosage: '',
    date_debut: '',
    date_fin: '',
    prescripteur: '',
  },
  note: '',
  intervention: '',
  info: '',
});

// Réinitialiser le formulaire lors de la fermeture
const resetForm = () => {
  formData.value = {
    antecedent: '',
    traitement: {
      nom: '',
      dosage: '',
      date_debut: '',
      date_fin: '',
      prescripteur: '',
    },
    note: '',
    intervention: '',
    info: '',
  };
};

// Gestion de la fermeture
const handleClose = () => {
  resetForm();
  emit('close');
};

// Soumission du formulaire
const submitForm = () => {
  emit('submit', formData.value);
  resetForm();
  emit('close');
};

// Réinitialiser le formulaire quand le modal s'ouvre
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm();
  }
});
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.modal-dialog {
  margin-top: 2rem;
}

/* Animations de transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Style personnalisé pour les formulaires */
.form-control:focus {
  border-color: #2980b9;
  box-shadow: 0 0 0 0.2rem rgba(41, 128, 185, 0.25);
}

.btn-primary {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-primary:hover {
  background-color: #2471a3;
  border-color: #2471a3;
}

.modal-title {
  color: #2980b9;
}
</style>