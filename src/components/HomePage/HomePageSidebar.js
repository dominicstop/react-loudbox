import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';


import { motion, AnimationControls } from "framer-motion"

import AuthStore from 'functions/AuthStore';

import * as Colors from 'constants/Colors';
import * as Helpers from 'functions/helpers';

import { ROUTES_HOME } from 'constants/Routes';

import { HomePageSidebarItem } from './HomePageSidebarItem';
import { HomePageConstants } from './HomePageConstants';


const SidebarItems = [
  {
    route: ROUTES_HOME.PROFILE,
    label: 'Profile',
  },
  {
    route: ROUTES_HOME.HOME,
    label: 'Home',
  },
  {
    route: ROUTES_HOME.GROUPS,
    label: 'Groups',
  },
  {
    route: ROUTES_HOME.JOBS,
    label: 'Jobs',
  },
  {
    route: ROUTES_HOME.BIDS,
    label: 'Bids',
  },
  {
    route: ROUTES_HOME.FILE_MANAGER,
    label: 'File Manager',

  },
  {
    route: ROUTES_HOME.CALENDAR,
    label: 'Calendar',
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
    };

    this.animationContolsDrawer = new AnimationControls();
  };

  componentDidMount(){
    this.animationContolsDrawer.mount();
  };

  componentWillUnmount(){
    this.animationContolsDrawer.unmount();
  };

  render(){
    const { styles } = HomePageSideBar;
    const { isSidebarOpen } = this.state;


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
            itemsTotal={SidebarItems.length}
            {...{index, isSidebarOpen}}
            {...item}
          />
        ))}
      </motion.nav>
    );
  };
};