import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import HnListItem from './HnListItem';
import { getHnStoryIds, getHnItem } from '~/apiClient';
import styles from './HnAlien.css';


class HnAlien extends Component {
  static propTypes = {
    styles: P.object
  }

  // TODO: put this in Redux since children data are returned by API
  state = {
    newstoriesQueue: [],
    topstoriesQueue: [],
    beststoriesQueue: [],
    askstoriesQueue: [],
    showstoriesQueue: [],
    jobstoriesQueue: [],
    newstories: [],
    topstories: [],
    beststories: [],
    askstories: [],
    showstories: [],
    jobstories: [],
    storyType: 'topstories'
  }

  componentDidMount = () => {
    getHnStoryIds(this.state.storyType)
      .then(data => {
        if (data) {
          this.setState({ [this.state.storyType + 'Queue']: data.reverse() }, this.fetchStories.bind(this, 30));
        }
      });
  }

  fetchStories = count => {
    const queue = this.state[this.state.storyType + 'Queue'];
    const promises = [];
    for (let i = 0; i < count && queue.length; i++) {
      promises.push(getHnItem(queue.pop()));
    }
    Promise.all(promises)
      .then(data => {
        if (data) {
          this.setState({ [this.state.storyType]: [...this.state[this.state.storyType], ...data] });
        }
      });
  }

  render() {
    return (
      <div styleName="component">
        <div styleName="header">Hacker News</div>
        <div>
          {this.state[this.state.storyType].map(item =>
            <HnListItem key={item.id} time={item.time} url={item.url} points={item.score} comments={item.descendants}>
              {item.title}
            </HnListItem>
          )}
        </div>
      </div>
    );
  }
}


export default CSSModules(HnAlien, styles);