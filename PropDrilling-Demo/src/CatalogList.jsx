import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function CatalogList({ courseList, setEnroll }) {
  const handleEnroll = () => {
    setEnroll((prev) => prev + 1);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <ul>
          {courseList.map((value, idx) => (
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
              key={idx}
            >
              <li>{value}</li>
              <span onClick={handleEnroll}>+</span>
            </Typography>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default CatalogList;
