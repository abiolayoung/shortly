import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CircularProgress, Box, Typography } from "@mui/material";

const LinkRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { shortCode } = useParams();
  const db = getFirestore();

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const linkDocRef = doc(db, "links", shortCode);
      const linkDocSnap = await getDoc(linkDocRef);
      if (linkDocSnap.exists) {
        const { longUrl } = linkDocSnap.data();
        window.location.href = longUrl;
      } else {
        setLoading(false);
      }
    };
    fetchLinkDoc();
  }, []);

  if (loading)
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
    else return (
        <Box mt={10} textAlign='center'>
        <CircularProgress />
        <Typography>Link is Invalid</Typography>
        </Box>
    )
};

export default LinkRedirect;
