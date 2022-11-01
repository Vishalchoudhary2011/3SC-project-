import React from "react";
import { Grid } from "@mui/material";
import Snoptable from "../CreateSnop/Snoptable";

export default function Snoppage() {
  return (
    <div>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Snoptable />
        </Grid>
      </Grid>
    </div>
  );
}
