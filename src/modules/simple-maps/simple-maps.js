import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

import * as banks from '../../data/FDIC_Insured_Banks.json';
import { useStyles } from './simple-maps.styles';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

export const SimpleMaps = () => {
  const { root } = useStyles();
  return (
    <div className={root}>
      <ComposableMap projection="geoAlbers">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />
              ))
            }
          </Geographies>

          {banks.features.map((bank, index) => (
            <Marker
              key={`${bank.properties.title} ${index}`}
              coordinates={[bank.geometry.coordinates[0], bank.geometry.coordinates[1]]}
            >
              <circle r={2} fill="#0000FF	" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default SimpleMaps;
