import { useState, useEffect } from "react";
import movieAPI from "../../../services/movieAPI";
import { Card, Modal, Tab, Tabs } from "react-bootstrap";
import styles from "./Showing.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../utils/useWindowSize";

const Showing = () => {
  const [movies, setMovies] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [linkTrailer, setLinkTraier] = useState();
  const size = useWindowSize();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Tabs: Đang chiếu/Sắp chiếu
  const movieNowShowings = movies.filter((item) => item.dangChieu === true);
  const movieComingSoons = movies.filter((item) => item.sapChieu === true);

  //Silder
  var settings = {};
  if (size.width > 768) {
    settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "0px",
      slidesToShow: 1,
      speed: 400,
      rows: 2,
      slidesPerRow: 4,
      dots: true,
      arrows: false,
    };
  } else if (size.width > 576) {
    settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "0px",
      slidesToShow: 1,
      speed: 400,
      rows: 2,
      slidesPerRow: 2,
      dots: true,
      arrows: false,
    };
  } else {
    settings = {
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "0px",
      slidesToShow: 1,
      speed: 400,
      rows: 2,
      slidesPerRow: 1,
      dots: true,
      arrows: false,
    };
  }

  //Modal
  const handleOnClick = (link) => {
    setModalShow(true);
    setLinkTraier(link);
  };

  return (
    <div className={styles.showing} id="showing">
      <div className={styles.showing__container}>
        <Tabs
          defaultActiveKey="nowShowing"
          id="uncontrolled-tab-example"
          className={styles.tabs}
        >
          <Tab eventKey="nowShowing" title="Showing">
            <Slider {...settings} className={styles.sliders}>
              {movieNowShowings.map((item) => (
                <div key={item.maPhim} className={styles.showing__item}>
                  <Card className={styles.card}>
                    <div className={styles.card__top}>
                      <Card.Img
                        variant="top"
                        src={item.hinhAnh}
                        height="330px"
                        className={styles.card__img}
                      />
                      <button onClick={() => handleOnClick(`${item.trailer}`)}>
                        <i class="fa-solid fa-play"></i>
                      </button>
                    </div>

                    <Card.Body className={styles.card__body}>
                      <Card.Title className={styles.card__title}>
                        {item.tenPhim}
                      </Card.Title>
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/movie/${item.maPhim}`)}
                      >
                        Book tickets
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Slider>
          </Tab>

          <Tab eventKey="comingSoon" title="Soon">
            <Slider {...settings} className={styles.sliders}>
              {movieComingSoons.map((item) => (
                <div key={item.maPhim} className={styles.showing__item}>
                  <Card className={styles.card}>
                    <div className={styles.card__top}>
                      <Card.Img
                        variant="top"
                        src={item.hinhAnh}
                        height="330px"
                        width=""
                        className={styles.card__img}
                      />
                      <button onClick={() => handleOnClick(`${item.trailer}`)}>
                        <i class="fa-solid fa-play"></i>
                      </button>
                    </div>

                    <Card.Body className={styles.card__body}>
                      <Card.Title className={styles.card__title}>
                        {item.tenPhim}
                      </Card.Title>
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/movie/${item.maPhim}`)}
                      >
                        Book tickets
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Slider>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Showing;
