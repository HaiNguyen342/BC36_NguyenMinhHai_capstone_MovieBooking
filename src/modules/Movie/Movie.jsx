import React from "react";
import { useParams } from "react-router-dom";
import Overview from "./Overview";
import Showtimes from "./Showtimes";
import { Container } from "@mantine/core";

const Movie = () => {
  const { movieId } = useParams();
  return (
    <div style={{ backgroundColor: "#022644", paddingTop: "5rem" }}>
      <Container>
        <Overview movieId={movieId} />

        <Showtimes movieId={movieId} />
      </Container>
    </div>
  );
};

export default Movie;
