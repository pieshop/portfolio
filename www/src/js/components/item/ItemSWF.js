/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import swfobject from 'swfobject';

export default class ItemSWF extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // console.log('ItemSWF.componentDidMount', this.props);
    const { swf_data } = this.props;
    let flashvars = swf_data.flashvars || {};
    let params = {};
    params.bgcolor = swf_data.bgcolor;
    params.menu = 'true';
    if (swf_data.base) {
      params.base = swf_data.base;
    }
    params.wmode = swf_data.wmode || 'direct'; // window, direct, opaque, transparent, gpu
    params.scale = swf_data.scale ? swf_data.scale : 'noscale'; // default, showall, noborder, exactfit, noscale

    let width = swf_data.width;
    let height = swf_data.height;
    // let width = '100%';
    // let height = '100%';
    try {
      swfobject.embedSWF(
        swf_data.url,
        swf_data.id,
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
      <div class={style}>
        <div class="thumbnail">
          <div class="swf_container">
            <div id={id} />
          </div>
        </div>
      </div>
    );
  }
}
