import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmployeePortal from "./EmployeeSection";
import Avatar from "@mui/material/Avatar";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function DashBoard({ empInfo }) {
  return (
    <Card
      sx={{
        minWidth: 275,
        mx: "auto",
        mt: 8,
        p: 2,
        transition: ".3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Avatar sx={{ width: 70, height: 70 }}>{empInfo.Emp[0]}</Avatar>
        <Typography
          gutterBottom
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{ color: "text.secondary", fontSize: 14 }}
        >
          Employee {empInfo.Emp} DashBoard
        </Typography>
      </CardContent>
      <CardActions>
        <EmployeePortal empInfo={empInfo} />
      </CardActions>
    </Card>
  );
}
