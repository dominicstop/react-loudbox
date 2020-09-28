import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Switch, Route, Redirect } from "react-router-dom";
import { motion, AnimationControls } from "framer-motion";

import { DashboardPageSideBar } from 'components/DashboardPage/DashboardPageSideBar';
import { DashboardSidebarItems, DashboardSidebarItemsAdmin } from 'components/DashboardPage/DashboardPageConstants';

import { AuthContext  } from 'contexts/AuthContext';
import { LoadingPage  } from './LoadingPage';
import   NotFoundPage   from './NotFoundPage';

import { AuthStoreData } from 'functions/AuthStore';
import { LazyPreload   } from 'functions/LazyPreload';
import { PreloadPages  } from 'functions/PreloadPages';

import { ROUTES, ROUTES_DASHBOARD, ROUTES_DASHBOARD_ADMIN } from 'constants/Routes';
import { DashboardNavBar } from 'components/DashboardNavBar';


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
  // user routes --------------------------------------------------
  { key: ROUTES_DASHBOARD.PROFILE     , pageComp: ProfilePage     },
  { key: ROUTES_DASHBOARD.HOME        , pageComp: HomePage        },
  { key: ROUTES_DASHBOARD.GROUPS      , pageComp: GroupsPage      },
  { key: ROUTES_DASHBOARD.JOBS        , pageComp: JobsPage        },
  { key: ROUTES_DASHBOARD.BIDS        , pageComp: BidsPage        },
  { key: ROUTES_DASHBOARD.FILE_MANAGER, pageComp: FileManagerPage },
  { key: ROUTES_DASHBOARD.CALENDAR    , pageComp: CalendarPage    },
  // admin routes -----------------------------------------------------------
  { key: ROUTES_DASHBOARD_ADMIN.HOME        , pageComp: AdminHomePage       },
  { key: ROUTES_DASHBOARD_ADMIN.USERS       , pageComp: AdminUserManagePage },
  { key: ROUTES_DASHBOARD_ADMIN.JOBS        , pageComp: AdminJobManagePage  },
  { key: ROUTES_DASHBOARD_ADMIN.FILE_MANAGER, pageComp: AdminFileManagePage },
  { key: ROUTES_DASHBOARD_ADMIN.SETTINGS    , pageComp: AdminSettingsPage   },
]);


export default class DashboardPage extends React.Component {
  static contextType = AuthContext;

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
    rightContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'hidden',
    },
    contentContainer: {
      maxHeight: 'inherit',
      maxWidth: 'inherit',
      overflow: 'hidden',
    },
  });

  constructor(props){
    super(props);

    this.animationContolsContentContainer = new AnimationControls();
  };

  componentDidMount(){
    this.animationContolsContentContainer.mount();
  };

  componentWillUnmount(){
    this.animationContolsContentContainer.unmount();
  };

  _handleOnClickSidebarItem = async (params) => {
    const { selectedIndex, selectedRoute } = params;
    const { history } = this.props;

    // get the prev selected route + index
    const prevSelected = this.sidebarRef.getSelectedItem();

    // guard: early exit if the same route
    if(prevSelected.selectedRoute == selectedRoute) return;

    const [entrance, exit] = ((prevSelected.selectedIndex > selectedIndex)
      ? ['transUpEntrance'  , 'transUpExit'  ]
      : ['transDownEntrance', 'transDownExit']
    );

    await Promise.all([
      PreloadPages.preloadPage(selectedRoute),
      this.animationContolsContentContainer.start(exit),
    ]);

    await history.push(selectedRoute, {});
    this.animationContolsContentContainer.start(entrance);
  };

  _renderRoutes(){
    return(
      <Switch>
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.PROFILE}
          component={ProfilePage}
        />
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.HOME}
          component={AdminHomePage}
        />
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.USERS}
          component={AdminUserManagePage}
        />
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.JOBS}
          component={AdminJobManagePage}
        />
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.FILE_MANAGER}
          component={AdminFileManagePage}
        />
        <Route 
          path={ROUTES_DASHBOARD_ADMIN.SETTINGS}
          component={AdminSettingsPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.PROFILE}
          component={ProfilePage}
        />
        <Route 
          path={ROUTES_DASHBOARD.HOME}
          component={HomePage}
        />
        <Route 
          path={ROUTES_DASHBOARD.GROUPS}
          component={GroupsPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.JOBS}
          component={JobsPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.BIDS}
          component={BidsPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.FILE_MANAGER}
          component={FileManagerPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.CALENDAR}
          component={CalendarPage}
        />
        <Route 
          path={ROUTES_DASHBOARD.SETTINGS}
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
    const { loginResponse } = this.context;

    const sidebarItems = (loginResponse?.user?.isAdmin
      ? DashboardSidebarItemsAdmin
      : DashboardSidebarItems
    );

    // redirect to a default selected sidebar item
    // so something is selected on the sidebar
    switch (location?.pathname) {
      case ROUTES.DASHBOARD: return (
        <Redirect to={ROUTES_DASHBOARD.HOME}/>
      ); 
      case ROUTES.DASHBOARD_ADMIN: return(
        <Redirect to={ROUTES_DASHBOARD_ADMIN.HOME}/>
      ); 
      default: return(
        <div className={css(styles.rootContainer)}>
          <DashboardPageSideBar
            ref={r => this.sidebarRef = r}
            onClickSidebarItem={this._handleOnClickSidebarItem}
            {...{location, sidebarItems}}
          />
          <div className={css(styles.rightContainer)}>
            <DashboardNavBar/>
            <React.Suspense fallback={<LoadingPage/>}>
              <motion.div 
                className={css(styles.contentContainer)}
                variants={VARIANTS.contentContainer}
                animate={this.animationContolsContentContainer}
              >
                {this._renderRoutes()}
              </motion.div>
            </React.Suspense>
          </div>
        </div>
      );
    };
  };
};

const TRANS_DISTANCE = 20;

const VARIANTS = {
  contentContainer: {
    transUpEntrance: {
      opacity: 1,
      translateY: [TRANS_DISTANCE, 0],
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    transUpExit: {
      opacity: 0,
      translateY: [0, -TRANS_DISTANCE],
      transition: { duration: 0.2, ease: 'easeIn' },
    },
    transDownEntrance: {
      opacity: 1,
      translateY: [-TRANS_DISTANCE, 0],
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    transDownExit: {
      opacity: 0,
      translateY: [0, TRANS_DISTANCE],
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  },
};