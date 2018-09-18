/**
 * Created by stephenhamilton on 24/02/2017.
 */
import { TweenLite } from 'gsap/TweenLite';
import React, { Component } from 'react';

export default class ItemImage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    TweenLite.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
  }

  // Render using TweenMax
  render() {
    const { style, media_info, media_names } = this.props;
    const { width = 500, height = 500, alt, media_path } = media_info;
    const { media_name_2x, media_name_1x } = media_names;
    const thumb_style = {
      opacity: 0,
      height: 0,
      marginBottom: '10px',
      paddingBottom: (height / width) * 100 + '%',
    };
    const srcSet = `${media_path}${media_name_2x} 2x, ${media_path}${media_name_1x} 1x`;
    // const sizes = is_desktop
    //   ? '(max-width: 480px)  100vw, (max-width: 768px)  100vw, (max-width: 1024px) 100vw, 100vw'
    //   : '';
    const src = `${media_path}${media_name_1x}`;
    return (
      <div class={style}>
        <div class="thumbnail" ref={(item) => (this.item_ref = item)} style={thumb_style}>
          <img
            crossorigin="anonymous"
            width={width}
            height={height}
            class="img-fluid img-thumbnail"
            alt={alt}
            srcSet={srcSet}
            src={src}
            // sizes={sizes}
          />
        </div>
      </div>
    );
  }
}
