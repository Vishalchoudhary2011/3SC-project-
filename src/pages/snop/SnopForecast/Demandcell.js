import React, { useState } from 'react'
import { PanelBar, PanelBarUtils } from '@progress/kendo-react-layout'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Forecast from './Forecast.json'
import { get } from 'lodash'
import { useLocation } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import moment from 'moment'
import './Demand.scss'

const items = []
const jsonData = Forecast.data.summary
const keys = Object.keys(jsonData)
const arr = []
gti 
export default function Demandcell() {
  const location = useLocation()
  const selectedSnop = get(location, 'state', '')
  const FromData = selectedSnop[0].from_date
  const ToData = selectedSnop[0].to_date
  var diff = moment(FromData).diff(moment(ToData), 'days')
  const [periodData, setPeriodData] = useState()

  // console.log("diff:->", diff);

  // const setValidate = () => {

  //     switch (diff === -2) {
  //       case 'DAILY':
  //            setPeriodData(days)
  //         break
  //       case 'FORTNIGHTLY':
  //         newDate.setDate(value.getDate() + planningHorizon * 15 - 1)
  //         //SetSnopObj({ ...snopObj, ['to_date']: newDate })
  //         break
  //       case 'WEEKLY':
  //         newDate.setDate(value.getDate() + planningHorizon * 7 - 1)
  //         //SetSnopObj({ ...snopObj, ['to_date']: newDate })
  //         break
  //       case 'MONTHLY':
  //         newDate.setMonth(value.getMonth() + planningHorizon - 1)
  //         newDate = lastDayOfMonth(newDate)
  //         //SetSnopObj({ ...snopObj, ['to_date']: lastDayOfMonth(newDate) })
  //         break
  //       case 'QUATERLY':
  //         newDate.setMonth(value.getMonth() + planningHorizon * 3 - 1)
  //         newDate = lastDayOfMonth(newDate)
  //         //SetSnopObj({ ...snopObj, ['to_date']: lastDayOfMonth(newDate) })
  //         break
  //     }
  //     return;
  //   }

  const components = PanelBarUtils.mapItemsToComponents(items)
  const { t } = useTranslation()

  const statiscal = []
  const Operation = []
  const Sale = []
  const Unconst = []

  if (
    jsonData.Statistical.length > jsonData.Salesplan.length &&
    jsonData.Statistical.length > jsonData.Operational.length &&
    jsonData.Statistical.length > jsonData.Unconstrained.length
  ) {
    statiscal.push('.0', '.0.0')
  } else if (
    jsonData.Operational.length > jsonData.Statistical.length &&
    jsonData.Operational.length > jsonData.Salesplan.length &&
    jsonData.Operational.length > jsonData.Unconstrained.length
  ) {
    Operation.push('.1', '.0.0')
  } else if (
    jsonData.Salesplan.length > jsonData.Statistical.length &&
    jsonData.Salesplan.length > jsonData.Operational.length &&
    jsonData.Salesplan.length > jsonData.Unconstrained.length
  ) {
    Sale.push('.2', '.0.0')
  } else if (
    jsonData.Unconstrained.length > jsonData.Salesplan.length &&
    jsonData.Unconstrained.length > jsonData.Operational.length &&
    jsonData.Unconstrained.length > jsonData.Statistical.length
  ) {
    Unconst.push('.3', '.0.0')
  }

  return (
    <div className="demandcell">
      <div className="demandbutton">
        <a className="btn secondary-button" href="">
          {' '}
          {t('CSV Download')} <i className="fa fa-download"></i>
        </a>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card className="demandcard">
            <CardContent>
              <div className="paneldemand">
                <PanelBar
                  children={components}
                  expanded={
                    statiscal.length > 0
                      ? ['.0', '.0.0']
                      : Operation.length > 0
                      ? ['.1', '.0.0']
                      : Sale.length > 0
                      ? ['.2', '.0.0']
                      : Unconst.length > 0
                      ? ['.3', '.0.0']
                      : []
                  }
                ></PanelBar>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {keys.map((key, index) => {
        if (!arr.includes(index)) {
          arr.push(index)
          let tableData = {
            title: <div>{`${t(key)}`}</div>,
            title: (
              <div>
                {
                  key === 'Salesplan' ? (
                  <div>
                    {`${t('Salesplan')}`}{' '}
                    <Button className="adjustbtn">Adjustment</Button>
                  </div>
                ) : (`${t(key)}`)}
              </div>
            ),
            content: (
              <div className="custom-template">
                <table className="forecastdemand">
                  <thead>
                    <tr className="Scrollbar">
                      <th></th>
                      {key === 'Statistical'
                        ? jsonData.Statistical.map((period) => (
                            <th>{period.Period} </th>
                          ))
                        : key === 'Operational'
                        ? jsonData.Operational.map((period) => (
                            <th>{period.Period}</th>
                          ))
                        : key === 'Salesplan'
                        ? jsonData.Salesplan.map((period) => (
                            <th>{period.Period}</th>
                          ))
                        : jsonData.Unconstrained.map((period) => (
                            <th>{period.Period}</th>
                          ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>{`${t(key)} ${t('(Vol)')}`}</strong>
                      </td>
                      {key === 'Statistical'
                        ? jsonData.Statistical.map((volume) => (
                            <td>
                              <NumericFormat
                                value={volume.Volume}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(volume) => <>{volume}</>}
                              />
                            </td>
                          ))
                        : key === 'Operational'
                        ? jsonData.Operational.map((volume) => (
                            <td>
                              <NumericFormat
                                value={volume.Volume}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(volume) => <>{volume}</>}
                              />
                            </td>
                          ))
                        : key === 'Salesplan'
                        ? jsonData.Salesplan.map((volume) => (
                            <td>
                              <NumericFormat
                                value={volume.Volume}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(volume) => <>{volume}</>}
                              />
                            </td>
                          ))
                        : jsonData.Unconstrained.map((volume) => (
                            <td>
                              <NumericFormat
                                value={volume.Volume}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(volume) => <>{volume}</>}
                              />
                            </td>
                          ))}
                    </tr>
                    <tr>
                      <td>
                        <strong>{`${t(key)} ${t('(Val)')}`}</strong>
                      </td>
                      {key === 'Statistical'
                        ? jsonData.Statistical.map((value) => (
                            <td>
                              {t('rupees')} {''}
                              <NumericFormat
                                value={value.Value}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(value) => <>{value}</>}
                              />
                            </td>
                          ))
                        : key === 'Operational'
                        ? jsonData.Operational.map((value) => (
                            <td>
                              {t('rupees')} {''}
                              <NumericFormat
                                value={value.Value}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(value) => <>{value}</>}
                              />{' '}
                            </td>
                          ))
                        : key === 'Salesplan'
                        ? jsonData.Salesplan.map((value) => (
                            <td>
                              {t('rupees')} {''}
                              <NumericFormat
                                value={value.Value}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(value) => <>{value}</>}
                              />{' '}
                            </td>
                          ))
                        : jsonData.Unconstrained.map((value) => (
                            <td>
                              {t('rupees')} {''}
                              <NumericFormat
                                value={value.Value}
                                decimalSeparator=","
                                thousandsGroupStyle="million"
                                thousandSeparator="."
                                displayType="text"
                                renderText={(value) => <>{value}</>}
                              />{' '}
                            </td>
                          ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          }
          items.push(tableData)
        }
      })}
    </div>
  )
}
