import { axiosClient } from "../api/axios";

const Api = {


  login: async (email, password) => {
    return await axiosClient.post("api/v1/auth/authenticate", { email, password });
  },

  signup: async (firstName, lastName, email, password, c_password) => {
    return await axiosClient.post("api/v1/auth/register", {
      firstName,
      lastName,
      email,
      password,
      c_password,
    });
  },

  logout: async () => {
    return await axiosClient.post("api/v1/auth/logout");
  },

  // filterOffers: async (selectedCity, selectedJob, selectedDate) => {
  //   return await axiosClient.post("api/offersby", {
  //     city_id: selectedCity,
  //     job_id: selectedJob,
  //     selected_date: selectedDate,
  //   });
  // },

  filterOffers: async (selectedCity, selectedJob, selectedDate) => {
    let params = new URLSearchParams();
    
    if (selectedCity) params.append('cityId', selectedCity);
    if (selectedJob) params.append('jobId', selectedJob);
    if (selectedDate) {
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
        params.append('offerDate', formattedDate);
    }

    return await axiosClient.get(`/api/v1/offers?${params.toString()}`);
},

  OffersByCity: async (id) => {
    return await axiosClient.get(`/api/v1/offers/showbycity/${id}`);
  },

  OffersByJob: async (id) => {
    return await axiosClient.get(`/api/v1/offers/showbyjob/${id}`);
  },

  getWorker: async (id) => {
    return await axiosClient.get(`/api/v1/workers/${id}`);
  },

  getClientToWorker: async (id) => {
    return await axiosClient.get(`/api/v1/users/clienttoworker/${id}`);
  },

  getWorkers: async () => {
    return await axiosClient.get("/api/v1/workers");
  },

   
  getRequests: async () => {
    return await axiosClient.get("/api/v1/requests");
  },

  getWorkerOffers: async () => {
    return await axiosClient.get("/api/v1/offers/workeroffers");
  },


  TakeRequest: async (id) => {
    return await axiosClient.put(`/api/v1/requests/takerequest/`+ id);
  },

  getClient: async () => {
    return await axiosClient.get(`/api/v1/users/client/`);
  },

  getAuthWorker : async () => {
    return await axiosClient.get("/api/v1/workers/authworker");
  },

  updateWorkerProfile: async (city_id, job_id) => {
    return await axiosClient.patch('/api/v1/workers/update-wokerprofile', { city_id, job_id});
  },

  SendRequestJob: async (city, description) => {
      return await axiosClient.post("api/v1/requests", {city, description})
  },

  AddOffer: async (formData) => {
    return await axiosClient.post("api/v1/offers", formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // UpdateProfileAvatar : async (formData) => {
  //   return await axiosClient.post("api/updateprofileavatar", formData , {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  // },

  AddJob: async (formData) => {
    return await axiosClient.post("api/professions", formData )
  },

  UpdateJob: async (updatedJob, id) => {
    return await axiosClient.put("api/professions/"+id, updatedJob )
  },

  SendReview: async (stars, content, id) => {
    return await axiosClient.post(`api/v1/reviews?workerId=${id}`, {stars, content});
  },

  deleteReview: async (id) => {
    return await axiosClient.delete(`api/v1/reviews/${id}`);
  },

  UpdatePhone : async (phone, id) => {
      return await axiosClient.patch("api/v1/users/update-profile", {phone, id})
  },

  UpdateRole : async (role_id) => {
    return await axiosClient.patch("api/v1/users/update-role", {role_id})
  },

  UpdateAddress : async (address, id) => {
    console.log(address);
    return await axiosClient.patch("api/v1/users/update-profile", {address, id})
  },

  cancelRequest: async (id) => {
    return await axiosClient.put("api/request/" + id)
  },

  cancelOffer: async (id) => {
    return await axiosClient.put("api/v1/offers/" + id)
  },

  enrollOffer: async (id) => {
    return await axiosClient.put("api/v1/offers/enrolloffer/" + id)
  },
  
  getJobs: async () => {

    return await axiosClient.get("api/v1/professions");
  },

  getStats: async () => {
    return await axiosClient.get("api/stats");
  },

  deleteJob: async (id) => {
    return await axiosClient.delete("api/professions/"+id);
  },

  getCities: async () => {
    return await axiosClient.get("api/v1/cities");
  },

  getUser: async () => {
    return await axiosClient.get("api/user");
  },

  UpdateProfile: async (firstname, lastname, email) => {
    return await axiosClient.put("/api/update", { firstname, lastname, email });
  },


};

export default Api;
