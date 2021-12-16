import reportApi from 'api/reportApi';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from 'reactstrap';

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from 'variables/charts.js';

function Dashboard() {
  const [charReport, setChartReport] = useState({});
  const [chartCustomer, setChartCustomer] = useState({});
  const [chartDentist, setChartDentist] = useState({});
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
            borderColor: '#FFFFFF',
            pointBorderColor: '#FFFFFF',
            pointBackgroundColor: '#2c2c2c',
            pointHoverBackgroundColor: '#2c2c2c',
            pointHoverBorderColor: '#FFFFFF',
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
            backgroundColor: 'rgba(128, 182, 244, 0)',
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
      setChartDentist({
        labels: thang,
        datasets: [
          {
            label: 'Số bệnh nhân đã khám',
            borderColor: '#2CA8FF',
            pointBorderColor: '#FFF',
            pointBackgroundColor: '#2CA8FF',
            pointHoverBackgroundColor: '#2c2c2c',
            pointHoverBorderColor: '#FFFFFF',
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            fill: true,
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

  //order
  useEffect(() => {
    charReportFunction();
    charTop5Cusomer();
    charTop5Dentist();
    charKHDatLich();
    const fetcht = async () => {
      const data1 = await reportApi.reportService();
      const data2 = await reportApi.reportCustomer();
      const data3 = await reportApi.reportDentist();
      const data4 = await reportApi.reportBooking();
      const data5 = await reportApi.reportDoanhThu();
      const topData = [...data2.data].sort((a, b) => b.tongSoDon - a.tongSoDon).slice(0, 5);
      console.log('customer', topData);
      console.log('service', data1);
      console.log('dentist', data3);
      console.log('booking', data4);
      console.log('doanh thu', data5);
    };
    fetcht();
  }, []);
  return (
    <>
      <PanelHeader
        style={{ position: 'absolute' }}
        size="lg"
        content={<Line data={charReport} options={dashboardPanelChart.options} />}
      />

      <h5 style={{ position: 'absolute', marginTop: '-340px', color: 'white', marginLeft: '26px' }}>
        DOANH THU
      </h5>

      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Thống kê đơn đặt</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  />
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
          <Col xs={12} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">Backend Development</h5>
                <CardTitle tag="h4">Tasks</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Sign contract for "What are conference organizers afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip731609871">
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip923217206">
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Lines From Great Russian Literature? Or E-mails From My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip907509347">
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip496353037">
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-left">
                          Flooded: One year later, assessing what was lost and what was found when a
                          ravaging rain swept through metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip326247652">
                            Edit Task
                          </UncontrolledTooltip>
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip delay={0} target="tooltip389516969">
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">All Persons List</h5>
                <CardTitle tag="h4">Employees Stats</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
