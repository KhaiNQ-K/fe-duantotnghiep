import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import communeApi from 'api/communeApi';
import provinceApi from 'api/provinceApi';
import districtApi from 'api/districtApi';

const CustomerForm = ({ handleChange, formData, setFormData, listCustomer, setListCustomer }) => {
  const initValue = { id: '', email: '', password: '', telephone: '', updateAt: '', rolesId: '' };
  const [onChange, setOnchage] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    provinceApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setProvince(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    districtApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setDistrict(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [province]);

  useEffect(() => {
    communeApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setCommunes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [district]);

  const hanldeOnChange = (event) => {
    event.preventDefault();
    setOnchage(true);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    formData.updateAt = new Date();
    if (formData === undefined || formData.id == '') {
      //   create()
    } else {
      //   update()
    }
    handleChange(e, '2');
  };

  const reset = () => {
    setFormData(initValue);
  };

  return (
    <CardBody>
      <Form>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Email</label>
              <Input placeholder="Email@gmail.com" type="email" />
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Tỉnh/Thành phố</label>
            <FormGroup>
              <Select placeholder="Hà Nội" options={province} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Họ tên</label>
              <Input placeholder="abc" type="text" />
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Quận/Huyện</label>
            <FormGroup>
              <Select placeholder="Nam Từ Liêm" options={district} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Số điện thoại</label>
              <Input placeholder="Phone number" type="text" />
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Phường/Xã</label>
            <FormGroup>
              <Select placeholder="Phương Canh" options={communes} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Ngày sinh</label>
              <Input defaultValue={new Date()} placeholder="Home Address" type="date" />
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Chọn tệp</label>
              <br />
              <label>
                <ImageIcon />
                Ảnh
              </label>
              <Input type="file" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Giới tính</label>
              <br />
              <label>Nam</label>
              <Input name="gender" style={{ marginLeft: '0.2rem' }} type="radio" />
              &emsp; &emsp;
              <label style={{ marginLeft: '0.8rem' }}>Nữ</label>
              <Input name="gender" style={{ marginLeft: '0.2rem' }} type="radio" />
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Tiểu sử</label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px', borderRadius: '10px', border: '1px solid #CCCCCC' }}
                ></textarea>
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="12">
            <Button variant="contained">
              <SaveIcon />
              Lưu
            </Button>
            <Button variant="contained" color="inherit" style={{ marginLeft: '1em' }}>
              <CloseIcon />
              Huỷ
            </Button>
          </Col>
        </Row>
      </Form>
    </CardBody>
  );
};

export default CustomerForm;
