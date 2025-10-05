import { Placemark as YMapsPlacemark } from "@pbe/react-yandex-maps";
import { FC } from "react";

interface PlacemarkProps {
  geometry: Array<number>;
}

const Placemark: FC<PlacemarkProps> = ({ geometry }) => (
  <YMapsPlacemark
    options={{
      iconLayout: "default#image",
      iconImageHref: "/images/placemark.svg",
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -40],
    }}
    geometry={geometry}
  />
);

export default Placemark;
