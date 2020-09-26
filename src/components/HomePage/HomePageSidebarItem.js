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
    route        : PropTypes.string ,
    label        : PropTypes.string ,
    index        : PropTypes.number ,
    itemsTotal   : PropTypes.number ,
    isSidebarOpen: PropTypes.bool   ,
    selectedIndex: PropTypes.number ,
    selectedRoute: PropTypes.string ,
    iconActive   : PropTypes.element,
    iconInactive : PropTypes.element,
    //
    onItemSelected: PropTypes.func
  };

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
    },
    leftIconContainer: {
      display: 'flex',
      minWidth : HomePageConstants.drawerIconSize,
      minHeight: HomePageConstants.drawerIconSize,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'red',
    },
    iconContainer: {
      display: 'flex',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 25,
    },
    iconMotion: {
      display: 'flex',
      position: 'absolute',
    },
    icon: {
      display: 'flex',
      height: 'auto',

      width: 30,
      height: 30,
    },
    rightContainer: {
      flex: 1,
      display: 'flex',
      whiteSpace: 'nowrap',
      alignItems: 'center',
      padding: 10,
    },
    label: {
      color: 'white',
      marginRight: 10,
    },
  });

  constructor(props){
    super(props);

    this.state = {
      iconLoadedActive  : false,
      iconLoadedInactive: false,
    };
  };

  _handleOnClickButton = () => {
    const { onItemSelected, ...props } = this.props;
    onItemSelected && onItemSelected({
      selectedIndex: props.index,
      selectedRoute: props.route,
    });
  };

  /** check props if it has icons */
  hasIcon(){
    const props = this.props;
    return(
      (props.iconActive   != null) &&
      (props.iconInactive != null)
    );
  };

  /** check if this is the one selected */
  isSelected(){
    const props = this.props;
    return(
      (props.selectedIndex == props.index) &&
      (props.selectedRoute == props.route)
    );
  };

  _renderProfile(){
    return(null);
  };

  _renderIcon(){
    const { styles } = HomePageSidebarItem;
    const props = this.props;
    const state = this.state;

    // guard: no icon
    if(!this.hasIcon()) return null;
  
    const sharedIconProps = {
      className: css(styles.icon),
      fill     : 'white',//iconColor,
      stroke   : 'white'//iconColor,
    };

    const iconsLoaded = (
      state.iconLoadedInactive &&
      state.iconLoadedActive
    );

    const isSelected = this.isSelected();

    const animations = {
      inactive: {
        opacity: (
          !iconsLoaded? 0 : 
          isSelected  ? 0 : 1
        ),
      },
      active: {
        opacity: (
          !iconsLoaded? 0 : 
          isSelected  ? 1 : 0
        ),
      },
    };

    const activeIcon = React.cloneElement(props.iconActive, {
      ...sharedIconProps,
      onLoad: () => { this.setState({ iconLoadedActive: true }) }
    });

    const inactiveIcon = React.cloneElement(props.iconInactive, {
      ...sharedIconProps,
      onLoad: () => { this.setState({ iconLoadedInactive: true }) }
    });

    return(
      <div className={css(styles.iconContainer)}>
        <motion.div
          className={css(styles.iconMotion)}
          animate={animations.active}
          initial={false}
        >
          {activeIcon}
        </motion.div>
        <motion.div
          className={css(styles.iconMotion)}
          animate={animations.inactive}
          initial={{ opacity: 0 }}
        >
          {inactiveIcon}
        </motion.div>
      </div>
    );
  };

  render(){
    const { styles } = HomePageSidebarItem;
    const props = this.props;

    const percentage = ((props.index + 1) / props.itemsTotal);
    const duration = Helpers.lerp(0.1, 0.6, percentage);

    const isProfile = (props.route === ROUTES_HOME.PROFILE);

    return (
      <motion.div
        className={css(styles.rootContainer)}
        onClick={this._handleOnClickButton}
        whileHover={{ scale: 1.07, backgroundColor: 'rgba(255,255,255,0.1)' }}
      >
        <motion.div className={css(styles.leftIconContainer)}>
          {isProfile
            ? this._renderProfile()
            : this._renderIcon()
          }
        </motion.div>
        <div className={css(styles.rightContainer)}>
          <motion.label
            className={css(styles.label)}
            initial={'hidden'}
            animate={props.isSidebarOpen? 'visible' : 'hidden'}
            variants={VARIANTS.label}
            transition={{ duration, delay: 0.1 }}
          >
            {props.label}
          </motion.label>
        </div>
      </motion.div>
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