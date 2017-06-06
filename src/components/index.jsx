import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItem from './HnListItem';

import styles from './HnAlien.css';

const HnAlien = ({ styles }) => (
  <div styleName="component">
    <div styleName="header">Hacker News</div>
    <div>
      <HnListItem />
      <HnListItem />
      <HnListItem />
      <HnListItem />
      <HnListItem />
      <HnListItem />
      <HnListItem />
    </div>
  </div>
);

HnAlien.propTypes = {
  styles: PropTypes.object
};

export default CSSModules(HnAlien, styles);