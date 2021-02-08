import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapboxContainer } from './modules/mapbox/mapbox-container';
import { SimpleMaps } from './modules/simple-maps/simple-maps';
import { useStyles } from './app.styles';

const { Header, Content, Footer } = Layout;

const App = () => {
  const { root } = useStyles();
  return (
    <div className="App">
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/">Mapbox</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/leaflet">Leaflet</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/simple-maps">Simple Maps</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content className={root}>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/">
                  <MapboxContainer />
                </Route>
                <Route path="/leaflet">
                  <div>Leaflet</div>
                </Route>
                <Route path="/simple-maps">
                  <SimpleMaps />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Map Libraries POC</Footer>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
