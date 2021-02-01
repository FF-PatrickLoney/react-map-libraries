import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

import * as parkData from '../../../data/skateboard-parks.json';
import { useStyles } from './mapbox-skateparks.styles';

export const MapboxSkateparks = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 9,
    width: '100%',
    height: '100%',
  });
  const [selectedPark, setSelectedPark] = useState(null);

  const { root } = useStyles();

  const goToMarker = ({ latitude, longitude }) => {
    const newViewport = {
      ...viewport,
      longitude,
      latitude,
      zoom: 14,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    setViewport(newViewport);
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className={root}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/patrick-ff/ckjx5u5ay1f4a17qah9k4c42j"
      >
        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
                goToMarker({
                  latitude: park.geometry.coordinates[1],
                  longitude: park.geometry.coordinates[0],
                });
              }}
            >
              <img src="/skateboard-2.svg" alt="skateboard-marker" />
            </button>
          </Marker>
        ))}

        {selectedPark && (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapboxSkateparks;
