import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";

export default function CreateOrEditSnop(props) {
  const [visible, setVisible] = useState(props.visible);
  const toggleDialogedit = () => {
    setVisible(!visible);
  };
  const [snopName, setSnopName] = useState(props.snop.snop_name);
  const [from, setFrom] = useState(props.snop.from_date);
  const [to, setTo] = useState(props.snop.to_date);
  const [reviewDate, setReviewDate] = useState(props.snop.demand_review_date);
  const [supplyReviewDate, setSupplyReviewDate] = useState(
    props.snop.supply_review_date
  );
  const [preSnopDate, setPreSnopDate] = useState(props.snop.pre_snop_date);
  const [snopDate, setSnopDate] = useState(props.snop.snop_date);

  // const validateDate = (value) => {   if (validator.isDate(value)) {
  // setErrorMessage('Valid Date :)')   } else {     setErrorMessage('Enter Valid
  // Date!')   } }

  return (
    <div>
      {visible && (
        <Dialog
          title={"Edit S&OP"}
          onClose={toggleDialogedit}
          className="dialogsnop"
        >
          <Box className="Snopfield">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="S&OP Name"
                  id="S&OP"
                  value={snopName}
                  onChange={(e) => {
                    setSnopName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <h5>Forecast Horizon</h5>
              </Grid>

              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    label="From"
                    value={from}
                    onChange={(newValue) => {
                      setFrom(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    label="To"
                    value={to}
                    onChange={(newValue) => {
                      setTo(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>Step 1.</strong>
                  Demand Review Date
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calenderedit"
                    label="Demand Review"
                    value={reviewDate}
                    onChange={(newValue) => {
                      setReviewDate(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>Step 2.</strong>
                  Supply Review Date
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calenderedit"
                    label="Supply Review"
                    value={supplyReviewDate}
                    onChange={(newValue) => {
                      setSupplyReviewDate(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>Step 3.</strong>
                  Pre S&OP Date
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calenderedit"
                    label="Pre S&OP"
                    value={preSnopDate}
                    onChange={(newValue) => {
                      setPreSnopDate(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>Step 4.</strong>
                  S&OP Date
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="calenderedit"
                    label="S&OP Date"
                    value={snopDate}
                    onChange={(newValue) => {
                      setSnopDate(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>

          <DialogActionsBar>
            <Box>
              <Grid container spacing={2} className="btnsnop">
                <Grid item xs={12} md={12}>
                  <button className="btncreate" onClick={toggleDialogedit}>
                    Submit
                  </button>
                  <button className="btncancel" onClick={toggleDialogedit}>
                    Cancel
                  </button>
                </Grid>
              </Grid>
            </Box>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}
