import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "commons/PanelHeader/PanelHeader";
import ServiceForm from "components/Admin/Service/ServiceForm";
import ServiceList from "components/Admin/Service/ServiceList";
import serviceApi from "api/serviceApi";

function Service() {

  const initValue = {id: '', title: '', content: '', image: '', account: '', deleteAt: ''};
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listService, setListService] = useState([initValue]);

  useEffect(() => {
    serviceApi.getAll()
    .then((response) => {
      const {data} = response
      setListService(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error, error.response)
    })
  }, [])

  const handleChange = (event, newValue, data) => {
    console.log("formData", data);
    setFormData(data);
    setValue(newValue);
  };

  const reset = () => {
    setFormData(initValue)
  }
  
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Box sx={{ width: '100%', typography: 'body1'}}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Quản lý" value="1" onClick={reset}/>
                        <Tab label="Danh sách" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{marginLeft: '-2%'}}>
                        <ServiceForm handleChange={handleChange} formData={formData} setFormData={setFormData} listService={listService} setListService={setListService} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ServiceList handleChange={handleChange} listService={listService} setListService={setListService} />
                    </TabPanel>
                  </TabContext>
                </Box>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Service;
