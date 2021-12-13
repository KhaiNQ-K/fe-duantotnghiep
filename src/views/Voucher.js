import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import VoucherForm from "components/Admin/Voucher/VoucherForm";
import PanelHeader from "commons/PanelHeader/PanelHeader";
import VoucherList from "components/Admin/Voucher/VoucherList";
import voucherApi from "api/voucherApi";

function Voucher() {

  const initValue = {id: '', content: '', image: '',sale: '', start: '', end: '', createAt: '', deleteAt: false};
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listVoucher, setListVoucher] = useState([initValue]);

  useEffect(() => {
    voucherApi.getAll()
    .then((response) => {
      const {data} = response
      setListVoucher(data)
      console.log(data)
    })
    .catch((error) => {
      console.log(error, error.response)
    })
  }, [])

  const handleChange = (event, newValue, data) => {
    console.log(data);
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
                        <Tab label="Quản lý" value="1" onClick={reset} />
                        <Tab label="Danh sách" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{marginLeft: '-2%'}}>
                        <VoucherForm handleChange={handleChange} formData={formData} setFormData={setFormData} listVoucher={listVoucher} setListVoucher={setListVoucher} />
                    </TabPanel>
                    <TabPanel value="2">
                        <VoucherList handleChange={handleChange} listVoucher={listVoucher} setListVoucher={setListVoucher} />
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

export default Voucher;
