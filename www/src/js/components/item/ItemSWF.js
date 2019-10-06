/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import swfobject from 'swfobject-amd';

export default class ItemSWF extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { swf_data } = this.props;
    const { id, flashvars = {}, url } = swf_data;
    const { width, height, bgcolor, base, wmode = 'direct', scale = 'noscale' } = swf_data;
    const params = {};
    params.bgcolor = bgcolor;
    params.menu = 'true';
    if (base) {
      params.base = base;
    }
    params.wmode = wmode; // window, direct, opaque, transparent, gpu
    params.scale = scale; // default, showall, noborder, exactfit, noscale
    try {
      swfobject.embedSWF(
        url,
        id,
        width,
        height,
        '6',
        '/assets/expressinstall.swf',
        flashvars,
        params
      );
    } catch (err) {
      console.error('ItemSWF', err);
    }
  }

  render() {
    const { id, style } = this.props;
    return (
      <div className={style}>
        <div className="thumbnail">
          <div className="swf_container">
            <div id={id} />
          </div>
        </div>
      </div>
    );
  }
}
