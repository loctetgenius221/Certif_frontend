<template>
  <div class="article-editor d-flex">
    <SidebarAdmin />
    <div class="section-content flex-grow-1">
      <HeaderPatient />
      <div class="section-container">
        <BtnRetour />
        <div class="container-fluid bg-light px-4 py-4">
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="display-6 fw-bold text-primary">Nouvel Article</h1>
            <div>
              <button
                class="btn btn-outline-secondary me-2 shadow-sm"
                @click="saveAsDraft"
              >
                <i class="fas fa-save me-2"></i>Brouillon
              </button>
              <button class="btn btn-primary shadow" @click="publishArticle">
                <i class="fas fa-paper-plane me-2"></i>Publier
              </button>
            </div>
          </div>

          <div class="row g-4">
            <!-- Main Content Column -->
            <div class="col-lg-8">
              <div class="card card-elevated mb-4">
                <div class="card-body p-4">
                  <!-- Article Title -->
                  <div class="mb-4">
                    <!-- Message général -->
                    <div
                      v-if="errorMessages.general"
                      class="alert alert-danger"
                    >
                      {{ errorMessages.general }}
                    </div>
                    <label for="articleTitle" class="form-label text-muted"
                      >Titre de l'article</label
                    >
                    <input
                      type="text"
                      class="form-control form-control-lg border-0 fs-3 fw-semibold"
                      :class="{ 'is-invalid': errorMessages.title }"
                      id="articleTitle"
                      placeholder="Entrez le titre de votre article"
                      v-model="titre"
                    />
                    <div v-if="errorMessages.title" class="invalid-feedback">
                      {{ errorMessages.title }}
                    </div>
                  </div>

                  <!-- Rich Text Editor -->
                  <div class="rich-text-editor">
                    <label class="form-label text-muted"
                      >Contenu de l'article</label
                    >

                    <!-- Editor Toolbar -->
                    <div
                      class="editor-toolbar rounded-top p-2 bg-light d-flex align-items-center"
                    >
                      <div class="btn-group me-2">
                        <button
                          v-for="tool in textFormattingTools"
                          :key="tool.command"
                          class="btn btn-outline-secondary"
                          @click="formatText(tool.command)"
                          :title="tool.title"
                        >
                          <i :class="tool.icon"></i>
                        </button>
                      </div>

                      <div class="btn-group ms-auto">
                        <button
                          class="btn btn-outline-secondary"
                          @click="addImage"
                          title="Ajouter une image"
                        >
                          <i class="fas fa-image"></i>
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          @click="addLink"
                          title="Ajouter un lien"
                        >
                          <i class="fas fa-link"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Editor Content -->
                    <div
                      class="editor-content border rounded-bottom p-3"
                      :class="{ 'is-invalid': errorMessages.content }"
                      contenteditable="true"
                      ref="editorContent"
                      @input="handleInput"
                    ></div>
                    <div v-if="errorMessages.content" class="invalid-feedback">
                      {{ errorMessages.content }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- SEO Section
            <div class="card card-elevated">
              <div class="card-header bg-light">
                <h5 class="card-title mb-0 text-muted">SEO et Métadonnées</h5>
              </div>
              <div class="card-body p-4">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="metaTitle" class="form-label text-muted"
                      >Titre SEO</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="metaTitle"
                      v-model="metaTitle"
                      placeholder="Titre optimisé pour les moteurs de recherche"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="metaKeywords" class="form-label text-muted"
                      >Mots-clés</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="metaKeywords"
                      v-model="metaKeywords"
                      placeholder="santé, digital, consultation"
                    />
                    <small class="text-muted"
                      >Séparez les mots-clés par des virgules</small
                    >
                  </div>
                  <div class="col-12">
                    <label for="metaDescription" class="form-label text-muted"
                      >Description SEO</label
                    >
                    <textarea
                      class="form-control"
                      id="metaDescription"
                      rows="2"
                      v-model="metaDescription"
                      placeholder="Décrivez brièvement le contenu de votre article"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div> -->
              <!-- Médiathète -->
              <div class="row">
                <div class="">
                  <div class="card card-elevated">
                    <div class="card-header bg-light">
                      <h5 class="card-title mb-0 text-muted">Médiathèque</h5>
                    </div>
                    <div class="card-body p-4">
                      <div class="media-gallery row row-cols-7 g-2">
                        <div
                          v-for="media in mediaImages"
                          :key="media.url"
                          class="media-item col"
                          @click="selectImage(media.url)"
                        >
                          <img :src="media.url" class="img-thumbnail" />
                        </div>
                      </div>
                      <form @submit.prevent="uploadImage" class="mt-3">
                        <input type="file" @change="onFileChange" />
                        <input
                          type="text"
                          v-model="mediaName"
                          placeholder="Nom de l'image"
                          required
                          class="form-control mb-2"
                        />
                        <button type="submit" class="btn btn-primary">
                          Ajouter
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar Column -->
            <div class="col-lg-4">
              <!-- Publication Settings -->
              <div class="card card-elevated mb-4">
                <div class="card-header bg-light">
                  <h5 class="card-title mb-0 text-muted">
                    Paramètres de publication
                  </h5>
                </div>
                <div class="card-body p-4">
                  <div class="mb-3">
                    <label class="form-label text-muted">Statut</label>
                    <select class="form-select" v-model="statut">
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="scheduled">Programmé</option>
                    </select>
                  </div>
                  <div class="mb-0">
                    <label class="form-label text-muted"
                      >Date de publication</label
                    >
                    <input
                      type="datetime-local"
                      class="form-control"
                      :class="{ 'is-invalid': errorMessages.datePublication }"
                      v-model="datePublication"
                    />
                    <div
                      v-if="errorMessages.datePublication"
                      class="invalid-feedback"
                    >
                      {{ errorMessages.datePublication }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Categories -->
              <div class="card card-elevated mb-4">
                <div class="card-header bg-light">
                  <h5 class="card-title mb-0 text-muted">Catégories</h5>
                </div>
                <div class="card-body p-4">
                  <div class="category-list">
                    <div
                      v-for="category in categories"
                      :key="category.id"
                      class="form-check form-switch mb-2"
                    >
                      <input
                        class="form-check-input"
                        :class="{ 'is-invalid': errorMessages.category }"
                        type="checkbox"
                        :id="`category-${category.id}`"
                        :value="category.id"
                        v-model="categoriesSelected"
                      />
                      <label
                        class="form-check-label"
                        :for="`category-${category.id}`"
                        >{{ category.nom }}</label
                      >
                    </div>
                    <div v-if="errorMessages.category" class="invalid-feedback">
                      {{ errorMessages.category }}
                    </div>
                    <button
                      class="btn btn-outline-primary btn-sm mt-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addCategoryModal"
                    >
                      <i class="fas fa-plus me-1"></i>Ajouter une catégorie
                    </button>
                  </div>
                </div>
              </div>

              <!-- Image -->
              <div class="">
                <div class="card card-elevated">
                  <div class="card-header bg-light">
                    <h5 class="card-title mb-0 text-muted">Image à la une</h5>
                  </div>
                  <div class="card-body p-4">
                    <div class="featured-image-preview mb-3">
                      <img
                        v-if="featuredImage"
                        :src="featuredImage"
                        :class="{ 'is-invalid': errorMessages.image }"
                        class="img-fluid rounded"
                        alt="Image à la une"
                      />
                      <div v-if="errorMessages.image" class="invalid-feedback">
                        {{ errorMessages.image }}
                      </div>
                      <div v-else class="placeholder-image text-center py-5">
                        <i class="fas fa-image fa-3x text-muted mb-3"></i>
                        <p class="text-muted">Aucune image sélectionnée</p>
                      </div>
                    </div>
                    <!-- <button
                  class="btn btn-outline-primary w-100"
                  @click="openMediaModal"
                >
                  <i class="fas fa-upload me-2"></i>Choisir une image
                </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal pour ajouter une catégorie -->
    <div
      class="modal fade"
      :class="{ show: isModalOpen, 'modal-open': isModalOpen }"
      id="addCategoryModal"
      tabindex="-1"
      aria-labelledby="addCategoryModalLabel"
      aria-hidden="!isModalOpen"
      v-show="isModalOpen"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">
              Ajouter une nouvelle catégorie
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createCategory">
              <div class="mb-3">
                <label for="categoryName" class="form-label"
                  >Nom de la catégorie</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoryName"
                  v-model="newCategoryName"
                  placeholder="Entrez le nom de la catégorie"
                />
              </div>
              <div v-if="errorMessage" class="text-danger">
                {{ errorMessage }}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createCategory"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, onMounted } from "vue";
import {
  getAllCategories,
  addCategory,
  storeArticle,
  getAllMedia,
  addMedia,
} from "@/services/articleService";
import { Modal } from "bootstrap";
import BtnRetour from "@/components/BtnRetour.vue";
// Reactive states
const titre = ref("");
const contenu = ref(null);
const statut = ref("brouillon");
const datePublication = ref("");
const categoriesSelected = ref([]);
const image = ref(null);
const categories = ref([]);
const newCategoryName = ref("");
const errorMessage = ref("");
const errorMessages = ref({
  datePublication: "",
  category: "",
  title: "",
  content: "",
  image: "",
  general: "",
});
const isModalOpen = ref(false);
// Média

const featuredImage = ref(null);
const mediaImages = ref([]);
const mediaName = ref("");
const selectedFile = ref(null);

// Text formatting tools
const textFormattingTools = [
  { command: "bold", icon: "fas fa-bold", title: "Gras" },
  { command: "italic", icon: "fas fa-italic", title: "Italique" },
  { command: "underline", icon: "fas fa-underline", title: "Souligné" },
  { command: "insertHeading", icon: "fas fa-heading", title: "Titre" },
  {
    command: "insertBlockquote",
    icon: "fas fa-quote-right",
    title: "Citation",
  },
  {
    command: "insertUnorderedList",
    icon: "fas fa-list-ul",
    title: "Liste à puces",
  },
  {
    command: "insertOrderedList",
    icon: "fas fa-list-ol",
    title: "Liste numérotée",
  },
];

// Categories data

const getCategories = async () => {
  try {
    const data = await getAllCategories();
    categories.value = data.data;
    console.log("Les catégories :", categories.value);
  } catch (error) {
    console.log("Erreur lors de la recup :", error);
  }
};

const closeModal = () => {
  isModalOpen.value = false; // Fonction pour fermer le modal
};

// Fonction pour ajouter une nouvelle catégorie
const createCategory = async () => {
  errorMessage.value = "";

  // Vérifier que le nom de la catégorie n'est pas vide
  if (!newCategoryName.value.trim()) {
    errorMessage.value = "Le nom de la catégorie est requis.";
    return;
  }

  try {
    // Appeler la fonction addCategory pour créer la nouvelle catégorie
    const response = await addCategory({ nom: newCategoryName.value.trim() });

    // Vérifier que la réponse de l'API est valide
    if (!response.data || !response.data.id) {
      errorMessage.value =
        "Une erreur s'est produite lors de la création de la catégorie.";
      return;
    }

    // Ajouter la nouvelle catégorie à la liste
    categories.value.push(response.data);

    // Réinitialiser le champ de saisie
    newCategoryName.value = "";

    // Fermer le modal (si nécessaire)
    const modalElement = document.getElementById("addCategoryModal");
    if (modalElement) {
      const modalInstance =
        Modal.getInstance(modalElement) ||
        new Modal(modalElement, {
          backdrop: "static",
        });
      modalInstance.hide();
    }

    //Rafraîchir la page
    window.location.reload();
  } catch (error) {
    // Gérer les erreurs de l'API
    errorMessage.value = "Erreur lors de l'ajout de la catégorie.";
    console.error("Erreur lors de l'ajout de la catégorie :", error);
  }
};

// Validations des champs
const validatePublicationDate = () => {
  const currentDate = new Date();
  const selectedDate = new Date(datePublication.value);

  if (selectedDate < currentDate) {
    errorMessages.value.datePublication =
      "La date de publication ne peut pas être antérieure à aujourd'hui.";
    return false;
  }
  return true;
};

const validateCategory = () => {
  if (categoriesSelected.value.length > 1) {
    errorMessages.value.category =
      "Un article ne peut appartenir qu'à une seule catégorie.";
    return false;
  }
  if (categoriesSelected.value.length === 0) {
    errorMessages.value.category = "Veuillez sélectionner une catégorie.";
    return false;
  }
  return true;
};

const validateTitleAndContent = () => {
  if (!titre.value.trim()) {
    errorMessages.value.title = "Le titre de l'article est requis.";
    return false;
  }

  if (!contenu.value.trim()) {
    errorMessages.value.content = "Le contenu de l'article est requis.";
    return false;
  }
  return true;
};

const validateImage = () => {
  if (!image.value) {
    errorMessages.value.image =
      "Veuillez télécharger une image pour l'article.";
    return false;
  }
  return true;
};

// Text formatting function
const formatText = (command) => {
  document.execCommand(command, false, null);
};

const saveArticle = async () => {
  // Réinitialisation des messages d'erreur
  errorMessages.value = {
    datePublication: "",
    category: "",
    title: "",
    content: "",
    image: "",
    general: "",
  };

  // Vérifier toutes les validations
  if (
    !validatePublicationDate() ||
    !validateCategory() ||
    !validateTitleAndContent() ||
    !validateImage()
  ) {
    return; // Arrêter l'exécution si une validation échoue
  }
  try {
    const formData = new FormData();
    formData.append("titre", titre.value);
    formData.append("contenu", contenu.value);
    formData.append("date_publication", datePublication.value);
    formData.append("categorie_id", categoriesSelected.value.join(","));
    formData.append("statut", statut.value);
    if (image.value) {
      formData.append("image", image.value);
    }
    // Log FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    await storeArticle(formData);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'article :", error);
    errorMessages.value.general =
      "Une erreur s'est produite lors de l'enregistrement de l'article.";
  }
};

const resetErrorMessage = () => {
  errorMessages.value = "";
};

const validateForm = () => {
  resetErrorMessage();

  return (
    validatePublicationDate() &&
    validateCategory() &&
    validateTitleAndContent() &&
    validateImage()
  );
};

const saveAsDraft = async () => {
  statut.value = "brouillon";
  if (validateForm()) {
    await saveArticle();
  }
};

const publishArticle = async () => {
  statut.value = "publié";
  if (validateForm()) {
    await saveArticle();
  }
};

const handleInput = (event) => {
  contenu.value = event.target.innerHTML;
};

// média
const handleImageSelected = (imageUrl) => {
  featuredImage.value = imageUrl;
};

const fetchMediaImages = async () => {
  try {
    const { data } = await getAllMedia();
    // Assurez-vous que la structure des données est correcte avant de les affecter
    if (data && Array.isArray(data)) {
      mediaImages.value = data
        .map((image) => {
          if (image.url) {
            return image; // Si l'image a une URL, l'ajouter à la liste
          } else {
            console.warn("Image sans URL trouvée:", image);
            return null; // Ignore les images sans URL
          }
        })
        .filter((image) => image !== null);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
  }
};

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = async () => {
  const formData = new FormData();
  formData.append("media", selectedFile.value);
  formData.append("nom", mediaName.value);

  try {
    const { data } = await addMedia(formData);
    mediaImages.value.push(data.data);
    mediaName.value = "";
    selectedFile.value = null;
    console.log("media :", mediaImages.value);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image :", error);
  }
};

const selectImage = (url) => {
  handleImageSelected(url);
};

onMounted(() => {
  getCategories();
  fetchMediaImages();
});
</script>

<style scoped>
.modal-backdrop {
  display: none !important;
}

/* Global Styling */
.article-editor {
  color: #333;
}

.section-content {
  background-color: #fff;
}

/* Card Elevation */
.card-elevated {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.card-elevated:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Editor Styles */
.editor-toolbar {
  border-bottom: 1px solid #e9ecef;
}

.editor-content {
  min-height: 400px;
  background-color: white;
  line-height: 1.6;
  color: #212529;
}

.editor-content:focus {
  outline: 2px solid rgba(13, 110, 253, 0.25);
}

.editor-content:empty:before {
  content: "Commencez à rédiger votre article...";
  color: #6c757d;
  font-style: italic;
}

/* Featured Image Placeholder */
.placeholder-image {
  background-color: #f8f9fa;
  border-radius: 8px;
}

/* Form Elements */
.form-control,
.form-select {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: rgba(13, 110, 253, 0.5);
}

/* Action Buttons */
.action-buttons .btn {
  border-radius: 6px;
  transition: all 0.3s ease;
}

.action-buttons .btn:hover {
  transform: translateY(-2px);
}

/* Typography */
.display-6 {
  color: #2c3e50;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .content-wrapper {
    padding-left: 0;
  }
}

/* ****************************** */
/*       Fin style amélioré       */
/* ****************************** */

.editor-toolbar .btn-group {
  margin-bottom: 0.5rem;
}

.editor-content {
  background-color: #fff;
}

.editor-content:focus {
  outline: none;
}

.featured-image-preview {
  min-height: 200px;
  background-color: #f8f9fa;
}

/* Style pour l'éditeur de texte */
[contenteditable="true"] {
  line-height: 1.6;
}

[contenteditable="true"]:empty:before {
  content: "Commencez à rédiger votre article...";
  color: #6c757d;
}

/* Styles pour le contenu édité */
[contenteditable="true"] h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
}

[contenteditable="true"] blockquote {
  border-left: 3px solid #dee2e6;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6c757d;
}

[contenteditable="true"] img {
  max-width: 100%;
  height: auto;
}
</style>
