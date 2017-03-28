import React, { Component } from 'react';
import classnames from 'classnames';

import EntranceTransition from 'app/components/entrance-transition';
import WordAnimation from 'app/components/word-animation';
import DownIndicator from 'app/components/down-indicator';
import Rimage from 'app/components/rimage';
import Track from 'app/adaptors/server/track';

class Hero extends Component {

  renderImage() {
    const { sizes, altText, transitionImage } = this.props;
    const image = <Rimage sizes={sizes} altText={altText} />;
    let output;
    if (transitionImage) {
      output = React.createElement(
        EntranceTransition,
        { className: 'image-entrance' },
        image
      );
    } else {
      output = image;
    }
    return output;
  }

  renderVideo() {
    return this.props.video ? this.props.video : null;
  }

  renderSubheading() {
    return this.props.subheading ? <p className="subheading">{this.props.subheading}</p> : null;
  }

  renderDownIndicator() {
    let indicator;
    if (this.props.showDownIndicator) {
      indicator = (
        <DownIndicator
          ref="downIndicator"
          onClick={this.onClickDownIndicator}
        />
      );
    }
    return indicator;
  }

  renderLogo() {
    return this.props.logo ? this.props.logo : null;
  }

  onClickDownIndicator() {
    Track('send', {
      'hitType': 'event',
      'eventCategory': 'hub_page',
      'eventAction': 'click_animated_Indicator',
      'eventLabel': this.props.eventLabel
    });
  }

  render() {
    const { className, title, children, scrollProgress, eventLabel, notFullScreen, fixedHeightOnLoad } = this.props;
    let titleStyle;
    if (scrollProgress) {
      titleStyle = {
        opacity: 1 - scrollProgress,
        transform: `translate3d(0, ${35 * scrollProgress}vh, 0)`
      }
    }
    const sectionTitle = eventLabel === 'work' ? 'Our Work' : eventLabel.toUpperCase();
    const classes = classnames('hero', className, { notFullScreen });

    const styles = fixedHeightOnLoad ? { height: `${fixedHeightOnLoad}px` } : null;

    return (
      <section className={classes} style={styles}>
        <div className="hero-inner-wrapper">
          {this.renderLogo()}
          <EntranceTransition className="title-entrance">
            <div className="section-title">
              <WordAnimation delay={0.32} duration={0.2}>{sectionTitle}</WordAnimation>
            </div>
            <h1 className="title" style={titleStyle}>
              <WordAnimation delay={0.5} duration={0.32}>{title}</WordAnimation>
            </h1>
            {this.renderSubheading()}
            {children}
            {this.renderDownIndicator()}
          </EntranceTransition>
          {this.renderVideo()}
        </div>
        {this.renderImage()}
      </section>
    );
  }
};

export default Hero;
