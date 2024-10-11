<template>
  <div class="d-flex">
    <SidebaPatient />
    <div class="section-content">
      <HeaderPatient />
      <div class="section-container mb-5">
        <h1>Dossier Médicales</h1>
        <div class="dossier-content">
          <div class="info-medeicale">
            <div class="mb-4">
              <h2>Antécédents médicaux</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                tortor, dignissim sit amet, adipiscing nec, ultricies sed,
                dolor.
              </p>
            </div>
            <div class="mb-4">
              <h2>Traitements médicaux</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                tortor, dignissim sit amet, adipiscing nec, ultricies sed,
                dolor.
              </p>
            </div>
            <div class="mb-4">
              <h2>Note d'observations</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                tortor, dignissim sit amet, adipiscing nec, ultricies sed,
                dolor.
              </p>
            </div>
            <div class="mb-4">
              <h2>Interventions chirurgicales</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                tortor, dignissim sit amet, adipiscing nec, ultricies sed,
                dolor.
              </p>
            </div>
            <div class="mb-4">
              <h2>Informations supplémentaires</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                tortor, dignissim sit amet, adipiscing nec, ultricies sed,
                dolor.
              </p>
            </div>
          </div>
          <div class="info-generale">
            <div class="d-flex flex-column align-items-center gap-3">
              <img
                src="../../../public/image/portrait-3d-female-doctor.jpg"
                alt="Photo de profil du patient"
              />
              <h3>Informations générales</h3>
            </div>
            <div>
              <p>Prénom: <strong>Aminata</strong></p>
              <p>Nom: <strong>Sall</strong></p>
              <p>Numéro de dossier: <strong>DME-20240917-001</strong></p>
              <p>Date de naissance: <strong>18/03/1998</strong></p>
              <p>Contact: <strong>77 240 52 03</strong></p>
              <p>Email: <strong>ndiayeassane@gmail.com</strong></p>
              <p>Adresse: <strong>Dieupeul 3</strong></p>
              <p>Numéro patient: <strong>PAT_2031</strong></p>
              <p>Contact d'urgence: <strong>76 987 6543</strong></p>
            </div>
          </div>
        </div>
        <div class="document-content d-flex">
          <div class="televerser-document">
            <h4 class="">Téléverser un document</h4>
            <div class="upload-container p-3">
              <form action="" method="" enctype="multipart/form-data">
                <div class="form-group">
                  <div class="drag-drop-area" id="drop-zone">
                    <div class="icon">
                      <i class="bi bi-file-earmark"></i>
                    </div>
                    <p>Drag n Drop here</p>
                    <p>Or <span class="browse-link">Browse</span></p>
                    <input
                      type="file"
                      name="file"
                      id="file-upload"
                      class="file-input"
                    />
                  </div>
                </div>
                <button type="submit" class="btn btn-secondary mt-3">
                  Téléverser maintenant
                </button>
              </form>
            </div>
          </div>
          <div class="document-contenu">
            <div class="d-flex align-items-center gap-2 mb-3">
              <i class="bi bi-file-earmark-text"></i>
              <h3 class="mb-0">Mes documents</h3>
            </div>
            <div>
              <div class="d-flex gap-2">
                <i class="bi bi-file-earmark-text"></i>
                <p>Résultat d'examen</p>
              </div>
              <div class="d-flex gap-2">
                <i class="bi bi-file-earmark-text"></i>
                <p>Résultat d'examen</p>
              </div>
              <div class="d-flex gap-2">
                <i class="bi bi-file-earmark-text"></i>
                <p>Résultat d'examen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SidebaPatient from "@/components/SidebaPatient.vue";
import HeaderPatient from "@/components/HeaderPatient.vue";
</script>

<style scoped>
.section-container h1 {
  font-family: "Montserrat";
  font-size: 18px;
  color: #717171;
  margin-bottom: 15px;
}

.section-container h2 {
  color: #000;
  font-size: 18px;
}

.dossier-content {
  display: flex;
  gap: 25px;
}

.dossier-content .info-medeicale {
  flex: 3;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}
.dossier-content .info-generale {
  flex: 1;
  height: fit-content;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

.dossier-content .info-generale img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2980b9;
}
.dossier-content .info-generale h3 {
  font-size: 18px;
}

.document-content {
  gap: 25px;
  margin-top: 25px;
}

.document-content .televerser-document {
  flex: 3;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

.document-content .televerser-document h4 {
  font-size: 18px;
  color: #2980b9;
}

.document-content .document-contenu {
  flex: 1;
  height: fit-content;
  box-shadow: 0 0 8px #297fb921;
  padding: 25px;
  border-radius: 8px;
}

/* Formulaire upload */
.upload-container {
  /* border: 2px solid red; */
  border-radius: 5px;
  background-color: none;
  border: 1px solid #bdbdbd;
}

.drag-drop-area {
  border: 2px dashed #cccccc;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}

.drag-drop-area:hover {
  background-color: #e9ecef;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.icon {
  font-size: 48px;
  color: #6c757d;
}

.browse-link {
  color: #007bff;
  text-decoration: none;
}

.browse-link:hover {
  text-decoration: underline;
}

.upload-container .btn {
  background: #2980b9;
  border: none;
  width: 100%;
  padding: 15px;
  font-weight: bold;
} 

/* document-contenu */
.document-contenu h3 {
  font-size: 18px;
}

/* Bouton retour */
.btn-retour {
  padding: 0;
  text-decoration: underline;
  text-decoration-color: #2980b9;
}
</style>
