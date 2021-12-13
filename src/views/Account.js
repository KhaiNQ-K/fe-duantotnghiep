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
import AccountForm from "components/Admin/Account/AccountForm";
import AccountList from "components/Admin/Account/AccountList";
import PanelHeader from "commons/PanelHeader/PanelHeader";
import accountApi from "api/accountApi";

const Account = () => {

  const initValue = {id: '', email: '', password: '', telephone: '', updateAt: '', rolesId: ''}
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listAccount, setListAccount] = useState([initValue])

  useEffect(() => {
    accountApi.getAll()
    .then((response) => {
      const {data} = response
      setListAccount(data)
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
                        <AccountForm handleChange={handleChange} formData={formData} setFormData={setFormData} listAccount={listAccount} setListAccount={setListAccount}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <AccountList handleChange={handleChange} listAccount={listAccount} setListAccount={setListAccount}/>
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

export default Account;
