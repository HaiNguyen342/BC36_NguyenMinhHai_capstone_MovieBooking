import { useState, useEffect } from "react";
import { Tabs } from "@mantine/core";
import cinemaAPI from "../../../services/cinemaAPI";
import MovieTheater from "./MovieTheater";
import styles from "./CinemaList.module.css";
import useWindowSize from "../../../utils/useWindowSize";

const CinemaList = () => {
  const [cinema, setCinema] = useState([]);
  const size = useWindowSize();

  useEffect(() => {
    (async () => {
      try {
        const data = await cinemaAPI.getCinemaDetails();
        setCinema(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles.cinema} hidden={(size.width>1200)?false:true}>
      <div className={styles.cinema__container} id="cinemaList">
        <Tabs
          color="yellow"
          variant="pills"
          orientation="vertical"
          defaultValue="0"
        >
          <Tabs.List>
            {cinema.map((item, index) => (
              <Tabs.Tab
                key={index}
                value={`${index}`}
                icon={
                  <img src={item.logo} width={57.19} height="auto" alt="logo" />
                }
              ></Tabs.Tab>
            ))}
          </Tabs.List>

          {cinema.map((item, index) => (
            <Tabs.Panel value={`${index}`} pl="xs" key={index}>
              <MovieTheater theaterId={item.maHeThongRap} />
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CinemaList;
