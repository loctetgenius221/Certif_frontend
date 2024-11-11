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
          <!-- Bouton pour ouvrir la section des notifications -->
          <button
            class="bouton-notif text-dark font-bold py-2 px-3"
            @click="toggleNotificationSection"
          >
            <i class="fas fa-bell"></i>
            <span v-if="unreadCount" class="badge">{{ unreadCount }}</span>
          </button>

          <div class="d-flex align-items-center gap-2">
            <img src="../../public/image/photo-profil.png" alt="photo de profil" />
            <div>
              <h4 class="m-0 p-0">Marème Thiaw</h4>
              <p class="m-0 p-0">Medecin</p>
            </div>
          </div>
        </div>
      </div>
      <div class="header--content">
        <h1>Hello Céline !</h1>
        <p>Bienvenue sur l'interface d'administration</p>
      </div>
    </div>

    <!-- Section des notifications -->
    <div
      class="notification-section"
      :class="{ 'show': showNotificationSection }"
    >
      <div class="notification-content">
        <div class="notification-header">
          <h5>Notifications</h5>
          <button @click="toggleNotificationSection" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="notification-body">
          <div
            class="bg-light p-3 mb-3 rounded shadow-sm d-flex justify-content-between align-items-center"
            v-for="notification in sortedNotifications"
            :key="notification.id"
            :class="{ 'bg-secondary text-white': notification.lu }"
          >
            <div>
              <p class="font-weight-bold text-dark">{{ notification.contenu }}</p>
              <p class="text-muted">{{ formatDate(notification.date_envoi) }}</p>
            </div>
            <div class="actions d-flex gap-2">
              <button
                v-if="!notification.lu"
                @click="markAsRead(notification.id)"
                class="btn btn-outline-primary btn-sm"
                title="Marquer comme lu"
              >
                <i class="fas fa-envelope-open"></i>
              </button>
              <button
                @click="handleDeleteNotification(notification.id)"
                class="btn btn-outline-danger btn-sm"
                title="Supprimer"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <p v-if="sortedNotifications.length === 0" class="text-center text-muted">
            Aucune notification
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchNotifications, markNotificationAsRead, deleteNotification } from "@/services/notificationsService";

const showNotificationSection = ref(false);
const notifications = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const sortedNotifications = computed(() => {
  return [...notifications.value].sort((a, b) => new Date(b.date_envoi) - new Date(a.date_envoi));
});

const unreadCount = computed(() => {
  return notifications.value.filter((notification) => !notification.lu).length;
});

const markAsRead = async (notificationId) => {
  await markNotificationAsRead(notificationId);
};

const handleDeleteNotification = async (notificationId) => {
  await deleteNotification(notificationId);
};

const toggleNotificationSection = () => {
  showNotificationSection.value = !showNotificationSection.value;
};

onMounted(async () => {
  const { data } = await fetchNotifications();
  notifications.value = data;
});
</script>

<style scoped>
.notification-section {
  position: fixed;
  top: 0;
  right: -40%;
  width: 25%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-in-out;
  z-index: 9999;
}

.notification-section.show {
  right: 0;
}

.notification-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.notification-header {
  background-color: #2980b9;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-header h5 {
  margin: 0;
}

.notification-header .btn-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.notification-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.bouton-notif {
  position: relative;
  background: none;
  border: none;
}

.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
  position: absolute;
  top: 5px;
  right: 5px;
}
.main--content {
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  padding: 0.5rem 0rem;
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
  padding: 10px 2.3rem;
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

.header--content {
  width: 100%;
  height: 150px;
  background: url("../../public/image/Graphic_Side01.jpg") no-repeat center center/cover;
  padding: 40px;
  color: white;
}

.header--content h1 {
  color: white;
  font-size: 24px;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.header--content p {
  font-weight: 500;
}
</style>