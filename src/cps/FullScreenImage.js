/**
 * 大图浏览
 */

import React, { Component } from 'react';
import PhotoSwipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

export default class FullScreenImage extends Component {
  componentWillUnmount() {
    if (this.photoSwipe) {
      this.photoSwipe.close();
    }
  }

  open(images = [], index = 0) {
    // images = [{
    //   src: 'http://cdn.duitang.com/uploads/item/201511/26/20151126174821_JAkLi.jpeg',
    //   w: 0,
    //   h: 0,
    // }, {
    //   src: 'http://g.hiphotos.baidu.com/zhidao/pic/item/1ad5ad6eddc451da7fadef7eb2fd5266d11632c8.jpg',
    //   w: 0,
    //   h: 0,
    // }];
    if (!images.length) return;

    const options = { index, history: false };
    this.photoSwipe = new PhotoSwipe(this.pswpElement, PhotoswipeUIDefault, images, options);
    this.photoSwipe.listen('gettingData', (idx, item) => {
      /* eslint-disable func-names */
      const that = this;
      const _item = item;
      if (item.w < 1 || item.h < 1) { // unknown size
        const img = new Image();
        img.onload = function () { // will get size after load
          _item.w = this.width; // set image width
          _item.h = this.height; // set image height
          that.photoSwipe.invalidateCurrItems(); // reinit Items
          that.photoSwipe.updateSize(true); // reinit Items
        };
        img.src = item.src; // let's download image
      }
    });
    this.photoSwipe.init();
  }

  render() {
    return (
      <div className="pswp" tabIndex="-1" aria-hidden="true" ref={div => this.pswpElement = div}>
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button className="pswp__button pswp__button--close" title="Close (Esc)" />
              <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />
              <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />
            <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
