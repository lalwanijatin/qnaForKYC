import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Terms and Conditions
      </Typography>

      {/* Payments & Services */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Payments & Services
        </Typography>
        <Typography variant="body1">
          Payments made on this platform are strictly for the purpose of asking questions and receiving expert answers. 
          They are not donations or tips, but a fee charged for access to expertise and interactive features. 
          By making a payment, you agree that you are purchasing a service, not supporting or donating to the creator.
        </Typography>
      </Box>

      

      {/* Refund and Cancellation */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Refund and Cancellation Policy
        </Typography>
        <Typography variant="body1">
          No refunds will be entertained under any circumstances. Please ensure that you are certain before proceeding with your payment. 
          In exceptional cases where a refund is approved by the management, the processing time may take 5–7 working days 
          to reflect in the customer’s bank account.
        </Typography>
      </Box>

      {/* Disclaimer */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body1">
          The application, its owner, and the recipients of comments are not responsible for the content of user-submitted questions. 
          The sender (user) is solely responsible for the content they submit and must ensure it complies with applicable laws 
          and does not infringe on third-party rights.
        </Typography>
      </Box>

      {/* Shipping and Delivery */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Shipping and Delivery
        </Typography>
        <Typography variant="body1">
          Since this platform provides digital services, there is no physical shipping of goods.
        </Typography>
      </Box>


      {/* Privacy Policy */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1">
          We are committed to protecting your privacy. Any information collected, such as your name, email address, and payment details, 
          is solely used for processing transactions and improving our services. 
          We do not share your personal data with third parties, except for necessary service providers 
          (e.g., Razorpay for payment processing). 
          All data is stored securely, and industry-standard measures are employed to safeguard it. 
          You may contact us at any time to request details about your personal data or its deletion, subject to legal requirements.
        </Typography>
      </Box>

      {/* Pricing Information */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Pricing Information
        </Typography>
        <Typography variant="body1">
          All prices displayed on the application are in Indian Rupees (INR). 
          Prices are subject to change without prior notice.
        </Typography>
      </Box>

      {/* Limitation of Liability */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography variant="body1">
          The platform and its owners shall not be held liable for any direct, indirect, incidental, or consequential damages 
          arising out of the use of our services. The responsibility for submitted content and engagement lies entirely 
          with the users and experts.
        </Typography>
      </Box>

      {/* Updates */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Updates to Policies
        </Typography>
        <Typography variant="body1">
          These policies may be updated periodically without prior notice. 
          Users are encouraged to review this page regularly to stay informed of any changes.
        </Typography>
      </Box>

      {/* Contact */}
      <Box marginBottom={3}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">
          For any queries or support, please contact us at:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Email: bharatqna@gmail.com" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Address: Godrej Hill - Kalyan, Mumbai, India - 421301" />
          </ListItem>
        </List>
      </Box>

      <Typography variant="body2" color="textSecondary" align="center">
        &copy; {new Date().getFullYear()} BharatQnA. All rights reserved.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
