import { Typography } from "@mui/material";
import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { theme } from "../theme";

const ThankYou: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Typography sx={{m: 2, color: theme.palette.primary.main, textAlign: 'center'}} variant="h6">
        Your answers have been sent.
          </Typography>

          <Typography  sx={{m: 2, color: theme.palette.primary.dark, textAlign: 'center'}} variant="h5">
          Thank you for taking part in the survey!
          </Typography>
      </main>
    </div>
  );
};

export default ThankYou;
