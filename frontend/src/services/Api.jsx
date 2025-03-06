import { axiosClient } from "../api/axios";
import SendTransaction from "../pages/RequestJob";

const Api = {
  getCsrfToken: async () => {
    return await axiosClient.get("/sanctum/csrf-cookie");
  },

  login: async (email, password) => {
    return await axiosClient.post("api/login", { email, password });
  },

  signup: async (firstname, lastname, email, password, c_password) => {
    return await axiosClient.post("api/register", {
      firstname,
      lastname,
      email,
      password,
      c_password,
    });
  },

  logout: async () => {
    return await axiosClient.post("api/logout");
  },

  filterOffers: async (selectedCity, selectedJob, selectedDate) => {
    return await axiosClient.post("api/offersby", {
      city_id: selectedCity,
      job_id: selectedJob,
      selected_date: selectedDate,
    });
  },

  OffersByCity: async (id) => {
    return await axiosClient.get(`/api/showbycity/${id}`);
  },

  OffersByJob: async (id) => {
    return await axiosClient.get(`/api/showbyjob/${id}`);
  },

  getWorker: async (id) => {
    return await axiosClient.get(`/api/worker/${id}`);
  },

  getClientToWorker: async (id) => {
    return await axiosClient.get(`/api/clienttoworker/${id}`);
  },

  getWorkers: async () => {
    return await axiosClient.get("/api/workers");
  },

   
  getRequests: async () => {
    return await axiosClient.get("/api/request");
  },

  getWorkerOffers: async () => {
    return await axiosClient.get("/api/workeroffers");
  },

  

  TakeRequest: async (id) => {
    return await axiosClient.put("/api/takerequest", {id});
  },

  getClient: async () => {
    return await axiosClient.get(`/api/client/`);
  },

  getAuthWorker : async () => {
    return await axiosClient.get("/api/authworker/");
  },

  updateWorkerProfile: async (userId, city_id, job_id) => {
    return await axiosClient.put(`/api/user/${userId}`, { city_id, job_id});
  },

  SendRequestJob: async (city, description) => {
      return await axiosClient.post("api/request", {city, description})
  },

  AddOffer: async (formData) => {
    return await axiosClient.post("api/offer", formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  UpdateProfileAvatar : async (formData) => {
    return await axiosClient.post("api/updateprofileavatar", formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  AddJob: async (formData) => {
    return await axiosClient.post("api/job", formData )
  },

  UpdateJob: async (updatedJob, id) => {
    return await axiosClient.put("api/job/"+id, updatedJob )
  },

  SendReview: async (stars, content, worker_id) => {
    return await axiosClient.post("api/review", {stars, content, worker_id})
  },

  UpdatePhone : async (phone, id) => {
      return await axiosClient.put("api/phone", {phone, id})
  },

  UpdateRole : async (id) => {
    return await axiosClient.put("api/role", {id})
  },

  UpdateAddress : async (address, id) => {
    return await axiosClient.put("api/address", {address, id})
  },

  cancelRequest: async (id) => {
    return await axiosClient.put("api/request/" + id)
  },

  cancelOffer: async (id) => {
    return await axiosClient.put("api/offer/" + id)
  },

  enrollOffer: async (id) => {
    return await axiosClient.put("api/enrolloffer/" + id)
  },
  
  getJobs: async () => {
    return await axiosClient.get("api/job");
  },

  getStats: async () => {
    return await axiosClient.get("api/stats");
  },

  deleteJob: async (id) => {
    return await axiosClient.delete("api/job/"+id);
  },

  getCities: async () => {
    return await axiosClient.get("api/cities");
  },

  getUser: async () => {
    return await axiosClient.get("api/user");
  },

  UpdateProfile: async (firstname, lastname, email) => {
    return await axiosClient.put("/api/update", { firstname, lastname, email });
  },


};

export default Api;
