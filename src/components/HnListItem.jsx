import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItemButtons from './HnListItemButtons';

import styles from './HnListItem.css';

const HnListItem = ({ styles }) => (
  <div styleName="component">
    <div styleName="details">
      <div styleName="heading">
        <div styleName="source">10h • huffingtonpost</div>
        <div styleName="title">'Wonder Woman' Shatters Box Office With Biggest Female Director Opening. Ever.</div>
      </div>
      <div styleName="thumbnail"></div>
    </div>
    <HnListItemButtons />
  </div>
);

HnListItem.propTypes = {
  styles: PropTypes.object
};

export default CSSModules(HnListItem, styles);