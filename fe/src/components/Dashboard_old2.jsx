import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Button,
  Stack,
  Paper,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../utils/properties';

// Reusable dialog for footer links
const FooterLinkDialog = ({ open, onClose, title, content }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {content}
      </Typography>
    </DialogContent>
  </Dialog>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  // modal states
  const [openDialog, setOpenDialog] = useState(null);

  const handleVendorSelect = (event, selectedVendor) => {
    if (selectedVendor) {
      navigate(`/${selectedVendor.id}`);
    }
  };

  useEffect(() => {
    const request = {
      method: 'get',
      url: `${baseURL}api/creator/usernames`,
    };

    axios.request(request).then((response) => {
      const vendorsList = response.data.map((vendor) => {
        return { label: vendor, id: vendor };
      });
      setVendors(vendorsList);
    });
  }, []);

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
        gap: 4,
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
        <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
          Get your questions answered live by your favorite experts
        </Typography>
      </Box>

      {/* Call to Action Buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: '25px',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            textTransform: 'none',
          }}
        >
          Join as Expert
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '25px',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            borderColor: '#1976d2',
            color: '#1976d2',
          }}
        >
          Explore Experts
        </Button>
      </Stack>

      {/* Search Field */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '500px',
          p: 2,
          mt: 4,
          borderRadius: 3,
        }}
      >
        <Autocomplete
          options={vendors}
          onChange={handleVendorSelect}
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
          py: 2,
          borderTop: '1px solid #ddd',
          textAlign: 'center',
          zIndex: 900, // keeps it above other elements
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Link component="button" onClick={() => setOpenDialog('terms')}>
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy">
            Privacy Policy
        </Link>
          <Link component="button" onClick={() => setOpenDialog('refund')}>
            Cancellation & Refund
          </Link>
          <Link component="button" onClick={() => setOpenDialog('shipping')}>
            Shipping & Delivery
          </Link>
          <Link component="button" onClick={() => setOpenDialog('contact')}>
            Contact Us
          </Link>
        </Stack>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          &copy; {new Date().getFullYear()} BharatQnA. All rights reserved.
        </Typography>
      </Box>


      {/* Dialogs */}
      <FooterLinkDialog
        open={openDialog === 'terms'}
        onClose={() => setOpenDialog(null)}
        title="Terms & Conditions"
        content={`Payments made on this platform are strictly for the purpose of asking questions and receiving expert answers.
They are not donations or tips, but a fee charged for access to expertise.

No refunds will be entertained under any circumstances. In exceptional cases, processing time may take 5–7 working days.

The application, its owner, and the recipients of comments are not responsible for the content of user-submitted questions.

All prices are in INR and subject to change without notice.`}
      />

      <FooterLinkDialog
        open={openDialog === 'privacy'}
        onClose={() => setOpenDialog(null)}
        title="Privacy Policy"
        content={`We are committed to protecting your privacy. Information like name, email, and payment details is used only for processing transactions and improving our services.
We do not share personal data with third parties, except necessary providers (e.g., Razorpay).
All data is stored securely with industry-standard safeguards.`}
      />

      <FooterLinkDialog
        open={openDialog === 'refund'}
        onClose={() => setOpenDialog(null)}
        title="Cancellation & Refund Policy"
        content={`No refunds will be entertained under any circumstances.
In exceptional cases where a refund is approved by the management, the processing time may take 5–7 working days to reflect in the bank account.`}
      />

      <FooterLinkDialog
        open={openDialog === 'shipping'}
        onClose={() => setOpenDialog(null)}
        title="Shipping & Delivery"
        content={`This is a digital service platform. No physical products are shipped.
Access to services is provided instantly upon successful payment.`}
      />

      <FooterLinkDialog
        open={openDialog === 'contact'}
        onClose={() => setOpenDialog(null)}
        title="Contact Us"
        content={`Email: bharatqna@gmail.com
Address: Godrej Hill - Kalyan, Mumbai, India - 421301`}
      />
    </Container>
  );
};

export default Dashboard;
