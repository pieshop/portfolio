/**
 * Created by stephenhamilton on 24/02/2017.
 */
import { TweenLite } from 'gsap/TweenLite';
import React, { Component } from 'react';

export default class ItemImageSmartphone extends Component {
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
    const { media_name } = media_names;
    const thumb_style = {
      opacity: 0,
      height: 0,
      marginBottom: '10px',
      paddingBottom: (height / width) * 100 + '%',
    };
    const src = `${media_path}${media_name}`;
    return (
      <div class={style}>
        <div class="thumbnail" ref={(item) => (this.item_ref = item)} style={thumb_style}>
          <img width={width} height={height} class="img-fluid img-thumbnail" alt={alt} src={src} />
        </div>
      </div>
    );
  }
}
