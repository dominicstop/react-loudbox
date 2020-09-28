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

import { ROUTES, ROUTES_HOME } from 'constants/Routes';


// lazy import pages -----------------------------------------------------
const ProfilePage     = LazyPreload(() => import('pages/ProfilePage'    ));
const HomePage        = LazyPreload(() => import('pages/HomePage'       ));
const GroupsPage      = LazyPreload(() => import('pages/GroupsPage'     ));
const JobsPage        = LazyPreload(() => import('pages/JobsPage'       ));
const BidsPage        = LazyPreload(() => import('pages/BidsPage'       ));
const FileManagerPage = LazyPreload(() => import('pages/FileManagerPage'));
const CalendarPage    = LazyPreload(() => import('pages/CalendarPage'   ));
const SettingsPage    = LazyPreload(() => import('pages/SettingsPage'   ));


// register pages to programtically preload later
PreloadPages.registerPages([
  { key: ROUTES_HOME.PROFILE     , pageComp: ProfilePage     },
  { key: ROUTES_HOME.HOME        , pageComp: HomePage        },
  { key: ROUTES_HOME.GROUPS      , pageComp: GroupsPage      },
  { key: ROUTES_HOME.JOBS        , pageComp: JobsPage        },
  { key: ROUTES_HOME.BIDS        , pageComp: BidsPage        },
  { key: ROUTES_HOME.FILE_MANAGER, pageComp: FileManagerPage },
  { key: ROUTES_HOME.CALENDAR    , pageComp: CalendarPage    },
  { key: ROUTES_HOME.SETTINGS    , pageComp: SettingsPage    },
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
    return (
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
        <Route component={NotFoundPage}>
          <Redirect to={'/'}/>
        </Route>
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

    return((location?.pathname === ROUTES.DASHBOARD)?(
      // redirect to a default selected sidebar item
      // so something is selected on the sidebar
      <Redirect to={ROUTES_HOME.HOME}/>
    ):(
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
    ));
  };
};