import { Box, Typography, Button, Hidden } from "@mui/material";
import { BarChart as ChartIcon } from "@mui/icons-material";
import format from "date-fns/format";
import {memo} from 'react'

const LinkCard = ({
  id,
  createdAt,
  name,
  longUrl,
  shortCode,
  totalClicks,
  deleteLink,
  copyLink,
}) => {
  console.log("link Card Rendered");

  const shortUrl = `${window.location.host}/${shortCode}`;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box width="50%">
        <Typography color="textSecondary" variant="overline">
          Created at {format(createdAt, "d MMM, HH:mm")}
        </Typography>

        <Box my={2}>
          <Typography variant="h5" style={{marginBottom: '5px'}}>{name}</Typography>
          <Typography style={{overflow: 'hidden', textOverflow: "ellipsis"}}>{longUrl}</Typography>
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
          <Box display="flex" justifyContent="center">
            <Typography>{totalClicks}</Typography>
            <ChartIcon />
          </Box>
          <Hidden only="xs">
            <Typography variant="overline">Total Clicks</Typography>
          </Hidden>
        </Box>
      </Box>
  );
};

export default memo(LinkCard);
