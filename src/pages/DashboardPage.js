import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Switch, Route, Redirect } from "react-router-dom";

import { HomePageSideBar      } from 'components/HomePage/HomePageSidebar';
import { HomePageSidebarItems } from 'components/HomePage/HomePageConstants';

import { LazyPreload  } from 'functions/LazyPreload';
import { PreloadPages } from 'functions/PreloadPages';

import { ROUTES, ROUTES_HOME } from 'constants/Routes';


// lazy import pages -----------------------------------------------------
const ProfilePage     = LazyPreload(() => import('pages/ProfilePage'    ));
const HomePage        = LazyPreload(() => import('pages/HomePage'       ));
const GroupsPage      = LazyPreload(() => import('pages/GroupsPage'     ));
const JobsPage        = LazyPreload(() => import('pages/JobsPage'       ));
const BidsPage        = LazyPreload(() => import('pages/BidsPage'       ));
const FileManagerPage = LazyPreload(() => import('pages/FileManagerPage'));
const CalendarPage    = LazyPreload(() => import('pages/CalendarPage'   ));

// register pages to programtically preload later
PreloadPages.registerPages([
  { key: ROUTES_HOME.ProfilePage , pageComp: ProfilePage     },
  { key: ROUTES_HOME.HOME        , pageComp: HomePage        },
  { key: ROUTES_HOME.GROUPS      , pageComp: GroupsPage      },
  { key: ROUTES_HOME.JOBS        , pageComp: JobsPage        },
  { key: ROUTES_HOME.BIDS        , pageComp: BidsPage        },
  { key: ROUTES_HOME.FILE_MANAGER, pageComp: FileManagerPage },
  { key: ROUTES_HOME.CALENDAR    , pageComp: CalendarPage    },
]);


export default class DashboardPage extends React.Component {
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

  render(){
    const { styles } = DashboardPage;
    const { location } = this.props;


    return((location?.pathname === ROUTES.DASHBOARD)?(
      // redirect to default selected sidebar item
      // so something is selected on the sidebar
      <Redirect to={ROUTES_HOME.HOME}/>
    ):(
      <div className={css(styles.rootContainer)}>
        <HomePageSideBar
          sidebarItems={HomePageSidebarItems}
          onClickSidebarItem={this._handleOnClickSidebarItem}
          {...{location}}
        />
        <div className={css(styles.contentContainer)}>
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
          </Switch>
        </div>
      </div>
    ));
  };
};