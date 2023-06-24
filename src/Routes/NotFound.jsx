import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Footer from "../components/Footer";

const NotFound = () => {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1);
      };
    
    return (
        <>
            <div>
                <h1>404 | Not Found</h1>
                <Button colorScheme='teal' size='md' onClick={handleBackButton} data-testid="back"> Kembali</Button>
            </div>
            <Footer/>
        </>
    );
    };

export default NotFound;
