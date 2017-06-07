import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import styles from './HnListItemButtons.css';

const HnListItemButtons = ({ styles, points, comments }) => (
  <div styleName="component">
    <div styleName="button">
      <div styleName="points"><span>{points} points</span></div>
    </div>
    <div styleName="button">
      <div styleName="comment"></div>
      <div styleName="comment-count"><span>{comments}</span></div>
    </div>
    <div styleName="button">
      <div styleName="share"></div>
      <div styleName="share-label"><span>Share</span></div>
    </div>
  </div>
);

HnListItemButtons.propTypes = {
  styles: P.object,
  points: P.number.isRequired,
  comments: P.number.isRequired
};

export default CSSModules(HnListItemButtons, styles);