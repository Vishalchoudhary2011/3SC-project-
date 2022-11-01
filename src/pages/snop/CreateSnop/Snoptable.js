import React, { useState, useEffect } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { isEmpty } from "lodash";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Snoptable.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_SNOP } from "../../../store/Types";
import Loader from "../../../components/Loader";
import CreateOrEditSnop from "../EditSnop/CreateOrEditSnop";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

const Snoptable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [editItem, setEditItem] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const initialDataState = {
    sort: [
      {
        field: "status",
        dir: "asc",
      },
    ],
    skip: 0,
  };

  const [dataState, setDataState] = useState(initialDataState);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    dispatch({ type: GET_ALL_SNOP });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const snopDetails = useSelector((state) => state.SnopReducer.snop);
  const snopLoader = useSelector((state) => state.SnopReducer.loader);
  const filteredSnopDetails = !isEmpty(snopDetails)
    ? snopDetails.filter((snop) => {
        return snop.snop_name.toLowerCase().includes(searchField.toLowerCase());
      })
    : [];

  // if (snopLoader) {
  //   return <Loader />;
  // }

  const onEditClick = () => {
    setIsEditClicked(true);
  };

  const onViewClick = () => {
    navigate("/dpai/snop/forecast", { state: editItem });
  };

  return (
    <>
      <div>
        <section className="client-listing">
          <div className="client-listing-content">
            <div className="w-100 d-flex justify-content-between align-items-center mb-2">
              <h3 className="section-heading">{t("S&OPHeader")}</h3>
              <button className="btn primary-button ml-20 ">
                {" "}
                {t("S&OPCreate")}
                <i className="fa fa-plus-circle ml-5" aria-hidden="true"></i>
              </button>
            </div>
            <div className="client-listing-toolbar">
              <div className="client-listing-toolbar-left">
                <div className="client-listing-toolbar-left-search">
                  <TextField
                    label={t("S&OPName")}
                    sx={{ width: "100%" }}
                    name={"search"}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="client-listing-toolbar-right">
                <div className="client-listing-toolbar-right-csv-download">
                  <button
                    className={`btn primary-button ml-20 ${
                      editItem.length !== 1 && "snop-edit disabled"
                    }`}
                    onClick={onEditClick}
                  >
                    {" "}
                    {/* <EditIcon className="mr-5" /> */}
                    <i className="fa fa-pencil mr-5"></i>
                    {t("S&OPEditButton")}
                  </button>
                  {isEditClicked && (
                    <CreateOrEditSnop
                      visible={isEditClicked}
                      snop={editItem[0]}
                    />
                  )}
                </div>
                <div className="client-listing-toolbar-right-add-client">
                  <button
                    className={`btn cancel-button ml-20 ${
                      editItem.length !== 1 && "snop-edit disabled"
                    }`}
                    onClick={onViewClick}
                  >
                    {" "}
                    {/* <EditIcon className="mr-5" /> */}
                    <i className="fa fa-eye mr-5"></i>
                    {t("S&OPViewButton")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {!snopLoader ? (
            <div className="tablegrid">
              {!isEmpty(filteredSnopDetails) ? (
                <Grid
                  pageable={false}
                  sortable={true}
                  data={process(filteredSnopDetails, dataState)}
                  {...dataState}
                  onDataStateChange={(e) => {
                    setDataState(e.dataState);
                  }}
                >
                  <Column
                    headerClassName="tablegrid-heading"
                    width={"50px"}
                    cell={(props) => {
                      const snop = props.dataItem;
                      return (
                        <td>
                          <input
                            type="checkbox"
                            value={editItem}
                            checked={editItem.includes(snop)}
                            disabled={
                              !(props.dataItem.status === "IN_PROGRESS")
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditItem([...editItem, snop]);
                              } else {
                                setEditItem(
                                  editItem.filter(
                                    (item) => item.snop_id !== snop.snop_id
                                  )
                                );
                                setIsEditClicked(false);
                              }
                            }}
                          />
                        </td>
                      );
                    }}
                  />
                  <Column field="snop_name" title={t("S&OPName")} />
                  <Column
                    field="from_date"
                    title={t("S&OPFrom")}
                    cell={(props) => {
                      return (
                        <td>
                          <span>
                            {Moment(props.dataItem.from_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />
                  <Column
                    field="to_date"
                    title={t("S&OPTo")}
                    cell={(props) => {
                      return (
                        <td >
                          <span>
                            {Moment(props.dataItem.to_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />
                  <Column
                    field="demand_review_date"
                    title={t("S&OPDemandReview")}
                    cell={(props) => {
                      return (
                        <td >
                          <span>
                            {Moment(props.dataItem.demand_review_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />
                  <Column
                    field="supply_review_date"
                    title={t("S&OPSupplyReview")}
                    cell={(props) => {
                      return (
                        <td >
                          <span>
                            {Moment(props.dataItem.supply_review_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />
                  <Column
                    field="pre_snop_date"
                    title={t("S&OPPreSNOP")}
                    cell={(props) => {
                      return (
                        <td >
                          <span>
                            {Moment(props.dataItem.pre_snop_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />
                  <Column
                    field="snop_date"
                    title={t("S&OPSNOP")}
                    cell={(props) => {
                      return (
                        <td >
                          <span>
                            {Moment(props.dataItem.snop_date).format(
                              t("DateFormat")
                            )}
                          </span>
                        </td>
                      );
                    }}
                  />

                  <Column
                    field="status"
                    title={t("S&OPStatus")}
                    cell={(props) => {
                      return (
                        <td className="tablegrid-status">
                          <span
                            className={
                              props.dataItem.status === "IN_PROGRESS"
                                ? "tablegrid-status-inprogress"
                                : props.dataItem.status === "PLANNED_EXECUTED"
                                ? "tablegrid-status-executed"
                                : props.dataItem.status === "PLANNED"
                                ? "tablegrid-status-executing"
                                : ""
                            }
                          >
                            {props.dataItem.status === "IN_PROGRESS"
                              ? t("S&OPStatusInProgress")
                              : props.dataItem.status === "PLANNED_EXECUTED"
                              ? t("S&OPStatusPlannedExecuted")
                              : props.dataItem.status === "PLANNED"
                              ? t("S&OPStatusPlannedExecuting")
                              : ""}
                          </span>
                        </td>
                      );
                    }}
                  />
                </Grid>
              ) : (
                <div className="text-center">No records found</div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </section>
      </div>
    </>
  );
};

export default Snoptable;
