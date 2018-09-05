/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
// import { CSSTransition } from 'react-transition-group';
// const Fade = ({ children, ...props }) => (
//     <CSSTransition {...props} timeout={1000} classNames="fade">
//         {children}
//     </CSSTransition>
// );

export default class LazyLoadFadeImage extends Component {
  constructor() {
    super();
    // this.state = { show: false };
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.title);
    if (this.item_ref) {
      // const delay = this.props.index / 50;
      const delay = 0;
      TweenMax.to(this.item_ref, 0.3, { opacity: 1, delay: delay, ease: Power1.easeIn });
    }
  }

  // Render using TweenMax
  render() {
    const { width, height, clazz, title, srcSet, src } = this.props;
    const opacity = { opacity: 0 };
    return (
      <img
        ref={(item) => (this.item_ref = item)}
        style={opacity}
        width={width}
        height={height}
        class={clazz}
        // crossOrigin="anonymous"
        alt={title}
        srcSet={srcSet}
        src={src}
      />
    );
  }
}
