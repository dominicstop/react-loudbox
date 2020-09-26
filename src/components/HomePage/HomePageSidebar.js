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
    hidden: {
      width: HomePageConstants.drawerClosedWidth,
      translateX: -HomePageConstants.drawerClosedWidth,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    closed: {
      translateX: 0,
      opacity: 1,
      width: HomePageConstants.drawerClosedWidth,
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
      position: 'relative',
      backgroundColor: Colors.BLACK[900],
      overflow: 'hidden',
    },
    sidebarIndicator: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: HomePageConstants.drawerClosedWidth,
      backgroundColor: Colors.BLUE[900],
    },
  });

  constructor(props){
    super(props);

    this.state = {
      isSidebarOpen   : false,
      selectedIndex   : 1    ,
      selectedRoute   : ROUTES_HOME.HOME,
      mountDrawerItems: false,
    };

    this.animationContolsDrawer = new AnimationControls();
    this.animationContolsDrawerIndicator = new AnimationControls();
  };

  async componentDidMount(){
    this.animationContolsDrawer.mount();
    this.animationContolsDrawerIndicator.mount();

    // animate in the sidebar
    await this.animationContolsDrawer.start('closed');
    // show sidebar items
    this.setState({mountDrawerItems: true});

    await Helpers.timeout(1500);
    this.showSidebarIndicator();
  };

  showSidebarIndicator = () => {
    const { selectedRoute } = this.state;
    const ref = this[`${selectedRoute}-SidebarItem`];

    // guard: early exit if ref is null 
    // or if there isnt a selected route
    if(!ref || !ref.measure || !selectedRoute) return;

    const { y } = ref.measure();
    this.animationContolsDrawerIndicator.start({
      translateY: y
    });
  };

  componentWillUnmount(){
    this.animationContolsDrawer.unmount();
    this.animationContolsDrawerIndicator.unmount();
  };

  _handleOnSidebarItemSelected = (params) => {
    this.setState({
      selectedIndex: params.selectedIndex,
      selectedRoute: params.selectedRoute,
    });

    const ref = this[`${params.selectedRoute}-SidebarItem`];
    const { y } = ref.measure();

    this.animationContolsDrawerIndicator.start({
      translateY: y
    });
  };

  /** render the sidebar items */
  _renderSidebarItems(){
    const { isSidebarOpen, ...state } = this.state;

    // guard: dont render until state change
    if(!state.mountDrawerItems) return null;
     
    return SidebarItems.map((item, index) => (
      <HomePageSidebarItem
        key={`${item.route}-sidebarItem`}
        ref={r => this[`${item.route}-SidebarItem`] = r}
        selectedIndex={state.selectedIndex}
        selectedRoute={state.selectedRoute}
        onItemSelected={this._handleOnSidebarItemSelected}
        itemsTotal={SidebarItems.length}
        {...{index, isSidebarOpen}}
        {...item}
      />
    ));
  };

  render(){
    const { styles } = HomePageSideBar;
    const { isSidebarOpen } = this.state;

    return(
      <motion.nav
        className={css(styles.sideBarContainer)}
        initial={'hidden'}
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
        <motion.div
          className={css(styles.sidebarIndicator)}
          initial={{translateY: -HomePageConstants.drawerClosedWidth}}
          animate={this.animationContolsDrawerIndicator}
        />
        {this._renderSidebarItems()}
      </motion.nav>
    );
  };
};