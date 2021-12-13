import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Card, CardHeader, Row, Col } from 'reactstrap';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import BookingForm from 'components/Admin/Booking/BookingForm';
import BookingList from 'components/Admin/Booking/BookingList';
import bookingApi from 'api/bookingApi';

function Booking() {
  const initValue = {
    id: '',
    dentistProfile: '',
    customerProfile: '',
    bookingDate: '',
    description: '',
    status: '',
    scheduleTime: '',
  };
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listBooking, setListBooking] = useState([initValue]);

  useEffect(() => {
    bookingApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setListBooking(data);
        console.log(data);
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
                      <BookingForm
                        handleChange={handleChange}
                        formData={formData}
                        setFormData={setFormData}
                        listBooking={listBooking}
                        setListBooking={setListBooking}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <BookingList
                        handleChange={handleChange}
                        listBooking={listBooking}
                        setListBooking={setListBooking}
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

export default Booking;
