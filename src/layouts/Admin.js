import React, { useEffect } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Sidebar from "commons/Sidebar/Sidebar";
import DemoNavbar from "commons/Navbars/DemoNavbar";
import Footer from "commons/Footer/Footer";
import routerAdmin from "routesAdmin";
import { ToastContainer, toast } from 'react-toastify';

let ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  return (
    <div className="wrapper">
      <Sidebar {...props} routerAdmin={routerAdmin} backgroundColor={backgroundColor} />
      <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </div>
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routerAdmin.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Admin;
