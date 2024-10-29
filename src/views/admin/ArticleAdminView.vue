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
              <h2 class="h3 mb-3">Gestion du Blog</h2>
              <!-- <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                  <li class="breadcrumb-item active">Gestion du Blog</li>
                </ol>
              </nav> -->
            </div>
          </div>

          <!-- Cartes de statistiques -->
          <div class="row mb-4">
            <div class="col-md-3">
              <div class="card text-center bg-primary text-white">
                <div class="card-body">
                  <h5 class="card-title">Articles</h5>
                  <p class="display-4">24</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center bg-success text-white">
                <div class="card-body">
                  <h5 class="card-title">Catégories</h5>
                  <p class="display-4">8</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center bg-warning text-white">
                <div class="card-body">
                  <h5 class="card-title">Commentaires</h5>
                  <p class="display-4">156</p>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card text-center bg-info text-white">
                <div class="card-body">
                  <h5 class="card-title">Médias</h5>
                  <p class="display-4">45</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section principale avec onglets -->
          <div class="card">
            <div class="card-body">
              <ul class="nav nav-tabs" id="blogTabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-bs-toggle="tab"
                    href="#articles"
                  >
                    <i class="fas fa-newspaper me-2"></i>Articles
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#categories">
                    <i class="fas fa-tags me-2"></i>Catégories
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#comments">
                    <i class="fas fa-comments me-2"></i>Commentaires
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-bs-toggle="tab" href="#media">
                    <i class="fas fa-images me-2"></i>Médias
                  </a>
                </li>
              </ul>

              <div class="tab-content mt-4">
                <!-- Onglet Articles -->
                <div class="tab-pane fade show active" id="articles">
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <h4>Gestion des Articles</h4>
                    <router-link :to="{ name: 'EditeurArticle' }">
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
                        <tr>
                          <td>Les avantages de la télémédecine</td>
                          <td>
                            <span class="badge bg-primary">Santé digitale</span>
                          </td>
                          <td>2024-03-15</td>
                          <td><span class="badge bg-success">Publié</span></td>
                          <td>
                            <button class="btn btn-sm btn-outline-primary me-1">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger">
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                        <!-- Autres articles... -->
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Onglet Catégories -->
                <div class="tab-pane fade" id="categories">
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
                <div class="tab-pane fade" id="comments">
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
                <div class="tab-pane fade" id="media">
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
</script>

<style scoped>
.nav-tabs .nav-link {
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
}
</style>
