import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNiIsIkhldEhhblN0cmluZyI6IjE5LzA3LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4OTcyNDgwMDAwMCIsIm5iZiI6MTY2MDQxMDAwMCwiZXhwIjoxNjg5ODcyNDAwfQ.LOuGqORmUbzSj-vrf010cInw8TjYTzoLxS6HI1nQakE",
  },
});

// interceptors
fetcher.interceptors.response.use(
  // Success
  (response) => {
    return response.data.content;
  },
  // Fail
  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

fetcher.interceptors.request.use(
  (config) => {
    const { accessToken } = JSON.parse(localStorage.getItem("user")) || {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;
