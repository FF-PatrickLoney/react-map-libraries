import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

import * as banksData from '../../../data/banks-geo.json';
import { useStyles } from './mapbox-banks.styles';

export const MapboxBanks = () => {
  const [viewport, setViewport] = useState({
    latitude: 44.5588,
    longitude: -72.5778,
    zoom: 8,
    width: '100%',
    height: '100%',
  });
  const [selectedBank, setSelectedBank] = useState(null);

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
        setSelectedBank(null);
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
        mapStyle="mapbox://styles/patrick-ff/ckjx5q8ab1f5q17qz781c2qn4"
      >
        {banksData.features.map((bank) => (
          <Marker
            key={bank.properties.OBJECTID}
            latitude={bank.geometry.coordinates[1]}
            longitude={bank.geometry.coordinates[0]}
          >
            <button
              className="marker-button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedBank(bank);
                goToMarker({
                  latitude: bank.geometry.coordinates[1],
                  longitude: bank.geometry.coordinates[0],
                });
              }}
            >
              <img src="/marker.png" alt="location-marker" />
            </button>
          </Marker>
        ))}

        {selectedBank && (
          <Popup
            latitude={selectedBank.geometry.coordinates[1]}
            longitude={selectedBank.geometry.coordinates[0]}
            onClose={() => {
              setSelectedBank(null);
            }}
          >
            <div>
              <h2>{selectedBank.properties.NAMEFULL}</h2>
              <p>{selectedBank.properties.ADDRESS}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapboxBanks;
