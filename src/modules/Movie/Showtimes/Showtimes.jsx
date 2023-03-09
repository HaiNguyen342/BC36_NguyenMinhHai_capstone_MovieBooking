import { useState, useEffect } from "react";
import cinemaAPI from "../../../services/cinemaAPI";
import { Tabs, Button, Text, Grid } from "@mantine/core";
import formatDateTime from "../../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";
import styles from "./Showtimes.module.css";

const Showtimes = ({ movieId }) => {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await cinemaAPI.getMovieScheduleDetails(movieId);
        setSchedule(data.heThongRapChieu);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  return (
    <div className={styles.showtimes}>
      <Tabs
        color="yellow"
        variant="pills"
        orientation="vertical"
        defaultValue="0"
        className={styles.showtimes__tabs}
      >
        <Tabs.List>
          {schedule.map((item, index) => (
            <Tabs.Tab
              key={item.maHeThongRap}
              value={`${index}`}
              icon={<img src={item.logo} width="50px" height="auto" />}
            ></Tabs.Tab>
          ))}
        </Tabs.List>

        {schedule.map((item, index) => (
          <Tabs.Panel value={`${index}`} pl="xs" key={item.maHeThongRap}>
            {item.cumRapChieu.map((itemRap) => (
              <div key={itemRap.maCumRap}>
                <Text size="lg" weight={700}>{itemRap.tenCumRap}</Text>
                <Grid className="mb-3">
                  {itemRap.lichChieuPhim.map((itemLich) => (
                    <Grid.Col xs={6} sm={4} lg={3}>
                      <Button
                        key={itemLich.maLichChieu}
                        className={styles.showtimes__button}
                        onClick={() =>
                          navigate(`/booking/${itemLich.maLichChieu}`)
                        }
                      >
                        {formatDateTime(itemLich.ngayChieuGioChieu)}
                      </Button>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            ))}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

export default Showtimes;
