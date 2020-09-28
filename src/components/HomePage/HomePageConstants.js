import React from 'react';

import SVG from 'react-inlinesvg';
import { ROUTES_DASHBOARD, ROUTES_DASHBOARD_ADMIN } from 'constants/Routes';


export const HomePageConstants = {
  drawerClosedWidth: 50,
  drawerItemHeight : 65,
  drawerIconSize   : 25,
};

export const HomePageSidebarItems = [{
    route: ROUTES_DASHBOARD.PROFILE,
    label: 'Profile',
    iconActive  : null,
    iconInactive: null,
  }, {
    route: ROUTES_DASHBOARD.HOME,
    label: 'Home',
    iconActive  : <SVG src={require('assests/ionicons/home.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.GROUPS,
    label: 'Groups',
    iconActive  : <SVG src={require('assests/ionicons/people.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.JOBS,
    label: 'Jobs',
    iconActive  : <SVG src={require('assests/ionicons/briefcase.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/briefcase-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.BIDS,
    label: 'Bids',
    iconActive  : <SVG src={require('assests/ionicons/pricetag.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/pricetag-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.FILE_MANAGER,
    label: 'File Manager',
    iconActive  : <SVG src={require('assests/ionicons/folder.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/folder-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.CALENDAR,
    label: 'Calendar',
    iconActive  : <SVG src={require('assests/ionicons/calendar.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/calendar-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD.SETTINGS,
    label: 'Settings',
    iconActive  : <SVG src={require('assests/ionicons/settings.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/settings-outline.svg')}/>,
  },
];

export const HomePageSidebarItemsAdmin = [{
    route: ROUTES_DASHBOARD_ADMIN.PROFILE,
    label: 'Profile',
    iconActive  : null,
    iconInactive: null,
  }, {
    route: ROUTES_DASHBOARD_ADMIN.HOME,
    label: 'Home',
    iconActive  : <SVG src={require('assests/ionicons/home.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD_ADMIN.USERS,
    label: 'Users',
    iconActive  : <SVG src={require('assests/ionicons/people.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD_ADMIN.JOBS,
    label: 'Jobs',
    iconActive  : <SVG src={require('assests/ionicons/briefcase.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/briefcase-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD_ADMIN.FILE_MANAGER,
    label: 'File Manager',
    iconActive  : <SVG src={require('assests/ionicons/folder.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/folder-outline.svg')}/>,
  }, {
    route: ROUTES_DASHBOARD_ADMIN.SETTINGS,
    label: 'Settings',
    iconActive  : <SVG src={require('assests/ionicons/settings.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/settings-outline.svg')}/>,
  },
];