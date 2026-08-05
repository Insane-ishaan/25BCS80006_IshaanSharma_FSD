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

export default function DashBoard({ userInfo }) {
  return (
    <Card
      sx={{
        width: 300,
        mt: 8,
        p: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <Avatar sx={{ width: 70, height: 70 }}>{userInfo.name[0]}</Avatar>
        <Typography
          gutterBottom
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{
            color: "text.secondary",
            fontSize: 14,
            display: "flex",
            alignSelf: "center",
          }}
        >
          Student {userInfo.name} DashBoard
        </Typography>
      </CardContent>
      <CardActions>
        <EmployeePortal userInfo={userInfo} />
      </CardActions>
    </Card>
  );
}
