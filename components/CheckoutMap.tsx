import React, { useEffect, useRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";

type Props = {
  initialLocation: { latitude: number; longitude: number };
  onLocationSelect: (loc: { latitude: number; longitude: number }) => void;
  selectedMarker?: { latitude: number; longitude: number } | null;
};

export default function CheckoutMap({
  initialLocation,
  onLocationSelect,
  selectedMarker,
}: Props) {
  const mapRef = useRef<MapView>(null);
  const LATITUDE_OFFSET = 0.002;
  const REGION_DELTA = 0.02;

  const handlePress = useCallback(
    (e: MapPressEvent) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;

      const offsetLatitude = latitude + LATITUDE_OFFSET;

      mapRef.current?.animateToRegion(
        {
          latitude: offsetLatitude,
          longitude,
          latitudeDelta: REGION_DELTA,
          longitudeDelta: REGION_DELTA,
        },
        300,
      );

      onLocationSelect({ latitude, longitude });
    },
    [onLocationSelect],
  );

  useEffect(() => {
    if (selectedMarker && mapRef.current) {
      const offsetLatitude = selectedMarker.latitude + LATITUDE_OFFSET;

      mapRef.current.animateToRegion(
        {
          latitude: offsetLatitude,
          longitude: selectedMarker.longitude,
          latitudeDelta: REGION_DELTA,
          longitudeDelta: REGION_DELTA,
        },
        300,
      );
    }
  }, [selectedMarker]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: REGION_DELTA,
          longitudeDelta: REGION_DELTA,
        }}
        onPress={handlePress}
        showsUserLocation
        loadingEnabled
      >
        {selectedMarker && <Marker coordinate={selectedMarker} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
});
