import fetcher from "./fetcher";

const userAPI = {
  getUserDetails: () => {
    return fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  updateUserInfo: (values) => {
    return fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...values,
      maNhom: "GP01",
    });
  },
};
export default userAPI;
