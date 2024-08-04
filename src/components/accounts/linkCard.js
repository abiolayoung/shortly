import { Box, Typography, Button } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";

const LinkCard = ({ id, createdAt, name, longURL, shortCode, totalClicks }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography color="textSecondary" variant="overline">
          Created at {format(createdAt, "d MMM, HH:mm")}
        </Typography>

        <Box my={2}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{longURL}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography color="primary">
            {window.location.host}/{shortCode}
          </Typography>
          <Box mx={2}>
            <Button color="primary" size="small" variant="outlined">
              Copy
            </Button>
          </Box>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            disableElevation
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Box>
        <Box>
          <Box display="flex" justifyContent="center">
            <Typography>{totalClicks}</Typography>
            <ChartIcon />
          </Box>
          <Typography>Total Clicks</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LinkCard;
