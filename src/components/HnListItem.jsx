import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItemButtons from './HnListItemButtons';

import styles from './HnListItem.css';

const HnListItem = ({ styles, time, url, points, comments, children }) => (
  <div styleName="component">
    <div styleName="details">
      <div styleName="thumbnail"></div>
      <div styleName="source">{time} • {new URL(url).hostname.replace(/^www\./i, '')}</div>
      <div styleName="title">{children}</div>
    </div>
    <HnListItemButtons points={points} comments={comments} url={url} />
  </div>
);

HnListItem.propTypes = {
  styles: P.object,
  time: P.string.isRequired,
  url: P.string.isRequired,
  points: P.number.isRequired,
  comments: P.number.isRequired,
  children: P.string.isRequired
};

export default CSSModules(HnListItem, styles);