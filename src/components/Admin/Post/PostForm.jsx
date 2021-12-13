import React, { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import postApi from 'api/postApi';
import axiosInstance from 'api/axiosInstance';
import toastifyAlert from 'utils/toastify';

const PostForm = ({ handleChange, formData, setFormData, listPost, setListPost }) => {
  const initValue = { id: '', title: '', content: '', image: '', accounts: '', deleteAt: 0 };
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
      title: data.title,
      content: data.content,
      image: formData.image,
      accounts: formData.accounts,
      deleteAt: 0,
    };
    const imageUpload = new FormData();
    imageUpload.append('image', selectedFile);
    if (selectedFile != null) {
      axiosInstance
        .post('http://localhost:8080/api/v1/files/upload', imageUpload)
        .then((response) => {
          if (response) {
            dataForm.image = response;
            update(dataForm);
          }
        });
    }
    update(dataForm);
    handleChange(e, '2', formData);
  };

  const update = (dataForm) => {
    console.log('update');
    postApi
      .update(dataForm.id, dataForm)
      .then((response) => {
        toastifyAlert.success('Cập nhật thành công!');
        const { data } = response;
        setListPost(
          listPost.map((value, index) => {
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
              <label>Tiêu đề</label>
              <Inputs
                placeholder="Dịch vụ của bệnh viện"
                {...register('title', {
                  maxLength: 400,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.title}
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Nội dung</label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px', borderRadius: '10px', border: '1px solid #CCCCCC' }}
                  {...register('content', {
                    maxLength: 400,
                    onChange: (e) => {
                      hanldeOnChange(e);
                    },
                    required: true,
                  })}
                  value={formData === undefined ? '' : formData.content}
                ></textarea>
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
              <img src={ selectedImage != null ? URL.createObjectURL(selectedImage) : "http://localhost:8080/api/v1/files/download/image?filename=" + formData.image} style={{border: '1px solid #dddddd', minWidth: '100%', width: '100%', height: '250px', marginTop: '0.5rem', borderRadius: '10px'}} />
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
export default PostForm;

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
