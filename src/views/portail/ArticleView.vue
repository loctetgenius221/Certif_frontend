<template>
  <EnTete />

  <div>
    <section class="hero-banner d-flex align-items-center">
      <div class="container"></div>
    </section>

    <section class="article mb-5">
      <div class="container d-flex justify-content-center">
        <img src="../../../public/image/articleimg.jpg" alt="" />
        <div class="article-content">
          <small>11/09/2024 11:20</small>
          <h1 class="mt-3">Titre de mon article</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, Enim est eleifend mi, non
            fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa,
            scelerisque vitae, consequat in, pretium a, enim. Pellentesque
            congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede. Praesent blandit odio
            eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque
            fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut
            velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut
            orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius,
            ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus
            sapien eros vitae ligula. Pellentesque rhoncus nunc et augue.
            Integer id felis. Curabitur aliquet pellentesque diam. Integer quis
            metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Morbi vel erat non mauris convallis
            vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus,
            convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat.
            Proin feugiat, augue non elementum posuere, metus purus iaculis
            lectus, et tristique ligula justo vitae magna. Aliquam convallis
            sollicitudin purus. Praesent aliquam, enim at fermentum mollis,
            ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce
            vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu
            enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit
            nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt
            tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis
            magna fermentum augue, et ultricies lacus lorem varius purus.
            Curabitur eu amet.
          </p>
        </div>
      </div>
    </section>

    <section class="autres-articles">
      <div class="container">
        <h2 class="text-center mb-3">Autres articles</h2>

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
        </div>
      </div>
    </section>
  </div>
  <PiedDePage />

</template>

<script setup>
// import "@/assets/css/ArticleView.css";
import EnTete from "../../components/EnTete.vue";
import PiedDePage from '../../components/PiedDePage.vue';

</script>

<style scoped>
.article .container {
  flex-direction: column;
  align-items: center;
}

.article img {
  margin-top: -200px;
  border-radius: 10px;
  width: 90%;
  height: 380px;
  object-fit: cover;
}

.article-content h1 {
  font-family: 'Montserrat';
  font-weight: bold;
}

.article-content p {
  font-family: 'Open-sans';
  line-height: 35px;
  font-size: 18px;
}

.article .article-content {
  width: 60%;
  margin: 0 auto;
}
</style>