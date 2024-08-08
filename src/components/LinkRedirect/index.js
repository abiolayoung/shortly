import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { CircularProgress, Box, Typography } from "@mui/material";
import { app, firestore } from "../../firebase";

const LinkRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { shortCode } = useParams();
  const db = getFirestore();

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const linkDocRef = doc(db, "links", shortCode);
      const linkDocSnap = await getDoc(linkDocRef);
    //   console.log(linkDocSnap.data());
    //   if (linkDocSnap.exists) {
    //     const { longUrl, linkID, userUid } = linkDocSnap.data();
    //     doc(
    //         collection(getFirestore(app), "users", userUid, "links", linkID)).update({
    //         totalClicks: app.firestore.FieldValue.increment(1)
    //       });
    //     window.location.href = longUrl;
    //   } else {
    //     setLoading(false);
    //   }

    if (linkDocSnap.exists) {
        const { longUrl, linkID, userUid } = linkDocSnap.data();
        const linkDocRef = doc(getFirestore(app), "users", userUid, "links", linkID);
        updateDoc(linkDocRef, { totalClicks: increment(1) });
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
