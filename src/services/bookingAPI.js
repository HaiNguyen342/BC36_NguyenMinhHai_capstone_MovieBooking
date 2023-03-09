import fetcher from "./fetcher";

const bookingAPI = {
  seatList: (values) => {
    return fetcher.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: values,
      },
    });
  },

  booking: (values) => {
    return fetcher.post("QuanLyDatVe/DatVe", values)
  }
};

export default bookingAPI;
