import { useState, useEffect } from "react";
import { ScrollArea } from "@mantine/core";
import cinemaAPI from "../../../../services/cinemaAPI";
import formatDateTime from "../../../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";
import styles from "./TheaterMovieList.module.css";

const TheaterMovieList = ({ theaterDetail }) => {
  const [theaterId, maCumRap] = theaterDetail;
  const [dataContent, setDataContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await cinemaAPI.getTheaterMovieList(theaterId);
        setDataContent(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [theaterId]);
  return (
    <div>
      <ScrollArea style={{ height: 500 }}>
        {dataContent.map((item, index) => (
          <div key={index}>
            {item.lstCumRap
              .filter((item) => item.maCumRap === maCumRap)
              .map((item, index) => (
                <div key={index}>
                  {item.danhSachPhim.map((item, index) => (
                    <div key={index} className="d-flex mb-4">
                      <div>
                        <img
                          src={item.hinhAnh}
                          width={200}
                          height="auto"
                          className="me-3"
                        />
                      </div>
                      <div>
                        <h4 className="text-white">{item.tenPhim}</h4>
                        <div className={styles.tabs__button}>
                          {item.lstLichChieuTheoPhim.map((item, index) => (
                            <button
                              key={index}
                              className="btn btn-warning"
                              onClick={() =>
                                navigate(`booking/${item.maLichChieu}`)
                              }
                            >
                              {formatDateTime(item.ngayChieuGioChieu)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default TheaterMovieList;
