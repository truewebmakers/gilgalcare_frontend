import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { customToast } from "../../common/Toast";
import { validateListingFields } from "../../../utils/validations";
import { env } from "../../../constants/constant";

const mapContainerStyle = {
  width: "100%",
  height: "430px",
};

const MapSection = ({
  markerPosition,
  setMarkerPosition,
  locationInfo,
  setLocation,
  setError,
  isDisable,
}) => {
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    const input = document.getElementById("address-input");
    const autocompleteInstance = new window.google.maps.places.Autocomplete(
      input,
      {
        fields: ["address_components", "geometry", "formatted_address"],
        types: ["(regions)"],
        componentRestrictions: { country: "AU" },
      }
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place && place?.formatted_address) {
        fillInAddress(place);
      }
    });

    setAutocomplete(autocompleteInstance);
  }, []);

  const handleMapClick = async (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Geocoding API URL
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${env.GOOGLE_MAP_KEY}`;

    try {
      const response = await axios.get(geocodeUrl);
      const results = response?.data?.results;
      if (results?.length > 0) {
        const addressComponents = results[0]?.address_components;
        const formattedAddress = results[0]?.formatted_address;
        // Extract state and country
        const state = addressComponents?.find((component) =>
          component?.types?.includes("administrative_area_level_1")
        )?.long_name;

        const country = addressComponents?.find((component) =>
          component?.types?.includes("country")
        )?.long_name;

        // Construct address excluding state and country
        const addressParts = addressComponents
          ?.filter(
            (component) =>
              !component?.types?.includes("administrative_area_level_1") &&
              !component?.types?.includes("country")
          )
          ?.map((component) => component?.long_name)
          ?.join(", ");

        const location = state && country ? `${state}, ${country}` : "";

        const address = formattedAddress
          ? addressParts || formattedAddress
          : "";

        setLocation((prevState) => ({
          ...prevState,
          // location: "",
          address: location + address,
          mapLat: lat?.toString(),
          mapLong: lng?.toString(),
        }));
        setMarkerPosition({ lat, lng });

        if (isDisable) {
          const newErr = validateListingFields("mapLat", lat, locationInfo);
          const newErrLong = validateListingFields(
            "mapLong",
            lng,
            locationInfo
          );
          const newErrAddr = validateListingFields(
            "address",
            address,
            locationInfo
          );
          setError((prevError) => ({
            ...prevError,
            ...newErr,
            ...newErrLong,
            ...newErrAddr,
          }));
        }
      } else {
        customToast.error(response?.data?.error_message);
      }
    } catch (error) {
      customToast.error("Error fetching address: ", error);
    }
  };

  const fillInAddress = (place) => {
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    const formattedAddress = place?.formatted_address || "";

    // Update location and marker position
    setLocation((prevState) => ({
      ...prevState,
      // location: "",
      address: formattedAddress,
      mapLat: lat?.toString(),
      mapLong: lng?.toString(),
    }));
    setMarkerPosition({ lat, lng });
  };

  return (
    <div className="listing-map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
};

export default MapSection;
