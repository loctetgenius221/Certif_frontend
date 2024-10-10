<template>
  <EnTete />

  <div>
    <section class="hero-banner d-flex align-items-center">
      <div class="container">
        <h1 class="mb-3">Nos Articles et Conseils de Santé</h1>
        <p>
          Découvrez nos articles rédigés par des professionnels de la santé.
          Informez-vous sur les dernières actualités médicales, obtenez des
          conseils pratiques pour prendre soin de votre bien-être, et explorez
          des sujets variés allant des soins préventifs aux traitements
          spécialisés.
        </p>
      </div>
    </section>

    <section class="blog">
      <div class="container">
        <div class="blog-content">
          <div class="row mb-5">
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
          </div>

          <div class="row mb-5">
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
              </div>
            </div>
            <div class="card col border-0">
              <img src="/image/articleimg.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Titre de mon article</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <router-link :to="{ name: 'Article' }" class="btn"
                  >Lire plus...</router-link
                >
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
import "@/assets/css/BlogView.css";
import EnTete from "../../components/EnTete.vue";
import PiedDePage from '../../components/PiedDePage.vue';
</script>


<style scoped>
</style>

