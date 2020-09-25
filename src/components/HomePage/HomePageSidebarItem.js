import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import { motion, AnimationControls } from "framer-motion";
import * as Helpers from 'functions/helpers';

import AuthStore from 'functions/AuthStore';

import * as Colors from 'constants/Colors';
import { ROUTES_HOME } from 'constants/Routes';
import { HomePageConstants } from './HomePageConstants';


/** Sidebar Item in the `HomepageSidebar`
 * - Displays an Icon + Label
 */
export class HomePageSidebarItem extends React.PureComponent {
  static propTypes = {
    label        : PropTypes.string,
    index        : PropTypes.number,
    itemsTotal   : PropTypes.number,
    isSidebarOpen: PropTypes.bool  ,
  };

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 12,
      paddingBottom: 12,
    },
    leftIconContainer: {
      display: 'flex',
      minWidth : HomePageConstants.drawerIconSize,
      minHeight: HomePageConstants.drawerIconSize,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
    },
    icon: {
      width: 30,
      height: 30,
      backgroundColor: 'green',
      borderRadius: '100%',
    },
    rightContainer: {
      flex: 1,
      display: 'flex',
      whiteSpace: 'nowrap',
      backgroundColor: 'pink',
      alignItems: 'center',
      padding: 10,
    },
  });

  render(){
    const { styles } = HomePageSidebarItem;
    const props = this.props;

    const percentage = ((props.index + 1) / props.itemsTotal);
    const duration = Helpers.lerp(0.15, 0.7, percentage);

    return (
      <div className={css(styles.rootContainer)}>
        <div className={css(styles.leftIconContainer)}>
          <div className={css(styles.icon)}/>
        </div>
        <div className={css(styles.rightContainer)}>
          <motion.label
            initial={'hidden'}
            animate={props.isSidebarOpen? 'visible' : 'hidden'}
            variants={VARIANTS.label}
            transition={{ duration, delay: 0.1 }}
          >
            {props.label}
          </motion.label>
        </div>
      </div>
    );
  };
};

const VARIANTS = {
  label: {
    hidden: {
      opacity: 0,
      translateY: 10,
      transition: { duration: 0 }
    },
    visible: {
      opacity: 1,
      translateY: 0,
    },
  },
};