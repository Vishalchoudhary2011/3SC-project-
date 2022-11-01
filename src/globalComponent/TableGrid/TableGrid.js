import React from 'react'
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid'
import { process } from '@progress/kendo-data-query'
import { Switch } from '@progress/kendo-react-inputs'

import './tablegrid.scss'

const TableGrid = () => {
  const initialDataState = {
    sort: [
      {
        field: 'code',
        dir: 'asc',
      },
    ],
    take: 10,
    skip: 0,
  }

  const [dataState, setDataState] = React.useState(initialDataState)

  const products = [
    {
      clientID: '3SC Client001',
      clientName: 'Panasonic',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'Active',
      activateToggle: true,
    },
    {
      clientID: '3SC Client002',
      clientName: 'Healthium',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'Active',
      activateToggle: true,
    },
    {
      clientID: '3SC Client003',
      clientName: 'Kohler',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'InActive',
      activateToggle: false,
    },
    {
      clientID: '3SC Client003',
      clientName: 'Kohler',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'InActive',
      activateToggle: false,
    },
    {
      clientID: '3SC Client003',
      clientName: 'Kohler',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'InActive',
      activateToggle: false,
    },
    {
      clientID: '3SC Client003',
      clientName: 'Kohler',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'InActive',
      activateToggle: false,
    },
    {
      clientID: '3SC Client003',
      clientName: 'Kohler',
      createdOn: '15 July 2022',
      modifiedOn: '19 July 2022',
      status: 'InActive',
      activateToggle: false,
    },
  ]

  // const ProductNameHeader = (props) => {
  //   return (
  //     <a className="tablegrid-heading" onClick={props.onClick}>
  //       <span>{props.title}</span>
  //       {props.children}
  //     </a>
  //   );
  // };

  return (
    <div className="tablegrid">
      {/* <Grid
        pageable={true}
        sortable={true}
        style={{
          height: '400px',
        }}
        data={process(products, dataState)}
        {...dataState}
        onDataStateChange={(e) => {
          setDataState(e.dataState)
        }}
      >
        
      </Grid> */}
    </div>
  )
}

export default TableGrid
