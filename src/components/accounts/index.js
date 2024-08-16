import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
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
  doc,
  deleteDoc,
} from "firebase/firestore";

const Account = () => {
  const [links, setLinks] = useState([]);
  const [openModule, setOpenModule] = useState(false);
  const [newLinkToaster, setNewLinkToaster] = useState(false);
  const [fetchingLinks, setFetchingLinks] = useState(true);

  const handleCreateShortenLink = async (name, longUrl) => {
    const link = {
      name,
      longUrl:
        longUrl.includes("http://") || longUrl.includes("https://")
          ? longUrl
          : `http://${longUrl}`,
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
      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLinks();
  }, []);

  // delect a document whenever the delete button is triggered

  const handleDeleteLink = useCallback(async (linkDocID) => {
    if(window.confirm('do you want to delete the link?')){
      const db = getFirestore();
      const linkRef = doc(db, "users", auth.currentUser.uid, "links", linkDocID);
      await deleteDoc(linkRef);
      setLinks((oldLinks) => oldLinks.filter((link) => link.id !== linkDocID));
    }
    }, []);

  // const dummyFunction = useCallback(() => {
  //   console.log('dummy function')}, [])

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkToaster(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkToaster}
        onClose={() => setNewLinkToaster(false)}
        autoHideDuration={2000}
        message="link copied to the clipboard"
      />
      {openModule && (
        <ShortenURLModules
          createShortenLink={handleCreateShortenLink}
          handleClose={() => setOpenModule(false)}
        />
      )}
      <Navbar />
      <Box mt={{xs: 3,  sm: 5}} p={{ xs: 2, sm: 0}}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
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

            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img style={{height: "auto", width: "225px", marginBottom: "24px", }} src="/assets/nodata.png" alt="no links" />
                <Typography>You have not created any link yet</Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt - prevLink.createdAt
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
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
