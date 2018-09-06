/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';

export default class ItemImageSmartphone extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    TweenMax.to(this.item_ref, 0.3, { opacity: 1, ease: Power1.easeIn });
  }

  // Render using TweenMax
  render() {
    const { width = 500, height = 500, style, media_path, media_name, alt } = this.props;

    const paddingbottom = (height / width) * 100;
    const thumb_style = { opacity: 0, height: 0, paddingBottom: paddingbottom + '%' };
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
