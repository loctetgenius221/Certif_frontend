<template>
  <div>
    <div class="main--content">
      <div class="header--wrapper">
        <div class="header--title">
          <div class="search--box">
            <i class="fa-solid fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div class="user--info">
          <i class="fas fa-bell"></i>
          <div class="d-flex align-items-center gap-2">
            <img
              src="../../public/image/photo-profil.png"
              alt="photo de profil"
            />
            <div>
              <h4 class="m-0 p-0">Marème Thiaw</h4>
              <p class="m-0 p-0">Medecin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.main--content {
  position: sticky;
  top: 80px;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 0rem;
}

/* .sidebar {
  position: ;
  top: 0;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100vh;
  padding: 0 1.7rem;
  color: #fff;
  overflow: hidden;
  transition: all 0.5s linear;
  background: #fff;
  box-shadow: 0px 10px 25px #297fb918;
  z-index: 5;
} */

.header--wrapper img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.header--wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  padding: 10px 0rem;
  margin-bottom: 1rem;
}

.user--info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user--info i {
  font-size: 1.5rem;
  cursor: pointer;
}

.user--info h4 {
  font-size: 1rem;
}

.search--box {
  background: none;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
}

.search--box input {
  background: transparent;
  padding: 6px 15px;
  border: none;
  outline: none;
  /* color: #ADB5BD; */
  font-size: 16px;
}

.search--box i {
  color: #adb5bd;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.search--box i:hover {
  transform: scale(1.2);
}
</style>
