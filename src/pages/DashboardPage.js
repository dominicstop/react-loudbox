import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Switch, Route, Redirect } from "react-router-dom";

import { HomePageSideBar } from 'components/HomePage/HomePageSidebar';
import { HomePageSidebarItems, HomePageSidebarItemsAdmin } from 'components/HomePage/HomePageConstants';

import { AuthContext  } from 'contexts/AuthContext';
import { LoadingPage  } from './LoadingPage';
import   NotFoundPage   from './NotFoundPage';

import { AuthStoreData } from 'functions/AuthStore';
import { LazyPreload   } from 'functions/LazyPreload';
import { PreloadPages  } from 'functions/PreloadPages';

import { ROUTES, ROUTES_HOME, ROUTES_HOME_ADMIN } from 'constants/Routes';


// lazy import pages: User -----------------------------------------------
const ProfilePage     = LazyPreload(() => import('pages/ProfilePage'    ));
const HomePage        = LazyPreload(() => import('pages/HomePage'       ));
const GroupsPage      = LazyPreload(() => import('pages/GroupsPage'     ));
const JobsPage        = LazyPreload(() => import('pages/JobsPage'       ));
const BidsPage        = LazyPreload(() => import('pages/BidsPage'       ));
const FileManagerPage = LazyPreload(() => import('pages/FileManagerPage'));
const CalendarPage    = LazyPreload(() => import('pages/CalendarPage'   ));
const SettingsPage    = LazyPreload(() => import('pages/SettingsPage'   ));

// lazy import pages: Admin --------------------------------------------------
const AdminHomePage       = LazyPreload(() => import('pages/AdminHomePage'      ));
const AdminUserManagePage = LazyPreload(() => import('pages/AdminUserManagePage'));
const AdminJobManagePage  = LazyPreload(() => import('pages/AdminJobManagePage' ));
const AdminFileManagePage = LazyPreload(() => import('pages/AdminFileManagePage'));
const AdminSettingsPage   = LazyPreload(() => import('pages/AdminSettingsPage'  ));


// register pages to programtically preload later
PreloadPages.registerPages([
  // user routes ---------------------------------------------
  { key: ROUTES_HOME.PROFILE     , pageComp: ProfilePage     },
  { key: ROUTES_HOME.HOME        , pageComp: HomePage        },
  { key: ROUTES_HOME.GROUPS      , pageComp: GroupsPage      },
  { key: ROUTES_HOME.JOBS        , pageComp: JobsPage        },
  { key: ROUTES_HOME.BIDS        , pageComp: BidsPage        },
  { key: ROUTES_HOME.FILE_MANAGER, pageComp: FileManagerPage },
  { key: ROUTES_HOME.CALENDAR    , pageComp: CalendarPage    },
  // admin routes ------------------------------------------------------
  { key: ROUTES_HOME_ADMIN.HOME        , pageComp: AdminHomePage       },
  { key: ROUTES_HOME_ADMIN.USERS       , pageComp: AdminUserManagePage },
  { key: ROUTES_HOME_ADMIN.JOBS        , pageComp: AdminJobManagePage  },
  { key: ROUTES_HOME_ADMIN.FILE_MANAGER, pageComp: AdminFileManagePage },
  { key: ROUTES_HOME_ADMIN.SETTINGS    , pageComp: AdminSettingsPage   },
]);


export default class DashboardPage extends React.Component {
  static contextType = AuthContext;

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      //backgroundColor: 'blue'
    },
  });

  _handleOnClickSidebarItem = async (params) => {
    const { selectedIndex, selectedRoute } = params;
    const { history } = this.props;


    await Promise.all([
      PreloadPages.preloadPage(selectedRoute)
    ]);

    history.push(selectedRoute, {});
  };

  _renderRoutes(){
    /** @type {AuthStoreData} */
    const { loginResponse: { user }} = this.context;

    return user.isAdmin?(
      <Switch>
        <Route 
          path={ROUTES_HOME_ADMIN.PROFILE}
          component={ProfilePage}
        />
        <Route 
          path={ROUTES_HOME_ADMIN.HOME}
          component={AdminHomePage}
        />
        <Route 
          path={ROUTES_HOME_ADMIN.USERS}
          component={AdminUserManagePage}
        />
        <Route 
          path={ROUTES_HOME_ADMIN.JOBS}
          component={AdminJobManagePage}
        />
        <Route 
          path={ROUTES_HOME_ADMIN.FILE_MANAGER}
          component={AdminFileManagePage}
        />
        <Route 
          path={ROUTES_HOME_ADMIN.SETTINGS}
          component={AdminSettingsPage}
        />
        <Route component={NotFoundPage}/>
      </Switch>
    ):(
      <Switch>
        <Route 
          path={ROUTES_HOME.PROFILE}
          component={ProfilePage}
        />
        <Route 
          path={ROUTES_HOME.HOME}
          component={HomePage}
        />
        <Route 
          path={ROUTES_HOME.GROUPS}
          component={GroupsPage}
        />
        <Route 
          path={ROUTES_HOME.JOBS}
          component={JobsPage}
        />
        <Route 
          path={ROUTES_HOME.BIDS}
          component={BidsPage}
        />
        <Route 
          path={ROUTES_HOME.FILE_MANAGER}
          component={FileManagerPage}
        />
        <Route 
          path={ROUTES_HOME.CALENDAR}
          component={CalendarPage}
        />
        <Route 
          path={ROUTES_HOME.SETTINGS}
          component={SettingsPage}
        />
        <Route component={NotFoundPage}/>
      </Switch>
    );
  };

  render(){
    const { styles } = DashboardPage;
    const { location } = this.props;

    /** @type {AuthStoreData} */
    const { loginResponse: { user }} = this.context;

    const sidebarItems = (user?.isAdmin
      ? HomePageSidebarItemsAdmin
      : HomePageSidebarItems
    );

    // redirect to a default selected sidebar item
    // so something is selected on the sidebar
    switch (location?.pathname) {
      case ROUTES.DASHBOARD: return (
        <Redirect to={ROUTES_HOME.HOME}/>
      ); 
      case ROUTES.DASHBOARD_ADMIN: return(
        <Redirect to={ROUTES_HOME_ADMIN.HOME}/>
      ); 
      default: return (
        <div className={css(styles.rootContainer)}>
          <HomePageSideBar
            onClickSidebarItem={this._handleOnClickSidebarItem}
            {...{location, sidebarItems}}
          />
          <div className={css(styles.contentContainer)}>
            <React.Suspense fallback={<LoadingPage/>}>
              {this._renderRoutes()}
            </React.Suspense>
          </div>
        </div>
      );
    };
  };
};