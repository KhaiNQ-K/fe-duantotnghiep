import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CardBody, FormGroup, Form, Row, Col } from 'reactstrap';
import serviceApi from 'api/serviceApi';
import axiosInstance from 'api/axiosInstance';
import toastifyAlert from 'utils/toastify';
import moment from 'moment';

const ServiceForm = ({ handleChange, formData, setFormData, listService, setListService }) => {
  const initValue = {
    id: '',
    content: '',
    image: '',
    name: '',
    price: '',
    createAt: new Date(),
    deleteAt: 0,
  };
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
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const onSubmit = (data, e) => {
    const dataForm = {
      id: data.id,
      content: data.content,
      image: formData.image,
      name: data.name,
      price: data.price,
      createAt: new Date(),
      deleteAt: 0,
    };
    console.log('data form', dataForm);
    const imageUpload = new FormData();
    imageUpload.append('image', selectedFile);
    console.log('id', formData.id);
    console.log('data: => ', dataForm);
    if (selectedFile != null) {
      axiosInstance
        .post('http://localhost:8080/api/v1/files/upload', imageUpload)
        .then((response) => {
          if (response) {
            dataForm.image = response;
            if (formData.id == '' || formData.id == undefined) {
              console.log('create');
              dataForm.id = 0;
              create(dataForm);
            } else {
              console.log('update');
              dataForm.createAt = moment(formData.createAt).format('YYYY-MM-DD');
              update(dataForm);
            }
          }
        });
    } else {
      if (formData.id == '' || formData.id == undefined) {
        console.log('create');
        dataForm.id = 0;
        console.log('data create', dataForm);
        dataForm.image = '';
        create(dataForm);
      } else {
        console.log('update');
        dataForm.createAt = moment(formData.createAt).format('YYYY-MM-DD');
        update(dataForm);
      }
    }
    handleChange(e, '2', formData);
  };

  const create = (dataForm) => {
    console.log('create');
    serviceApi
      .create(dataForm)
      .then((response) => {
        toastifyAlert.success('Thêm thành công!');
        const { data } = response;
        setListService([data, ...listService]);
      })
      .catch((error) => {
        toastifyAlert.error('Thêm thất bại!');
        console.log(error, error.response);
      });
  };

  const update = (dataForm) => {
    console.log('update');
    serviceApi
      .update(dataForm.id, dataForm)
      .then((response) => {
        toastifyAlert.success('Cập nhật thành công!');
        const { data } = response;
        setListService(
          listService.map((value, index) => {
            return dataForm.id == value.id ? data : value;
          })
        );
      })
      .catch((error) => {
        toastifyAlert.error('Cập nhật thất bại!');
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
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              <label>Tên dịch vụ</label>
              <Inputs
                name="name"
                placeholder="Make teeth"
                {...register('name', {
                  maxLength: 400,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.name}
                type="text"
              />
              {errors?.name?.type === 'required' && <Errors>Bạn chưa nhập tên dịch vụ</Errors>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Giá dịch vụ</label>
              <Inputs
                name="price"
                placeholder="Make teeth"
                {...register('price', {
                  min: 1000,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.price}
                placeholder="VND"
                type="number"
              />
              {errors?.price?.type === 'required' && <Errors>Bạn chưa nhập giá</Errors>}
              {errors?.price?.type === 'min' && <Errors>Giá phải lớn hơn 1000 VNĐ</Errors>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Nội dung</label>
              <div className="form-floating">
                <textarea
                  name="content"
                  {...register('content', {
                    onChange: (e) => {
                      hanldeOnChange(e);
                    },
                    required: true,
                  })}
                  type="text"
                  value={formData === undefined ? '' : formData.content}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px', borderRadius: '10px', border: '1px solid #CCCCCC' }}
                ></textarea>
                {errors?.content?.type === 'required' && <Errors>Bạn chưa nhập nội dung</Errors>}
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="4">
            {/* <FormGroup> */}
            <label>Ảnh</label>
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

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="12">
            <Button variant="contained" type="submit">
              <SaveIcon />
              Lưu
            </Button>
            <Button
              variant="contained"
              color="inherit"
              style={{ marginLeft: '1em' }}
              onClick={reset}
            >
              <CloseIcon />
              Huỷ
            </Button>
          </Col>
        </Row>
      </Form>
    </CardBody>
  );
};
export default ServiceForm;

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
