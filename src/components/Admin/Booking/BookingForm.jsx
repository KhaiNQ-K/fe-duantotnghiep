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

const BookingForm = ({ handleChange, formData, setFormData, listPost, setListPost }) => {
  
  const initValue = {
    id: '',
    dentistProfile: '',
    customerProfile: '',
    bookingDate: '',
    description: '',
    status: '',
    scheduleTime: '',
  };

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

    handleChange(e, '2');
  };

  const reset = () => {
    setFormData(initValue);
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
              <label>Bác sỹ</label>
              <Inputs
                placeholder="Nguyễn Văn A"
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
              <label>Khách hàng</label>
              <Inputs
                placeholder="Nguyễn Văn B"
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
              <label>Ngày đặt lịch</label>
              <Inputs
                {...register('title', {
                  maxLength: 400,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                type="date"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="1">
            <FormGroup>
              <label>Giờ đặt</label>
              <Inputs
                placeholder="2PM - 3PM"
                {...register('title', {
                  maxLength: 400,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.title}
                type="time"
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="0" style={{float: 'left', marginTop: '35px'}}>
            <FormGroup>
              <label>to</label>
            </FormGroup>
          </Col>

          <Col className="px-1" md="1">
            <FormGroup>
              <label>&emsp;</label>
              <Inputs
                placeholder="2PM - 3PM"
                {...register('title', {
                  maxLength: 400,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.title}
                type="time"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Trạng thái</label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Lời nhắn</label>
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
export default BookingForm;

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
