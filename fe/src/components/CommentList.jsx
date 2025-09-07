import  { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TfiCheckBox } from 'react-icons/tfi';
import Loading from '../utils/Loading';
import { IoPersonCircleOutline } from 'react-icons/io5';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useRecoilValue } from 'recoil';
import { currentUserInfoState } from '../state/CurrentUser';
import {baseURL} from '../utils/properties'


  // Exchange rates to INR (as of current approximate values)
const exchangeRates = {
  USD: 83,   // 1 USD = 83.3 INR
  EUR: 90,   // 1 EUR = 90.7 INR
  GBP: 106,  // 1 GBP = 106.5 INR
  CAD: 61,   // 1 CAD = 61.8 INR
  INR: 1        // 1 INR = 1 INR
};


// Converts the given amount to INR based on the currency.
function convertToINR(amount, currency) {
  if (!exchangeRates[currency]) {
    throw new Error("Unsupported currency format");
  }

  return amount * exchangeRates[currency];
}
  
  // Function to determine the background color based on the amount in USD
  const getBackgroundColor = (amount, currency) => {
    const amountInINR = convertToINR(amount, currency);
  
    if (amountInINR <= 199) return '#2b63cc';   // Blue
    if (amountInINR <= 499) return '#097f40';  // Green
    if (amountInINR <= 999) return '#f9b100';  // Orange
    return '#bf1558';                            // Red
  };


function CommentsListNew() {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const[loading, setLoading] = useState(true);
  const creatorInfo = useRecoilValue(currentUserInfoState);

  useEffect(() => {
    let timerId;  // Store the timer ID. This is used to prevent the setTimeout from continuing after the component unmounts

    function fetchData(maxCommentId) {
        const request = {
          method: "get",
          url: `${baseURL}api/comments/`+maxCommentId,
          withCredentials: true
        }
  
        axios.request(request)
        .then((response) => {
          setLoading(false);
          setComments((comments) => [...comments, ...response.data]);
            for (let i = 0; i < response.data.length; i++) {
              maxCommentId = Math.max(maxCommentId, response.data[i].commentId);
            }
        }).catch(error => {
          setLoading(false);
          if(error.response.status === 401) {
            navigate('/login');
          }
          else alert("Something went wrong!");
        })

        timerId = setTimeout(() => fetchData(maxCommentId), 30000);  // Schedule the next fetch after 10 seconds
      }


      fetchData(0);  // Initial fetch

      // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timerId);
  },[]);

  const handleDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.commentId !== id);
    setComments(updatedComments);

    const request = {
      method:'delete',
      url: `${baseURL}api/deletecomment/`+id,
      withCredentials: true
    }

    axios.request(request)
    .catch(error => {
        if(error.response.status === 401) navigate('/login');
        else alert("Something went wrong!");
    });
  };

  if(loading)

    return <Loading/>

else if(creatorInfo && creatorInfo.upi_id)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        maxWidth: '1000px',
        margin: 'auto',
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom style={{
    backgroundColor: '#f5f5f5',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#333',
  }}>
        Send your comments at: {baseURL+creatorInfo.username}
      </Typography>

      <Stack spacing={2}>
        {comments.map((comment) => (
          <Paper
            key={comment.commentId}
            elevation={3}
            sx={{
              padding: 2,
              borderLeft: '6px solid #4caf50',
              borderRadius: 2,
              backgroundColor: getBackgroundColor(comment.amount, comment.currency),
              color: '#FFFFFF',
              position: 'relative',
              '&:hover': {
                backgroundColor: getBackgroundColor(comment.amount, comment.currency),
                opacity: 0.9,
              },
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'FFFFFF',
              }}
              onClick={() => handleDelete(comment.commentId)}
            >
              <TfiCheckBox size={24} color="white"/>
            </IconButton>

            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IoPersonCircleOutline size={45} color="white" />
                  <Typography variant="h6" fontWeight="bold">
                    {comment.userId}
                  </Typography>
                  <Typography sx={{ marginLeft: 2 }} variant="h6" fontWeight="bold">
                    {getSymbolFromCurrency(comment.currency)}{comment.amount}
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ marginTop: 2 }} fontWeight="bold"> 
                {comment.comment}
              </Typography>

              
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );

  return <></>
}

export default CommentsListNew;
