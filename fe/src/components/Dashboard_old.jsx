import  { useEffect, useState } from 'react';
import { Container, Typography, Box, Autocomplete, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../utils/properties';


const Dashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  const handleVendorSelect = (event, selectedVendor) => {
    if (selectedVendor) {
      navigate(`/${selectedVendor.id}`);
    }
  };

  useEffect(() => {
    const request = {
        metho:'get',
        url:`${baseURL}api/creator/usernames`
    }

    axios.request(request)
    .then(response => {
        
        const vendorsList = response.data.map( vendor => {
            return {label:vendor, id:vendor};
        })

        setVendors(vendorsList);
    })
  },[]);

  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        minHeight: '90vh',
        justifyContent: 'top',
      }}
    >
      {/* Welcome Message */}
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          {/* Temp */}
          Welcome to AskME
        </Typography>
      </Box>

      {/* USP Section */}
      <Box>
        <Typography variant="h5" color="textSecondary">
          Get your questions answered by the Experts!
        </Typography>
      </Box>

      {/* Search Field */}
      <Box>
        <Autocomplete
          options={vendors}
          onChange={handleVendorSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for your favorite Expert"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: '500px', margin: '0 auto' }}
            />
          )}
          sx={{ width: '100%' }}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
