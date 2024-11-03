<template>
  <div class="article-editor d-flex">
    <SidebarAdmin />
    <div class="content-wrapper flex-grow-1">
      <HeaderPatient />
      <div class="container-fluid px-4 py-4">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h1 class="display-6 fw-bold text-primary">Nouvel Article</h1>
          <div class="action-buttons">
            <button class="btn btn-outline-secondary me-2 shadow-sm">
              <i class="fas fa-save me-2"></i>Brouillon
            </button>
            <button class="btn btn-primary shadow">
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
                  <label for="articleTitle" class="form-label text-muted"
                    >Titre de l'article</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-lg border-0 fs-3 fw-semibold"
                    id="articleTitle"
                    placeholder="Entrez le titre de votre article"
                    v-model="articleTitle"
                  />
                </div>

                <!-- Article Excerpt -->
                <div class="mb-4">
                  <label for="articleExcerpt" class="form-label text-muted"
                    >Extrait</label
                  >
                  <textarea
                    class="form-control border-0 fs-6"
                    id="articleExcerpt"
                    rows="3"
                    placeholder="Un bref résumé de votre article"
                    v-model="articleExcerpt"
                  ></textarea>
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
                    contenteditable="true"
                    ref="editorContent"
                    @input="handleInput"
                  ></div>
                </div>
              </div>
            </div>

            <!-- SEO Section -->
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
                  <select class="form-select" v-model="publishStatus">
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                    <option value="scheduled">Programmé</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted">Visibilité</label>
                  <select class="form-select" v-model="visibility">
                    <option value="public">Public</option>
                    <option value="private">Privé</option>
                    <option value="password">Protégé par mot de passe</option>
                  </select>
                </div>
                <div class="mb-0">
                  <label class="form-label text-muted"
                    >Date de publication</label
                  >
                  <input
                    type="datetime-local"
                    class="form-control"
                    v-model="publishDate"
                  />
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
                      type="checkbox"
                      :id="'category-' + category.id"
                      :value="category.id"
                      v-model="selectedCategories"
                    />
                    <label
                      class="form-check-label"
                      :for="'category-' + category.id"
                    >
                      {{ category.name }}
                    </label>
                  </div>
                  <button class="btn btn-outline-primary btn-sm mt-2">
                    <i class="fas fa-plus me-1"></i>Ajouter une catégorie
                  </button>
                </div>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="card card-elevated">
              <div class="card-header bg-light">
                <h5 class="card-title mb-0 text-muted">Image à la une</h5>
              </div>
              <div class="card-body p-4">
                <div class="featured-image-preview mb-3">
                  <img
                    v-if="featuredImage"
                    :src="featuredImage"
                    class="img-fluid rounded"
                    alt="Image à la une"
                  />
                  <div v-else class="placeholder-image text-center py-5">
                    <i class="fas fa-image fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Aucune image sélectionnée</p>
                  </div>
                </div>
                <button class="btn btn-outline-primary w-100">
                  <i class="fas fa-upload me-2"></i>Choisir une image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, reactive } from "vue";

// Reactive states
const articleTitle = ref("");
const articleExcerpt = ref("");
const editorContent = ref(null);
const metaTitle = ref("");
const metaDescription = ref("");
const metaKeywords = ref("");
const publishStatus = ref("draft");
const visibility = ref("public");
const publishDate = ref("");
const selectedCategories = ref([]);
const featuredImage = ref(null);

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
const categories = reactive([
  { id: 1, name: "Santé digitale" },
  { id: 2, name: "Téléconsultation" },
  { id: 3, name: "Conseils santé" },
  { id: 4, name: "Actualités" },
]);

// Text formatting function
const formatText = (command) => {
  document.execCommand(command, false, null);
};

// Handle content input
const handleInput = (event) => {
  console.log("Contenu modifié:", event.target.innerHTML);
};

// Add image functionality
const addImage = () => {
  const imageUrl = prompt("Entrez l'URL de l'image:");
  if (imageUrl) {
    document.execCommand("insertImage", false, imageUrl);
  }
};

// Add link functionality
const addLink = () => {
  const url = prompt("Entrez l'URL du lien:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
};

// import SidebarAdmin from "@/components/SidebarAdmin.vue";
// import HeaderPatient from "@/components/HeaderPatient.vue";
// import { ref, reactive } from "vue";

// // États réactifs
// const articleTitle = ref("");
// const articleExcerpt = ref("");
// const editorContent = ref(null);
// const metaTitle = ref("");
// const metaDescription = ref("");
// const metaKeywords = ref("");
// const publishStatus = ref("draft");
// const visibility = ref("public");
// const publishDate = ref("");
// const selectedCategories = ref([]);
// const featuredImage = ref(null);

// // Données des catégories (à remplacer par vos données réelles)
// const categories = reactive([
//   { id: 1, name: "Santé digitale" },
//   { id: 2, name: "Téléconsultation" },
//   { id: 3, name: "Conseils santé" },
//   { id: 4, name: "Actualités" },
// ]);

// // Fonctions d'édition de texte
// const formatText = (command) => {
//   document.execCommand(command, false, null);
// };

// const handleInput = (event) => {
//   // Gérer les changements de contenu
//   console.log("Contenu modifié:", event.target.innerHTML);
// };

// const addImage = () => {
//   // Implémenter la logique d'ajout d'image
//   const imageUrl = prompt("Entrez l'URL de l'image:");
//   if (imageUrl) {
//     document.execCommand("insertImage", false, imageUrl);
//   }
// };

// const addLink = () => {
//   // Implémenter la logique d'ajout de lien
//   const url = prompt("Entrez l'URL du lien:");
//   if (url) {
//     document.execCommand("createLink", false, url);
//   }
// };
</script>

<style scoped>
/* **************************** */
/*        Style améliorer       */
/* **************************** */

/* Global Styling */
.article-editor {
  background-color: #f4f6f9;
  color: #333;
}

.content-wrapper {
  background-color: #f4f6f9;
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
