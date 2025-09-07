import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

// Reusable dialog
const InfoDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>About BharatQnA</DialogTitle>
    <DialogContent>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        BharatQnA is a platform where you can get your questions answered
        live by experts.  
        {"\n\n"}
        Email: bharatqna@gmail.com  
        Address: Godrej Hill - Kalyan, Mumbai, India - 421301
      </Typography>
    </DialogContent>
  </Dialog>
);

const Dashboard = () => {
  const navigate = useNavigate();

  // Hardcoded single vendor
  const vendors = [
    {
      label: 'Sandeep Mehra',
      subtitle: 'Real Estate Consultant (Gurgaon)',
      path: '/expert/sandeep-mehra',
    },
  ];

  const [infoOpen, setInfoOpen] = useState(false);

  const handleVendorSelect = (event, selectedVendor) => {
    if (selectedVendor) {
      navigate(selectedVendor.path);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '90vh',
        gap: 3, // reduced overall gaps slightly
      }}
    >
      {/* Hero Section */}
      <Box>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1a1a1a' }}
        >
          Welcome to <span style={{ color: '#1976d2' }}>AskME</span>
        </Typography>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
          Get your questions answered live by your favorite experts
        </Typography>
      </Box>

      {/* Search Field */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '500px',
          p: 2,
          mt: 2, // reduced top margin
          borderRadius: 3,
        }}
      >
        <Autocomplete
          options={vendors}
          getOptionLabel={(option) => option.label}
          onChange={handleVendorSelect}
          renderOption={(props, option) => (
            <li {...props}>
              <Box>
                <Typography variant="body1">{option.label}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: '0.85rem' }}
                >
                  {option.subtitle}
                </Typography>
              </Box>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for your favorite Expert"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Paper>

      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          py: 1.5,
          borderTop: '1px solid #ddd',
          textAlign: 'center',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} BharatQnA. All rights reserved.
        </Typography>
      </Box>

      {/* Info Dialog */}
      <InfoDialog open={infoOpen} onClose={() => setInfoOpen(false)} />
    </Container>
  );
};

export default Dashboard;
