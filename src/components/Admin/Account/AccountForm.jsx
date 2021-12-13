import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import roleApi from 'api/roleApi';
import accountApi from 'api/accountApi';
import toastifyAlert from 'utils/toastify';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const AccountForm = ({ handleChange, formData, setFormData, listAccount, setListAccount }) => {
  const initValue = { id: '', email: '', password: '', telephone: '', updateAt: '', rolesId: '' };
  const [role, setRole] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log('formData', formData);

  const onSubmit = (data, e) => {
    const dataForm = {
      id: data.id,
      email: data.email,
      password: data.password,
      telephone: data.telephone,
      updateAt: new Date(),
      rolesId: data.rolesId == "" ? "ADMIN" : data.rolesId,
      deleteAt: 0,
    };
    // console.log('data -> ', dataForm);
    console.log("id:", formData.id)
    if (formData.id == '' || formData.id == undefined) {
      console.log("create")
      create(dataForm);
    } else {
      console.log("update")
      update(dataForm);
    }
    handleChange(e, '2');
  };

  const hanldeOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    roleApi
      .getAll()
      .then((response) => {
        const { data } = response;
        console.log('role', data);
        setRole(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const create = (dataForm) => {
    console.log('create');
    dataForm.id = 0;
    console.log('data : ', dataForm);
    accountApi
      .create(dataForm)
      .then((response) => {
        toastifyAlert.success('Thêm thành công!');
        const { data } = response;
        setListAccount([...listAccount, data]);
      })
      .catch((error) => {
        toastifyAlert.error('Thêm thất bại!');
        console.log(error, error.response);
      });
  };

  const update = (dataForm) => {
    console.log('update');
    accountApi
      .update(dataForm.id, dataForm)
      .then((response) => {
        toastifyAlert.success('Cập nhật thành công!');
        const { data } = response;
        setListAccount(
          listAccount.map((value, index) => {
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

  return (
    <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Id</label>
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
              <label htmlFor="exampleInputEmail1">Email</label>
              <Inputs
                placeholder="user@gmail.com"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email không đúng định dạng',
                  },
                  maxLength: 80,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.email}
                type="text"
              />

              {errors?.email?.type === 'required' && <Errors>Bạn chưa nhập email</Errors>}
              {errors?.email?.type === 'maxLength' && (
                <Errors>Email không được quá 80 ký tự</Errors>
              )}
              {errors?.email?.type === 'pattern' && <Errors>Email không đúng định dạng</Errors>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Mật khẩu</label>
              <Inputs
                placeholder="Password"
                {...register('password', {
                  minLength: 6,
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.password}
                type="password"
              />

              {errors?.password?.type === 'required' && <Errors>Bạn chưa nhập password</Errors>}
              {errors?.password?.type === 'minLength' && (
                <Errors>Password nhập ít nhất 6 ký tự</Errors>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <FormGroup>
              <label>Số điện thoại</label>
              <Inputs
                placeholder="Phone number"
                {...register('telephone', {
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                  pattern: {
                    value: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
                    message: 'Số điện thoại không đúng định dạng',
                  },
                  maxLength: 11,
                  minLength: 10,
                })}
                value={formData === undefined ? '' : formData.telephone}
                type="text"
              />
              {errors?.telephone?.type === 'required' && (
                <Errors>Bạn chưa nhập số điện thoại</Errors>
              )}
              {errors?.telephone?.type === 'maxLength' && (
                <Errors>Số điện thoại không được quá 11 ký tự</Errors>
              )}
              {errors?.telephone?.type === 'minLength' && (
                <Errors>Số điện thoại it nhất phải có 10 ký tự</Errors>
              )}
              {errors?.telephone?.type === 'pattern' && (
                <Errors>Số điện thoại không đúng định dạng</Errors>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="12">
            <label>Phân quyền</label>
            <FormGroup>
              <select
                value={formData === undefined ? '' : formData.rolesId}
                {...register('rolesId', {
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                })}
                style={{
                  minWidth: '100%',
                  height: '38px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '5px',
                  color: '#888888',
                  fontFamily: 'Helvetica',
                }}
              >
                {role.map((val) => {
                  return (
                    <option key={val.id} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
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

export default AccountForm;

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
