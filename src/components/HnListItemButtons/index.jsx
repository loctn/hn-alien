import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './HnListItemButtons.css';


const HnListItemButtons = ({ styles, id, points, comments }) => (
  <div styleName="component">
    <div styleName="button">
      <div styleName="points"><span>{points} points</span></div>
    </div>
    <div styleName="button">
      <a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" styleName="comment" className={classNames({
        [styles['comment-no-thread']]: !comments && comments !== 0
      })}></a>
      <a href={`https://news.ycombinator.com/item?id=${id}`} target="_blank" styleName="comment-count"><span>{comments}</span></a>
    </div>
    <div styleName="button">
      <div styleName="share"></div>
      <div styleName="share-label"><span>Share</span></div>
    </div>
  </div>
);

HnListItemButtons.propTypes = {
  styles: P.object,
  id: P.number.isRequired,
  points: P.number.isRequired,
  comments: P.number
};


export default CSSModules(HnListItemButtons, styles);