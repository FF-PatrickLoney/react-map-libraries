import React from 'react';
import { Tabs } from 'antd';

import { useStyles } from './mapbox-container.styles';
import { MapboxSkateparks } from './mapbox-skateparks/mapbox-skateparks';
import { MapboxBanks } from './mapbox-banks/mapbox-banks';

const { TabPane } = Tabs;

export const MapboxContainer = () => {
  const { root } = useStyles();
  return (
    <div className={root}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Banks" key="1">
          <MapboxBanks />
        </TabPane>
        <TabPane tab="Skateparks" key="2">
          <MapboxSkateparks />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MapboxContainer;
