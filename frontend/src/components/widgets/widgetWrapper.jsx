import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  borderRadius: "0.5rem",
}));

export default Wrapper;