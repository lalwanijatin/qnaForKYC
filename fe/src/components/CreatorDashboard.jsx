import { useEffect} from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { MdOutlineContentCopy } from "react-icons/md";
import Loading from "../utils/Loading";
import { useRecoilState } from "recoil";
import { currentUserInfoState } from "../state/CurrentUser";
import {baseURL} from "../utils/properties"

const CreatorDashboard = () => {

  const navigate = useNavigate();
  const [currentUserInfo, setCurrentUserInfo] = useRecoilState(currentUserInfoState);

  useEffect(() => {
    const request = {
        method:'get',
        url:`${baseURL}api/creator`,
        withCredentials: true
    }

    axios.request(request)
    .then(response => {

        setCurrentUserInfo(response.data)

        if(!response.data.upi_id){
          navigate("/registerupi")
        }
    })
    .catch(e => {
        if(e.response.status === 401) navigate('/login');
        else alert("Something went wrong!");
    })
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  if(currentUserInfo)

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          User Profile
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Name:</strong>
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {currentUserInfo.full_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Username:</strong>
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {currentUserInfo.username}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>Link:</strong>
            </Typography>
            <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-all",
                  backgroundColor: "#f5f5f5",
                  padding: "8px",
                  borderRadius: "4px",
                  flexGrow: 1,
                }}
              >
                {baseURL+currentUserInfo.username}
              </Typography>
              <Tooltip title="Copy to Clipboard">
                <IconButton color="primary" onClick={() => handleCopy(baseURL+currentUserInfo.username)} aria-label="Copy Payment Link">
                  <MdOutlineContentCopy size={24} />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="caption" color="textSecondary">
              Share this link with your viewers.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              <strong>UPI ID:</strong>
            </Typography>
            <Typography variant="h6">{currentUserInfo.upi_id}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );

  else

  return <Loading/>
};

export default CreatorDashboard;
