import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import classNames from 'classnames';

import HnListItem from './HnListItem';
import { getHnStoryIds, getHnItem } from '~/apiClient';
import { addStories } from '~/actions/stories';
import styles from './HnAlien.css';


class HnAlien extends Component {
  static propTypes = {
    styles: P.object,
    stories: P.object.isRequired,
    onAddStories: P.func.isRequired
  }

  state = {
    newQueue: [],
    topQueue: [],
    bestQueue: [],
    askQueue: [],
    showQueue: [],
    jobQueue: [],
    storyType: 'top',
    isNavDocked: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchInitialStories();
  }

  fetchInitialStories() {
    getHnStoryIds(this.state.storyType)
      .then(data => {
        if (data) {
          this.setState({ [this.state.storyType + 'Queue']: data.reverse() }, this.fetchStories.bind(this, 6, true));
        }
      });
  }

  fetchStories(count, isShortFetch) {
    const queue = this.state[this.state.storyType + 'Queue'];
    const promises = [];
    for (let i = 0; i < count && queue.length; i++) {
      promises.push(getHnItem(queue.pop()));
    }
    Promise.all(promises)
      .then(data => {
        if (data) {
          this.props.onAddStories(this.state.storyType, data);
          if (isShortFetch) {
            this.fetchStories(24);
          } else {
            this.disableNav = false;
          }
        }
      });
  }

  handleScroll = () => {
    this.scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.setState({ isNavDocked: this.scrollY >= 56 }, () => {
          this.isTicking = false;
        });
      });
    }
    this.isTicking = true;
  }

  handleChangeStoryType = (e, storyType) => {
    e.preventDefault();
    if (this.disableNav) return;
    this.setState({ storyType }, () => {
      if (!this.state[storyType + 'Queue'].length) {  // TODO: should only happen once
        this.disableNav = true;
        this.fetchInitialStories();
      }
    });
  }

  render() {
    const styles = this.props.styles;
    return (
      <div styleName="component">
        <div styleName="header">Hacker News</div>
        <div styleName="nav-container">
          <div styleName="nav-floating" className={classNames({ [styles['nav-floating-docked']]: this.state.isNavDocked })}>
            <a href="#" className={classNames({
              [styles['nav-tab-active']]: ~['top', 'new', 'best'].indexOf(this.state.storyType)
            })} onClick={e => this.handleChangeStoryType(e, 'top')}><span>Home</span></a>
            <a href="#" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'show'
            })} onClick={e => this.handleChangeStoryType(e, 'show')}><span>Show</span></a>
            <a href="#" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'ask'
            })} onClick={e => this.handleChangeStoryType(e, 'ask')}><span>Ask</span></a>
            <a href="#" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'job'
            })} onClick={e => this.handleChangeStoryType(e, 'job')}><span>Jobs</span></a>
          </div>
          <div styleName="nav-filter">
            <span>Top</span>
          </div>
        </div>
        <div>
          {this.props.stories[this.state.storyType].map(story =>
            <HnListItem key={story.id} id={story.id} time={story.time} user={story.by} url={story.url} points={story.score} comments={story.descendants}>
              {story.title}
            </HnListItem>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stories: state.stories
});

const mapDispatchToProps = dispatch => ({
  onAddStories: (storyType, stories) => {
    dispatch(addStories(storyType, stories));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(HnAlien, styles));