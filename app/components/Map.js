import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

const Map = props => {
  const { location, height, name } = props;
  const OpenAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name
    });
  };

  return (
    <MapView
      style={{ width: '100%', height }}
      initialRegion={location}
      onPress={OpenAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
      />
    </MapView>
  );
};

export default Map;
