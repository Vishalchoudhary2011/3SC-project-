import React, { useEffect, useState } from 'react'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import './CreateSnop.scss'
import '../SnopListing/SnopListing.scss'
import {
  DatePicker,
  Calendar,
  CalendarCell,
} from '@progress/kendo-react-dateinputs'
import { firstDayOfMonth, lastDayOfMonth } from '@progress/kendo-date-math'
import Quaterly from '../../../globalComponent/Quaterly/Quaterly'
import moment from 'moment'
import {
  CREATE_SNOP,
  DELETE_SNOP,
  EDIT_SNOP,
} from '../../../store/Types'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from "react-i18next";

export default function CreateSnop(props) {
  const { t } = useTranslation();
  const snop = useSelector((state) => state.snop)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(props.visible)
  const toggleDialogedit = () => {
    closeDialogWithCallback()
  }

  //Errors
  const [errors, setErrors] = useState({})
  const [snopObj, SetSnopObj] = useState(props.snop)

  const onEditSubmit = () => {
    validateInputs()
    if (Object.keys(errors).length === 0) {
      delete snopObj.updated_at
      dispatch({ type: EDIT_SNOP, payload: snopObj })
      closeDialogWithCallback()
    }
  }

  const onCreateSubmit = () => {
    validateInputs()
    if (Object.keys(errors).length === 0) {
      delete snopObj.updated_at
      dispatch({ type: CREATE_SNOP, payload: snopObj })
      closeDialogWithCallback()
    }
  }

  const closeDialogWithCallback = () => {
    setVisible(!visible)
    props.snopTableCallback(!visible)
  }

  const onDeleteSnop = () => {
    dispatch({ type: DELETE_SNOP, payload: snopObj.snop_id })
    setVisible(!visible)
    props.snopTableCallback(!visible)
  }

  const planningFrequency = 'WEEKLY'
  const planningHorizon = 3
  const weekStartDay = 'Tuesday'

  const setToDate = (value) => {
    let newDate = value;
    switch (planningFrequency.toUpperCase()) {
      case 'DAILY':
        newDate.setDate(value.getDate() + planningHorizon - 1)
        break
      case 'FORTNIGHTLY':
        newDate.setDate(value.getDate() + planningHorizon * 15 - 1)
        break
      case 'WEEKLY':
        newDate.setDate(value.getDate() + planningHorizon * 7 - 1)
        break
      case 'MONTHLY':
        newDate.setMonth(value.getMonth() + planningHorizon - 1)
        newDate = lastDayOfMonth(newDate)
        break
      case 'QUATERLY':
        newDate.setMonth(value.getMonth() + planningHorizon * 3 - 1)
        newDate = lastDayOfMonth(newDate)
        break
    }
    return moment(newDate).format('YYYY-MM-DD')
  }

  // handing all the inputs changes
  const handleInputChange = (value, name) => {
    if (name === 'snop_name') {
      SetSnopObj({ ...snopObj, snop_name: value })
    } else {
      if (value) {
        if (name !== 'from_date') {
          SetSnopObj({ ...snopObj, [name]: moment(value).format('YYYY-MM-DD') })
        } else {
          let dateValue = moment(value).format('YYYY-MM-DD');
          if (planningFrequency.toUpperCase() === 'MONTHLY') {
            dateValue = moment(value).startOf("month").format('YYYY-MM-DD');
          }
          SetSnopObj({
            ...snopObj,
            [name]: dateValue,
            ['to_date']: setToDate(value),
          })
        }
      }
    }
    return
  }

  useEffect(() => {
    if (isAnyUpdateOnSnopObj()) {
      validateInputs()
    }
  }, [snopObj])

  const isAnyUpdateOnSnopObj = () => {
    return snopObj.snop_name || snopObj.demand_review_date || snopObj.supply_review_date || snopObj.pre_snop_date || snopObj.snop_date || snopObj.from_date
  }

  // Validates the inputs which given
  const validateInputs = () => {
    if (!snopObj.snop_name) {
      errors.snop_name = t("RequiredValidationMessageSNOPName")
      setErrors({ ...errors })
    }
    else {
      delete errors['snop_name']
      setErrors({ ...errors })
    }
    if (
      moment(snopObj.demand_review_date).isSameOrAfter(
        snopObj.supply_review_date,
      )
    ) {
      errors.demand_review_date = t("ValidationMessageDemandReview")
      setErrors({ ...errors })
    } else if (!snopObj.demand_review_date) {
      errors.demand_review_date = t("RequiredValidationMessageDemandReview")
      setErrors({ ...errors })
    }
    else {
      delete errors['demand_review_date']
      setErrors({ ...errors })
    }
    if (
      moment(snopObj.supply_review_date).isSameOrAfter(snopObj.pre_snop_date)
    ) {
      errors.supply_review_date = t("ValidationMessageSupplyReview")
      setErrors({ ...errors })
    } else if (!snopObj.supply_review_date) {
      errors.supply_review_date = t("RequiredValidationMessageSupplyReview")
      setErrors({ ...errors })
    } else {
      delete errors['supply_review_date']
      setErrors({ ...errors })
    }
    if (moment(snopObj.pre_snop_date).isSameOrAfter(snopObj.snop_date)) {
      errors.pre_snop_date = t("ValidationMessagePreSNOPReview")
      setErrors({ ...errors })
    } else if (!snopObj.pre_snop_date) {
      errors.pre_snop_date = t("RequiredValidationMessagePreSNOPReview")
      setErrors({ ...errors })
    } else {
      delete errors['pre_snop_date']
      setErrors({ ...errors })
    }
    if (moment(snopObj.snop_date).isSameOrAfter(snopObj.from_date)) {
      errors.snop_date = t("ValidationMessageSNOPReview")
      setErrors({ ...errors })
    } else if (!snopObj.snop_date) {
      errors.snop_date = t("RequiredValidationMessageSNOPReview")
      setErrors({ ...errors })
    } else {
      delete errors['snop_date']
      setErrors({ ...errors })
    }
    if (
      moment(snopObj.from_date).isSameOrBefore(
        moment(new Date()).format('YYYY-MM-DD'),
      )
    ) {
      errors.from_date = t("ValidationMessageFromDate")
      setErrors({ ...errors })
    } else if (!snopObj.from_date) {
      errors.from_date = t("RequiredValidationMessageFromDate")
      setErrors({ ...errors })
    } else {
      delete errors['from_date']
      setErrors({ ...errors })
    }
  }

  const disableWeeks = (calendarCellProps) => {
    let disabledDays
    switch (weekStartDay.toUpperCase()) {
      case 'MONDAY':
        disabledDays = [0, 2, 3, 4, 5, 6]
        break
      case 'TUESDAY':
        disabledDays = [0, 1, 3, 4, 5, 6]
        break
      case 'WEDNESDAY':
        disabledDays = [0, 1, 2, 4, 5, 6]
        break
      case 'THURSDAY':
        disabledDays = [0, 1, 2, 3, 5, 6]
        break
      case 'FRIDAY':
        disabledDays = [0, 1, 2, 3, 4, 6]
        break
      case 'SATURDAY':
        disabledDays = [0, 1, 2, 3, 4, 5]
        break
      case 'SUNDAY':
        disabledDays = [1, 2, 3, 4, 5, 6]
        break
    }

    const styleValue = disabledDays.includes(calendarCellProps.value.getDay())
      ? { opacity: '.7', 'pointer-events': 'none' }
      : { fontWeight: 'bold' }

    return <CalendarCell {...calendarCellProps} style={styleValue} />
  }

  const getWeeklyCalendar = (props) => {
    return (
      <Calendar
        cell={disableWeeks}
        {...props}
        views={1}
        weekNumber={true}
      />
    )
  }

  const [fromDate, setDate] = useState(
    planningFrequency.toUpperCase() === 'MONTHLY' ? firstDayOfMonth(new Date()) : new Date()
  )
  const setSelectedDate = (value) => {
    console.log(value)
    setDate(value.value)
    handleInputChange(value.value, 'from_date')
  }

  const quarterCallback = (data) => {
    handleInputChange(data, 'from_date')
  }

  const createFromCalendar = () => {
    let calendarComponent

    switch (planningFrequency.toUpperCase()) {
      case 'WEEKLY':
        calendarComponent = (
          <DatePicker format={t("DatepickerFormat")}
            disabled={props.actionName === 'Edit S&OP' ? true : false}
            calendar={getWeeklyCalendar}
            value={snopObj.from_date != '' ? new Date(snopObj.from_date) : null}
            onChange={(event) => { handleInputChange(event.value, "from_date") }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        )
        {
          errors.from_date && <span>{errors.from_date}</span>
        }
        break
      case 'MONTHLY':
        calendarComponent = (
          <DatePicker format={t("DatepickerFormat")}
            disabled={props.actionName === 'Edit S&OP' ? true : false}
            calendar={(props) => (
              <Calendar
                {...props}
                views={1}
                bottomView="year"
                topView="decade"
              />
            )}
            value={snopObj.from_date != '' ? new Date(snopObj.from_date) : null}
            onChange={(event) => {
              handleInputChange(event.value, 'from_date')
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        )
        {
          errors.from_date && <span>{errors.from_date}</span>
        }
        break
      case 'QUATERLY':
        calendarComponent = <Quaterly fromDate={snopObj.from_date} actionName={props.actionName} quarterCallback={quarterCallback} />
        {
          errors.from_date && <span>{errors.from_date}</span>
        }
        break
      default:
        calendarComponent = (
          <DatePicker format={t("DatepickerFormat")}
            disabled={props.actionName === 'Edit S&OP' ? true : false}
            name="from_date"
            value={snopObj.from_date != '' ? new Date(snopObj.from_date) : null}
            onChange={(event) => {
              handleInputChange(event.value, 'from_date')
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        )
    }
    return calendarComponent
  }
  useEffect(() => {
    diableKeydownOnDatePicker()
  }, [])
  // to prevent maual edit in the datepicker  
  const diableKeydownOnDatePicker = () => {
    let datePickers = document.querySelectorAll(".dialogCEsnop .k-dateinput")
    for (let index = 0; index < datePickers.length; index++) {
      const datePicker = datePickers[index];
      datePicker.addEventListener('keydown', (e) => { e.stopPropagation(); e.preventDefault() })
    }
  }

  return (
    <div>
      {visible && (
        <Dialog
          title={props.actionName === 'Edit S&OP' ? t("EditSNOPLabel") : t("CreateSNOPLabel")}
          onClose={toggleDialogedit}
          className="dialogsnop dialogCEsnop"
        >
          <Box className="Snopfield">
            <Grid container spacing={2}>
              {props.actionName === 'Edit S&OP' ? (
                <Grid item xs={12} md={12}>
                  <DeleteIcon onClick={onDeleteSnop} className="deleteicon" />
                </Grid>
              ) : (
                ''
              )}
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label={t("S&OPName")}
                  id="S&OP"
                  name="snop_name"
                  value={snopObj.snop_name}
                  onChange={(event) => {
                    handleInputChange(event.target.value, 'snop_name')
                  }}
                />
                {errors.snop_name && (
                  <span className="error">{errors.snop_name}</span>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <h5>{t("ForecastHorizonLabel")}</h5>
              </Grid>

              <Grid item xs={6} md={6}>
                <p>{t("FromDateLabel")}</p>
                {createFromCalendar()}
                {errors.from_date && (
                  <span className="error">{errors.from_date}</span>
                )}
              </Grid>
              <Grid item xs={6} md={6}>
                <p>{t("ToDateLabel")}</p>
                <DatePicker format={t("DatepickerFormat")}
                  name="to_date"
                  disabled
                  value={
                    snopObj.to_date !== '' ? new Date(snopObj.to_date) : null
                  }
                  onChange={handleInputChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                {errors.to_date && (
                  <span className="error">{errors.to_date}</span>
                )}
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>{t("StepLabel")} 1. </strong>
                  {t("DemandReviewDateLabel")}
                </p>
                <DatePicker format={t("DatepickerFormat")}
                  className="calenderedit"
                  name="demand_review_date"
                  value={
                    snopObj.demand_review_date !== ''
                      ? new Date(snopObj.demand_review_date)
                      : null
                  }
                  onChange={(event) => {
                    handleInputChange(event.value, 'demand_review_date')
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                {errors.demand_review_date && (
                  <span className="error">{errors.demand_review_date}</span>
                )}
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>{t("StepLabel")} 2. </strong>
                  {t("SupplyReviewDateLabel")}
                </p>
                <DatePicker format={t("DatepickerFormat")}
                  className="calenderedit"
                  name="supply_review_date"
                  value={
                    snopObj.supply_review_date != ''
                      ? new Date(snopObj.supply_review_date)
                      : null
                  }
                  onChange={(event) => {
                    handleInputChange(event.value, 'supply_review_date')
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                {errors.supply_review_date && (
                  <span className="error">{errors.supply_review_date}</span>
                )}
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>{t("StepLabel")} 3. </strong>
                  {t("PreSNOPDateLabel")}
                </p>
                <DatePicker format={t("DatepickerFormat")}
                  className="calenderedit"
                  name="pre_snop_date"
                  value={
                    snopObj.pre_snop_date != ''
                      ? new Date(snopObj.pre_snop_date)
                      : null
                  }
                  onChange={(event) => {
                    handleInputChange(event.value, 'pre_snop_date')
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                {errors.pre_snop_date && (
                  <span className="error">{errors.pre_snop_date}</span>
                )}
              </Grid>
              <Grid item xs={6} md={6}>
                <p>
                  <strong>{t("StepLabel")} 4. </strong>
                  {t("SNOPDateLabel")}
                </p>
                <DatePicker format={t("DatepickerFormat")}
                  className="calenderedit"
                  value={
                    snopObj.snop_date != ''
                      ? new Date(snopObj.snop_date)
                      : null
                  }
                  onChange={(event) => {
                    handleInputChange(event.value, 'snop_date')
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
                {errors.snop_date && (
                  <span className="error">{errors.snop_date}</span>
                )}
              </Grid>
            </Grid>
          </Box>
          <DialogActionsBar>
            <Box>
              <Grid container spacing={2} className="btnsnop">
                <Grid item xs={12} md={12}>
                  <button
                    className="btncreate"
                    disabled={Object.keys(errors) != 0 ? true : false}
                    onClick={
                      props.actionName === 'Edit S&OP'
                        ? onEditSubmit
                        : onCreateSubmit
                    }
                  >
                    {props.actionName === 'Edit S&OP' ? t("Submit") : t("S&OPCreate")}
                  </button>
                  <button className="btncancel" onClick={toggleDialogedit}>
                    {t("Cancel")}
                  </button>
                </Grid>
              </Grid>
            </Box>
            <ToastContainer />
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}
