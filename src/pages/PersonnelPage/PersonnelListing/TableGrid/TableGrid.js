import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { isEmpty } from "lodash";
import Loader from "../../../../components/Loader";
import { useTranslation } from "react-i18next";

const TableGrid = (props) => {
  const { t } = useTranslation();

  const {
    personnelData,
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
    take: pageSize,
    skip: 0,
    total: totalElement,
  };
  const [dataState, setDataState] = useState(initialDataState);
  const [sortDir, setSortDir] = useState(false);
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    setDataState({ ...dataState, take: pageSize, total: totalElement });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, totalElement]);

  if (refresh) {
    return <Loader />;
  }

  const noOfPages = Math.ceil(totalElement / pageSize);

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  const endCount = end > totalElement ? `- ${totalElement}` : `- ${end}`;

  let perosnnelGrid =
    personnelData &&
    Object.keys(personnelData[0]).filter((item, i) => {
      return !(
        item === "Personnel_Id" ||
        item === "Sku_Code" ||
        item === "Location_Code"
      );
    });

  return (
    <div className="tablegrid">
      {!isEmpty(personnelData) ? (
        <>
          <Grid
            pageable={false}
            sortable={false}
            resizable={true}
            data={
              !isEmpty(personnelData) ? process(personnelData, dataState) : null
            }
            {...dataState}
            onDataStateChange={(e) => {
              setDataState(e.dataState);
            }}
          >
            {perosnnelGrid?.map((item) => {
              return (
                <Column
                  title={t(`${item}`)}
                  field={item}
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
            })}
          </Grid>

          <div className="tablegrid_pagination">
            <div
              className="k-pager k-widget k-grid-pager"
              role="application"
              aria-roledescription="pager"
            >
              <a
                href="/#"
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
              </a>
              <a
                href="/#"
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
              </a>
              <div className="k-pager-numbers-wrap">
                <ul className="k-pager-numbers">
                  {Array.from(Array(noOfPages)).map((x, i) => {
                    return (
                      <li>
                        <a
                          role="button"
                          aria-label="undefined 1"
                          aria-current="true"
                          href="/#"
                          className={`k-link ${
                            pageIndex === i + 1 && "k-selected"
                          }`}
                          onClick={() => setPageIndex(i + 1)}
                        >
                          {i + 1}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <a
                href="/#"
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
              </a>
              <a
                href="/#"
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
              </a>
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
