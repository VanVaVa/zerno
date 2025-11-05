"use client";

import { Map, YMaps } from "@pbe/react-yandex-maps";
import Placemark from "./Placemark";
import { useMapPoints } from "@/features/map/hooks/use-map-points";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

const MapProvider = () => {
  const { points, loading, error } = useMapPoints();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography textAlign="center">Загрузка карты...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" textAlign="center">
          Ошибка загрузки: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <YMaps>
      <div style={{ borderRadius: 20, overflow: "hidden" }}>
        <Map
          defaultState={{
            center: [57.844773, 61.972214],
            zoom: 4.5,
          }}
          width="min(calc(100vw - 40px), 1600px)"
          height={698}
        >
          {points.map((el) => (
            <Placemark geometry={el.coordinates} key={el.id} />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

export default MapProvider;
