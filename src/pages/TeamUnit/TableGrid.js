import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { Switch } from "@progress/kendo-react-inputs";
import "./tablegrid.scss";
import { isEmpty } from "lodash";
import { Button } from "@progress/kendo-react-buttons";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ActivateModal from "../../components/ActivateModal/ActivateModal";
import { EDIT_TEAM_UNIT } from "../../store/Types";

const TableGrid = (props) => {
  const { rowLength, teamDetail, searchField } = props;

  const selectedNameBU = useSelector(
    (state) => state.TeamUnitReducer.selectedBU
  );

  const data = teamDetail;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialDataState = {
    sort: [
      {
        field: "name",
        dir: "asc",
      },
    ],
    take: rowLength,
    skip: 0,
  };

  const [dataState, setDataState] = useState(initialDataState);
  const [resultClient, setResultClient] = useState([]);
  const [isActive, SetIsActive] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setDataState({ ...dataState, take: rowLength });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowLength]);

  const handleActiveToggle = (active, e) => {
    SetIsActive(active);
    setVisible(true);
  };

  useEffect(() => {
    if (searchField) {
      setDataState({ ...dataState, skip: 0 });
      const filtereddata =
        data &&
        data.filter((team) => {
          return team.name.toLowerCase().includes(searchField.toLowerCase());
        });

      setResultClient(filtereddata);
    } else {
      setResultClient(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField, data]);

  const onEditClick = (team) => {
    dispatch({
      type: "teams/selectedTeamSlice",
      payload: team,
    });

    setTimeout(() => {
      navigate("/teamview/editteam");
    }, 1000);
  };

  const handleClick = () => {
    const editedTeam = {
      ...isActive,
      business_unit: selectedNameBU.id,
    };

    if (isActive.is_active) {
      const deactivatedTeam = { ...editedTeam, is_active: false };

      dispatch({ type: EDIT_TEAM_UNIT, payload: deactivatedTeam });
      setVisible(!visible);
    } else {
      const activatedTeam = { ...editedTeam, is_active: true };
      dispatch({ type: EDIT_TEAM_UNIT, payload: activatedTeam });
      setVisible(!visible);
    }
  };

  const filteredTeamList = [];

  !isEmpty(resultClient) && resultClient.forEach((element) => {
    if (element.business_unit !== null) {
      filteredTeamList.push(element);
    }
  });

  return (
    <div className="tablegrid">
      <ActivateModal
        active={isActive}
        open={visible}
        setOpen={setVisible}
        handleClick={handleClick}
      />
      {!isEmpty(filteredTeamList) ? (
        <Grid
          pageable={true}
          sortable={true}
          data={process(filteredTeamList, dataState)}
          {...dataState}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
        >
          <Column
            field="name"
            title="Team Name"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="email"
            title="Team Email Id"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="user_count"
            title="Number Of Users"
            headerClassName="tablegrid-heading"
          />
          <Column
            field="business_unit.name"
            title="BU"
            headerClassName="tablegrid-heading"
          />
          <Column
            field=""
            title="View"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Button
                      className="btnteam"
                      style={{ background: "primary" }}
                      // onClick={() => onViewClick(obj)}
                    >
                      View
                    </Button>
                  </span>
                </td>
              );
            }}
          />

          <Column
            field="is_active"
            title="Activate/Deactivate"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Switch
                      onLabel={""}
                      offLabel={""}
                      checked={props.dataItem.is_active}
                      onChange={(e) => handleActiveToggle(props.dataItem, e)}
                    />
                  </span>
                </td>
              );
            }}
          />
          <Column
            title="Edit"
            headerClassName="tablegrid-heading"
            cell={(props) => {
              const team = props.dataItem;
              return (
                <td className="tablegrid-switch">
                  <span>
                    <Button
                      style={{ background: "primary" }}
                      onClick={() => onEditClick(team)}
                    >
                      <EditIcon className="editteam" />
                    </Button>
                  </span>
                </td>
              );
            }}
          />
        </Grid>
      ) : (
        <>No records found</>
      )}
    </div>
  );
};

export default TableGrid;
