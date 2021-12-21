import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import reportApi from 'api/reportApi';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
import {
  dashboard24HoursPerformanceChart,
  dashboardAllProductsChart,
  dashboardShippedProductsChart,
} from 'variables/charts.js';
import ComplexStatisticsCard from './components/Card/ComplexStatisticsCard';
import TableDetailBooking from './components/TableDetailBooking';

function Dashboard() {
  const [charReport, setChartReport] = useState({});
  const [chartCustomer, setChartCustomer] = useState({});
  const [chartDentist, setChartDentist] = useState({});
  const [chartDonDat, setChartDonDat] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [customerBooking, setCustomerBooking] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  //doanh thu
  const charReportFunction = async () => {
    let total = [];
    let month = [];
    try {
      const res = await reportApi.reportDoanhThuNam(new Date().getFullYear());
      for (const data of res.data) {
        total.push(parseInt(data.tongtien));
        month.push(data.thang);
      }
      setChartReport({
        labels: month,
        datasets: [
          {
            label: 'Tổng tiền',
            borderColor: '#000000',
            pointBorderColor: '#FFFFFF',
            pointBackgroundColor: '#2c2c2c',
            pointHoverBackgroundColor: '#2c2c2c',
            pointHoverBorderColor: '#FFFFFF',
            backgroundColor: '#737373',
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            borderWidth: 2,
            tension: 0.4,
            data: total,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  // customer chart
  const charTop5Cusomer = async () => {
    let total = [];
    let name = [];
    try {
      const res = await reportApi.reportCustomer();
      const topData = [...res.data].sort((a, b) => b.tongSoDon - a.tongSoDon).slice(0, 5);
      for (const data of topData) {
        total.push(parseInt(data.tongSoDon));
        name.push(data.tenBacSi);
      }
      setChartCustomer({
        labels: name,
        datasets: [
          {
            label: 'Tổng số đơn',
            borderColor: '#18ce0f',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#18ce0f',
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: '#4BE998',
            borderWidth: 2,
            tension: 0.4,
            data: total,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const charKHDatLich = async () => {
    let thang = [];
    let sldl = [];
    try {
      const res = await reportApi.reportDaDatLich();
      for (const data of res.data) {
        sldl.push(parseInt(data.sldl));
        thang.push(data.thang);
      }
      setChartDonDat({
        labels: thang,
        datasets: [
          {
            label: 'Số đơn đã đặt',
            borderColor: '#f96332',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#f96332',
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: 'rgba(249, 99, 59, 0.40)',
            borderWidth: 2,
            tension: 0.4,
            data: sldl,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const charTop5Dentist = async () => {
    let total = [];
    let name = [];
    try {
      const res = await reportApi.reportTopBS();
      const topData = [...res.data].sort((a, b) => b.sbn - a.sbn).slice(0, 5);
      for (const data of topData) {
        total.push(parseInt(data.sbn));
        name.push(data.nameDentist);
      }
      setChartDentist({
        labels: name,
        datasets: [
          {
            label: 'Số bệnh nhân đã khám',
            borderColor: '#2CA8FF',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#2CA8FF',
            pointHoverBackgroundColor: '#2c2c2c',
            pointHoverBorderColor: '#FFFFFF',
            backgroundColor: '#B0E5EA',
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,
            borderWidth: 2,
            tension: 0.4,
            data: total,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dashboardBooking = async () => {
    const res = await reportApi.reportBooking();
    console.log(res);
    setBookingData([
      {
        status: 2,
        title: 'Lịch đẵ đặt',
        name: 'Danh sách người dùng đã đặt lịch',
        count: res.data[0].xacnhan,
        color: 'orange',
        icon: 'book_online',
        percentage: {
          color: 'orange',
          icon: 'schedule',
          label: 'Cập nhật trong 24h',
        },
      },
      {
        status: 3,
        name: 'Danh sách người dùng hủy lịch',
        title: 'Lịch đẵ bị hủy',
        count: res.data[0].dahuy,
        color: '#128a26',
        icon: 'leaderboard',
        percentage: {
          color: '#128a26',
          icon: 'schedule',
          label: 'Cập nhật trong 24h',
        },
      },
      {
        status: 0,
        name: 'Danh sách người dùng chờ xác nhận lịch',
        title: 'Lịch chờ xác nhận',
        count: res.data[0].choxacnhan,
        color: 'blue',
        icon: 'store',
        percentage: {
          color: 'primary',
          icon: 'schedule',
          label: 'Cập nhật trong 24h',
        },
      },
      {
        status: 1,
        name: 'Danh sách người dùng đã xác nhận lịch',
        title: 'Lịch đã xác nhận',
        count: res.data[0].daxong,
        color: '#f52c51',
        icon: 'weekend',
        percentage: {
          color: 'error',
          icon: 'schedule',
          label: 'Cập nhật trong 24h',
        },
      },
    ]);
  };
  const [title, setTitle] = useState('');
  const handleDetailBooking = async (item) => {
    setOpen(true);
    const res = await reportApi.reportStatus(item.status);
    console.log(res.data);
    setCustomerBooking(res.data);
  };
  //order
  useEffect(() => {
    charReportFunction();
    charTop5Cusomer();
    charTop5Dentist();
    charKHDatLich();
    dashboardBooking();
  }, []);
  return (
    <>
      <PanelHeader style={{ position: 'absolute' }} size="sm" />

      <div className="content">
        <Row style={{ marginBottom: '2rem' }}>
          {bookingData.map((item, idx) => (
            <Col
              xs={12}
              md={3}
              style={{ cursor: 'pointer' }}
              key={item.status}
              onClick={() => {
                handleDetailBooking(item);
                setTitle(item.name);
              }}
            >
              <ComplexStatisticsCard
                color={item.color}
                icon={item.icon}
                title={item.title}
                count={item.count}
                percentage={item.percentage}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <h2>Doanh thu trong năm</h2>
          <Line data={charReport} />
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Thống kê đơn đặt</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartDonDat} options={dashboardShippedProductsChart.options} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i />
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Top khách hàng</h5>
                {/* <CardTitle tag="h4">All products</CardTitle> */}
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartDentist} options={dashboardAllProductsChart.options} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i />
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Top nha sĩ</h5>
                {/* <CardTitle tag="h4">24 Hours Performance</CardTitle> */}
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={chartCustomer} options={dashboard24HoursPerformanceChart.options} />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i />
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Dialog
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TableDetailBooking customerBooking={customerBooking} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default" variant="outlined">
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
