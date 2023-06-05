import { useState, useEffect } from "react";
import axios from "axios";

export const useGeolocation = () => {
  const [geoLocation, setGeoLocation] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `/nominatim/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const address = response.data.address;
            const locationStr = `${
              address.city || address.town || address.village
            }, ${address.country}`;
            setGeoLocation(locationStr);
          } catch (error) {
            console.log(error);
          }
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  return geoLocation;
};
