import React, { useState } from "react";
// import 'normalize.css/normalize.css';
import _ from "lodash";
// import './styles/styles.scss';
import "react-dates/initialize";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
// import {isSameDay} from 'react-dates';
import { Grid } from "@mui/material";
// import "../pages/snopCalender.scss";

const Data = (props) => {
  const [state, setState] = useState({
    createdAt: props.value ? props.value.createdAt : moment(),
    day: props.value ? props.value.date : moment().format("DD"),
    month: props.value ? props.value.month : moment().format("MM"),
    year: props.value ? props.value.year : moment().format("YYYY"),
    week: props.value ? props.value.week : moment().format("week"),
    calendarFocused: false,
  });
  const [Data, setData] = useState("");

  //    const onDateChange = (createdAt) => {
  //     if (createdAt) {
  //       setState(() => ({ createdAt }));
  //     }
  // }
  const onDateChange = (createdAt) => {
    if (createdAt) {
      setState(
        () => ({ createdAt: createdAt.week() }, { calendarFocused: true })
      );
      setData(createdAt.week());
    }
  };
  const onFocusChange = ({ focused }) => {
    setState(() => ({ calendarFocused: focused }));
  };

  const renderMonthElement = ({
    month,
    onMonthSelect,
    onYearSelect,
    onWeekSelect,
  }) => (
    <div>
      <div className="datepickselect">
        <select
          value={month.month()}
          onChange={(e) => onMonthSelect(month, e.target.value)}
          F
        >
          {moment.months().map((label, value) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={month.year()}
          onChange={(e) => onYearSelect(month, e.target.value)}
        >
          {_.range(moment().year() - 50, moment().year() + 50 + 1, 1).map(
            (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            )
          )}
        </select>
        <select
          value={Data}
          onChange={(e) => onWeekSelect(Data, e.target.value)}
        >
          {_.range(moment().week() + 50 + 1).map((Data) => (
            <option key={Data} value={Data}>
              {Data}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  // var eightFeb2014 = moment("2022-09-15"); //saturday, the next one
  // console.log( Math.ceil(eightFeb2014.date() / 7) ); //prints 2, as expected

  return (
    <div style={{ width: "100%", paddingTop: 50 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} className="text-center">
          <SingleDatePicker
            id="date"
            placeholder="Date"
            onDateChange={onDateChange}
            date={state.createdAt}
            focused={state.calendarFocused}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            renderMonthElement={renderMonthElement}
            keepOpenOnDateSelect={true}
            isOutsideRange={() => false}
            enableOutsideDays={false}
            hideKeyboardShortcutsPanel={true}
            showDefaultInputIcon={true}
            inputIconPosition="after"
            small={true}
            displayFormat="MMM DD, YYYY"
            isDayHighlighted={(day) => moment(day).week() === Data}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default Data;
