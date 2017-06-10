import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

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
    storyType: 'topstories',
    isNavDocked: false
  }

  componentDidMount = () => {
    getHnStoryIds(this.state.storyType)
      .then(data => {
        if (data) {
          this.setState({ [this.state.storyType + 'Queue']: data.reverse() }, this.fetchStories.bind(this, 6, true));
        }
      });

    window.addEventListener('scroll', this.handleScroll);
  }

  fetchStories = (count, isInitial) => {
    const queue = this.state[this.state.storyType + 'Queue'];
    const promises = [];
    for (let i = 0; i < count && queue.length; i++) {
      promises.push(getHnItem(queue.pop()));
    }
    Promise.all(promises)
      .then(data => {
        if (data) {
          this.setState({ [this.state.storyType]: [...this.state[this.state.storyType], ...data] });
          if (isInitial) this.fetchStories(24);
        }
      });
  }

  handleScroll = () => {
    this.scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.setState({ isNavDocked: this.scrollY >= 62 });
        this.isTicking = false;
      });
    }
    this.isTicking = true;
  }

  render() {
    const styles = this.props.styles;
    return (
      <div styleName="component">
        <div styleName="header">Hacker News</div>
        <div styleName="nav-container">
          <div styleName="nav-floating" className={classNames({ [styles['nav-floating-docked']]: this.state.isNavDocked })}>
            <div styleName="nav-tab" className={styles['nav-tab-active']}><span>Home</span></div>
            <div styleName="nav-tab"><span>Show</span></div>
            <div styleName="nav-tab"><span>Ask</span></div>
            <div styleName="nav-tab"><span>Jobs</span></div>
          </div>
          <div styleName="nav-sort">
            <span>Top</span>
          </div>
        </div>
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