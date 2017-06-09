import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItemButtons from './HnListItemButtons';
import { formatDuration, formatSource, formatSourceHref } from '~/lib/utils';
import styles from './HnListItem.css';


const HnListItem = ({ styles, time, url, points, comments, children }) => {
  const source = formatSource(url);
  return (
    <div styleName="component">
      <div styleName="details">
        <div styleName="thumbnail"></div>
        <div styleName="source">
          {formatDuration(time)}
          {source &&
            <span>{' • '}<a href={formatSourceHref(url)} target="_blank" rel="noopener">{source}</a></span>
          }
        </div>
        <div styleName="title"><a href={url} target="_blank" rel="noopener">{children}</a></div>
      </div>
      <HnListItemButtons points={points} comments={comments} url={url} />
    </div>
  );
};

HnListItem.propTypes = {
  styles: P.object,
  time: P.number.isRequired,
  url: P.string,
  points: P.number.isRequired,
  comments: P.number,
  children: P.string.isRequired
};


export default CSSModules(HnListItem, styles);