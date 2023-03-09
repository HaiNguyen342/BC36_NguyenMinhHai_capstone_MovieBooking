import fetcher from "./fetcher";

const movieAPI = {
  getBanners: () => {
    return fetcher.get("/QuanLyPhim/LayDanhSachBanner");
  },

  getMovies: () => {
    return fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP01",
      },
    });
  },

  getMovieDetails: (movieId) => {
    return fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        MaPhim: movieId,
      },
    });
  },
};

export default movieAPI;
