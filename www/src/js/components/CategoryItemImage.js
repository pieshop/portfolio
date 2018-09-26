/**
 * Created by stephenhamilton on 24/02/2017.
 */
import { TweenLite } from 'gsap/TweenLite';
import React, { Component } from 'react';
import Placeholder from 'components/Placeholder';
export default class CategoryItemImage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    TweenLite.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
  }

  // Render using TweenMax
  render() {
    const { id, title, thumb_path, is_responsive } = this.props;
    const opacity = { opacity: 0 };
    const srcSet = is_responsive
      ? thumb_path + 'thumb_2x.jpg 2x,' + thumb_path + 'thumb_1x.jpg 1x'
      : '';
    return (
      <div class="thumb text-center" ref={(item) => (this.item_ref = item)} style={opacity}>
        {/*<Placeholder is_responsive={is_responsive} />*/}
        <img
          crossOrigin="anonymous"
          width="350"
          height="350"
          class="img-fluid img-thumbnail"
          alt={title}
          srcSet={srcSet}
          src={thumb_path + 'thumb_1x.jpg'}
        />
      </div>
    );
  }
}
