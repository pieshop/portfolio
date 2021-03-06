/**
 * Created by stephenhamilton on 24/02/2017.
 */
import React, { Component } from 'react';
import swfobject from 'swfobject-amd';

export default class ArchiveItemSWF extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // console.log('ArchiveItemSWF.componentDidMount', this.props);
    let { id, url, flashvars, bgcolor, base, wmode, scale, width, height } = this.props;
    flashvars = flashvars || {};
    const params = {};
    params.bgcolor = bgcolor;
    params.menu = 'true';
    if (base) {
      params.base = base;
    }
    params.wmode = wmode || 'direct'; // window, direct, opaque, transparent, gpu
    params.scale = scale ? scale : 'noscale';

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
      console.error('ArchiveItemSWF', err);
    }
  }

  render() {
    const { id } = this.props;
    return (
      <div className="row">
        <div className="col text-center swf_outer">
          <div className="thumbnail">
            <div className="swf_container">
              <div id={id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
