<template>
  <div class="content d-flex">
    <div class="sidebar">
      <div class="logo"></div>
      <ul class="menu">
        <li
          v-for="item in menuItems"
          :key="item.label"
          :class="{ active: item.active }"
        >
          <a :href="item.link">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        </li>
        <li class="logout">
          <a href="#">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="main--content">
      <div class="header--wrapper">
        <div class="header--title">
          <span>Primary</span>
          <h2>Dashboard</h2>
        </div>
        <div class="user--info">
          <div class="search--box">
            <i class="fa-solid fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          <img src="images/mon_profil.jpg" alt="photo de profil" />
        </div>
      </div>

      <div class="card--container">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
});

// Menus en fonction du rôle de l'utilisateur
const menus = {
  administrateur: [
    {
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      link: "#",
      active: true,
    },
    { icon: "fas fa-user", label: "Gestion des Utilisateurs", link: "#" },
    { icon: "fas fa-cog", label: "Paramètres", link: "#" },
  ],
  medecin: [
    {
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      link: "#",
      active: true,
    },
    { icon: "fas fa-user-md", label: "Mes Patients", link: "#" },
    { icon: "fas fa-calendar", label: "Agenda", link: "#" },
  ],
  assistant: [
    {
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      link: "#",
      active: true,
    },
    { icon: "fas fa-briefcase", label: "Tâches", link: "#" },
    { icon: "fas fa-question-circle", label: "FAQ", link: "#" },
  ],
  patient: [
    {
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
      link: "#",
      active: true,
    },
    { icon: "fas fa-user", label: "Mon Profil", link: "#" },
    { icon: "fas fa-calendar-check", label: "Mes Rendez-vous", link: "#" },
  ],
};

// Menu items computed based on the user's role
const menuItems = computed(() => menus[props.role] || []);
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  bottom: 0;
  width: 110px;
  height: 100vh;
  padding: 0 1.7rem;
  color: #fff;
  overflow: hidden;
  transition: all 0.5s linear;
  background: rgba(113, 99, 186, 255);
}

.sidebar:hover {
  width: 240px;
  transition: 0.5s;
}

.logo {
  height: 80px;
  padding: 16px;
}

.menu {
  height: 88%;
  position: relative;
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 1rem;
  margin: 8px 0;
  border-radius: 8px;
  transition: all 0.5 ease-in-out;
}

.menu li:hover,
.active {
  background: #e0e0e058;
}

.menu a {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.menu a span {
  overflow: hidden;
}

.menu a i {
  font-size: 1.2rem;
}

.logout {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

/* main body section */

.main--content {
  position: relative;
  background: #ebe9e9;
  width: 100%;
  padding: 1rem;
}

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
  padding: 10px 2rem;
  margin-bottom: 1rem;
}

.header--title {
  color: rgba(113, 99, 186, 255);
}

.user--info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search--box {
  background: rgb(237, 237, 237);
  border-radius: 15px;
  color: rgba(113, 99, 186, 255);
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
}

.search--box input {
  background: transparent;
  padding: 10px;
}

.search--box i {
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.search--box i:hover {
  transform: scale(1.2);
}

/* card container */
</style>
