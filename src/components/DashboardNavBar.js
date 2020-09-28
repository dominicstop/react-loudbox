import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { motion, AnimationControls } from "framer-motion";
import { DashboardConstants } from './DashboardPage/DashboardPageConstants';

import * as Colors from 'constants/Colors';

export class DashboardNavBar extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      backgroundColor: 'white',
      height: 20,
      padding: 10,
      borderStyle: 'solid',
      borderBottomColor: Colors.BLACK[300],
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1.75,
    },
  });

  render(){
    const { styles } = DashboardNavBar;

    return(
      <motion.div 
        className={css(styles.rootContainer)}
        variants={VARIANTS.rootContainer}
        initial={'hidden'}
        animate={'visible'}
      >
        
      </motion.div>
    );
  };
};

const VARIANTS = {
  rootContainer: {
    hidden: {
      opacity   : 0,
      translateY: -DashboardConstants.navBarHeight,
    },
    visible: {
      opacity   : 1,
      translateY: 0,
    },
  },
};