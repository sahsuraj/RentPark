import React, { Component } from "react";
import ReactTimeout from "react-timeout";
import Emitter from "./components/Services/EventEmitter";
import axios from "axios";

import { Router, Switch, Route, Redirect } from "react-router-dom";

import createHistory from "history/createBrowserHistory";

//Layouts

import FirstLayout from "../src/components/Layouts/FirstLayout";
import SecondLayout from "../src/components/Layouts/SecondLayout";
import ThirdLayout from "../src/components/Layouts/ThirdLayout";
import FourthLayout from "../src/components/Layouts/FourthLayout";
import FifthLayout from "../src/components/Layouts/FifthLayout";
import SixthLayout from "../src/components/Layouts/SixthLayout";
import SeventhLayout from "../src/components/Layouts/SeventhLayout";

// FirstLayout pages
import LandingPage from "../src/components/Home/LandingPage";

// Fourth Layout pages
import EditProfile from "./components/User/AccountSettings/EditProfile";

// Fifth layout pages
import Chat from "./components/User/TripDetails/Chat";

// Sixth layout pages
import Checkout from "./components/User/Payments/Checkout";

// Seventh layout pages

import BecomeAHost from "./components/Others/becomeAHost";
import Photo from "./components/User/AccountSettings/photo";
import Notification from "./components/User/AccountSettings/notification";
import UserPayment from "./components/User/AccountSettings/userPayment";
import ChangePassword from "./components/User/AccountSettings/changePassword";
import UserReview from "./components/User/AccountSettings/userReview";
import DeleteAccount from "./components/User/AccountSettings/deleteAccount";
import UserProfile from "./components/User/AccountSettings/userProfile";
import WishList from "./components/User/AccountSettings/wishlist";

import TripHistory from "./components/User/TripDetails/tripHistory";
import SingleHistory from "./components/User/TripDetails/singleHistory";

import Logout from "./components/Auth/logout";
import HostLayout from "./components/Host/HostLayout/hostLayout";
import HostEditProfile from "./components/Host/AccountSetting/EditProfile";
import HostNotification from "./components/Host/AccountSetting/hostNotification";
import HostPhoto from "./components/Host/AccountSetting/hostPhoto";
import HostProfile from "./components/Host/AccountSetting/hostProfile";
import HostChangePassword from "./components/Host/AccountSetting/changePassword";
import HostDeleteAccount from "./components/Host/AccountSetting/deleteAccount";
import HostReview from "./components/Host/AccountSetting/hostReview";
import HostLogout from "./components/Host/AccountSetting/hostLogout";
import Search from "./components/Home/search";
import { ToastProvider } from "react-toast-notifications";
import HostLogin from "./components/Host/Auth/login";
import HostAuthLayout from "./components/Host/HostLayout/hostAuthLayout";
import HostRegister from "./components/Host/Auth/register";
import HostForgotPassword from "./components/Host/Auth/forgotPassword";
import HostDashbaord from "./components/Host/RevenueDetails/dashboard";
import HostTransactionHistory from "./components/Host/RevenueDetails/transactionHistory";
import HostBookingManagement from "./components/Host/RevenueDetails/bookingManagement";
import HostSubscriptionHistory from "./components/Host/RevenueDetails/subscriptionHistory";
import HostSingleBookingDetails from "./components/Host/RevenueDetails/singleBookingDetails";
import HostSubscription from "./components/Host/RevenueDetails/subscriptions";
import HostSubscriptionInvoice from "./components/Host/Payments/hostSubInvoice";
import HostCard from "./components/Host/AccountSetting/hostCard";
import HostListingManagement from "./components/Host/RevenueDetails/listingManagement";
import HostSubPaySuccess from "./components/Host/RevenueDetails/subscriptionPaySuccess";
import { Elements, StripeProvider } from "react-stripe-elements";
import Inbox from "./components/User/TripDetails/inbox";
import HostInbox from "./components/Host/Messages/hostInbox";
import HostWithoutFooterLayout from "./components/Host/HostLayout/hostWithoutFooterLayout";

import HostSingleTripView from "./components/Host/RevenueDetails/singleTripView";
import HostBasicLayout from "./components/Host/HostLayout/hostBasicLayout";
import HostAddListing from "./components/Host/Listing/addListing";
import ProviderProfile from "./components/User/providerProfile";
import OtherUserProfile from "./components/User/otherUserProfile";
import StaticPage from "./components/Others/StaticPage";
import EditListing from "./components/Host/Listing/editListing";
import HostGallery from "./components/Host/Listing/gallery";
import HostAvailability from "./components/Host/Listing/availabilityCalendar";

import configuration from "react-global-configuration";

import configData from "./json/settings.json";
import HostChat from "./components/Host/RevenueDetails/hostChat";
import PaymentPage from "./components/Home/paymentPage";
import Vehicle from "./components/User/AccountSettings/vehicle";

import { apiConstants } from "./components/Constant/constants";
import { Helmet } from "react-helmet";
import SingleTripView from "./components/Home/singleTripView";
import HostDocumentVerification from "./components/Host/AccountSetting/documentVerification";

const history = createHistory();

const $ = window.$;
const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout screenProps={ScreenProps}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);
const HostPrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  host_authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      host_authentication === true ? (
        <Layout screenProps={ScreenProps}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: "/host/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const UserPrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  user_authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      user_authentication === true ? (
        <Layout screenProps={ScreenProps}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
class App extends Component {
  constructor(props) {
    super(props);

    // user_Authentication

    let userId = localStorage.getItem("userId");

    let providerId = localStorage.getItem("hostId");

    let accessToken = localStorage.getItem("accessToken");

    this.state = {
      loading: true,
      configLoading: true,
      user_authentication: userId && accessToken ? true : false,
      host_authentication: providerId && accessToken ? true : false
    };

    this.eventEmitter = new Emitter();

    history.listen((location, action) => {
      userId = localStorage.getItem("userId");
      providerId = localStorage.getItem("hostId");
      accessToken = localStorage.getItem("accessToken");

      // this.setState({ loading : true, user_authentication : userId && accessToken ? true : false});

      this.setState({ loading: true, user_authentication: true });
      this.setState({ loading: true, host_authentication: true });

      // this.loadingFn();

      document.body.scrollTop = 0;
    });

    this.fetchConfig();
  }

  async fetchConfig() {
    const response = await fetch(apiConstants.settingsUrl);
    console.log("respi", response);
    const configValue = await response.json();
    configuration.set({
      configData: configValue.data
    });
    this.setState({ configLoading: false });
  }

  loadingFn() {
    this.props.setTimeout(() => {
      this.setState({ loading: false });
    }, 3 * 1000);
  }

  loadConfigData() {}

  componentDidMount() {
    this.loadConfigData(); // Not used
  }
  componentWillMount() {
    // document.title = configData.data.site_name;
  }

  render() {
    const isLoading = this.state.configLoading;

    if (isLoading) {
      return (
        <div>
          <div className="wrapper">
            <div className="loader-warpper">
              <div id="loader">
                <ul>
                  <li>Parking spaces configuration Loding....</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>{configuration.get("configData.site_name")}</title>
          <link
            rel="icon"
            type="image/png"
            href={configuration.get("configData.site_icon")}
            sizes="16x16"
          />
        </Helmet>

        <ToastProvider>
          <Router history={history}>
            <Switch>
              {/*** Layout 1 - Transparent Fixed Header and Floating Footer ****/}

              <AppRoute
                exact
                path={"/"}
                component={LandingPage}
                layout={SeventhLayout}
                screenProps={this.eventEmitter}
              />

              <AppRoute
                path={"/page/:id"}
                component={StaticPage}
                layout={SeventhLayout}
                screenProps={this.eventEmitter}
              />

              {/*** Layout 2 - Transparent Fixed Header and Footer ****/}

              {/*** Layout 3 - Fixed Header and Floating Footer ****/}

              {/*** Layout 4 - Common Header and Footer ****/}

              <AppRoute
                path={"/profile/:id"}
                component={OtherUserProfile}
                layout={SeventhLayout}
                screenProps={this.eventEmitter}
              />

              {/*** Layout 5 - content and Header ****/}

              <AppRoute
                path={"/provider-profile/:id"}
                component={ProviderProfile}
                layout={SeventhLayout}
                screenProps={this.eventEmitter}
              />

              {/*** Layout 6 - content and Footer ****/}

              <AppRoute
                path={"/checkout"}
                component={Checkout}
                layout={SixthLayout}
                screenProps={this.eventEmitter}
              />

              {/*** Layout 7 - Header with sub section and footer ****/}

              <AppRoute
                path={"/search"}
                component={Search}
                layout={SeventhLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/payment"}
                component={PaymentPage}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/edit-profile"}
                component={EditProfile}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/photo"}
                component={Photo}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/trip/:id"}
                component={SingleTripView}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/single-trip/chat"}
                component={Chat}
                layout={FifthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/notification"}
                component={Notification}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/vehicles"}
                component={Vehicle}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/change-password"}
                component={ChangePassword}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/user-review"}
                component={UserReview}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/delete-account"}
                component={DeleteAccount}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/user-profile"}
                component={UserProfile}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/wishlist"}
                component={WishList}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />

              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/history"}
                component={TripHistory}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/history-details/:id"}
                component={SingleHistory}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/inbox"}
                component={Inbox}
                layout={FifthLayout}
                screenProps={this.eventEmitter}
              />

              <Route path={"/logout"} component={Logout} />

              {/* Host Routing */}

              <AppRoute
                path={"/host/login"}
                component={HostLogin}
                layout={HostAuthLayout}
                screenProps={this.eventEmitter}
              />
              <AppRoute
                path={"/host/register"}
                component={HostRegister}
                layout={HostAuthLayout}
                screenProps={this.eventEmitter}
              />

              <AppRoute
                path={"/host/forgot-password"}
                component={HostForgotPassword}
                layout={HostAuthLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/dashboard"}
                component={HostDashbaord}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/single/chat"}
                component={HostChat}
                layout={HostWithoutFooterLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/transaction-history"}
                component={HostTransactionHistory}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/booking-management"}
                component={HostBookingManagement}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/booking-details/:id"}
                component={HostSingleBookingDetails}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/subscriptions"}
                component={HostSubscription}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/invoice"}
                component={HostSubscriptionInvoice}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/subscription-history"}
                component={HostSubscriptionHistory}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/subscription/success"}
                component={HostSubPaySuccess}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/add-space"}
                component={HostAddListing}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/edit-space/:id"}
                component={EditListing}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/gallery/:id"}
                component={HostGallery}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/availability/:id"}
                component={HostAvailability}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/spaces"}
                component={HostListingManagement}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/single/:id"}
                component={HostSingleTripView}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/edit-profile"}
                component={HostEditProfile}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/notification"}
                component={HostNotification}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/photo"}
                component={HostPhoto}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/document-verification"}
                component={HostDocumentVerification}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/profile"}
                component={HostProfile}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/change-password"}
                component={HostChangePassword}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/delete-account"}
                component={HostDeleteAccount}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/review"}
                component={HostReview}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/inbox"}
                component={HostInbox}
                layout={HostWithoutFooterLayout}
                screenProps={this.eventEmitter}
              />

              <Route path={"/host/logout"} component={HostLogout} />

              <HostPrivateRoute
                host_authentication={this.state.host_authentication}
                path={"/host/payment"}
                exact={true}
                component={HostCard}
                layout={HostLayout}
                screenProps={this.eventEmitter}
              />
              <UserPrivateRoute
                user_authentication={this.state.user_authentication}
                path={"/user-payment"}
                component={UserPayment}
                layout={FourthLayout}
                screenProps={this.eventEmitter}
              />
              <AppRoute
                path={"/host"}
                component={BecomeAHost}
                layout={HostAuthLayout}
                screenProps={this.eventEmitter}
              />

              {/**
               *  For private route
               * <UserPrivateRoute user_authentication={this.state.user_authentication} path={"/subscriptions"} component={Subscription} layout={TwoColumnLayout} screenProps={this.eventEmitter}/>
               */}
            </Switch>
          </Router>
        </ToastProvider>
      </div>
    );
  }
}

export default ReactTimeout(App);
