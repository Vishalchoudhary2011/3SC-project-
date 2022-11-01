import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Popover from '@mui/material/Popover';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventIcon from '@mui/icons-material/Event';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material//ListItem';
import "./Quaterly.scss"
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
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
export default function Quaterly(props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState();
  const [formatDate, setFormatDate] = useState(props.fromDate);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setFormatDate(moment(new Date(year, 0, 1)).format("MM/DD/YYYY"));
        setDate(new Date(year, 0, 1));
        props.quarterCallback(new Date(year, 0, 1));
        break
      case 1:
        setFormatDate(moment(new Date(year, 3, 1)).format("MM/DD/YYYY"));
        setDate(new Date(year, 3, 1));
        props.quarterCallback(new Date(year, 3, 1));
        break
      case 2:
        setFormatDate(moment(new Date(year, 6, 1)).format("MM/DD/YYYY"));
        setDate(new Date(year, 6, 1));
        props.quarterCallback(new Date(year, 6, 1));
        break
      case 3:
        setFormatDate(moment(new Date(year, 9, 1)).format("MM/DD/YYYY"));
        setDate(new Date(year, 9, 1));
        props.quarterCallback(new Date(year, 9, 1));
        break
    }
    setAnchorEl(null);
  };

  const [year, setYear] = useState(moment().year());

  const YearIncreament = () => {
    setYear(year + 1);
  }

  const YearDecrement = () => {
    setYear(year - 1);
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className="text-center">
          <div className="textFieldBoarder">
            <TextField
              id="input-with-icon-textfield"
              value={formatDate ? moment(formatDate).format(t("LabelsDateFormat")) : ""}
              placeholder={t("DatepickerFormatForQuaterly")}
              fullWidth
              autoComplete="off"
              disabled={props.actionName === 'Edit S&OP' ? true : false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EventIcon aria-describedby={id} variant="contained" onClick={(event) => { if (props.actionName !== 'Edit S&OP') { handleClick(event) } }} style={{ cursor: 'pointer', backgroundColor: '#e0e0e0' }} />
                  </InputAdornment>
                ), disableUnderline: true
              }}
              variant="standard"
            />
          </div>
          <Popover style={{ paddingTop: 30 }}
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
                  <ArrowBackIosNewIcon onClick={YearDecrement} />
                </div>
                <div>
                  <label>{year}</label>
                </div>
                <div >
                  <ArrowForwardIosIcon onClick={YearIncreament} />
                </div>
              </div>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} aria-label="calender" className='tabstyle'>
                  <Tab label={t("Quarter1")} {...a11yProps(0)} onClick={(event) => handleChange(0)} />
                  <Tab label={t("Quarter2")} {...a11yProps(1)} onClick={(event) => handleChange(1)} />
                  <Tab label={t("Quarter3")} {...a11yProps(2)} onClick={(event) => handleChange(2)} />
                  <Tab label={t("Quarter4")} {...a11yProps(3)} onClick={(event) => handleChange(3)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <List style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 0,
                  boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px'
                }}
                  className='liststyle'>
                  <ListItem>{t("QuarterJanuaryTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterFebruaryTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterMarchTab")}<br /> {year}</ListItem>
                </List>
              </TabPanel>
              <TabPanel value={value} index={1}>

                <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                  <ListItem>{t("QuarterAprilTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterMayTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterJuneTab")}<br /> {year}</ListItem>
                </List>

              </TabPanel>
              <TabPanel value={value} index={2}>
                <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                  <ListItem>{t("QuarterJulyTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterAugustTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterSeptemberTab")}<br /> {year}</ListItem>

                </List>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                  <ListItem>{t("QuarterOctoberTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterNovemberTab")}<br /> {year}</ListItem>
                  <ListItem>{t("QuarterDecemberTab")}<br /> {year}</ListItem>
                </List>
              </TabPanel>
            </Box>
          </Popover>
        </Grid>
      </Grid>
    </div>
  )
}


