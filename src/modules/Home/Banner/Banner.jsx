import { useState, useEffect, useRef } from "react";
import movieAPI from "../../../services/movieAPI";
import { Carousel } from "antd";
import styles from "./Banner.module.css";
import Autoplay from 'embla-carousel-autoplay';



const Banner = () => {
  const [banners, setBanners] = useState([]);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  

  useEffect(() => {
    (async () => {
      const data = await movieAPI.getBanners();
      setBanners(data);
    })();
  }, []);

  return (
    <Carousel autoplay className={styles.banner}>
      {banners.map((item) => (
        <div key={item.maPhim}>
          <img src={item.hinhAnh} alt={item.maPhim} className={styles.img} />
        </div>
      ))}
    </Carousel>
    
  );
};

export default Banner;
