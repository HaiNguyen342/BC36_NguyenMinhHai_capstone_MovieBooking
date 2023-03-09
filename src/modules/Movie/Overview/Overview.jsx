import { useState, useEffect } from "react";
import movieAPI from "../../../services/movieAPI";
import formatDate from "../../../utils/formatDate";
import styles from "./Overview.module.css";
import {
  createStyles,
  Title,
  Text,
  Flex,
  Grid,
  Col,
  RingProgress,
  Center,
  Group,
  Button,
  Modal,
  Popover,
} from "@mantine/core";

const Overview = ({ movieId }) => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  //Mantine
  const useStyles = createStyles((theme) => ({
    wrapper: {
      padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: "3rem",
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: theme.spacing.md,
      color: theme.white,
    },
  }));

  const { classes } = useStyles();

  //Modal
  const [opened, setOpened] = useState(false);


  return (
    <div>
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={12}>
            <Title className={classes.title} order={2}>
              {movie.tenPhim}
            </Title>
            <Flex
              mih={50}
              bg="rgba(0, 0, 0, .3)"
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                width="auto"
                height="300px"
              />
              <div>
                <Text color="white" className="mb-4">
                  {movie.ngayKhoiChieu ? formatDate(movie.ngayKhoiChieu) : ""}
                </Text>
                <Flex gap="md" justify="flex-start">
                  <Button
                    radius="md"
                    size="md"
                    className={styles.overview__button}
                    onClick={() => setOpened(true)}
                  >
                    Trailer
                  </Button>

                  <Popover width={600} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <Button
                        radius="md"
                        size="md"
                        className={styles.overview__button}
                      >
                        Description
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text size="lg">
                      {movie.moTa}
                      </Text>
                    </Popover.Dropdown>
                  </Popover>
                </Flex>
              </div>
              <Group>
                <RingProgress
                  size={140}
                  roundCaps
                  thickness={10}
                  sections={[{ value: movie.danhGia * 10, color: "#f4a34a" }]}
                  label={
                    <Center>
                      {" "}
                      <Text size={50} weight={600} color="#f4a34a">
                        {movie.danhGia}
                      </Text>
                    </Center>
                  }
                />

                <div>
                  <Text
                    color="dimmed"
                    size="sm"
                    transform="uppercase"
                    weight={700}
                  >
                    Rating
                  </Text>
                  <Text weight={900} size="xl" color="#f4a34a">
                    {movie.danhGia}
                  </Text>
                </div>
              </Group>
            </Flex>
          </Col>
        </Grid>

        <Modal
          size="65%"
          withCloseButton={false}
          centered
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <iframe
            width="100%"
            height="600"
            src={movie.trailer}
            title="Đen - Lối Nhỏ ft. Phương Anh Đào (M/V)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Modal>
      </div>
    </div>
  );
};

export default Overview;
