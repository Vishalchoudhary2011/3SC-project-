import React, { useState } from "react";
import "./product-table.scss";
import Select from "react-select";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { withStyles } from "@mui/styles";
import TableGrid from "./TableGrid";
import Data from "./response.json";
import { isEmpty, get } from "lodash";
import { SHOW_ROWS } from "../../constant/constant";
import { CSVLink } from "react-csv";

const styles = {
  input1: {
    padding: "13px 12px",
  },
  input2: {
    height: 200,
    fontSize: "3em",
  },
};

const ProductTable = (props) => {
  const [searchField, setSearchField] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [rowLength, setRowLength] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);

  const productTableData = get(Data, "data", []);

  const showMoreOptions = SHOW_ROWS.map((item) => ({
    label: `Show ${item} Rows`,
    value: item,
  }));

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const refreshHandler = () => {
    setSearchField("");

    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  };

  const handleSearchSubmit = () => {
    console.log("Search Submit");
  };

  //sample data

  const filteredForecastItems = productTableData.filter((forecast) => {
    return (
      forecast.salesman.toLowerCase().includes(searchField.toLowerCase()) ||
      forecast.key_attribute_1
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
      forecast.key_attribute_2.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  // const headers = [
  //   { label: "Forecast Id", key: "forecast_header_id" },
  //   { label: "Forecast Number", key: "ForecastNumber" },
  //   { label: "Variability", key: "variability" },
  //   { label: "Accuracy", key: "accuracy" },
  //   {
  //     label: "Average Monthly Sales Volume",
  //     key: "average_monthly_sales_volume",
  //   },
  //   {
  //     label: "Average Monthly Sales Value",
  //     key: "average_monthly_sales_value",
  //   },
  //   {
  //     label: "Last Month Actual Sales Volume",
  //     key: "last_month_actual_sales_volume",
  //   },
  //   { label: "SKU", key: "key_attribute_1" },
  //   { label: "Node", key: "key_attribute_2" },
  //   { label: "Salesman", key: "salesman" },
  //   { label: "Segment Value", key: "segment_value" },
  //   { label: "Status", key: "status" },
  //   { label: "Approved Till Level", key: "approved_till_level" },
  //   {
  //     label: "Forecast Detail Id",
  //     key: "forecast_detail.operational.forecast_detail_id",
  //   },
  // ];

  const totalElement = productTableData.length || 0;

  return (
    <section className="product-table client-listing">
      <div className="client-listing-content">
        <div className="client-listing-toolbar">
          <div className="client-listing-toolbar-left">
            <div className="client-listing-toolbar-left-show ml-10">
              <Select
                id="show"
                name="show"
                placeholder="Show 10 Rows"
                options={showMoreOptions}
                onChange={(value) => {
                  setRowLength(value.value);
                }}
              />
            </div>
            <div
              className="client-listing-toolbar-left-refresh ml-10"
              onClick={() => {
                setTimeout(() => {
                  refreshHandler();
                }, 300);
              }}
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </div>
          </div>
          <div className="client-listing-toolbar-right">
            <div>
              <button className="btn primary-button ml-10">Reviewed</button>
              <button className="btn primary-button ml-10">Adjustments</button>
              <button className="btn primary-button ml-10">Forecast</button>
            </div>
            <div className="client-listing-toolbar-right-csv-download mrg">
              <CSVLink
                data={productTableData}
                filename={"Forecast.csv"}
                target="_blank"
              >
                <button className="btn secondary-button">
                  {" "}
                  CSV Download{" "}
                  <i className="fa fa-download" aria-hidden="true"></i>
                </button>
              </CSVLink>
            </div>

            <div className="client-listing-toolbar-right-csv-download mrg">
              <TextField
                label={"Search"}
                sx={{ width: "100%" }}
                name={"search"}
                value={searchField}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  classes: { input: props.classes.input1 },
                }}
              />
            </div>
          </div>
        </div>
        <div className="client-listing-grid">
          <TableGrid
            refresh={refresh}
            productTableData={filteredForecastItems}
            rowLength={rowLength}
            totalElement={totalElement}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={rowLength}
          />
        </div>
      </div>
    </section>
  );
};

export default withStyles(styles)(ProductTable);
