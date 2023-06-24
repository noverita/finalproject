import { Box, Container } from '@chakra-ui/react'
import { studentName, studentId } from '../Task';

const Footer = () => {
    return (
    <Box className="footer" bg='black' w='100%' p={4} color='white'>
        <Container textAlign='center' >
        <p className="studentName">{studentName}</p>
        <p className="studentId">{studentId}</p>
        </Container>
    </Box>
    )
};

export default Footer;
