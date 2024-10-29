<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="container-fluid py-4">
          <!-- En-tête -->
          <div class="row mb-4">
            <div class="col">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h2 class="h3 mb-2">Nouvel Article</h2>
                  <!-- <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                      <li class="breadcrumb-item"><a href="#">Blog</a></li>
                      <li class="breadcrumb-item active">Nouvel Article</li>
                    </ol>
                  </nav> -->
                </div>
                <div>
                  <button class="btn btn-outline-secondary me-2">
                    <i class="fas fa-save me-2"></i>Enregistrer comme brouillon
                  </button>
                  <button class="btn btn-primary">
                    <i class="fas fa-paper-plane me-2"></i>Publier
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire principal -->
          <div class="row">
            <!-- Colonne principale -->
            <div class="col-md-8">
              <div class="card mb-4">
                <div class="card-body">
                  <!-- Titre de l'article -->
                  <div class="mb-4">
                    <label for="articleTitle" class="form-label"
                      >Titre de l'article</label
                    >
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="articleTitle"
                      placeholder="Entrez le titre de votre article"
                      v-model="articleTitle"
                    />
                  </div>

                  <!-- Extrait -->
                  <div class="mb-4">
                    <label for="articleExcerpt" class="form-label"
                      >Extrait</label
                    >
                    <textarea
                      class="form-control"
                      id="articleExcerpt"
                      rows="3"
                      placeholder="Un bref résumé de votre article"
                      v-model="articleExcerpt"
                    ></textarea>
                  </div>

                  <!-- Éditeur de texte riche -->
                  <div class="mb-4">
                    <label class="form-label">Contenu de l'article</label>

                    <!-- Barre d'outils de l'éditeur -->
                    <div class="editor-toolbar border rounded-top p-2 bg-light">
                      <div class="btn-group me-2">
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('bold')"
                          title="Gras"
                        >
                          <i class="fas fa-bold"></i>
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('italic')"
                          title="Italique"
                        >
                          <i class="fas fa-italic"></i>
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('underline')"
                          title="Souligné"
                        >
                          <i class="fas fa-underline"></i>
                        </button>
                      </div>

                      <div class="btn-group me-2">
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('h2')"
                          title="Titre"
                        >
                          <i class="fas fa-heading"></i>
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('quote')"
                          title="Citation"
                        >
                          <i class="fas fa-quote-right"></i>
                        </button>
                      </div>

                      <div class="btn-group me-2">
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('list-ul')"
                          title="Liste à puces"
                        >
                          <i class="fas fa-list-ul"></i>
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          @click="formatText('list-ol')"
                          title="Liste numérotée"
                        >
                          <i class="fas fa-list-ol"></i>
                        </button>
                      </div>

                      <div class="btn-group">
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

                    <!-- Zone d'édition -->
                    <div
                      class="editor-content border rounded-bottom p-3"
                      contenteditable="true"
                      ref="editorContent"
                      @input="handleInput"
                      style="min-height: 400px"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- SEO et métadonnées -->
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title mb-0">SEO et Métadonnées</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="metaTitle" class="form-label">Titre SEO</label>
                    <input
                      type="text"
                      class="form-control"
                      id="metaTitle"
                      v-model="metaTitle"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="metaDescription" class="form-label"
                      >Description SEO</label
                    >
                    <textarea
                      class="form-control"
                      id="metaDescription"
                      rows="2"
                      v-model="metaDescription"
                    ></textarea>
                  </div>
                  <div>
                    <label for="metaKeywords" class="form-label"
                      >Mots-clés</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="metaKeywords"
                      v-model="metaKeywords"
                    />
                    <small class="text-muted"
                      >Séparez les mots-clés par des virgules</small
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Colonne latérale -->
            <div class="col-md-4">
              <!-- Paramètres de publication -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="card-title mb-0">Paramètres de publication</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Statut</label>
                    <select class="form-select" v-model="publishStatus">
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="scheduled">Programmé</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Visibilité</label>
                    <select class="form-select" v-model="visibility">
                      <option value="public">Public</option>
                      <option value="private">Privé</option>
                      <option value="password">Protégé par mot de passe</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Date de publication</label>
                    <input
                      type="datetime-local"
                      class="form-control"
                      v-model="publishDate"
                    />
                  </div>
                </div>
              </div>

              <!-- Catégories -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="card-title mb-0">Catégories</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <div
                      class="form-check"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="category.id"
                        :id="'category-' + category.id"
                        v-model="selectedCategories"
                      />
                      <label
                        class="form-check-label"
                        :for="'category-' + category.id"
                      >
                        {{ category.name }}
                      </label>
                    </div>
                    <button class="btn btn-outline-secondary btn-sm mt-2">
                      <i class="fas fa-plus me-1"></i>Ajouter une catégorie
                    </button>
                  </div>
                </div>
              </div>

              <!-- Image à la une -->
              <div class="card mb-4">
                <div class="card-header">
                  <h5 class="card-title mb-0">Image à la une</h5>
                </div>
                <div class="card-body">
                  <div class="featured-image-preview mb-3">
                    <img
                      src="/placeholder-image.jpg"
                      class="img-fluid rounded"
                      alt="Image à la une"
                      v-if="featuredImage"
                    />
                    <div class="text-center p-4 border rounded" v-else>
                      <i class="fas fa-image fa-2x mb-2"></i>
                      <p class="mb-0">Aucune image sélectionnée</p>
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
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
import { ref, reactive } from "vue";

// États réactifs
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

// Données des catégories (à remplacer par vos données réelles)
const categories = reactive([
  { id: 1, name: "Santé digitale" },
  { id: 2, name: "Téléconsultation" },
  { id: 3, name: "Conseils santé" },
  { id: 4, name: "Actualités" },
]);

// Fonctions d'édition de texte
const formatText = (command) => {
  document.execCommand(command, false, null);
};

const handleInput = (event) => {
  // Gérer les changements de contenu
  console.log("Contenu modifié:", event.target.innerHTML);
};

const addImage = () => {
  // Implémenter la logique d'ajout d'image
  const imageUrl = prompt("Entrez l'URL de l'image:");
  if (imageUrl) {
    document.execCommand("insertImage", false, imageUrl);
  }
};

const addLink = () => {
  // Implémenter la logique d'ajout de lien
  const url = prompt("Entrez l'URL du lien:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
};
</script>

<style scoped>
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
