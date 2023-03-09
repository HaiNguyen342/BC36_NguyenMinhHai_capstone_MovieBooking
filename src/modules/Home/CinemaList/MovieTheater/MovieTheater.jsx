import { useState, useEffect } from "react";
import { Tabs, ScrollArea, Text } from "@mantine/core";
import cinemaAPI from "../../../../services/cinemaAPI";
import TheaterMovieList from "../TheaterMovieList";
import styles from "./MovieTheater.module.css"

const MovieTheater = ({ theaterId }) => {
  const [theater, setTheater] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await cinemaAPI.getMovieTheaterDetail(theaterId);
        setTheater(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [theaterId]);

  return (
    <div>
      <Tabs
        color="yellow"
        variant="pills"
        orientation="vertical"
        defaultValue="0"
      >
        <ScrollArea style={{ height: 500 }}>
          <Tabs.List className={styles.tabs__button}>
            {theater.map((item, index) => (
              <Tabs.Tab value={`${index}`} key={index} className="text-white">
                <h6 className={styles.tabs__text}>{item.tenCumRap}</h6>
                <p className={styles.tabs__text}>{item.diaChi}</p>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>

        {theater.map((item, index) => (
          <Tabs.Panel value={`${index}`} pl="xs" key={index}>
            <TheaterMovieList theaterDetail={[theaterId, item.maCumRap]} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default MovieTheater;
