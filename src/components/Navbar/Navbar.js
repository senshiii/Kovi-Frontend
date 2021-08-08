import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar
      style={{
        height: "10vh",
        position: 'relative'
      }}
    >
      <Toolbar style={{ height: "100%" }}>
        <Typography variant="h4">Kovi</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
