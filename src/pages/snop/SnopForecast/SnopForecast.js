import React from "react";
import { useLocation } from "react-router-dom";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import "./snop-forecast.scss";
import { Grid } from "@mui/material";
import { BsSliders } from "react-icons/bs";
import base64Images from "../base64Images.json"

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
              <a href="/dpai/snop" className="section-breadcrumbs-a">
                {t("S&OPHeader")}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="/dpai/snop" className="section-breadcrumbs-a">
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
          <BsSliders className="mr-5" />
          {t("Filter")}
        </button>
      </section>
      <section className="snop-forecast-map-container">
        <Grid container spacing={2.5}>
          <Grid item md={12} sm={12} xs={12}>
            <img src={base64Images.KPI} alt="network-map" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={base64Images.NetworkMap} alt="network-map" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={base64Images.ValueMap} alt="value-map" className="w-100" />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <img
              src={base64Images.DemandClassification}
              alt="demand-class"
              className="w-100"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={base64Images.DemandSegment} alt="demand-seg" className="w-100" />
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <img src={base64Images.ValueVariable} alt="value-var" className="w-100" />
          </Grid>
          <Grid item md={9} sm={6} xs={12}>
            <img src={base64Images.ForecastSale} alt="forecast-sale" className="w-100" />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <img src={base64Images.Alerts} alt="alert" className="w-100" />
          </Grid>
          <Grid item md={9} sm={6} xs={12}>
            <img src={base64Images.DemandSummary} alt="demand-sum" className="w-100" />
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <img src={base64Images.Adjustments} alt="adjustments" className="w-100" />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <img src={base64Images.DataTable} alt="adjustments" className="w-100" />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default SnopForecast;
