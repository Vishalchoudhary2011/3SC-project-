import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Popover from '@mui/material/Popover';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { setYear } from 'date-fns';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material//ListItem';
import "./calender.scss"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Quaterly() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var Yearvalue = moment().year();

  const [year, setYear] = useState(Yearvalue);

  const YearIncreament = () => {
   Yearvalue = year + 1
   setYear(Yearvalue);
  }
  
  const YearDecrement = () => {
    Yearvalue = year - 1
    setYear(Yearvalue);
   }
  return (
    <div style={{ width: '100%', paddingTop: 50 }}>
   <Grid container spacing={2}>
              <Grid item xs={12} md={12} className="text-center">
              <TextField 
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <CalendarMonthIcon aria-describedby={id} variant="contained" onClick={handleClick} style={{ cursor:'pointer' }}/>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Popover style={{paddingTop: 30 }}
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    >
        <Box sx={{ width: '100%' }}>
        <div className='calenderhead'>
          <div>
            <ArrowBackIosNewIcon onClick={YearDecrement}/>
          </div>
           <div>
           <label>{year}</label>
          </div>
          <div >
            <ArrowForwardIosIcon  onClick={YearIncreament}/>
          </div>
        </div>
    
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="calender" className='tabstyle'>
          <Tab label="Q1" {...a11yProps(0)} />
          <Tab label="Q2" {...a11yProps(1)} />
          <Tab label="Q3" {...a11yProps(2)} />
          <Tab label="Q4" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      <List style={{ display: 'flex',
                     flexDirection: 'row',
                     padding: 0,
                     boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px'}} 
                     className='liststyle'>
          <ListItem button>JAN<br/> {year}</ListItem>
          <ListItem button>FEB<br/> {year}</ListItem>
          <ListItem button>MAR<br/> {year}</ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>

      <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <ListItem button>APR<br/> {year}</ListItem>
            <ListItem button>MAY<br/> {year}</ListItem>
            <ListItem button>JUN<br/> {year}</ListItem>
      </List>

      </TabPanel>
      <TabPanel value={value} index={2}>
      <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <ListItem button>JULY<br/> {year}</ListItem>
            <ListItem button>AUG<br/> {year}</ListItem>
            <ListItem button>SEP<br/> {year}</ListItem>

        </List>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <ListItem button>OCT<br/> {year}</ListItem>
            <ListItem button>NOV<br/> {year}</ListItem>
            <ListItem button>DEC<br/> {year}</ListItem>
        </List>
      </TabPanel>
    </Box>
  </Popover> 
          </Grid>
         </Grid>
  </div>
  )
}


