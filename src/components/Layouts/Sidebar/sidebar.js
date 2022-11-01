import React from "react";
// import "../../../style/sidebar.css";
import ScaiIcon from "../../../assets/3sc.png";

// import { Grid } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";
import "./sidebar.scss";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [open1, setOpen1] = useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <div>
      <header />
      {/* <Grid container spacing={2}>
      <Grid item xs={12} md={2}> */}
      <List
        className="sidebar"
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <img src={ScaiIcon} alt="3SC Icon" />
          </ListSubheader>
        }
      >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <Link href="/ifba/snoppage" underline="none">
            <ListItemText primary="S&OP" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link href="" underline="none">
            <ListItemText primary="Demand Analytics" />
          </Link>
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Entities Data" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                {" "}
                <ListItemText primary="Product" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                <ListItemText primary="Location" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                {" "}
                <ListItemText primary="Network" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                {" "}
                <ListItemText primary="Personal" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick1}>
          <ListItemText primary="Transaction Data" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                {" "}
                <ListItemText primary="Actual Sales History" />
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="" underline="none">
                <ListItemText primary="Feature" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      {/* </Grid>

    </Grid> */}
    </div>
  );
};

export default Sidebar;
