import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './HnListItemButtons.css';

const HnListItemButtons = ({ styles }) => (
  <div styleName="component">
    <div styleName="button">
      <div styleName="vote-up"></div>
      <div styleName="vote-count"><span>30.9k</span></div>
      <div styleName="vote-down"></div>
    </div>
    <div styleName="button">
      <div styleName="comment"></div>
      <div styleName="comment-count"><span>2.0k</span></div>
    </div>
    <div styleName="button">
      <div styleName="share"></div>
      <div styleName="share-label"><span>Share</span></div>
    </div>
  </div>
);

HnListItemButtons.propTypes = {
  styles: PropTypes.object
};

export default CSSModules(HnListItemButtons, styles);