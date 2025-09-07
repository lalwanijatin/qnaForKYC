import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/properties";

const RegisterUPI = () => {
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (upiId.trim()) {
      const request = {
        method:'put',
        url:`${baseURL}api/creator/addupi`,
        data:{upi_id: upiId},
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }

      axios.request(request)
      .then(response =>{
        navigate("/creator")
      })
      .catch(e => {
        if(e.response.status === 401) navigate('/login');
        else alert(e.response.data.error_message);
        
      })
    } else {
      alert("Please enter a valid UPI ID.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Complete Your Registration
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="UPI ID"
                variant="outlined"
                fullWidth
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                required
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ display: "block", mt: 1 }}
              >
                This UPI ID will be used to send you the payouts!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterUPI;
