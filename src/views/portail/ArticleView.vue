<template>
  <EnTete />

  <div>
    <section class="hero-banner d-flex align-items-center">
      <div class="container">
        <h1 class="text-white fw-bold">Bienvenue sur notre blog de santé</h1>
        <p class="text-white">
          Découvrez nos derniers articles sur des sujets de bien-être et de
          prévention.
        </p>
      </div>
    </section>

    <section class="article mb-5" v-if="article">
      <div
        class="container d-flex flex-column flex-md-row justify-content-center align-items-start gap-3"
      >
        <div class="article-content">
          <img
            :src="article.image"
            alt="Image de l'article"
            class="article-image"
          />

          <small class="text-muted">{{
            formatDate(article.date_publication)
          }}</small>
          <h1 class="mt-3 mb-4">{{ article.titre }}</h1>
          <div class="content" v-html="article.contenu"></div>
        </div>
      </div>
    </section>

    <section class="autres-articles" v-if="autresArticles.length">
      <div class="container mb-5">
        <h2 class="text-center mb-5">Autres articles</h2>

        <div class="row row-cols-1  row-cols-md-2 row-cols-lg-3 g-4">
          <div
            v-for="autreArticle in autresArticles"
            :key="autreArticle.id"
            class="col"
          >
            <div class="card h-100 shadow-sm article-card">
              <div class="category-badge">{{ autreArticle.categorie.nom }}</div>
              <img
                :src="autreArticle.image"
                class="card-img-top"
                :alt="autreArticle.titre"
              />
              <div class="card-body">
                <h5 class="card-title">{{ autreArticle.titre }}</h5>
                <p class="card-text text-muted mb-3">
                  {{ getExtrait(autreArticle.contenu) }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <router-link
                    :to="{ name: 'Article', params: { id: autreArticle.id } }"
                    class="btn btn-primary"
                    @click="refresh"
                  >
                    Lire plus
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <PiedDePage />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import EnTete from "../../components/EnTete.vue";
import PiedDePage from "../../components/PiedDePage.vue";
import { getArticle, allArticle } from "@/services/articleService";

const article = ref(null);
const autresArticles = ref([]);
const route = useRoute();

const refresh = async () => {
  window.location.reload();
};

// Fonction pour formater la date
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

// Fonction pour limiter le contenu HTML tout en conservant les balises de base
const getExtrait = (contenu) => {
  const div = document.createElement("div");
  div.innerHTML = contenu;
  const texte = div.textContent || div.innerText || "";
  return texte.length > 100 ? texte.slice(0, 100) + "..." : texte;
};

const fetchArticle = async () => {
  try {
    const articleId = route.params.id;
    const response = await getArticle(articleId);
    article.value = response.data;

    const res = await allArticle();
    autresArticles.value = res.data.slice(-3);
  } catch (error) {
    console.log("Erreur lors de la récupération de l'article:", error);
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<style scoped>
.hero-banner {
  width: 100%;
  height: 45vh;
  background: linear-gradient(to right, #2980b9, rgba(0, 0, 0, 0.5)),
    url(../../../public/image/herobanner02.jpg) no-repeat top center/cover;
}

.article .container {
  flex-direction: column;
  align-items: center;
}

.article-image {
  width: 100%;
  max-height: 400px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #297fb95b;
  object-fit: cover;
  margin-top: -150px;
}

.article-content {
  width: 65%;
  margin-top: 2rem;
}

.article-content h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.article-content p {
  font-family: "Open Sans", sans-serif;
  line-height: 1.6;
  font-size: 1.125rem;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.btn-primary {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-primary:hover {
  background-color: #2471a3;
  border-color: #2471a3;
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

.btn-primary {
  background-color: #2980b9;
  border-color: #2980b9;
}

@media (min-width: 577px) and (max-width: 992px) {
  .hero-banner {
    padding: 0 20px;
    height: 45vh;
  }

  .article-content {
    width: 100%;
    margin-top: 1rem;
    padding: 0 20px;
  }

  .autres-articles {
    padding: 0px 20px;
  }
}

@media (max-width: 767px) {
  .hero-banner {
    padding: 0 20px;
  }

  .article-content {
    width: 100%;
    margin-top: 6rem;
    padding: 0 20px;
  }

  .hero-banner {
    height: 55vh;
  }

  .autres-articles {
    padding: 0px 20px;
  }
}
</style>
