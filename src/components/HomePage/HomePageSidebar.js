import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import IconButton   from '@material-ui/core/IconButton';
import ReactTooltip from 'react-tooltip';

import { motion, AnimationControls } from "framer-motion";

import * as Colors from 'constants/Colors';
import * as Helpers from 'functions/helpers';

import { HomePageSidebarItem } from './HomePageSidebarItem';
import { HomePageConstants, HomePageSidebarItems } from './HomePageConstants';

import { FiMenu } from 'react-icons/fi';


export class HomePageSideBar extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    sidebarItems: PropTypes.array,
    onClickSidebarItem: PropTypes.func,
  };
  
  static styles = StyleSheet.create({
    sideBarContainer: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      backgroundColor: Colors.BLACK[900],
      overflow: 'hidden',
    },
    drawerContainer: {
      display: 'flex',
      width : HomePageConstants.drawerClosedWidth,
      height: HomePageConstants.drawerIconSize,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      marginTop: 15,
      marginBottom: 15,
    },
    sidebarIndicator: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: HomePageConstants.drawerItemHeight,
      backgroundColor: Helpers.hexToRGBA(Colors.ORANGE[900], 0.5),
      // disable tooltip
      pointerEvents: 'none',
    },
  });

  constructor(props){
    super(props);

    const intialSelected = HomePageSidebarHelpers.getInitialSelected(
      props.location?.pathname,
      props.sidebarItems
    );

    this.state = {
      isSidebarOpen   : false,
      mountDrawerItems: false,
      // pass down -------------------------------
      selectedIndex: intialSelected.selectedIndex,
      selectedRoute: intialSelected.selectedRoute,
    };

    this.animationContolsDrawer = new AnimationControls();
    this.animationContolsDrawerIndicator = new AnimationControls();
  };

  shouldComponentUpdate(nextProps, nextState){
    const prevProps = this.props;
    const prevState = this.state;

    const didPathnameChange = 
      (prevProps.location?.pathname != nextProps.location?.pathname);

    if(didPathnameChange){
      // do something when the route changes
      // logic for route matching i.e if a deeper route `a/b/c`
      // is a subroute of `a/b` or `a/`
    };

    return(
      didPathnameChange ||
      // compare state ----------------------------------------------
      (prevState.isSidebarOpen    !== nextState.isSidebarOpen    ) ||
      (prevState.selectedIndex    !== nextState.selectedIndex    ) ||
      (prevState.selectedRoute    !== nextState.selectedRoute    ) ||
      (prevState.mountDrawerItems !== nextState.mountDrawerItems )
    );
  };

  async componentDidMount(){
    this.animationContolsDrawer.mount();
    this.animationContolsDrawerIndicator.mount();

    // animate in the sidebar
    await this.animationContolsDrawer.start('closed');
    // show sidebar items
    this.setState({mountDrawerItems: true});

    await Helpers.timeout(1500);
    this.setSidebarIndicator(
      this.state.selectedRoute
    );

    ReactTooltip.rebuild();
  };

  componentWillUnmount(){
    this.animationContolsDrawer.unmount();
    this.animationContolsDrawerIndicator.unmount();
  };

  /** animate side bar indicator position based on route */
  setSidebarIndicator = async (route) => {
    const ref = this[`${route}-SidebarItem`];

    // guard: early exit if ref is null
    if(!ref && !ref?.measure) return;

    const { y } = ref.measure();
    await this.animationContolsDrawerIndicator.start({
      translateY: y
    });
  };

  /** set the currently selected route */
  setSelectedRoute = async (route, index) => {
    const { sidebarItems } = this.props;

    if(index){
      this.setState({
        selectedIndex: index,
        selectedRoute: route,
      });

      // set the side bar pos
      await this.setSidebarIndicator(route);

    } else {
      const itemIndex = sidebarItems
        ?.findIndex(item => item.route === route);

      // guard: early exit if no matching item
      if((itemIndex == -1) || !sidebarItems) return;

      this.setState({
        selectedIndex: itemIndex,
        selectedRoute: route    ,
      });

      // set the side bar pos
      await this.setSidebarIndicator(route);
    };
  };

  /** sidebar drawer button clicked */
  _handleOnClickSidebarDrawer = async () => {
    const { isSidebarOpen } = this.state;

    this.setState({isSidebarOpen: !isSidebarOpen});
    await this.animationContolsDrawer.start(isSidebarOpen? 'closed' : 'open');
  };
  
  _handleOnSidebarItemSelected = (params) => {
    const { onClickSidebarItem } = this.props;

    this.setState({
      selectedIndex: params.selectedIndex,
      selectedRoute: params.selectedRoute,
    });

    const ref = this[`${params.selectedRoute}-SidebarItem`];
    const { y } = ref.measure();

    this.animationContolsDrawerIndicator.start({
      translateY: y
    });

    onClickSidebarItem && onClickSidebarItem({
      selectedIndex: params.selectedIndex,
      selectedRoute: params.selectedRoute,
    });
  };

  /** render the sidebar items */
  _renderSidebarItems(){
    const { sidebarItems } = this.props;
    const { isSidebarOpen, ...state } = this.state;

    // guard: dont render until state change
    if(!state.mountDrawerItems) return null;
     
    return sidebarItems.map((item, index) => (
      <HomePageSidebarItem
        key={`${item.route}-sidebarItem`}
        ref={r => this[`${item.route}-SidebarItem`] = r}
        anchorLastToBottom={true}
        selectedIndex={state.selectedIndex}
        selectedRoute={state.selectedRoute}
        onItemSelected={this._handleOnSidebarItemSelected}
        itemsTotal={sidebarItems.length}
        {...{index, isSidebarOpen}}
        {...item}
      />
    ));
  };

  render(){
    const { styles } = HomePageSideBar;
    const state = this.state;


    return(
      <motion.nav
        className={css(styles.sideBarContainer)}
        initial={'hidden'}
        animate={this.animationContolsDrawer}
        variants={VARIANTS.sidebar}
      >
        <IconButton
          className={css(styles.drawerContainer)}
          aria-label="toggle drawer" 
          color="primary"
          onClick={this._handleOnClickSidebarDrawer}
        >
          <FiMenu
            color={'white'}
            size={'20px'}
          />
        </IconButton>
        <motion.div
          className={css(styles.sidebarIndicator)}
          initial={{translateY: -HomePageConstants.drawerItemHeight}}
          animate={this.animationContolsDrawerIndicator}
        />
        {this._renderSidebarItems()}
        <ReactTooltip 
          id={'sidebar'}
          place={'right'}
          delayShow={500}
          disable={state.isSidebarOpen}
        />
      </motion.nav>
    );
  };
};

//#region - Constants + Helpers
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

class HomePageSidebarHelpers {
  static getInitialSelected(pathname, sidebarItems){
    const itemIndex = sidebarItems
      ?.findIndex(item => item?.route === pathname);

    const isInvalidRoute = (
      (!itemIndex     ) ||
      (itemIndex == -1) 
    );

    return(isInvalidRoute? {
      selectedIndex: null,
      selectedRoute: null,
    }:{
      selectedIndex: itemIndex,
      selectedRoute: pathname ,
    });
  };
};
//#endregion