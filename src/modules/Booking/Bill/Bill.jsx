import { useState, useEffect } from "react";
import bookingAPI from "../../../services/bookingAPI";
import styles from "./Bill.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "@mantine/core";
import { booking } from "../../../slices/seatSlice";

const Bill = ({ maLichChieu }) => {
  const [opened, setOpened] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const seatDetail = useSelector((state) => state.seat);
  const dispatch = useDispatch();


  const danhSachVe = seatDetail.seatPickings.map((item) => {
    return { maGhe: item.maGhe, giaVe: item.giaVe };
  });

  const bill = {
    maLichChieu: maLichChieu,
    danhSachVe: danhSachVe,
  };

  const handleBooking = async () => {
    try {
      await bookingAPI.booking(bill);
      setOpened(true);
      dispatch(booking());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await bookingAPI.seatList(maLichChieu);
        setMovieDetail(data.thongTinPhim);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [maLichChieu]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className={styles.bill__border}>
          <table className={styles.bill}>
            <tbody className="text-white">
              <tr>
                <td className="text-center">
                  <p>
                    {seatDetail.seatPickings.reduce(
                      (total, item) => total + item.giaVe,
                      0
                    ) || 0}{" "}
                    VND
                  </p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Group: </h5>

                  <p>{movieDetail.tenCumRap}</p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Address: </h5>

                  <p>{movieDetail.diaChi}</p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Theater: </h5>

                  <p>{movieDetail.tenRap}</p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Showtime: </h5>

                  <p>
                    {movieDetail.ngayChieu}~{movieDetail.gioChieu}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Name: </h5>

                  <p>{movieDetail.tenPhim}</p>
                </td>
              </tr>
              <tr>
                <td className="d-flex justify-content-between">
                  <h5>Seat(s): </h5>
                  <div>
                    {seatDetail.seatPickings.map((item, index) => (
                      <span key={index}> {item.tenGhe},</span>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <img
            src={movieDetail.hinhAnh}
            alt={movieDetail.tenPhim}
            width="auto"
            height={300}
          />
        </div>

        <div>
          <button className="btn btn-warning" onClick={() => handleBooking()}>
            Book tickets
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Booked successfully!"
      ></Modal>
    </div>
  );
};

export default Bill;
