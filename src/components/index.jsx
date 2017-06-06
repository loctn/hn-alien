import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './index.css';

const HnAlien = ({ styles }) => (
  <div styleName="component">
    Test component
  </div>
);

HnAlien.propTypes = {
  styles: PropTypes.object
};

export default CSSModules(HnAlien, styles);