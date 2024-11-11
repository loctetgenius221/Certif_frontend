<template>
  <EnTete />

  <div>
    <section class="hero-banner d-flex align-items-center">
      <div class="container">
        <h1 class="mb-3">Nos Articles et Conseils de Santé</h1>
        <p>
          Découvrez nos articles rédigés par des professionnels de la santé.
          Informez-vous sur les dernières actualités médicales, obtenez des
          conseils pratiques pour prendre soin de votre bien-être.
        </p>
      </div>
    </section>

    <section class="blog py-5">
      <div class="container">
        <!-- Filtres -->
        <div class="filters mb-4">
          <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Rechercher un article..."
              />
            </div>
            <div class="col-md-6">
              <div class="categories-filter d-flex gap-2 flex-wrap">
                <button
                  class="btn"
                  :class="
                    selectedCategory === null
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  "
                  @click="selectedCategory = null"
                >
                  Tous
                </button>
                <button
                  v-for="category in categories"
                  :key="category.id"
                  class="btn"
                  :class="
                    selectedCategory === category.id
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  "
                  @click="selectedCategory = category.id"
                >
                  {{ category.nom }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Grille d'articles -->
        <div class="blog-content">
          <div v-if="filteredArticles.length" class="row g-4">
            <div
              v-for="article in filteredArticles"
              :key="article.id"
              class="col-lg-4 col-md-6"
            >
              <div class="card h-100 shadow-sm article-card">
                <div class="category-badge">{{ article.categorie.nom }}</div>
                <img
                  :src="article.image"
                  class="card-img-top"
                  :alt="article.titre"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ article.titre }}</h5>
                  <p class="card-text text-muted mb-3">
                    {{ getExtrait(article.contenu) }}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <router-link
                      :to="{ name: 'Article', params: { id: article.id } }"
                      class="btn btn-primary"
                    >
                      Lire plus
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-5">
            <h3 class="text-muted">Aucun article trouvé</h3>
          </div>
        </div>
      </div>
    </section>
  </div>

  <PiedDePage />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import EnTete from "../../components/EnTete.vue";
import PiedDePage from "../../components/PiedDePage.vue";
import { allArticle } from "@/services/articleService";

// Catégories disponibles
const categories = ref([]);
const selectedCategory = ref(null);
const searchQuery = ref("");
const articles = ref([]);

// Récupération des articles et construction de la liste des catégories
const fetchArticles = async () => {
  try {
    const response = await allArticle();
    articles.value = response.data;

    // Création d'un Set pour éviter les doublons de catégories
    const categoriesSet = new Set();
    articles.value.forEach((article) => {
      if (article.categorie && !categoriesSet.has(article.categorie.id)) {
        categoriesSet.add(article.categorie.id);
        categories.value.push(article.categorie);
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
  }
};

// Fonction pour extraire un extrait du contenu
const getExtrait = (contenu) => {
  const div = document.createElement("div");
  div.innerHTML = contenu;
  const texte = div.textContent || div.innerText || "";
  return texte.length > 150 ? texte.slice(0, 150) + "..." : texte;
};

// Filtrage des articles
const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    const matchesCategory =
      selectedCategory.value === null ||
      article.categorie.id === selectedCategory.value;

    const matchesSearch =
      article.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.contenu.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.hero-banner {
  width: 100%;
  height: 40vh;
  background: linear-gradient(to right, #2980b9, rgba(41, 127, 185, 0.8)),
    url(../../../public/image/hero-banner.jpg) no-repeat center center/cover;
  position: relative;
  margin-bottom: 2rem;
}

.hero-banner .container {
  text-align: center;
  color: white;
  max-width: 800px;
}

.hero-banner .container h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
}

.hero-banner .container p {
  font-size: 1.2rem;
  line-height: 1.6;
}

.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  overflow: hidden;
  position: relative;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.article-card .card-img-top {
  height: 200px;
  object-fit: cover;
}

.article-card .card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  /* background: rgba(41, 128, 185, 0.9); */
  background: #f1948a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  z-index: 1;
}

.filters {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.categories-filter .btn {
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-outline-primary {
  color: #2980b9;
  border-color: #2980b9;
}

.btn-outline-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
  color: white;
}

@media (max-width: 768px) {
  .hero-banner {
    height: 50vh;
  }

  .hero-banner .container h1 {
    font-size: 2rem;
  }

  .categories-filter {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 1rem;
  }

  .filters .row {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
