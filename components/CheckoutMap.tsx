import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";

type Props = {
  initialLocation: { latitude: number; longitude: number };
  onLocationSelect: (loc: { latitude: number; longitude: number }) => void;
};

export default function CheckoutMap({
  initialLocation,
  onLocationSelect,
}: Props) {
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handlePress = (e: MapPressEvent) => {
    const loc = e.nativeEvent.coordinate;
    setMarker(loc);
    onLocationSelect(loc);
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialLocation,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onPress={handlePress}
        showsUserLocation={true}
        loadingEnabled
      >
        {marker && <Marker coordinate={marker} />}
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
