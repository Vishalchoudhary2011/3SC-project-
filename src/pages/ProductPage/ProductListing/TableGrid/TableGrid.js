import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { isEmpty } from "lodash";
import Loader from "../../../../components/Loader";
import { useTranslation } from "react-i18next";
// import { NumericFormat } from "react-number-format";

const TableGrid = (props) => {
  const { t } = useTranslation();
  const {
    productData,
    refresh,
    pageSize,
    totalElement,
    setPageIndex,
    pageIndex,
    setSortValue,
  } = props;

  const initialDataState = {
    sort: [
      {
        field: "code",
        dir: "asc",
      },
    ],
    skip: 0,
  };
  const [dataState, setDataState] = useState(initialDataState);

  const [sortDir, setSortDir] = useState(false);

  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    setDataState({ ...dataState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, totalElement]);

  if (refresh) {
    return <Loader />;
  }

  const noOfPages = Math.ceil(totalElement / pageSize);

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  const endCount = end > totalElement ? `- ${totalElement}` : `- ${end}`;

  const listOfHearders = [
    // "Sku_Id",
    "Sku_Code",
    "Sku_Name",
    "ProductHierarchyLevel1",
    "ProductHierarchyLevel2",
    "ProductHierarchyLevel3",
    "ProductHierarchyLevel4",
    "ProductHierarchyLevel5",
    // "Location_Code",
    "Location_Name",
    "Sale_Price_Unit",
  ];

  return (
    <div className="tablegrid">
      {!isEmpty(productData) ? (
        <>
          <Grid
            pageable={false}
            sortable={false}
            resizable={true}
            data={
              !isEmpty(productData) ? process(productData, dataState) : null
            }
            {...dataState}
            onDataStateChange={(e) => {
              setDataState(e.dataState);
            }}
          >
            {listOfHearders.map((item, index) => {
              if (item !== "Sale_Price_Unit") {
                return (
                  <Column
                    key={index}
                    title={t(`${item}`)}
                    field={item}
                    // cell={(props) => {
                    //   console.log(props.dataItem);
                    //   return <td>{props.dataItem}</td>;
                    // }}
                    headerCell={(props) => {
                      return (
                        <span
                          onClick={() => {
                            setSortDir(!sortDir);
                            setSortKey(item);
                            setSortValue(`${item} ${sortDir ? "ASC" : "DESC"}`);
                          }}
                          className="tablegrid-column-sort"
                        >
                          {props.title}{" "}
                          {sortKey === item ? (
                            !sortDir ? (
                              <i
                                className="fa fa-arrow-up"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                className="fa fa-arrow-down"
                                aria-hidden="true"
                              ></i>
                            )
                          ) : (
                            <></>
                          )}
                        </span>
                      );
                    }}
                  />
                );
              } else {
                return (
                  <Column
                    key={index}
                    title={t(`${item}`)}
                    field={item}
                    cell={(props) => {
                      return (
                        <td>
                          {" "}
                          {/* <NumericFormat
                            value={props.dataItem.Sale_Price_Unit}
                            decimalScale={3}
                            customInput={FormLabel}
                          /> */}
                          {/* <NumericFormat
                            value={props.dataItem.Sale_Price_Unit}
                            decimalSeparator=","
                            thousandsGroupStyle="million"
                            thousandSeparator="."
                            displayType="text"
                            renderText={(value) => <>{value}</>}
                          /> */}
                        </td>
                      );
                    }}
                    headerCell={(props) => {
                      return (
                        <span
                          onClick={() => {
                            setSortDir(!sortDir);
                            setSortKey(item);
                            setSortValue(`${item} ${sortDir ? "ASC" : "DESC"}`);
                          }}
                          className="tablegrid-column-sort"
                        >
                          {props.title}{" "}
                          {sortKey === item ? (
                            !sortDir ? (
                              <i
                                className="fa fa-arrow-up"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <i
                                className="fa fa-arrow-down"
                                aria-hidden="true"
                              ></i>
                            )
                          ) : (
                            <></>
                          )}
                        </span>
                      );
                    }}
                  />
                );
              }
            })}
          </Grid>

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
