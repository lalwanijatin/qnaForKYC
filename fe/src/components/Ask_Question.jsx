

import { useEffect, useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Menu, Popover, Avatar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import OrderSuccessModal from './OrderSuccessModal';
import { useRecoilState } from 'recoil';
import { creatorInfoState } from '../state/SuccessModal';
import OrderFailedModal from './OrderFailedModal';
import Loading from '../utils/Loading.jsx';
import { useRazorpayPayment } from '../scripts/useRazorpayPayment.js';
import { UserCommentState } from '../state/UserComment.jsx';
import { baseURL } from '../utils/properties.js';

function Ask_Question() {

  const {handleRazorpayPayment} = useRazorpayPayment();

  // Get the creator_username using path variable
  const pathVariable = useLocation().pathname.split("/");
  const creator_username = pathVariable[pathVariable.length - 1];

  const [creatorInfo, setCreatorInfo] = useRecoilState(creatorInfoState)
  const [loadingCreatorInfo, setLoadingCreatorInfo] = useState(true);

  useEffect(() => {
    const request = {
      method:'get',
      url:`${baseURL}api/creatorisvalid/`+creator_username
    }

    axios.request(request)
    .then(response => {
      setCreatorInfo(response.data);
      setLoadingCreatorInfo(false);
    })
    .catch(e => {
      console.log("An error occured! ");
      setLoadingCreatorInfo(false);
    })
  },[])


    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('INR');

    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [comment, setComment] = useRecoilState(UserCommentState);
  const [anchorEl, setAnchorEl] = useState(null);

  const emojis = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
    '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗',
    '🤔', '🤩', '😏', '😌', '😔', '😪', '😭', '😤', '😠', '😡',
    '🤬', '🥳', '🥺', '😇', '😈', '👻', '💀', '🎃', '🤖', '💩',
    '👽', '💪', '👍', '👎', '👏', '🙌', '🙏', '💅', '💖', '🎉',
  ];


  const handleEmojiClick = (emoji) => {
     setComment((prev) => prev + emoji);
    setAnchorEl(null);
  };

  const handleOpenEmojiPicker = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiPicker = () => {
    setAnchorEl(null);
  };

  if(loadingCreatorInfo)
    return <Loading/>

  else if(creatorInfo)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '500px',
        margin: 'auto',
        marginTop:2,
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9'
      }}
    >

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

    {/* Profile Picture */}
          <Box
            component="img"
            src={creatorInfo.profile_picture} // Replace with the URL of the user's profile picture
            alt={creatorInfo.full_name}
            referrerPolicy="no-referrer"
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2, // Rounded corners (square with slight rounding)
              border: '3px solid #1976d2', // Border color matching primary theme
              boxShadow: 2
            }}
          />
              {/* Recipient Name */}
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                Send to: {creatorInfo.full_name}
              </Typography>

      </Box>


      <TextField
        id="username"
        label="Name"
        multiline
        maxRows={1}
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => {setUsername(e.target.value); localStorage.setItem('username',e.target.value)}}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
      />

      {/* Comment Field */}
      <div>
      <TextField
        id="comment"
        label="Add a Comment"
        multiline
        maxRows={4}
        minRows={4}
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => {
          if (e.target.value.length <= 400) {
          setComment(e.target.value);
        }
      }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
      />
      <Button onClick={handleOpenEmojiPicker} variant="outlined" sx={{ mt: 1}}>
        😊 
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseEmojiPicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 240, padding: 1 }}>
          {emojis.map((emoji) => (
            <Typography
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              sx={{
                cursor: 'pointer',
                fontSize: '1.5rem',
                margin: '5px',
                '&:hover': { backgroundColor: '#f0f0f0', borderRadius: '50%' },
              }}
            >
              {emoji}
            </Typography>
          ))}
        </Box>
      </Popover>
    </div>

      {/* Currency and Amount Fields */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <TextField
          select
          label="Currency"
          defaultValue="INR"
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ flex: 1, minWidth: '120px' }}
          disabled
        >
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="CAD">CAD</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </TextField>

        <TextField
          label="Amount"
          type="number"
          placeholder="Enter amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          sx={{ flex: 2 }}
        />
      </Box>

      {/* Pay Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => { handleRazorpayPayment(username, creatorInfo.email, comment, amount, currency);}}
        sx={{
          paddingY: 1.5,
          fontSize: '1rem',
          textTransform: 'none',
        }}
      >
        Send
      </Button>


      {/* <button onClick={() => window.location.href = 'http://localhost:8080/login/oauth2/code/google'}>
      Login with Google
      </button> */}
      <OrderSuccessModal />
      <OrderFailedModal />
    </Box>
  );

  else

  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                {"User doesn't exist"}
            </Typography>
          </Box>
}

export default Ask_Question;
