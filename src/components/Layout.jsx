import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dashboard, Business, Work, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Root = styled("div")(({ theme }) => ({
  display: "flex",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const MToolbar = styled(Toolbar)(({ theme }) => theme.mixins.toolbar);

const Layout = ({ children }) => {
  return (
    <Root>
      <StyledAppBar position="fixed">
        <MToolbar>
          <Typography variant="h6" noWrap>
            Job Board Admin
          </Typography>
        </MToolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent">
        <MToolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/companies">
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItem>
          <ListItem button component={Link} to="/jobs">
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </StyledDrawer>
      <Content>
        <MToolbar />
        {children}
      </Content>
    </Root>
  );
};

export default Layout;
