import React from 'react';

import SVG from 'react-inlinesvg';
import { ROUTES_HOME } from 'constants/Routes';


export const HomePageConstants = {
  drawerClosedWidth: 50,
  drawerItemHeight : 65,
  drawerIconSize   : 25,
};

export const HomePageSidebarItems = [{
    route: ROUTES_HOME.PROFILE,
    label: 'Profile',
    iconActive  : null,
    iconInactive: null,
  }, {
    route: ROUTES_HOME.HOME,
    label: 'Home',
    iconActive  : <SVG src={require('assests/ionicons/home.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.GROUPS,
    label: 'Groups',
    iconActive  : <SVG src={require('assests/ionicons/people.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.JOBS,
    label: 'Jobs',
    iconActive  : <SVG src={require('assests/ionicons/briefcase.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/briefcase-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.BIDS,
    label: 'Bids',
    iconActive  : <SVG src={require('assests/ionicons/pricetag.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/pricetag-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.FILE_MANAGER,
    label: 'File Manager',
    iconActive  : <SVG src={require('assests/ionicons/folder.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/folder-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.CALENDAR,
    label: 'Calendar',
    iconActive  : <SVG src={require('assests/ionicons/calendar.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/calendar-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.SETTINGS,
    label: 'Settings',
    iconActive  : <SVG src={require('assests/ionicons/settings.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/settings-outline.svg')}/>,
  },
];

export const HomePageSidebarItemsAdmin = [{
    route: ROUTES_HOME.PROFILE,
    label: 'Profile',
    iconActive  : null,
    iconInactive: null,
  }, {
    route: ROUTES_HOME.HOME,
    label: 'Home',
    iconActive  : <SVG src={require('assests/ionicons/home.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.GROUPS,
    label: 'Users',
    iconActive  : <SVG src={require('assests/ionicons/people.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.JOBS,
    label: 'Jobs',
    iconActive  : <SVG src={require('assests/ionicons/briefcase.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/briefcase-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.FILE_MANAGER,
    label: 'File Manager',
    iconActive  : <SVG src={require('assests/ionicons/folder.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/folder-outline.svg')}/>,
  }, {
    route: ROUTES_HOME.SETTINGS,
    label: 'Settings',
    iconActive  : <SVG src={require('assests/ionicons/settings.svg'        )}/>,
    iconInactive: <SVG src={require('assests/ionicons/settings-outline.svg')}/>,
  },
];