import fetcher from "./fetcher";

const cinemaAPI = {
  getMovieScheduleDetails: (movieId) => {
    return fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        MaPhim: movieId,
      },
    });
  },

  getCinemaDetails: () => {
    return fetcher.get("/QuanLyRap/LayThongTinHeThongRap");
  },

  getMovieTheaterDetail: (theaterId) => {
    return fetcher.get(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong",
      {
        params: {
          maHeThongRap: theaterId,
        },
      }
    );
  },

  getTheaterMovieList: (theaterId) => {
    return fetcher.get(
      "/QuanLyRap/LayThongTinLichChieuHeThongRap",
      {
        params: {
          maHeThongRap: theaterId,
          maNhom: "GP01",
        },
      }
    );
  },
};

export default cinemaAPI;
