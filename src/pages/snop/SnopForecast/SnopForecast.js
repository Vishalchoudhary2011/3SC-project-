import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import "./snop-forecast.scss";
import { Grid } from "@mui/material";
import ValueMap from "../../../assets/value-map.svg";
import NetworkMap from "../../../assets/map.svg";
import Adjustments from "../../../assets/adjustments.svg";
import Alerts from "../../../assets/alerts.svg";
import DemandSegment from "../../../assets/demand-seg.svg";

import ForecastSale from "../../../assets/forecast-sale.svg";
import ValueVariable from "../../../assets/value-variable.svg";
import DemandClassification from "../../../assets/demand-class.svg";
import DataTable from "../../../assets/data-table.svg";
import KPI from "../../../assets/kpis.svg";
import Demandcell from "./Demandcell";

const SnopForecast = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const selectedSnop = get(location, "state", "");

  console.log({ selectedSnop });

  return (
    <div className="snop-forecast">
      <h3 className="section-heading"> {t("Forecasting")}</h3>
      <section className="section-breadcrumbs">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="section-breadcrumbs-a">
                {t("S&OPHeader")}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/" className="section-breadcrumbs-a">
                {t("S&OPDemandPlanning")}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("Forecasting")}
            </li>
          </ol>
        </nav>
      </section>
      <section className="snop-forecast-filters-container w-100">
        <div className="snop-forecast-filters">
          <div className="d-flex">
            <h3 className="common-heading p-0 m-0"> {t("Filters")}:</h3>
          </div>
          <button className="btn primary-button">{t("Clear")}</button>
        </div>
        <button className="btn primary-button ml-20">
          <i className="fa fa-sliders mr-5"></i>
          {t("Filter")}
        </button>
      </section>
      <section className="snop-forecast-map-container">
        <Grid container spacing={2.5}>
          <Grid item md={12} sm={12} xs={12}>
            <img src={KPI} alt="network-map" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={NetworkMap} alt="network-map" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={ValueMap} alt="value-map" className="w-100" />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <img
              src={DemandClassification}
              alt="demand-class"
              className="w-100"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={DemandSegment} alt="demand-seg" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={ValueVariable} alt="value-var" className="w-100" />
          </Grid>
          <Grid item md={9} sm={6} xs={12}>
            <img src={ForecastSale} alt="forecast-sale" className="w-100" />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <img src={Alerts} alt="alert" className="w-100" />
          </Grid>
          <Grid item md={9} sm={6} xs={12}>
           <Demandcell/>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <img src={Adjustments} alt="adjustments" className="w-100" />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <img src={DataTable} alt="adjustments" className="w-100" />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default SnopForecast;
