import { Typography } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import coke from "../../assets/coca-cola.jpg"
import "../widgets.css"

const Advertisement = () => {
  return (
    <div className="wrapper">
      <FlexBetween>
        <Typography 
          variant="h6"
          style={{ marginBottom: "1rem" }}
          color="red"
        >Featured</Typography>
        <Typography variant="h6">Create Commercial</Typography>
      </FlexBetween>

      <img 
        src={coke}
        alt="advert image"
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover",
          borderRadius: "10px",
          margin: "10px 0",
        }}
      />
      <FlexBetween>
        <Typography variant="h6">Coca Cola</Typography>
        <Typography variant="h6">www.coca-cola.com</Typography>
      </FlexBetween>
      <Typography variant="h6">
        Taste the feeling with Coca Cola
      </Typography>
    </div>
  )
}

export default Advertisement;