import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItemButtons from './HnListItemButtons';
import { formatDuration, formatSource, formatSourceHref } from '~/lib/utils';
import styles from './HnListItem.css';


const HnListItem = ({ styles, id, time, user, url, points, comments, children }) => {
  const source = formatSource(url);
  return (
    <div styleName="component">
      <div styleName="details">
        <div styleName="thumbnail"></div>
        <div styleName="source">
          {formatDuration(time)}
          {' • '}
          {source &&
            <a href={formatSourceHref(url)} target="_blank" rel="noopener">{source}</a>
          }
          {!source && user}
        </div>
        <div styleName="title">
          <a href={url || 'https://news.ycombinator.com/item?id=' + id} target="_blank" rel="noopener">{children}</a>
        </div>
      </div>
      <HnListItemButtons points={points} comments={comments} url={url} />
    </div>
  );
};

HnListItem.propTypes = {
  styles: P.object,
  id: P.number.isRequired,
  time: P.number.isRequired,
  user: P.string.isRequired,
  url: P.string,
  points: P.number.isRequired,
  comments: P.number,
  children: P.string.isRequired
};


export default CSSModules(HnListItem, styles);