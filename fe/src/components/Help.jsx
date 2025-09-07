
import { Fab } from '@mui/material'; 
import InfoIcon from '@mui/icons-material/Info'; 
import { useNavigate } from 'react-router-dom'; 

const Help = () => { 
  const navigate = useNavigate(); 

  const handleClick = () => { 
    navigate('/help'); 
  }; 

  return ( 
    <Fab 
      color="primary" 
      aria-label="info" 
      onClick={handleClick} 
      style={{ 
        position: 'fixed', 
        bottom: '1rem', 
        right: '1rem', 
        zIndex: 1000, 
      }} 
    > 
      <InfoIcon /> 
    </Fab> 
  ); 
}; 

export default Help; 
