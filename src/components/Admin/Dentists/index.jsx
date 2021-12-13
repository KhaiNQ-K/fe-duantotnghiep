import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import { useDispatch } from 'react-redux';
import { provinceAction } from 'app/provinceSlice';
import { communesAction } from 'app/communes/communesSlice';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import { Box } from '@mui/system';
import { districtAction } from 'app/districts/districtSlice';

function DentistFeature(props) {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(provinceAction.fetchProvinceList());
  }, [dispatch]);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Switch>
                    <Route path={match.path} exact>
                      <ListPage />
                    </Route>
                    <Route path={`${match.path}/:dentistId`}>
                      <AddEditPage />
                    </Route>
                  </Switch>
                </Box>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

DentistFeature.propTypes = {};

export default DentistFeature;
