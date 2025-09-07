import {
    Box,
    Modal,
    Typography,
    Button,
    Paper,
    Divider,
  } from "@mui/material";
  import { useRecoilState, useRecoilValue } from "recoil";
import { failMessageState, failModalOpen } from "../state/FailModal";
import { RxCrossCircled } from "react-icons/rx";
import { PaymentDetailsState } from "../state/PaymentDetailsState";
  
  const OrderFailedModal = () => {
  
    const [openModal, setOpenModal] = useRecoilState(failModalOpen);
    const paymentDetailsState = useRecoilValue(PaymentDetailsState);
    const failMessage = useRecoilValue(failMessageState);
  
    return (
      <div>
  
        {/* Failed Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 400 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: "#fbeaea", 
                borderRadius: 2,
              }}
            >
              {/* ❌ */}
              <RxCrossCircled size={30} color="red" />
  
              <Typography variant="h5" sx={{ 
                    color: "#d9534f", 
                    mb: 1,
                    maxWidth: "100%",      // Restricts width to 100% of the parent
                    wordWrap: "break-word", // Wraps long words to prevent overflow
                    overflow: "hidden",     // Prevents content from overflowing

               }}>
                {failMessage}
              </Typography>
  
              <Divider sx={{ my: 2 }} />
  
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", 
                    color: "#a94442",
                    maxWidth: "100%",      // Restricts width to 100% of the parent
                    wordWrap: "break-word", // Wraps long words to prevent overflow
                    overflow: "hidden",     // Prevents content from overflowing
                 }}
              >
                Please write to us and  mention the following: <br/>
                {JSON.stringify(paymentDetailsState)}
              </Typography>
  
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenModal(false)}
                sx={{ mt: 3 }}
              >
                Close
              </Button>
            </Paper>
          </Box>
        </Modal>
      </div>
    );
  };
  
  export default OrderFailedModal;
  