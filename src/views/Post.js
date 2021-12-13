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
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "commons/PanelHeader/PanelHeader";
import PostForm from "components/Admin/Post/PostForm";
import PostList from "components/Admin/Post/PostList";
import postApi from "api/postApi";

function Post() {

  const initValue = {id: '', title: '', content: '', image: '', accounts: '', deleteAt: 0};
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initValue);
  const [listPost, setListPost] = useState([initValue]);

  useEffect(() => {
    postApi.getAll()
    .then((response) => {
      const {data} = response
      setListPost(data)
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
                        <PostForm handleChange={handleChange} formData={formData} setFormData={setFormData} listPost={listPost} setListPost={setListPost} />
                    </TabPanel>
                    <TabPanel value="2">
                        <PostList handleChange={handleChange} listPost={listPost} setListPost={setListPost} />
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

export default Post;
