import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, CardBody, Input, Select, Card } from '@chakra-ui/react';
import '../App.css'

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    fullname: null,
    profilePicture: null,
    address: null,
    phoneNumber: null,
    birthDate: null,
    gender: null,
    programStudy: null,
  });

  useEffect(() => {
    fetch(`http://localhost:3001/student/${id}`)
      .then(response => response.json())
      .then(data => {
        setForm({
          fullname: data.fullname,
          address: data.address,
          profilePicture: data.profilePicture,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          gender: data.gender,
          programStudy: data.programStudy,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const updatedData = {
      ...form,
      faculty: getFacultyByProgramStudy(form.programStudy),
    };

    fetch(`http://localhost:3001/student/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/student');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getFacultyByProgramStudy = programStudy => {
    switch (programStudy) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        return 'Fakultas Ekonomi';
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        return 'Fakultas Ilmu Sosial dan Politik';
      case 'Teknik Sipil':
      case 'Arsitektur':
        return 'Fakultas Teknik';
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        return 'Fakultas Teknologi Informasi dan Sains';
      default:
        return '';
    }
  }

  // if (isLoading) {
  //   return <p>Loading ...</p>;
  // }

  return (
    <div>
      <NavBar />
      <h1>Edit Student</h1>
      <Card mr={30} ml={30} mt={5} mb={10}>
        <CardBody>
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <img src={form.profilePicture} alt={form.fullname} />
          )}
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label>Full Name:</label>
              <Input
                type="text"
                name="fullname"
                value={form.fullname || ''}
                onChange={handleInputChange}
                data-testid="name"
                mt={2}
              />
            </div>
            <br />
            <div>
              <label>Address:</label>
              <Input
                type="text"
                name="address"
                value={form.address || ''}
                onChange={handleInputChange}
                data-testid="address"
                mt={2}
              />
            </div>
            <br />
            <div>
              <label>Phone Number:</label>
              <Input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber || ''}
                onChange={handleInputChange}
                data-testid="phoneNumber"
                mt={2}
              />
            </div>
            <br />
            <div>
              <label>Birth Date:</label>
              <Input
                type="text"
                name="birthDate"
                value={form.birthDate || ''}
                onChange={handleInputChange}
                data-testid="date"
                mt={2}
              />
            </div>
            <br />
            <div>
              <label>Gender:</label>
              <Select
                name="gender"
                value={form.gender || ''}
                onChange={handleInputChange}
                data-testid="gender"
                mt={2}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <br />
            <div>
              <label>Program Study:</label>
              <Select
                id="programStudy"
                name="programStudy"
                value={form.programStudy || ''}
                onChange={handleInputChange}
                data-testid="prody"
                mt={2}
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
            <br />
            <Button colorScheme="teal" size="md" className="submit" type="submit" data-testid="edit-btn">
              Edit Student
            </Button>
          </form>
        </CardBody>
      </Card>
      <Footer />
    </div>
  );
  
};

export default EditStudent;
