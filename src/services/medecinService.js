import axios from "axios";
import { api_base_url } from "@/apiConfig";

// Base URL de l'API
const api = axios.create({
  baseURL: api_base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});

export const getMedecinList = async () => {
  try {
    const token = localStorage.getItem("token")

    const response = await api.get('/medecins', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log("Erreur lors de la récupération des médecins", error)
  }
}

// export const getRendezVousPatient = async (patientId) => {
//   try {
//     const token = localStorage.getItem("token");
//     // console.log("Token:", token);

//     const response = await api.get(`/rendezvous/patient/${patientId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("Response data:", response.data);

//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       console.error("Unauthorized. Redirecting to login...");
//       router.push({ name: "Connexion" });
//     } else {
//       console.error("Erreur lors de la récupération de la liste des rendez-vous", error);
//     }
//   }
// };