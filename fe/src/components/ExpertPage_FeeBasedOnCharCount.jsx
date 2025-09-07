import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

// Dummy data (replace with real API later)
const experts = {
  "dr-sharma": {
    name: "Dr. A Sharma",
    title: "Career Coach",
    bio: "With 10+ years of experience in guiding students and professionals, Dr. Sharma has helped thousands in choosing the right career path.",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  "prof-kapoor": {
    name: "Prof. R Kapoor",
    title: "Finance & Investment Expert",
    bio: "Prof. Kapoor simplifies money management and investing for young professionals, making finance easy to understand and apply.",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  "dr-mehta": {
    name: "Dr. S Mehta",
    title: "Health & Wellness Mentor",
    bio: "Dr. Mehta specializes in stress management, nutrition, and holistic wellness practices for a balanced lifestyle.",
    photo: "https://i.pravatar.cc/150?img=8",
  },
};

const ExpertPage = () => {
  const { id } = useParams();
  const expert = experts[id];

  const [question, setQuestion] = useState("");
  const charCount = question.length;

  const calculatePrice = (chars) => {
    if (chars === 0) return 0;
    if (chars <= 100) return 49;
    if (chars <= 250) return 99;
    if (chars <= 500) return 199;
    return 299;
  };

  const price = calculatePrice(charCount);

  if (!expert) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Expert not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* Expert Profile */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar src={expert.photo} alt={expert.name} sx={{ width: 100, height: 100 }} />
        <Box textAlign="left">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {expert.name}
          </Typography>
          <Typography variant="h6" color="primary">
            {expert.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
            {expert.bio}
          </Typography>
        </Box>
      </Paper>

      {/* Ask Question Section */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Ask Your Question
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Submit your question and our expert will address it during a live session.  
          Consultation fees are based on the length of your question to ensure fair
          compensation for expert time and effort.
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Your Question"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* Character Count + Price */}
          <Typography variant="body2" color="textSecondary">
            {charCount} characters —{" "}
            {price > 0 ? `Consultation Fee: ₹${price}` : "Start typing to see the fee"}
          </Typography>

          <Button
            variant="contained"
            size="large"
            disabled={charCount === 0}
            sx={{
              borderRadius: "25px",
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#1976d2",
            }}
          >
            {price > 0 ? `Pay ₹${price} & Submit Question` : "Submit Question"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ExpertPage;
