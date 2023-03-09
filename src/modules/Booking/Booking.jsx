import { useState } from "react";
import { useParams } from "react-router-dom";
import Bill from "../Booking/Bill";
import Seat from "../Booking/Seat";
import styles from "./Booking.module.css";

const Booking = () => {
  const { maLichChieu } = useParams();
  const [userName1, setUserName] = useState({ userName: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserName({ ...userName1, [name]: value });
  };

  return (
    <div className={styles.booking}>
      <br />
      <br />
      <br />
      <br />

      <div className={styles.booking__container}>
        <div>
          <div className={styles.screen}>Screen</div>
          <Seat maLichChieu={maLichChieu} />
        </div>

        <div>
          <button className="gheDuocChon my-2"></button>
          <span className="text-white mx-2">Booked</span>

          <button className="gheDangChon my-2"></button>
          <span className="text-white mx-2">Selecting</span>

          <button className="ghe my-2"></button>
          <span className="text-white mx-2">Available</span>

          <button className="gheVip my-2"></button>
          <span className="text-white mx-2">VIP</span>
        </div>

        <div className={`d-flex justify-content-between py-4 ${styles.bill}`}>
          <Bill maLichChieu={maLichChieu} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
