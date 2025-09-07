import {
  Box,
  Modal,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { creatorInfoState, successModalOpen } from "../state/SuccessModal";
import { CiCircleCheck } from "react-icons/ci";
import { PaymentDetailsState } from "../state/PaymentDetailsState";

const OrderSuccessModal = () => {

  const [openModal, setOpenModal] = useRecoilState(successModalOpen)
  const paymentDetailsState = useRecoilValue(PaymentDetailsState);
  const creatorInfo = useRecoilValue(creatorInfoState);

  return (
    <div>

      {/* Success Modal */}
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
              backgroundColor: "#e6f7e6", // Light green background
              borderRadius: 2,
            }}
          >
            {/* ✔️ */}
            <CiCircleCheck size={30} color="green"/>

            <Typography variant="h5" sx={{ color: "#28a745", mb: 1 }}>
              Your comment has been sent to {creatorInfo.full_name}!
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ mb: 2 }}>
              Your Payment ID is:
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#555555" }}
            >
              {paymentDetailsState['payment_id'] || "Not Available"}
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

export default OrderSuccessModal;
