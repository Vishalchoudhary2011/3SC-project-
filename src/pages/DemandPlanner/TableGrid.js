import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { isEmpty, get } from "lodash";
import { useTranslation } from "react-i18next";
import Data from "./response.json";
import Loader from "../../components/Loader";
import "./product-table.scss";

const TableGrid = (props) => {
  const { t } = useTranslation();

  const {
    refresh,
    productTableData,
    rowLength,
    setPageIndex,
    pageIndex,
    totalElement,
    pageSize,
  } = props;

  console.log({ productTableData });

  if (refresh) {
    return <Loader />;
  }

  const noOfPages = Math.ceil(totalElement / pageSize);

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  const endCount = end > totalElement ? `- ${totalElement}` : `- ${end}`;

  const _approverBlock = (level) => {
    const levels = ["Demand", "Manager", "Principal", "Leader"];
    const currentLevel = {};

    levels.forEach((item, index) => {
      if (index < level) {
        currentLevel[item] = true;
      } else {
        currentLevel[item] = false;
      }
    });

    const result = Object.keys(currentLevel).map((item) => {
      const styleClass = currentLevel[item]
        ? "approver-icon active"
        : "approver-icon";
      return (
        <i
          className={`fa fa-check-circle ${styleClass}`}
          data-toggle="tooltip"
          data-placement="top"
          title={item}
        ></i>
      );
    });

    return result;
  };

  const _renderSortIcons = () => {
    return <i className="fa fa-sort ml-5" aria-hidden="true"></i>;
  };

  return (
    <div className="tablegrid">
      {!isEmpty(productTableData) ? (
        <>
          <table className="table table-bordered product-table-grid table-responsive">
            <thead>
              <tr>
                <th scope="col" rowSpan={2}></th>
                <th scope="col" rowSpan={2}>
                  {t("SKU")}{" "}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("Node")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("status")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("segment_value")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("variability")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("accuracy")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("sales_manager")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("average_monthly_sales_volume")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("average_monthly_sales_value")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("last_month_actual_sales_volume")}
                  {_renderSortIcons()}
                </th>
                <th scope="col" rowSpan={2}>
                  {t("last_month_actual_sales_value")}
                  {_renderSortIcons()}
                </th>

                {/* Forecast table start */}
                <th scope="col" rowSpan={2}></th>
                <th scope="col" rowSpan={1} colSpan={3} className="text-center">
                  {t("Statistical Forecast")}
                </th>
                <th scope="col" rowSpan={1} colSpan={3} className="text-center">
                  {t("Operational Forecast")}
                </th>
                <th scope="col" rowSpan={2} className="text-center">
                  {t("Approval")}
                </th>
              </tr>

              <tr>
                {/* Stat months */}
                <th>Sept 2020</th>
                <th>Oct 2020</th>
                <th>Nov 2020</th>

                {/* Operational Months */}
                <th>Sept 2020</th>
                <th>Oct 2020</th>
                <th>Nov 2020</th>
              </tr>
            </thead>
            <tbody>
              {productTableData.map((item, index) => {
                return (
                  index < rowLength && (
                    <>
                      <tr className="position-relative">
                        <td rowSpan={2}>
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td rowSpan={2}>{item.key_attribute_1}</td>
                        <td rowSpan={2}>{item.key_attribute_2}</td>
                        <td rowSpan={2} className="forecast-status-td">
                          <span
                            className={`forecast-status status-${item.status.toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td rowSpan={2}>{item.segment_value}</td>
                        <td rowSpan={2}>{item.variability}</td>
                        <td rowSpan={2}>{item.accuracy}</td>
                        <td rowSpan={2}>{item.salesman}</td>
                        <td rowSpan={2}>{item.average_monthly_sales_volume}</td>
                        <td rowSpan={2}>{item.average_monthly_sales_value}</td>
                        <td rowSpan={2}>
                          {item.last_month_actual_sales_volume}
                        </td>
                        <td rowSpan={2}>
                          {item.last_month_actual_sales_value}
                        </td>

                        {/* Forecast table start */}
                        <td className="side-header">Volume</td>
                        {item.forecast_detail.operational.volume.map((item) => (
                          <td>{item}</td>
                        ))}
                        {item.forecast_detail.statistical.volume.map((item) => (
                          <td>{item}</td>
                        ))}
                        <td rowSpan={2} className="approver-td">
                          {_approverBlock(item.approved_till_level)}
                        </td>
                      </tr>
                      {/* value row */}
                      <tr>
                        <td className="side-header">Value</td>
                        {item.forecast_detail.operational.value.map((item) => (
                          <td>{item}</td>
                        ))}
                        {item.forecast_detail.statistical.value.map((item) => (
                          <td>{item}</td>
                        ))}
                      </tr>
                    </>
                  )
                );
              })}
            </tbody>
          </table>
          <div className="tablegrid_pagination">
            <div
              className="k-pager k-widget k-grid-pager d-flex pt-1"
              role="application"
              aria-roledescription="pager"
            >
              <span
                className={`k-link k-pager-nav k-pager-first ${
                  pageIndex === 1 && "k-disabled"
                }`}
                title="Go to the first page"
                role="button"
                aria-disabled="true"
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                <span
                  className="k-icon k-i-caret-alt-to-left k-color-inherit"
                  role="presentation"
                ></span>
              </span>
              <span
                className={`k-link k-pager-nav ${
                  pageIndex === 1 && "k-disabled"
                }`}
                title="Go to the previous page"
                role="button"
                aria-disabled="true"
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                <span
                  className="k-icon k-i-caret-alt-left k-color-inherit"
                  role="presentation"
                ></span>
              </span>
              <div className="k-pager-numbers-wrap">
                <ul className="k-pager-numbers">
                  {Array.from(Array(noOfPages)).map((x, i) => {
                    return (
                      <li key={i}>
                        <span
                          role="button"
                          aria-label="undefined 1"
                          aria-current="true"
                          className={`k-link ${
                            pageIndex === i + 1 && "k-selected"
                          }`}
                          onClick={() => setPageIndex(i + 1)}
                        >
                          {i + 1}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <span
                className={`k-link k-pager-nav ${
                  noOfPages === pageIndex && "k-disabled"
                }`}
                title="Go to the next page"
                role="button"
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                <span
                  className="k-icon k-i-caret-alt-right k-color-inherit"
                  role="presentation"
                ></span>
              </span>
              <span
                className={`k-link k-pager-nav k-pager-last ${
                  noOfPages === pageIndex && "k-disabled"
                }`}
                title="Go to the last page"
                role="button"
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                <span
                  className="k-icon k-i-caret-alt-to-right k-color-inherit"
                  role="presentation"
                ></span>
              </span>
              <div className="k-pager-info k-label">{`${
                start + 1
              } ${endCount} of ${totalElement} items`}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">No records found</div>
        </>
      )}
    </div>
  );
};

export default TableGrid;
