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
    window.addEventListener('popstate', this.changeRoute);
    window.addEventListener('scroll', this.handleScroll);

    if (window.location.search) {
      this.changeRoute();
    } else {
      this.fetchInitialStories();
    }
  }

  changeRoute = () => {
    switch (window.location.search) {
    case '':
      this.handleClickNavTab(null, 'top');
      break;
    case '?show':
      this.handleClickNavTab(null, 'show');
      break;
    case '?ask':
      this.handleClickNavTab(null, 'ask');
      break;
    case '?jobs':
      this.handleClickNavTab(null, 'job');
    }
  }

  fetchInitialStories() {
    getHnStoryIds(this.state.storyType)
      .then(data => {
        if (data) {
          this.setState({
            // Place 0 at the end of the queue to indicate we've fired fetchInitialStories for that storyType
            [this.state.storyType + 'Queue']: data.concat([0]).reverse()
          }, this.fetchStories.bind(this, 6, true));
        }
      });
  }

  fetchStories(count, isShortFetch) {
    const queue = this.state[this.state.storyType + 'Queue'];
    const promises = [];

    for (let i = 0; i < count && queue[queue.length - 1]; i++) {
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

  handleClickNavTab = (event, storyType, route) => {
    if (event) event.preventDefault();
    if (this.disableNav) return;
    
    if (route !== undefined) {
      history.pushState(null, '', route);
    }

    this.setState({ storyType }, () => {
      if (!this.state[storyType + 'Queue'].length) {
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
            <a href="#" styleName="nav-tab" className={classNames({
              [styles['nav-tab-active']]: ~['top', 'new', 'best'].indexOf(this.state.storyType)
            })} onClick={event => {
              this.handleClickNavTab(event, 'top', '');
            }}><span>Home</span></a>
            <a href="#" styleName="nav-tab" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'show'
            })} onClick={event => {
              this.handleClickNavTab(event, 'show', '?show');
            }}><span>Show</span></a>
            <a href="#" styleName="nav-tab" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'ask'
            })} onClick={event => {
              this.handleClickNavTab(event, 'ask', '?ask');
            }}><span>Ask</span></a>
            <a href="#" styleName="nav-tab" className={classNames({
              [styles['nav-tab-active']]: this.state.storyType === 'job'
            })} onClick={event => {
              this.handleClickNavTab(event, 'job', '?jobs');
            }}><span>Jobs</span></a>
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