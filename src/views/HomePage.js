import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import PanelHeader from "commons/PanelHeader/PanelHeader";
const HomePage = () => {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
          <h4 style={{marginTop: '3rem'}}>Tổng số nha sỹ: 5</h4>
          <h4 >Tổng số nhân viên: 20</h4>
          <h4 >Tổng số khách hàng: 152</h4>
      </div>
    </>
  );
}

export default HomePage;
