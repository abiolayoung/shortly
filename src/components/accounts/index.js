import { Grid, Box, Typography, Button, Divider, Snackbar } from "@mui/material";
import { useState, Fragment, useEffect, useCallback } from "react";
import Navbar from "./navbar";
import LinkCard from "./linkCard";
import ShortenURLModules from "./ShortenURLModules";
import { nanoid } from "nanoid";
import { app, firestore, auth } from "../../firebase";
import copy from "copy-to-clipboard";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc, deleteDoc,
} from "firebase/firestore";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [openModule, setOpenModule] = useState(false);
  const [newLinkToaster, setNewLinkToaster] = useState(false)

  const handleCreateShortenLink = async (name, longUrl) => {
    const link = {
      name,
      longUrl,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const resp = await addDoc(
      collection(getFirestore(app), "users", auth.currentUser.uid, "links"),
      link
    );

    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: resp.id },
    ]);
    setOpenModule(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const snapshot = await getDocs(
        collection(getFirestore(app), "users", auth.currentUser.uid, "links")
      );

      const tempLinks = [];
      snapshot.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );

      setLinks(tempLinks);
    };

    fetchLinks();
  }, []);


  // delect a document whenever the delete button is triggered
   
  const handleDeleteLink = useCallback(async (linkDocID) => {
    const db = getFirestore();
    const linkRef = doc(db, "users", auth.currentUser.uid, "links", linkDocID);
    await deleteDoc(linkRef);
    setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkDocID))
  }, []);

  // const dummyFunction = useCallback(() => {
  //   console.log('dummy function')}, [])
  
  const handleCopyLink = useCallback(shortUrl => {
    copy(shortUrl);
    setNewLinkToaster(true)
  }, [])

  return (
    <>
    <Snackbar open={newLinkToaster} onClose={() => setNewLinkToaster(false)} autoHideDuration={2000} message="link copied to the clipboard"/>
      {openModule && (
        <ShortenURLModules
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModule(false)}
        />
      )}
      <Navbar />
      <Box mt={5}>
        <Grid container justifyContent="center">
          <Grid item xs={8}>
            <Box display="flex" mb={5}>
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModule(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create new
              </Button>
            </Box>

            {links
              .sort(
                (prevLink, nextLink) => nextLink.createdAt - prevLink.createdAt
              )
              .map((link, idx) => (
                <Fragment key={link.id}>
                  <LinkCard
                    {...link}
                    // dummyFunction={dummyFunction}
                    deleteLink={handleDeleteLink}
                    copyLink={handleCopyLink}
                  />
                  {idx !== links.length && (
                    <Box my={4}>
                      <Divider />
                    </Box>
                  )}
                </Fragment>
              ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
