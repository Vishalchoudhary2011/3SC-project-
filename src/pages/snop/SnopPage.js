import React from "react";
import { Grid } from "@mui/material";
import SnopListing from "./SnopListing/SnopListing";

export default function SnopPage() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <SnopListing />
        </Grid>
      </Grid>
    </div>
  );
}
