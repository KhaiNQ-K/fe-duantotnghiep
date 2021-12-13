import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import dentistApi from 'api/dentistApi';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import DentistForm from 'components/Admin/Dentist/DentistForm';
import DentistList from 'components/Admin/Dentist/DentistList';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';

function Dentist() {
  const initValue = {
    id: '',
    accounts: '',
    image: '',
    cccd: '',
    fullName: '',
    birthday: '',
    gender: '',
    communes: '',
    telephone: '',
    exp: '',
    createAt: '',
    updateAt: new Date(),
    deleteAt: 0,
  };

  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listDentist, setListDentist] = useState([initValue]);
  const [provinces, setProvinces] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
    dentistApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setListDentist(data);
        console.log('dentist:', data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, []);
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
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Quản lý" value="1" />
                        <Tab label="Danh sách" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ marginLeft: '-2%' }}>
                      <DentistForm
                        handleChange={handleChange}
                        formData={formData}
                        setFormData={setFormData}
                        listDentist={listDentist}
                        setListDentist={setListDentist}
                        district={district}
                        setDistrict={setDistrict}
                        provinces={provinces}
                        setProvinces={setProvinces}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <DentistList
                        handleChange={handleChange}
                        listDentist={listDentist}
                        setListDentist={setListDentist}
                      />
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

export default Dentist;
