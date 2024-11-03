<template>
  <div class="d-flex">
    <SidebarAdmin />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container">
        <div class="blog-management-container">
          <div class="container-fluid px-4 py-5">
            <!-- Header -->
            <div class="row mb-4 align-items-center">
              <div class="col">
                <h1 class="display-6 fw-bold text-primary">Gestion du Blog</h1>
              </div>
            </div>

            <!-- Dashboard Cards -->
            <div class="row g-4 mb-5">
              <div
                class="col-md-3"
                v-for="(stat, index) in dashboardStats"
                :key="index"
              >
                <div
                  class="card border-0 shadow-sm transform-hover"
                  :class="stat.bgClass"
                >
                  <div class="card-body text-center text-white p-4">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h5 class="card-title opacity-75">{{ stat.title }}</h5>
                        <p class="fs-3 fw-bold mb-0">{{ stat.value }}</p>
                      </div>
                      <i :class="stat.icon + ' fs-2 opacity-50'"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content with Tabs -->
            <div class="card shadow-sm border-0">
              <div class="card-header bg-white border-0 pt-4 px-4">
                <ul class="nav nav-pills nav-fill gap-2" role="tablist">
                  <li
                    v-for="(tab, index) in tabs"
                    :key="index"
                    class="nav-item"
                  >
                    <button
                      class="nav-link"
                      :class="{ active: activeTab === tab.id }"
                      @click="activeTab = tab.id"
                    >
                      <i :class="tab.icon + ' me-2'"></i>
                      {{ tab.label }}
                    </button>
                  </li>
                </ul>
              </div>

              <div class="card-body p-4">
                <!-- Articles Tab -->
                <div v-if="activeTab === 'articles'" class="tab-content">
                  <div class="d-flex justify-content-between mb-4">
                    <h4 class="text-primary">Liste des Articles</h4>
                    <router-link :to="{ name:'EditeurArticle' }">
                      <button class="btn btn-primary">
                        <i class="fas fa-plus me-2"></i>Nouvel Article
                      </button>
                    </router-link>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Catégorie</th>
                          <th>Date</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="article in articles" :key="article.id">
                          <td>{{ article.title }}</td>
                          <td>
                            <span class="badge" :class="article.categoryBadge">
                              {{ article.category }}
                            </span>
                          </td>
                          <td>{{ article.date }}</td>
                          <td>
                            <span class="badge" :class="article.statusBadge">
                              {{ article.status }}
                            </span>
                          </td>
                          <td>
                            <div class="btn-group" role="group">
                              <button class="btn btn-sm btn-outline-primary">
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger">
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Catégories -->
                <div
                  v-if="activeTab === 'categories'"
                  class="tab-content tab-pane fade"
                  id="categories"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Gestion des Catégories</h4>
                    <button class="btn btn-primary">
                      <i class="fas fa-plus me-2"></i>Nouvelle Catégorie
                    </button>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="card mb-3">
                        <div class="card-body">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <h5 class="card-title">Santé digitale</h5>
                            <div>
                              <button
                                class="btn btn-sm btn-outline-primary me-1"
                              >
                                <i class="fas fa-edit"></i>
                              </button>
                              <button class="btn btn-sm btn-outline-danger">
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <p class="text-muted">12 articles</p>
                        </div>
                      </div>
                    </div>
                    <!-- Autres catégories... -->
                  </div>
                </div>

                <!-- Onglet Commentaires -->
                <div
                  v-if="activeTab === 'comments'"
                  class="tab-content tab-pane fade"
                  id="comments"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Modération des Commentaires</h4>
                    <div>
                      <button class="btn btn-outline-success me-2">
                        <i class="fas fa-check me-2"></i>Tout approuver
                      </button>
                      <button class="btn btn-outline-danger">
                        <i class="fas fa-trash me-2"></i>Supprimer la sélection
                      </button>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" class="form-check-input" />
                          </th>
                          <th>Auteur</th>
                          <th>Commentaire</th>
                          <th>Article</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input type="checkbox" class="form-check-input" />
                          </td>
                          <td>Jean Dupont</td>
                          <td>Excellent article, très informatif...</td>
                          <td>Les avantages de la télémédecine</td>
                          <td>2024-03-15</td>
                          <td>
                            <button class="btn btn-sm btn-outline-success me-1">
                              <i class="fas fa-check"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <!-- Autres commentaires... -->
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Médias -->
                <div
                  v-if="activeTab === 'media'"
                  class="tab-content tab-pane fade"
                  id="media"
                >
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Gestion des Médias</h4>
                    <button class="btn btn-primary">
                      <i class="fas fa-upload me-2"></i>Ajouter des médias
                    </button>
                  </div>
                  <div class="row g-3">
                    <div class="col-md-3">
                      <div class="card">
                        <img
                          src="/placeholder-image.jpg"
                          class="card-img-top"
                          alt="Media"
                        />
                        <div class="card-body">
                          <h6 class="card-title">image-1.jpg</h6>
                          <p class="text-muted small">Ajouté le: 2024-03-15</p>
                          <div class="btn-group w-100">
                            <button class="btn btn-sm btn-outline-primary">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Autres médias... -->
                  </div>
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
import { ref } from "vue";

const activeTab = ref("articles");
const dashboardStats = [
  {
    title: "Articles",
    value: 24,
    icon: "fas fa-newspaper",
    bgClass: "bg-primary",
  },
  {
    title: "Catégories",
    value: 8,
    icon: "fas fa-tags",
    bgClass: "bg-success",
  },
  {
    title: "Commentaires",
    value: 156,
    icon: "fas fa-comments",
    bgClass: "bg-warning",
  },
  {
    title: "Médias",
    value: 45,
    icon: "fas fa-images",
    bgClass: "bg-info",
  },
];

const tabs = [
  { id: "articles", label: "Articles", icon: "fas fa-newspaper" },
  { id: "categories", label: "Catégories", icon: "fas fa-tags" },
  { id: "comments", label: "Commentaires", icon: "fas fa-comments" },
  { id: "media", label: "Médias", icon: "fas fa-images" },
];

const articles = [
  {
    id: 1,
    title: "Les avantages de la télémédecine",
    category: "Santé digitale",
    categoryBadge: "bg-primary",
    date: "2024-03-15",
    status: "Publié",
    statusBadge: "bg-success",
  },
  {
    id: 1,
    title: "Les avantages de la télémédecine",
    category: "Santé digitale",
    categoryBadge: "bg-primary",
    date: "2024-03-15",
    status: "Publié",
    statusBadge: "bg-success",
  },
];
</script>

<style scoped>
/* .nav-tabs .nav-link {
  color: #495057;
}

.nav-tabs .nav-link.active {
  font-weight: bold;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.table th {
  font-weight: 600;
}

.btn-group > .btn {
  flex: 1;
} */

/* Custom styles */
.transform-hover {
  transition: transform 0.3s ease;
}

.transform-hover:hover {
  transform: translateY(-10px);
}

.nav-pills .nav-link {
  color: #6c757d;
  transition: all 0.3s ease;
}

.nav-pills .nav-link.active {
  background-color: #007bff;
  color: white;
}

.nav-pills .nav-link:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.table thead th {
  vertical-align: middle;
  color: #495057;
}

.card {
  border-radius: 15px;
}
</style>
