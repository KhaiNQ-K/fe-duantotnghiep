import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import CustomerForm from "components/Admin/Customer/CustomerForm";
import CustomerList from 'components/Admin/Customer/CustomerList';
import React, {useState, useEffect} from "react";
import {
  Card,
  CardHeader, Col, Row
} from "reactstrap";

function Customer() {

  const initValue = {id: '', title: '', content: '', image: '', accounts: '', deleteAt: 0};
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listCustomer, setListCustomer] = useState([initValue]);

  // useEffect(() => {
  //   postApi.getAll()
  //   .then((response) => {
  //     const {data} = response
  //     setListDentist(data)
  //     console.log(data)
  //   })
  //   .catch((error) => {
  //     console.log(error, error.response)
  //   })
  // }, [])

  const handleChange = (event, newValue, data) => {
    console.log(data);
    setFormData(data);
    setValue(newValue);
  };

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
                        <Tab label="Quản lý" value="1" />
                        <Tab label="Danh sách" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{marginLeft: '-2%'}}>
                        <CustomerForm handleChange={handleChange} formData={formData} setFormData={setFormData} listCustomer={listCustomer} setListCustomer={setListCustomer} />
                    </TabPanel>
                    <TabPanel value="2">
                        <CustomerList handleChange={handleChange} listCustomer={listCustomer} setListCustomer={setListCustomer} />
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

export default Customer;
