import React, { useState } from 'react'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import Stack from '@mui/material/Stack'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InputBase from '@mui/material/InputBase'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import './CreateSnop.scss'
import CreateOrEditSnop from '../EditSnop/CreateOrEditSnop'

export default function CreateSnop(props) {
  const [visible, setVisible] = useState(false)
  const [fromDate, setFromDate] = useState(dayjs)
  const [demandDate, setDemandDate] = useState()
  const [reviewDate, setReviewDate] = useState()
  const [preDate, setPreDate] = useState()
  const [sopDate, setSopDate] = useState()
  const [searchField, setSearchField] = useState({ search: '' })

  const toggleDialog = () => {
    setVisible(!visible)
  }
  const handleChange = (e) => {

  var toDates = dayjs(fromDate).add(2, 'days')
  const HandleFrom = (event) => {
    if (event > sopDate) {
      setFromDate(event)
    } else {
      alert('Date Are Not Greater than S&OP Date')
    }
  }

  const HandleSupply = (event) => {
    if (event > demandDate) {
      setReviewDate(event)
    } else {
      alert('Date Are Not Greater than Demand Review Date')
    }
  }

  const HandlePre = (event) => {
    if (event > reviewDate) {
      setPreDate(event)
    } else {
      alert('Date Are Not Greater than Supply Review Date')
    }
  }

  const HandleSop = (event) => {
    if (event > preDate) {
      setSopDate(event)
    } else {
      alert('Date Are Not Greater than Pre S&OP Date')
    }
  }

  return (
    <div className="snoptabledata">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <h3 className="sop">S&OP</h3>
        </Grid>
        <Grid item xs={12} md={8}>
          {props.sentCheck ? (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              className="btnop"
              onClick={toggleDialog}
            >
              Create
            </Button>
          ) : (
            <Button
              disabled
              variant="outlined"
              startIcon={<AddIcon />}
              className="btnop"
              onClick={toggleDialog}
            >
              Create
            </Button>
          )}
          {visible && (
            <Dialog
              title={'Create S&OP'}
              onClose={toggleDialog}
              className="dialogsnop"
            >
              <Box className="Snopfield">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="S&OP Name"
                      id="S&OP"
                      defaultValue="S&OP-August"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <h5>Forecast Horizon</h5>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From"
                        value={props.selectedItem.from_date}
                        onChange={(event) => {
                          HandleFrom(event)
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
                        value={props.selectedItem.to_date}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <p>
                      <strong>Step 1.</strong> Demand Review Date
                      <span>te</span>
                      <span>props.selectedItem.demand_review_date</span>
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Demand Review"
                        value={props.selectedItem.demand_review_date}
                        minDate={demandDate}
                        onChange={(event) => {
                          console.log("tttt"+props.selectedItem.demand_review_date)
                          setDemandDate(event)
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <p>
                      <strong>Step 2.</strong> Supply Review Date
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Supply Review"
                        value={props.selectedItem.supply_review_date}
                        minDate={demandDate}
                        onChange={(event) => {
                          HandleSupply(event)
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <p>
                      <strong>Step 3.</strong> Pre S&OP Date
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Pre S&OP"
                        value={props.selectedItem.pre_snop_date}
                        minDate={reviewDate}
                        onChange={(event) => HandlePre(event)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <p>
                      <strong>Step 4.</strong> S&OP Date
                    </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="S&OP Date"
                        value={props.selectedItem.snop_date}
                        minDate={preDate}
                        onChange={(event) => HandleSop(event)}
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
                      <button className="btncreate" onClick={toggleDialog}>
                        Submit
                      </button>
                      <button className="btncancel" onClick={toggleDialog}>
                        Cancel
                      </button>
                    </Grid>
                  </Grid>
                </Box>
              </DialogActionsBar>
            </Dialog>
          )}
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper
            onChange={(e) => handleChange(e)}
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="S&OP Name"
              inputProps={{ 'aria-label': 's&op name' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="row" spacing={2} className="btnsop">
            {props.sentCheck ? (
              <CreateOrEditSnop  snop={props.selectedItem}/>
            ) : (
              <Button disabled variant="outlined" startIcon={<EditIcon />}>
                Edit
              </Button>
            )}

            {props.sentCheck ? (
              <Button variant="contained" startIcon={<VisibilityIcon />}>
                View
              </Button>
            ) : (
              <Button
                disabled
                variant="contained"
                startIcon={<VisibilityIcon />}
              >
                View
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}}
