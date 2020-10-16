import React from "react";
import Header from "./common/Header";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import CoursesPage1 from "./CoursesPage1";
import AboutPage from "./AboutPage";
import PageNotFound from "./PageNotFound";
import ManageCoursePage from "./ManageCoursePage";
import { ToastContainer } from "react-toastify";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "../redux/configureStore";

const store = configureStore();

const App = () => {
  return (
    <div className="container-fluid">
      {/* Add Toast Container here and call `toast.success()` from anywhere in your app. */}
      <ReduxProvider store={store}>
        <ToastContainer autoClose={3000} hideProgressBar />
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/courses" component={CoursesPage1} />
          <Route path="/about" component={AboutPage} />
          <Redirect from="/about-page" to="/about" />
          <Route path="/course/:slug" component={ManageCoursePage} />
          <Route path="/course" component={ManageCoursePage} />
          <Route component={PageNotFound} />
        </Switch>
      </ReduxProvider>
    </div>
  );
};

export default App;
