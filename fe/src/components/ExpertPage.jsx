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
  Rating,
  Chip,
} from "@mui/material";
import { useState } from "react";

// Dummy data (replace with real API later)
const experts = {
  "career-counsellor": {
    name: "Anjali Verma",
    title: "Career Counsellor",
    bio: "Helping students and professionals choose the right career path with personalized guidance and proven strategies.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    fee: 199,
    maxChars: 250,
    rating: 4.8,
    reviews: 95,
    answered: 312,
  },
  "finance-advisor": {
    name: "Rajesh Gupta",
    title: "Finance & Tax Advisor",
    bio: "15+ years of experience in tax planning and personal finance consulting, making money matters simple and stress-free.",
    photo: "https://randomuser.me/api/portraits/men/47.jpg",
    fee: 299,
    maxChars: 250,
    rating: 4.6,
    reviews: 121,
    answered: 487,
  },
  "life-coach": {
    name: "Neha Singh",
    title: "Relationship & Life Coach",
    bio: "Guiding individuals and couples to build stronger relationships, improve confidence, and live fulfilling lives.",
    photo: "https://randomuser.me/api/portraits/women/48.jpg",
    fee: 249,
    maxChars: 250,
    rating: 4.7,
    reviews: 78,
    answered: 205,
  },
  "fitness-trainer": {
    name: "Amit Kumar",
    title: "Fitness & Wellness Mentor",
    bio: "Certified fitness trainer helping people achieve their health goals through simple lifestyle changes and workouts.",
    photo: "https://randomuser.me/api/portraits/men/49.jpg",
    fee: 199,
    maxChars: 250,
    rating: 4.9,
    reviews: 142,
    answered: 523,
  },
  "sandeep-mehra": {
    name: "Sandeep Mehra",
    title: "Real Estate Consultant (Gurgaon)",
    bio: "Specialized in Gurgaon real estate with 21 years of experience as a trusted broker helping families and businesses find the right property.",
    photo: "/askme/RealEstateExpert.png",
    fee: 350,
    maxChars: 250,
    rating: null,
    reviews: 0,
    answered: 0,
    isNew: true,
  },
};

const ExpertPage = () => {
  const { id } = useParams();
  const expert = experts[id];

  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const charCount = question.length;

  if (!expert) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Expert not found</Typography>
      </Container>
    );
  }

  // Basic email validation regex
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        <Avatar
          src={expert.photo || "https://via.placeholder.com/100?text=No+Photo"}
          alt={expert.name}
          sx={{ width: 100, height: 100 }}
        />
        <Box textAlign="left">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {expert.name}
          </Typography>
          <Typography variant="h6" color="primary">
            {expert.title}
          </Typography>

          {expert.isNew && (
            <Chip
              label="New Expert"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )}

          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
            {expert.bio}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 2, fontWeight: "bold", color: "#1976d2" }}
          >
            Consultation Fee: ₹{expert.fee}{" "}
            {`(Max ${expert.maxChars} characters per question)`}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {expert.rating ? (
              <>
                <Rating value={expert.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {expert.rating} stars ({expert.reviews} reviews) • {expert.answered}+ questions answered
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                No ratings yet — be the first to ask a question!
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Ask Question Section */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Ask Your Question
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          Submit your question and the expert will send a personalized reply to
          your email within 24–48 hours. Keep your question concise and relevant.
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Your Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== "" && !emailIsValid}
            helperText={
              email !== "" && !emailIsValid ? "Please enter a valid email" : ""
            }
          />

          <TextField
            label="Your Question"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            inputProps={{ maxLength: expert.maxChars }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <Typography variant="body2" color="textSecondary">
            {charCount}/{expert.maxChars} characters
          </Typography>

          <Button
            variant="contained"
            size="large"
            disabled={charCount === 0 || email.trim() === "" || !emailIsValid}
            sx={{
              borderRadius: "25px",
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#1976d2",
            }}
          >
            Pay ₹{expert.fee} & Submit Question
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ExpertPage;
