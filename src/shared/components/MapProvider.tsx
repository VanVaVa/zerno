"use client";

import { Map, YMaps } from "@pbe/react-yandex-maps";
import Placemark from "./Placemark";

const MapProvider = () => (
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
        <Placemark geometry={[59.947343, 30.30455]} />
        <Placemark geometry={[55.769469, 37.580724]} />
        <Placemark geometry={[54.738384, 55.941781]} />
        <Placemark geometry={[53.418021, 58.979941]} />
        <Placemark geometry={[56.846331, 60.565068]} />
        <Placemark geometry={[61.262189, 73.37818]} />
        <Placemark geometry={[54.992349, 73.334149]} />
        <Placemark geometry={[51.15034, 71.396771]} />
        <Placemark geometry={[52.298766, 76.900685]} />
        <Placemark geometry={[49.972448, 82.624755]} />
        <Placemark geometry={[53.36538, 83.769569]} />
        <Placemark geometry={[55.042949, 82.888943]} />
        <Placemark geometry={[56.488732, 84.925391]} />
        <Placemark geometry={[55.36402, 86.070205]} />
        <Placemark geometry={[53.765119, 87.126957]} />
        <Placemark geometry={[56.010725, 92.851027]} />
      </Map>
    </div>
  </YMaps>
);

export default MapProvider;
