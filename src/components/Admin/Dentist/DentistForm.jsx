import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { CardBody, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import provinceApi from 'api/provinceApi';
import districtApi from 'api/districtApi';
import communeApi from 'api/communeApi';
import toastifyAlert from 'utils/toastify';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const DentistForm = ({ handleChange, formData, setFormData, listDentist, setListDentist }) => {
  const initValue = {
    id: '',
    accounts: '',
    image: '',
    cccd: '',
    fullName: '',
    birthday: '',
    gender: '',
    communes: '',
    telephone: '',
    exp: '',
    createAt: '',
    updateAt: new Date(),
    deleteAt: 0,
  };
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommunes, setListCommunes] = useState([]);
  const [provinces, setProvinces] = useState(0);
  const [district, setDistrict] = useState(0);
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
  //Show address of customer
  useEffect(() => {
    if (formData === undefined) {
      return;
    } else if (formData.communes != '') {
      setProvinces(formData.communes.districts.provinces.id);
      setDistrict(formData.communes.districts.id);
    }
  }, []);
  useEffect(() => {
    provinceApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setListProvince(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (provinces == 0) {
      console.log('---- 1 ---- ');
      setListDistrict([]);
    } else {
      console.log('----- 2 ---- ');
      districtApi
        .getByProvinces(provinces)
        .then((response) => {
          const { data } = response;
          setListDistrict(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [provinces]);

  useEffect(() => {
    if (district == 0) {
      console.log('----- 1 ---- ');
      setListCommunes([]);
    } else {
      console.log('----- 2 ---- ');
      communeApi
        .getByDistrict(district)
        .then((response) => {
          const { data } = response;
          setListCommunes(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [district]);
  const hanldeOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //Show address of customer
  useEffect(() => {
    if (formData.communes != '') {
      setProvinces(formData.communes.districts.provinces.id);
      setDistrict(formData.communes.districts.id);
    }
  }, []);
  const provicesChange = (e) => {
    const { name, value } = e.target;
    hanldeOnChange(e);
    setProvinces(value);
  };

  const districtChange = (e) => {
    const { name, value } = e.target;
    setDistrict(value);
  };

  const onSubmit = (data, e) => {
    const dataForm = {
      id: data.id,
      accounts: formData.account,
      image: formData.image,
      cccd: data.cccd,
      fullName: data.fullName,
      birthday: data.birthday,
      gender: data.gender,
      communes: data.communes,
      telephone: data.telephone,
      exp: data.exp,
      createAt: formData.createAt,
      updateAt: new Date(),
      deleteAt: 0,
    };
    const imageUpload = new FormData();
    imageUpload.append('image', selectedFile);
    if (selectedFile != null) {
      axiosInstance
        .post('http://localhost:8080/api/v1/files/upload', imageUpload)
        .then((response) => {
          if (response) {
            console.log('update');
            update(dataForm);
          }
        });
    } else {
      console.log('update');
      update(dataForm);
    }
    handleChange(e, '2', formData);
  };
  const update = (dataForm) => {
    console.log('update');
    dentistApi
      .update(dataForm.id, dataForm)
      .then((response) => {
        toastifyAlert.success('Cập nhật thành công!');
        const { data } = response;
        setListDentist(
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

  const reset = () => {
    setFormData(initValue);
  };

  return (
    <CardBody>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">ID</label>
              <Inputs
                readOnly
                style={{ background: '#DDDDDD' }}
                {...register('id')}
                type="text"
                value={formData === undefined ? '' : formData.id}
              />
              {errors?.email?.type === 'required' && <Errors>Bạn chưa nhập email</Errors>}
              {errors?.email?.type === 'maxLength' && (
                <Errors>Email không được quá 80 ký tự</Errors>
              )}
              {errors?.email?.type === 'pattern' && <Errors>Email không đúng định dạng</Errors>}
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Tỉnh/Thành Phố</label>
            <FormGroup>
              <select
                name="communes"
                style={{
                  minWidth: '100%',
                  height: '38px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '5px',
                  color: '#888888',
                  fontFamily: 'Helvetica',
                }}
                value={formData === undefined ? '' : provinces}
                {...register('provinces', {
                  onChange: (e) => {
                    provicesChange(e);
                  },
                })}
              >
                <option value="0">*Chọn Tỉnh/Thành Phố</option>
                {listProvince.map(function (val, idx) {
                  return (
                    <option key={idx} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">CCCD/CMT</label>
              <Inputs
                placeholder="1234 5678 9820"
                {...register('cccd', {
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                  pattern: {
                    value: /^[0-9\-\+]{9,15}$/i,
                    message: 'CCCD/CMT không đúng định dạng',
                  },
                  maxLength: 12,
                  minLength: 9,
                })}
                value={formData === undefined ? '' : formData.cccd}
                type="text"
              />
              {errors?.cccd?.type === 'required' && <Errors>Bạn chưa nhập CCCD/CMT</Errors>}
              {errors?.cccd?.type === 'maxLength' && (
                <Errors>CCCD/CMT không được quá 12 ký tự</Errors>
              )}
              {errors?.cccd?.type === 'minLength' && (
                <Errors>CCCD/CMT ít nhất phải có 9 ký tự</Errors>
              )}
              {errors?.cccd?.type === 'pattern' && <Errors>CCCD/CMT không đúng định dạng</Errors>}
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Quận/Huyện</label>
            <FormGroup>
              <select
                name="districts"
                style={{
                  minWidth: '100%',
                  height: '38px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '5px',
                  color: '#888888',
                  fontFamily: 'Helvetica',
                }}
                value={formData === undefined ? '' : district}
                {...register('districts', {
                  onChange: (e) => {
                    districtChange(e);
                  },
                })}
              >
                <option value="0">*Chọn Quận/Huyện</option>
                {listDistrict.map(function (val, idx) {
                  return (
                    <option key={idx} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Họ tên</label>
              <Inputs
                placeholder="Nguyen Van A"
                {...register('fullName', {
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                  required: true,
                })}
                value={formData === undefined ? '' : formData.fullName}
                type="text"
              />
              {errors?.fullName?.type === 'required' && <Errors>Bạn chưa nhập họ tên</Errors>}
            </FormGroup>
          </Col>
          <Col className="px-1" md="6">
            <label>Phường/Xã</label>
            <FormGroup>
              <select
                name="communes"
                style={{
                  minWidth: '100%',
                  height: '38px',
                  border: '1px solid #DDDDDD',
                  borderRadius: '5px',
                  color: '#888888',
                  fontFamily: 'Helvetica',
                }}
                value={formData === undefined ? '' : formData.communes.id}
                {...register('communes', {
                  onChange: (e) => {
                    hanldeOnChange(e);
                  },
                })}
              >
                <option value="0">*Chọn Phường/Xã</option>
                {listCommunes.map(function (val, idx) {
                  return (
                    <option key={idx} value={val.id}>
                      {val.name}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="px-1" md="6">
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
                    value: /^[0-9\-\+]{9,15}$/i,
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
              {/* /^[0-9\-\+]{9,15}$/i */}
            </FormGroup>
          </Col>
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
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Ngày sinh</label>
              <Input
                value={formData === undefined ? new Date() : formData.birthday}
                placeholder="Home Address"
                type="date"
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="6">
            <FormGroup>
              <label>Kinh nghiệm</label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  {...register('exp', {
                    onChange: (e) => {
                      hanldeOnChange(e);
                    },
                    required: true,
                  })}
                  style={{ height: '100px', borderRadius: '10px', border: '1px solid #CCCCCC' }}
                  value={formData === undefined ? '' : formData.exp}
                ></textarea>
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '-2.5rem' }}>
          <Col className="px-1" md="6">
            <FormGroup>
              <label>Giới tính</label>
              <br />
              <label>Nam</label>
              <input name="gender" style={{ marginLeft: '0.2rem' }} type="radio" checked />
              &emsp; &emsp;
              <label>Nữ</label>
              <input name="gender" style={{ marginLeft: '0.2rem' }} type="radio" />
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ marginTop: '1%' }}>
          <Col className="px-1" md="12">
            <Button variant="contained" type="submit">
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

export default DentistForm;

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
