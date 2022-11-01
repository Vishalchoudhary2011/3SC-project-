import  React from 'react';
import { GridColumnMenuSort, GridColumnMenuFilter, GridColumnMenuGroup } from '@progress/kendo-react-grid';
const ColumnMenu = props => {
  return <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter {...props} />
        <GridColumnMenuGroup {...props} />
      </div>;
};
export default ColumnMenu