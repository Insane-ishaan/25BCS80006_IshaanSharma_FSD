import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmployeePortal from "./EmployeeSection";
import Avatar from "@mui/material/Avatar";
import Catalog from "./Catalog";
import { useState } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function DashBoard({ userInfo, courseList }) {
  const [enroll, setEnroll] = useState(0);

  const handleEnroll = () => {
    setEnroll((prev) => prev + 1);
  };

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
          gap: 2,
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
          Welcome Back {userInfo.name.split(" ")}
          <br />
          Program {userInfo.program}
        </Typography>
      </CardContent>
      Enroll : {enroll}
      <CardActions>
        <EmployeePortal userInfo={userInfo} courseList={courseList} />
        <Catalog
          userInfo={userInfo}
          courseList={courseList}
          enroll={enroll}
          setEnroll={setEnroll}
        />
      </CardActions>
    </Card>
  );
}
