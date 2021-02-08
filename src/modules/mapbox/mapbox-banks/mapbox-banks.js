import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

import * as banks from '../../../data/FDIC_Insured_Banks.json';
import { useStyles } from './mapbox-banks.styles';
import useSupercluster from 'use-supercluster';

export const MapboxBanks = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.0119,
    longitude: -98.4842,
    zoom: 4,
    width: '100%',
    height: '100%',
  });
  const [selectedBank, setSelectedBank] = useState(null);

  const mapRef = useRef();

  const goToMarker = ({ latitude, longitude, zoom = 12 }) => {
    const newViewport = {
      ...viewport,
      longitude,
      latitude,
      zoom: zoom,
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

  const points = useMemo(
    () =>
      banks.features
        ? banks.features.map((feature) => ({
            ...feature,
            properties: {
              cluster: false,
              id: feature.properties.OBJECTID,
              cert: feature.properties.CERT,
              name: feature.properties.NAMEFULL,
            },
          }))
        : [],
    [],
  );

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: { radius: 150, maxZoom: 20 },
  });

  const { root } = useStyles();

  /** Map styles:
   * Simple United States: mapbox://styles/patrick-ff/ckkna66zt5iqq17pelkus63l1
   * Detailed United States: mapbox://styles/patrick-ff/ckkvronbc03yg17qo44ym1jb9
   */
  return (
    <div className={root}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/patrick-ff/ckkna66zt5iqq17pelkus63l1"
        ref={mapRef}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } = cluster.properties;

          if (isCluster) {
            return (
              <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                <div
                  className="cluster-marker"
                  style={{
                    width: `${50 + (pointCount / points.length) * 50}px`,
                    height: `${50 + (pointCount / points.length) * 50}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20,
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker key={cluster.properties.id} latitude={latitude} longitude={longitude}>
              <button
                className="marker-button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedBank(cluster);
                  goToMarker({
                    latitude: cluster.geometry.coordinates[1],
                    longitude: cluster.geometry.coordinates[0],
                    zoom: Math.max(viewport.zoom, 12),
                  });
                }}
              >
                <img src="/bankicon.svg" alt="location-marker" />
              </button>
            </Marker>
          );
        })}

        {selectedBank && (
          <Popup
            latitude={selectedBank.geometry.coordinates[1]}
            longitude={selectedBank.geometry.coordinates[0]}
            onClose={() => {
              setSelectedBank(null);
            }}
          >
            <div>
              <h2>{selectedBank.properties.name}</h2>
              <p>CERT: {selectedBank.properties.cert}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapboxBanks;
