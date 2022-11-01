import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ProductsLoader } from "../../pages/HomePage/products-loader";

import { loadMessages, LocalizationProvider } from "@progress/kendo-react-intl";
import { Translation } from "../../localization/translation";
import {
  intro,
  ProductName,
  Id,
  inStock,
  Price,
  messages,
} from "../../localization/languages";

const GridDataOData = (props) => {
  const [products, setProducts] = React.useState({
    data: [],
    total: 77,
  });
  const [dataState, setDataState] = React.useState({
    take: 10,
    skip: 0,
  });

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  const dataReceived = (newProducts) => {
    setProducts(newProducts);
  };
  const defaultMessages = {
    [intro]: "Welcome to Kendo React",
    [ProductName]: "Product Name",
    [Id]: "Identificación",
    [Price]: "precio",
    [inStock]: "en-stock",
  };
  loadMessages(messages["es"], "es");
  loadMessages(messages["hn"], "hn");
  loadMessages(messages["fr"], "fr");
  loadMessages(messages["en"], "en");

  return (
    <div>
      <LocalizationProvider language={props.language}>
        <div>
          <Translation
            messageKey={intro}
            defaultMessage={defaultMessages[intro]}
          />
        </div>
      </LocalizationProvider>
      <Grid
        filterable={true}
        sortable={true}
        pageable={true}
        {...dataState}
        data={products}
        onDataStateChange={dataStateChange}
      >
        <Column
          field="ProductID"
          filter="numeric"
          title={
            <LocalizationProvider language={props.language}>
              <div>
                <Translation
                  messageKey={Id}
                  defaultMessage={defaultMessages[Id]}
                />
              </div>
            </LocalizationProvider>
          }
        />
        <Column
          field="ProductName"
          title={
            <LocalizationProvider language={props.language}>
              <div>
                <Translation
                  messageKey={ProductName}
                  defaultMessage={defaultMessages[ProductName]}
                />
              </div>
            </LocalizationProvider>
          }
        />
        <Column
          field="UnitPrice"
          filter="numeric"
          format="{0:c}"
          title={
            <LocalizationProvider language={props.language}>
              <div>
                <Translation
                  messageKey={Price}
                  defaultMessage={defaultMessages[Price]}
                />
              </div>
            </LocalizationProvider>
          }
        />
        <Column
          field="UnitsInStock"
          filter="numeric"
          title={
            <LocalizationProvider language={props.language}>
              <div>
                <Translation
                  messageKey={inStock}
                  defaultMessage={defaultMessages[inStock]}
                />
              </div>
            </LocalizationProvider>
          }
        />
      </Grid>

      <ProductsLoader dataState={dataState} onDataReceived={dataReceived} />
    </div>
  );
};
export default GridDataOData;
