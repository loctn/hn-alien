import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItem from './HnListItem';

import styles from './HnAlien.css';

const HnAlien = ({ styles }) => (
  <div styleName="component">
    <div styleName="header">Hacker News</div>
    <div>
      <HnListItem time="19m" url="https://status.github.com/?dupe=no" points={102} comments={43} >
        GitHub Major Service Outage
      </HnListItem>
      <HnListItem time="6h" url="http://www.npr.org/sections/thetwo-way/2017/06/05/531584651/alex-honnold-scales-el-capitan-without-ropes-and-the-climbing-world-reels?utm_campaign=storyshare&utm_source=twitter.com&utm_medium=social" points={411} comments={265} >
        Alex Honnold Scales El Capitan Without Ropes, and the Climbing World Reels
      </HnListItem>
      <HnListItem time="4h" url="https://www.bloomberg.com/news/articles/2017-06-06/pinterest-raises-150-million-at-2015-share-price" points={150} comments={71} >
        Pinterest Raises $150M at 2015 Share Price
      </HnListItem>
      <HnListItem time="37m" url="https://www.battleforthenet.com/july12/" points={10} comments={1} >
        July 12th: Internet-Wide Day of Action to Save Net Neutrality
      </HnListItem>
      <HnListItem time="9h" url="https://monicahq.com/" points={635} comments={413} >
        Show HN: Monica, an open-source CRM to manage friends and family
      </HnListItem>
      <HnListItem time="4h" url="https://webkit.org/blog/7691/webassembly/" points={67} comments={25} >
        Assembling WebAssembly
      </HnListItem>
      <HnListItem time="6h" url="https://news.voyage.auto/an-introduction-to-the-can-bus-how-to-programmatically-control-a-car-f1b18be4f377" points={141} comments={71} >
        An Introduction to the CAN Bus: How to Programmatically Control a Car
      </HnListItem>
    </div>
  </div>
);

HnAlien.propTypes = {
  styles: P.object
};

export default CSSModules(HnAlien, styles);