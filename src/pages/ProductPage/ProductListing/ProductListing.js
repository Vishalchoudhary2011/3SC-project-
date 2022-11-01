import React, { useState, useEffect } from "react";
import '../../../style/sass/main.scss';
import TableGrid from "./TableGrid/TableGrid";
import Select from "react-select";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { TextField, InputAdornment } from "@mui/material";
import "@progress/kendo-theme-default/dist/all.css";
import { isEmpty, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PRODUCTS,
  UPLOAD_PRODUCT_CSV_DATA,
} from "../../../store/Types";
import SearchIcon from "@mui/icons-material/Search";
import { withStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { SHOW_ROWS } from "../../../constant/constant";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";


const styles = {
  input1: {
    padding: "13px 12px",
  },
};

const ProductListing = (props) => {
  const { t } = useTranslation();
  const SCAI_URL = process.env.REACT_APP_SCAI_API_ENDPOINT;

  const user = JSON.parse(localStorage.getItem("user"));
  const tenantId = get(user, "tenant_id", "123");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="csv-upload-success-li">
      {file.path} - {file.size} bytes
    </li>
  ));

  const dispatch = useDispatch();
  const [rowLength, setRowLength] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchField, setSearchField] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const showMoreOptions = SHOW_ROWS.map((item) => ({
    label: `${t("Show")} ${item} ${t("Rows")}`,
    value: item,
  }));

  const toggleDialog = () => {
    dispatch({ type: "product/productCSVUploadInitiate" });
    setVisible(!visible);
  };

  const body = {
    pageIndex: pageIndex,
    pageSize: rowLength,
    sortFieldStringWithASCOrDESC: sortValue,
    searchValue: searchField,
    productId: "0",
    tenantId: tenantId,
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS, payload: body });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowLength, pageIndex, sortValue]);

  const handleSearchSubmit = () => {
    dispatch({ type: GET_ALL_PRODUCTS, payload: body });
  };

  const refreshHandler = () => {
    setSearchField("");
    const refreshBody = {
      ...body,
      searchValue: "",
    };
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      dispatch({ type: GET_ALL_PRODUCTS, payload: refreshBody });
    }, 300);
  };

  const products = useSelector((state) => state.ProductReducer.products);
  const productDetails = get(products, "listOfRowWithKeyValues", "");

  const totalElement = get(products, "totalElements", "");
  const pageSize = get(products, "pageSize", "");
  const csvUpload = useSelector((state) => state.ProductReducer.csvUpload);
  const csvUploadResponse = useSelector(
    (state) => state.ProductReducer.csvUploadResponseData
  );
  const csvUploadErrorResponse = useSelector(
    (state) => state.ProductReducer.csvUploadError
  );

  useEffect(() => {
    if (csvUploadErrorResponse) {
      setVisible(false);
      toast.error(t(`${csvUploadErrorResponse.responseCode}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvUploadErrorResponse]);

  useEffect(() => {
    if (csvUpload) {
      setVisible(false);
      csvUploadResponse.failedValidationRowNumbers
        ? toast.success(
            t(`${csvUploadResponse.responseCode}`) +
              `${csvUploadResponse.failedValidationRowNumbers.toString()}`
          )
        : toast.success(t(`${csvUploadResponse.responseCode}`));
      refreshHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csvUpload]);

  const handleCSVUpload = () => {
    const uploadBody = {
      csvFile: acceptedFiles[0],
      tenantId: tenantId,
    };
    dispatch({ type: UPLOAD_PRODUCT_CSV_DATA, payload: uploadBody });
    dispatch({ type: "product/productCSVUploadInitiate" });
  };

  return (
    <div>
      <section className="client-listing">
        <h3 className="section-heading">{t("Product")}</h3>
        <div className="section-breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item " aria-current="page">
                <span>{t("Entities Data")}</span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {t("Product")}
              </li>
            </ol>
          </nav>
        </div>

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
              <div className="client-listing-toolbar-right-csv-download">
                <button className="btn secondary-button" onClick={toggleDialog}>
                  {" "}
                  {t("CSV Upload")}{" "}
                  <i className="fa fa-upload" aria-hidden="true"></i>
                </button>
              </div>
              <div className="client-listing-toolbar-right-csv-download mrg">
                <a
                  className="btn secondary-button"
                  href={`${SCAI_URL}/downloadCSV?tenantId=${tenantId}`}
                >
                  {" "}
                  {t("CSV Download")}{" "}
                  <i className="fa fa-download" aria-hidden="true"></i>
                </a>
              </div>
              <div className="client-listing-toolbar-right-csv-download mrg">
                <TextField
                  label={t("Search")}
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
              <div className="client-listing-toolbar-right-add-client">
                <button
                  className="btn primary-button ml-20"
                  onClick={handleSearchSubmit}
                >
                  {" "}
                  {t("GO")}{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="client-listing-grid">
            {" "}
            <TableGrid
              productData={productDetails}
              refresh={refresh}
              pageSize={pageSize}
              totalElement={totalElement}
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              setSortValue={setSortValue}
            />
          </div>
        </div>
      </section>
      {/* </Layout> */}

      {visible && (
        <Dialog id="window">
          <span className="span1">{t("Upload csv")}</span>
          <span
            style={{ fontSize: "20px" }}
            class="k-icon k-i-close-outline k-btn1"
            onClick={toggleDialog}
          ></span>

          <DialogActionsBar>
            <p className="border2">
              <div className="div2">
                <section className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input
                      {...getInputProps()}
                      accept={".csv"}
                      type="file"
                      name="file"
                    />
                    <span
                      style={{ fontSize: "50px" }}
                      class="k-icon k-i-file-csv k-span"
                    ></span>
                    <h4 className="kh4">Select a CSV file to upload</h4>
                    <p className="kp">and drag or drop it here</p>,
                  </div>
                  <aside>{acceptedFiles[0] ? <ul>{files}</ul> : ""}</aside>
                </section>
              </div>
            </p>
          </DialogActionsBar>

          <DialogActionsBar>
            <a
              style={{
                marginTop: "9px",
                marginBottom: "9px",
                backgroundColor: "#F1F1F1",
                fontWeight: "bold",
                fontSize: "10px",
                borderRadius: "6px",
                color: "#03045e",
                marginLeft: "14px",
                padding: "7px",
              }}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              href={`${SCAI_URL}/downloadTemplate?tenantId=${tenantId}`}
            >
              {t("Download Template")}
              <span class="k-icon k-i-download"></span>
            </a>
            <button
              style={{
                backgroundColor: "#03045e",
                fontWeight: "bold",
                fontSize: "10px",
                borderRadius: "6px",
                color: "white",
                marginLeft: "80px",
                padding: "8px",
              }}
              className={`k-button k-button-md k-rounded-md k-button-solid k-button-solid-base ${
                isEmpty(files) && "k-disabled"
              } `}
              onClick={handleCSVUpload}
            >
              {t("Upload")}
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default withStyles(styles)(ProductListing);
