import React from "react";
import Navbar from "./components/MainNavbar";
import ChildNavbar from "./components/ChildNavbar";
import LoginPage from "./views/LoginPage";
import EVClient from "./helpers/evclient.js";

const evclient = new EVClient();

class App extends React.Component {
  store = evclient.setStore();
  state = {
    views: [{ view: "ClientList", params: {} }],
    navbarParams: {
      visible: true,
      title: "TlaCrm"
    }
  };

  componentDidMount() {
    if (this.store.getItem("app-views")) {
      const views = JSON.parse(this.store.getItem("app-views"));
      this.setState({ views });
    } else {
      this.setOnStore(this.state.views);
    }
  }

  setOnStore = views => {
    const _views = JSON.stringify(views);
    this.store.setItem("app-views", _views);
    this.setState({ views });
  };

  setNavigation() {
    return {
      go: (view = "", params = {}) => {
        const __view = { view, params };
        this.state.views.push(__view);
        this.setOnStore(this.state.views);
      },
      goMain: () => {
        const v = [this.state.views[0]];
        this.setOnStore(v);
      },
      switchView: (view = "", params = {}) => {
        const __view = [{ view, params }];
        this.setOnStore(__view);
      },
      getParams() {
        const views = JSON.parse(evclient.setStore().getItem("app-views"));
        const index = views.length - 1;
        const { params } = views[index];
        return params;
      },
      goBack: () => {
        const { views } = this.state;
        views.pop();
        this.setOnStore(views, {});
      }
    };
  }

  render() {
    const { views, navbarParams } = this.state;
    const index = views.length - 1;
    const View = React.lazy(() => import("./views/" + views[index].view));

    /*
    Check if it is parent o child
  */
    let Bar;
    if (index === 0) {
      Bar = Navbar;
    } else {
      Bar = ChildNavbar;
    }

    const navigation = this.setNavigation();
    const MainView = () => (
      <>
        <Bar navigation={navigation} params={navbarParams} />
        <View navigation={navigation} />
      </>
    );
    return (
      <React.Suspense fallback={<div className="loading">Loading...</div>}>
        {evclient.isAuth() ? <MainView /> : <LoginPage />}
      </React.Suspense>
    );
  }
}

export default App;
