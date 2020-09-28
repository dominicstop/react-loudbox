import React, { Fragment, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import { motion } from "framer-motion";

import { ROUTES_DASHBOARD, ROUTES_DASHBOARD_ADMIN } from 'constants/Routes';
import { AuthStoreData } from 'functions/AuthStore';
import { AuthContext } from 'contexts/AuthContext';

import { DashboardConstants } from './DashboardConstants';

import * as Colors from 'constants/Colors';
import * as Helpers from 'functions/helpers';



/** Sidebar Item in the `HomepageSidebar`
 * - Displays an Icon + Label
 */
export class DashboardPageSidebarItem extends React.PureComponent {
  static propTypes = {
    route             : PropTypes.string ,
    label             : PropTypes.string ,
    index             : PropTypes.number ,
    itemsTotal        : PropTypes.number ,
    selectedIndex     : PropTypes.number ,
    selectedRoute     : PropTypes.string ,
    iconActive        : PropTypes.element,
    iconInactive      : PropTypes.element,
    isSidebarOpen     : PropTypes.bool   ,
    anchorLastToBottom: PropTypes.bool   ,
    //
    onItemSelected: PropTypes.func
  };

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: DashboardConstants.drawerItemHeight,
    },
    leftIconContainer: {
      display: 'flex',
      minWidth : DashboardConstants.drawerClosedWidth,
      minHeight: DashboardConstants.drawerClosedWidth,
      alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: 'red',
    },
    iconContainer: {
      display: 'flex',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconMotion: {
      display: 'flex',
      position: 'absolute',
      // disable tooltip
      pointerEvents: 'none',
    },
    icon: {
      display: 'flex',
      width : DashboardConstants.drawerIconSize,
      height: DashboardConstants.drawerIconSize,
    },
    iconProfileContainer: {
      display: 'flex',
      width : DashboardConstants.drawerIconSize + 5,
      height: DashboardConstants.drawerIconSize + 5,
      backgroundColor: Colors.ORANGE[900],
      borderRadius: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99,
    },
    iconProfileInitials: {
      fontWeight: 700,
      fontSize: 12,
      color: 'white',
      marginLeft: 1,
      marginBottom: 1,
    },
    rightContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      whiteSpace: 'nowrap',
      justifyContent: 'center',
      paddingLeft : 12,
      paddingRight: 17,
      zIndex: 99,
    },
    label: {
      color: 'white',
      fontSize: 15,
    },
    labelProfile: {
      maxWidth: 175,
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    labelProfileSubtitle: {
      color: 'white',
      fontSize: 14,
      marginTop: 3,
    },
    anchorBottom: {
      marginTop: 'auto'
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

  measure(){
    return this.rootContainerRef.getBoundingClientRect();
  };

  _renderIcon(){
    const { styles } = DashboardPageSidebarItem;
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
    const animate = (
      !iconsLoaded? 'hidden'  : 
      isSelected  ? 'selected': 'visible'
    );

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
          variants={VARIANTS.iconActive}
          initial={false}
          {...{animate}}
        >
          {activeIcon}
        </motion.div>
        <motion.div
          className={css(styles.iconMotion)}
          variants={VARIANTS.iconInactive}
          {...{animate}}
          initial={{ opacity: 0 }}
        >
          {inactiveIcon}
        </motion.div>
      </div>
    );
  };

  render(){
    const { styles } = DashboardPageSidebarItem;
    const props = this.props;

    const percentage = ((props.index + 1) / props.itemsTotal);
    const duration   = Helpers.lerp(0.1, 0.6, percentage);
    
    const isLast         = ((props.index + 1) >= props.itemsTotal);
    const anchorToBottom = (props.anchorLastToBottom && isLast);

    const isProfile = (
      (props.route === ROUTES_DASHBOARD      .PROFILE) ||
      (props.route === ROUTES_DASHBOARD_ADMIN.PROFILE) 
    );

    return (
      <motion.div
        ref={r => this.rootContainerRef = r}
        className={css(styles.rootContainer, anchorToBottom && styles.anchorBottom)}
        data-tip={props.label}
        data-for={"sidebar"}
        data-offset="{'right': 20}"
        onClick={this._handleOnClickButton}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
      >
        <motion.div className={css(styles.leftIconContainer)}>
          {isProfile
            ? <ProfileIcon/>
            : this._renderIcon()
          }
        </motion.div>
        <motion.div 
          className={css(styles.rightContainer)}
          initial={'hidden'}
          animate={props.isSidebarOpen? 'visible' : 'hidden'}
          variants={VARIANTS.label}
          transition={{ duration, delay: 0.1 }}
        >
          {isProfile? (
            // shows the user name
            <ProfileItem/>
          ):(
            <label className={css(styles.label)}>
              {props.label}
            </label>
          )}
        </motion.div>
      </motion.div>
    );
  };
};

//#region - Compoenents
/** Shows the Profile Name */
function ProfileItem(props){
  const { styles } = DashboardPageSidebarItem;

  /** @type {AuthStoreData}*/
  const { loginResponse } = React.useContext(AuthContext);

  const { firstName = 'N/A', lastName = 'N/A', middleName } = loginResponse?.user;
  const middleLetter = middleName?.charAt(0)?.toUpperCase();

  // construct full name
  const fullName = ((middleName != null)
    ? `${firstName} ${middleLetter}. ${lastName}`
    : `${firstName} ${lastName}`
  );

  return(
    <Fragment>
      <label className={css(styles.labelProfile)}>
        {fullName}
      </label>
      <label className={css(styles.labelProfileSubtitle)}>
        {'Admin'}
      </label>
    </Fragment>
  );
};

function ProfileIcon(props){
  const { styles } = DashboardPageSidebarItem;

  /** @type {AuthStoreData}*/
  const { loginResponse } = React.useContext(AuthContext);
  const { firstName, lastName } = loginResponse?.user;

  const letterFirstName      = firstName?.charAt(0)?.toUpperCase() ?? "";
  const letterLastNameLetter = lastName ?.charAt(0)?.toUpperCase() ?? "";

  const initials = (letterFirstName + letterLastNameLetter);

  return(
    <motion.div 
      className={css(styles.iconProfileContainer)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label className={css(styles.iconProfileInitials)}>
        {initials}
      </label>
    </motion.div>
  );
};
//#endregion

//#region - Constants
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
  iconActive: {
    hidden: {
      opacity: 0,
      translateX: -15,
    },
    visible: {
      opacity: 0,
      translateX: 0,
      scale: 0.90,
    },
    selected: {
      opacity: 1,
      translateX: 0,
      scale: 1.05,
    },
  },
  iconInactive: {
    hidden: {
      opacity: 0,
      translateX: -15,
    },
    visible: {
      opacity: 1,
      translateX: 0,
      scale: 0.90,
    },
    selected: {
      opacity: 0,
      translateX: 0,
      scale: 1.05,
    },
  },
};
//#endregion