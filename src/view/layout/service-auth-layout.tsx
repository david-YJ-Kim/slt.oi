import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import oiConstant from "../../oi-constant";
import {
  Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText,
  Box, AppBar, Toolbar, Typography, styled
} from "@mui/material";
import {
  Menu as MenuIcon, Home, Dashboard, Person, Search,
  ManageSearch, Store, Upload, Inventory, ShowChart,
  Assessment, Logout, ChevronLeft
} from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  backgroundColor: "#f5f5f5",
}));

export default function ServiceAuthLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('.MuiDrawer-paper') && !target.closest('.MuiIconButton-root')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const onLogout = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      auth.signOut();
      navigate("/");
      window.location.reload();
    }
  };

  const menuItems = [
    { text: "Go Home", icon: <Home />, path: "/" },
    { text: "Service Dashboard", icon: <Dashboard />, path: `${oiConstant.url.service.base}${oiConstant.url.service.dashboard}` },
    { text: "USGM Service", icon: <Assessment />, path: `${oiConstant.url.service.base}${oiConstant.url.service.usgmService}` },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Service Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={onLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  );
}