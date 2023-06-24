import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotFound from './NotFound';
import Footer from '../components/Footer';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Card,
  CardBody,
  Button
} from '@chakra-ui/react'

const Student = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
      const response = await fetch('http://localhost:3001/student');
      const data = await response.json();
      setStudent(data);
      setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      setStudent(student.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStudents = filter === 'All' ? student : student.filter((student) => student.faculty === filter);

  // if (loading) {
  //   return <p>Loading ...</p>;
  // }

  return (
    <div>
      <Navbar />
      <h1>ALL STUDENTS</h1>
      {/* <select class="filter" data-testid="filter" value={filter} onChange={handleFilterChange}> */}
      {loading ? (
      <p>Loading ...</p>
    ) : (
      <Select className="filter" data-testid="filter" value={filter} onChange={handleFilterChange} variant='filled' size='sm' width={200} mr={30} ml={30}>
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
      </Select>
)}
      {filteredStudents.length === 0 ? (
        <NotFound />
      ) : (
        // <table id="table-student">
        //   <thead>
        //     <tr>
        //       <th>No</th>
        //       <th>Full Name</th>
        //       <th>Faculty</th>
        //       <th>Program Study</th>
        //       <th>Option</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {filteredStudents.map((student, index) => (
        //       <tr key={student.id} className="student-data-row">
        //         <td>{index + 1}</td>
        //         <td>
        //           <Link to={`/student/${student.id}`}>{student.fullname}</Link>
        //         </td>
        //         <td>{student.faculty}</td>
        //         <td>{student.programStudy}</td>
        //         <td>
        //           <button className='delete'
        //             data-testid={`delete-${student.id}`}
        //             onClick={() => handleDelete(student.id)}
        //           >
        //             Delete
        //           </button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <Card variant='outline' mr={30} ml={30} mb={10} mt={2}>
          <CardBody>
            <TableContainer>
              <Table variant='striped' colorScheme='teal' id="table-student">
                <Thead>
                  <Tr size='lg'>
                    <Th>No</Th>
                    <Th>Full Name</Th>
                    <Th>Faculty</Th>
                    <Th>Program Study</Th>
                    <Th>Option</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredStudents.map((student, index) => (
                    <Tr key={index} className="student-data-row">
                      <Td>{index + 1}</Td>
                      <Td>
                        <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                      </Td>
                      <Td>{student.faculty}</Td>
                      <Td>{student.programStudy}</Td>
                      <Td>
                        <Button className='delete'
                          size='xs'
                          data-testid={`delete-${student.id}`}
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      )}
        <Footer />
    </div>

  );
};

export default Student;
