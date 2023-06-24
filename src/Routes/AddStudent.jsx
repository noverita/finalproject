import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { Button, CardBody, Input, Select, Card } from '@chakra-ui/react'
import '../App.css';
import Footer from '../components/Footer';

const AddStudent = () => {
  const [form, setForm] = useState({
    fullname: '',
  profilePicture: '',
  address: '',
  phoneNumber: '',
  birthDate: '',
  gender: '', 
  programStudy: '', 
  });
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProgramStudyChange = event => {
    const { value } = event.target;

    let faculty = '';
    switch (value) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        faculty = 'Fakultas Ekonomi';
        break;
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        faculty = 'Fakultas Ilmu Sosial dan Politik';
        break;
      case 'Teknik Sipil':
      case 'Arsitektur':
        faculty = 'Fakultas Teknik';
        break;
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        faculty = 'Fakultas Teknologi Informasi dan Sains';
        break;
      default:
        faculty = '';
        break;
    }

    setForm(prevForm => ({
      ...prevForm,
      programStudy: value,
      faculty: faculty,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/student');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <h1>Add Student</h1>
      <Card mr={30} ml={30} mt={5} mb={10}>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name</label>
            <Input
              placeholder='your Fullname...'
              type="text"
              id="name"
              name="fullname"
              value={form.fullname}
              onChange={handleInputChange}
              data-testid="name"
            />
          </div>
          <br />
          <div>
            <label htmlFor="profilePicture">Profile Picture</label>
            <Input
              placeholder='your Profile Picture...'
              type="text"
              id="profilePicture"
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleInputChange}
              data-testid="profilePicture"
            />
          </div>
          <br />
          <div>
            <label htmlFor="address">Address</label>
            <Input
              placeholder='your Address...'
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              data-testid="address"
            />
          </div>
          <br />
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Input
              placeholder='your Phone Number...'
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleInputChange}
              data-testid="phoneNumber"
            />
          </div>
          <br />
          <div>
            <label htmlFor="birthDate">Birth Date</label>
            <Input
              placeholder='your Birthdate...'
              type="date"
              id="birthDate"
              name="birthDate"
              value={form.birthDate}
              onChange={handleInputChange}
              data-testid="date"
            />
          </div>
          <br />
          <div>
            <label htmlFor="gender">Gender</label>
            <Select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleInputChange}
              data-testid="gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </div>
          <br />
          <div>
            <label htmlFor="programStudy">Program Study</label>
            <Select
              id="programStudy"
              name="programStudy"
              value={form.programStudy}
              onChange={handleProgramStudyChange}
              data-testid="prody"
            >
              <option value="Ekonomi">Ekonomi</option>
              <option value="Manajemen">Manajemen</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Administrasi Publik">Administrasi Publik</option>
              <option value="Administrasi Bisnis">Administrasi Bisnis</option>
              <option value="Hubungan Internasional">Hubungan Internasional</option>
              <option value="Teknik Sipil">Teknik Sipil</option>
              <option value="Arsitektur">Arsitektur</option>
              <option value="Matematika">Matematika</option>
              <option value="Fisika">Fisika</option>
              <option value="Informatika">Informatika</option>
            </Select>
          </div>
          {/* <button className='submit' type="submit" data-testid="add-btn">
          Add Student
        </button> */}
        <br />
          <Button colorScheme='teal' size='md' className='submit' type="submit" data-testid="add-btn">
            Add Student
          </Button>
        </form>
        </CardBody>
        </Card>
        <Footer/>
      </div>
  );
};

export default AddStudent;
