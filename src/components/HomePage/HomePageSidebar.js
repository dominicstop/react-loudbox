import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls } from "framer-motion"

import AuthStore from 'functions/AuthStore';

import * as Colors from 'constants/Colors';
import * as Helpers from 'functions/helpers';

import { ROUTES_HOME } from 'constants/Routes';

import { HomePageSidebarItem } from './HomePageSidebarItem';
import { HomePageConstants } from './HomePageConstants';


const SidebarItems = [{
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
  },
];


const VARIANTS = {
  sidebar: {
    closed: {
      width: HomePageConstants.drawerIconSize,
    },
    open: {
      width: 'auto',
      transition: { duration: 0.25, ease: 'easeInOut' }
    },
  },
};


export class HomePageSideBar extends React.Component {
  static styles = StyleSheet.create({
    sideBarContainer: {
      backgroundColor: Colors.BLACK[900],
      overflow: 'hidden',
    },
  });

  constructor(props){
    super(props);

    this.state = {
      isSidebarOpen: false,
      selectedIndex: null,
      selectedRoute: null,
    };

    this.animationContolsDrawer = new AnimationControls();
  };

  componentDidMount(){
    this.animationContolsDrawer.mount();
  };

  componentWillUnmount(){
    this.animationContolsDrawer.unmount();
  };

  _handleOnSidebarItemSelected = (params) => {
    this.setState({
      selectedIndex: params.selectedIndex,
      selectedRoute: params.selectedRoute,
    });
  };

  render(){
    const { styles } = HomePageSideBar;
    const { isSidebarOpen, ...state } = this.state;


    return(
      <motion.nav
        className={css(styles.sideBarContainer)}
        initial={'closed'}
        animate={this.animationContolsDrawer}
        variants={VARIANTS.sidebar}
      >
        <button 
          style={{ backgroundColor: 'orange', padding: 20 }}
          onClick={async () => {
            this.setState({isSidebarOpen: !isSidebarOpen});
            await this.animationContolsDrawer.start(isSidebarOpen? 'closed' : 'open');
            return;
            if(isSidebarOpen){
              await Promise.all([
                Helpers.timeout(500),
                Helpers.setStateAsync(this, {isSidebarOpen: false}),
              ]);

              await this.animationContolsDrawer.start('closed');
            } else {
              await this.animationContolsDrawer.start('open');
              this.setState({isSidebarOpen: true});
            };
          }}
        />
        {SidebarItems.map((item, index) => (
          <HomePageSidebarItem
            selectedIndex={state.selectedIndex}
            selectedRoute={state.selectedRoute}
            onItemSelected={this._handleOnSidebarItemSelected}
            itemsTotal={SidebarItems.length}
            {...{index, isSidebarOpen}}
            {...item}
          />
        ))}
      </motion.nav>
    );
  };
};