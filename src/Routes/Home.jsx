import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import '../App.css'
import { Button } from '@chakra-ui/react'

const Home = () => {
    const move = useNavigate()
    const handleClick = () => {
        move('/student')
    }
    return (
    <>
    <Navbar/>
      <div className="imgCover"></div>
  <div className="center">
    <div className="title">Studi Independen Kampus Merdeka</div>
    <div className="sub_title">by Ruangguru</div>
    <div className="btns">
      {/* <button data-testid="student-btn" onClick={handleClick}>All Student</button> */}
      <Button data-testid="student-btn" onClick={handleClick} colorScheme='teal' size='md'>
    All Student
  </Button>
    </div>
  </div>
  <Footer/>
    </> )
};

export default Home;
