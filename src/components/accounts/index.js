import { Grid, Box, Typography, Button, Divider } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import Navbar from "./navbar";
import LinkCard from "./linkCard";
import ShortenURLModules from "./ShortenURLModules";
import { nanoid } from "nanoid";
import { app, firestore, auth } from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

const dummyData = [
  {
    id: "31r08ms0fam",
    createdAt: new Date(),
    name: "my website",
    longURL: "https://google.com",
    shortCode: "abiola",
    totalClicks: 313,
  },
  {
    id: "31r08ms0famab2",
    createdAt: new Date(),
    name: "Mindlift Wellness",
    longURL: "https://mindliftwellness.com",
    shortCode: "abiola",
    totalClicks: 31,
  },
];

const Account = () => {
  const [links, setLinks] = useState([]);
  const [openModule, setOpenModule] = useState(false);

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

  return (
    <>
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
                  <LinkCard {...link} />
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
