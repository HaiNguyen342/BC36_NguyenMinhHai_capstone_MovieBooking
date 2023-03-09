import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import userAPI from "../../services/userAPI";
import { useSelector } from "react-redux";
import formatDateTime from "../../utils/formatDateTime";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  


  useEffect(() => {
    (async () => {
      try {
        const data = await userAPI.getUserDetails();
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDT,
      hoTen: userInfo.hoTen,
    },
    mode: "onTouched",
  });
  const { errors } = formState;

  useEffect (() => {
    reset ({
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDT,
      hoTen: userInfo.hoTen,
    })
  },[userInfo])

  const onInput = (evt) => {
    const { name, value } = evt.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onInputSoDt = (evt) => {
    const { value } = evt.target;
    setUserInfo({ ...userInfo, soDT: value });
  };

  const onSubmit = (values) => {
    console.log(values);
    (async () => {
      try {
        const newUserInfo = {
          ...values,
          maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
        };
        await userAPI.updateUserInfo(newUserInfo);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h4>Account setting</h4>
            <p>Update user infomation</p>
            <label>Username</label>
            <input
              value={userInfo.taiKhoan} 
              onInput={onInput}
              {...register("Username", {
                required: {
                  value: true,
                  message: "Username can not be blank",
                },
              })}
            />
            {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
          </div>

          <div>
            <label>Password</label>
            <input
              value={userInfo.matKhau}
              onInput={onInput}
              {...register("Password", {
                required: {
                  value: true,
                  message: "Password can not be blank",
                },
              })}
            />
            {errors.matKhau && <span>{errors.matKhau.message}</span>}
          </div>

          <div>
            <label>Email</label>
            <input
              value={userInfo.email}
              onInput={onInput}
              {...register("email", {
                required: { value: true, message: "Email can not be blank" },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>Number</label>
            <input
              value={userInfo.soDT}
              onInput={onInputSoDt}
              {...register("Number", {
                required: {
                  value: true,
                  message: "Number can not be blank",
                },
              })}
            />
            {errors.soDt && <span>{errors.soDt.message}</span>}
          </div>

          <div>
            <label>Fullname</label>
            <input
              value={userInfo.hoTen}
              onInput={onInput}
              {...register("Fullname", {
                required: { value: true, message: "Fullname can not be blank" },
              })}
            />
            {errors.hoTen && <span>{errors.hoTen.message}</span>}
          </div>

          <button>Update</button>
        </form>
      </div>

      <div>
        <h4>Booking history</h4>
        {userInfo.thongTinDatVe?.map((item, index) => (
          <div key={index}>
            <p>Date & time: {formatDateTime(item.ngayDat)}</p>
            <h4>Movie name: {item.tenPhim}</h4>
            <p>
              Time: {item.thoiLuongPhim} minutes | Price: {item.giaVe} VND
            </p>
            <h4>{item.danhSachGhe[0].tenHeThongRap}</h4>
            <p>
              {item.danhSachGhe[0].tenRap} | Seat(s):
              {item.danhSachGhe.map((item, index) => (
                <span key={index}> {item.tenGhe},</span>
              ))}
            </p>
            <span>
              Purchased: {item.giaVe * item.danhSachGhe.length}{" "}
              VND
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
