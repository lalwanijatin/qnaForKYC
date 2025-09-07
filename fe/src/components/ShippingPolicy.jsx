import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function ShippingPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipping and Delivery
      </Typography>
      <Box>
        <Typography variant="body1" paragraph>
            Since this platform provides digital services, there is no physical shipping of goods.
        </Typography>
      </Box>
    </Container>
  );
}
