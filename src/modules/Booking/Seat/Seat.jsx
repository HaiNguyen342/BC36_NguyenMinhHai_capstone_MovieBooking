import { useEffect } from "react";
import bookingAPI from "../../../services/bookingAPI";
import styles from "./Seat.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setInitialState, pickSeat } from "../../../slices/seatSlice";

const Seat = ({ maLichChieu }) => {
  const dispatch = useDispatch();
  const seatDetail = useSelector((state) => state.seat);
  const count = seatDetail.count;

  useEffect(() => {
    (async () => {
      try {
        const data = await bookingAPI.seatList(maLichChieu);
        dispatch(setInitialState(data.danhSachGhe));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [maLichChieu, count]);

  const handleOnClick = (stt) => {
    dispatch(pickSeat(stt));
  };

  return (
    <div className="mb-4">
      <div className={styles.seat}>
        {seatDetail.seats?.map((item, index) => (
          <div
            key={index}
            className={
              item.daDat
                ? "gheDuocChon"
                : item.dangChon
                ? "gheDangChon"
                : item.loaiGhe === "Vip"
                ? "gheVip"
                : "ghe"
            }
            onClick={() => handleOnClick(item.stt)}
          >
            {item.stt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seat;
