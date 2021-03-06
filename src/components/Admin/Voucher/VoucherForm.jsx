import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import axiosInstance from 'api/axiosInstance';
import toastifyAlert from 'utils/toastify';
import { CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import voucherApi from 'api/voucherApi';
import styled from 'styled-components';

const VoucherForm = ({ handleChange, formData, setFormData, listVoucher, setListVoucher }) => {
  const initValue = {
    id: '',
    content: '',
    image: '',
    sale: '',
    start: '',
    end: '',
    createAt: new Date(),
    deleteAt: false,
  };
  const [onChange, setOnchage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState();

  const [{ alt, src }, setImg] = useState({
    src: null,
    alt: 'Upload an Image',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const hanldeOnChange = (event) => {
    event.preventDefault();
    setOnchage(true);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const sale = [
    { value: 5, name: '5%' },
    { value: 10, name: '10%' },
    { value: 15, name: '15%' },
    { value: 20, name: '20%' },
    { value: 25, name: '25%' },
    { value: 30, name: '30%' },
    { value: 35, name: '35%' },
    { value: 40, name: '40%' },
    { value: 45, name: '45%' },
    { value: 50, name: '50%' },
  ];

  const submitForm = (e) => {
    e.preventDefault();
    const imageUpload = new FormData();
    imageUpload.append('image', selectedFile);
    axiosInstance
      .post('http://localhost:8080/api/v1/files/upload', imageUpload)
      .then((response) => {
        if (response) {
          console.log(response);
          formData.image = response;
          if (formData === undefined || formData.id == '') {
            create();
          } else {
            update();
          }
          handleChange(e, '2', formData);
        }
      });
  };

  const create = () => {
    console.log('create');
    voucherApi
      .create(formData)
      .then((response) => {
        const { data } = response;
        setListVoucher([...listService, data]);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  };

  const update = () => {
    console.log('update');
    voucherApi
      .update(formData.id, formData)
      .then((response) => {
        const { data } = response;
        setListVoucher(
          listVoucher.map((value, index) => {
            return formData.id == value.id ? data : value;
          })
        );
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  };

  const reset = () => {
    setFormData(initValue);
  };

  const onChangeImage = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];
      console.log(image);
      setSelectedFile(image);
      setImg({
        src: URL.createObjectURL(image),
        alt: image.name,
      });
    }
  };

  return (
    <CardBody>
      <Form onSubmit={(e) => submitForm(e)}>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>ID</label>
              <Inputs
                readOnly
                style={{ background: '#DDDDDD' }}
                {...register('id')}
                type="text"
                value={formData === undefined ? '' : formData.id}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>N???i dung</label>
              <div className="form-floating">
                <textarea
                  name="content"
                  value={formData === undefined ? '' : formData.content}
                  {...register('content', {
                    onChange: (e) => {
                      hanldeOnChange(e);
                    },
                    required: true,
                  })}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px', borderRadius: '10px', border: '1px solid #CCCCCC' }}
                ></textarea>
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col className="px-1" md="12">
            <label>Gi???m gi??:</label>
            <FormGroup>
              <select
                value={formData === undefined ? '' : formData.sale}
                style={{
                  minWidth: '100%',
                  height: '38px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '5px',
                  color: '#888888',
                  fontFamily: 'Helvetica',
                }}
                name="sale"
                onChange={(e) => hanldeOnChange(e)}
              >
                {sale.map(function (val, idx) {
                  return (
                    <option key={idx} value={val.value}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="4">
            {/* <FormGroup> */}
            <label>???nh</label>
            <br />
            <input
              style={{ border: '1px solid #CCCCCC', background: '#EEEEEE', width: '100%' }}
              type="file"
              name="file"
              id="input"
              accept="image/*"
              onChange={(e) => onChangeImage(e)}
            />
            {/* </FormGroup> */}
          </Col>
        </Row>

        <Row>
          <Col className="px-1" md="4">
            <img
              src={
                selectedImage != null
                  ? URL.createObjectURL(selectedImage)
                  : `http://localhost:8080/api/v1/files/download/image?filename=${formData.image}`
              }
              style={{
                border: '1px solid #dddddd',
                minWidth: '100%',
                width: '100%',
                height: '250px',
                marginTop: '0.5rem',
                borderRadius: '10px',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Ng??y b???t ?????u</label>
              <Input
                name="start"
                value={formData === undefined ? '' : formData.start}
                type="text"
                onChange={(e) => hanldeOnChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Ng??y k???t th??c</label>
              <Input
                name="end"
                value={formData === undefined ? '' : formData.end}
                type="text"
                onChange={(e) => hanldeOnChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="12">
            <Button variant="contained" type="submit" disabled={onChange == true ? '' : 'disabled'}>
              <SaveIcon />
              L??u
            </Button>
            <Button
              variant="contained"
              color="inherit"
              style={{ marginLeft: '1em' }}
              onClick={reset}
            >
              <CloseIcon />
              Hu???
            </Button>
          </Col>
        </Row>
      </Form>
    </CardBody>
  );
};

export default VoucherForm;

const Inputs = styled.input`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #dddddd;
  height: 38px;
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  color: #2c2c2c;
  font-size: 0.8571em;
  padding: 10px 18px 10px 18px;
`;

const Errors = styled.p`
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  color: red;
  font-size: 0.7571em;
  height: 2px;
  margin-top: 2px;
`;
