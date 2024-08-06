import { Box, Typography, Button } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";
import {memo} from 'react'

const LinkCard = ({
  id,
  createdAt,
  name,
  longURL,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
}) => {
  console.log("link Card Rendered");

  const shortUrl = `${window.location.host}/${shortCode}`;
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
          <Typography color="primary">{shortUrl}</Typography>
          <Box mx={2}>
            <Button
              onClick={() => copyLink(shortUrl)}
              color="primary"
              size="small"
              variant="outlined"
            >
              Copy
            </Button>
          </Box>
          <Button
            onClick={() => deleteLink(id)}
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

export default memo(LinkCard);
