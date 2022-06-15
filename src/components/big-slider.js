import React, { Component } from 'react';
import Slider from 'react-slick';
import * as styles from './big-slider.module.scss';
import { getImgCropped } from '../util/get-image';

const arrow =
  '<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC \'-//W3C//DTD SVG 1.1//EN\'  \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'><svg enable-background="new 0 0 32 32" height="32px" id="Слой_1" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M31.106,15H3.278l8.325-8.293  c0.391-0.391,0.391-1.024,0-1.414c-0.391-0.391-1.024-0.391-1.414,0l-9.9,9.899c-0.385,0.385-0.385,1.029,0,1.414l9.9,9.9  c0.391,0.391,1.024,0.391,1.414,0c0.391-0.391,0.391-1.024,0-1.414L3.278,17h27.828c0.552,0,1-0.448,1-1  C32.106,15.448,31.658,15,31.106,15z" fill="#6d6d6d" fill-rule="evenodd" id="Arrow_Back"/><g/><g/><g/><g/><g/><g/></svg>';

export default class BigSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  state = {
    slideNext: 1,
    slideCurrent: 1,
  };

  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const { images, width, height, addSettings } = this.props;
    const { slideNext, slideCurrent } = this.state;

    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current, next) => this.setState({ slideNext: next + 1 }),
      afterChange: (current) => this.setState({ slideCurrent: current + 1 }),
      ...addSettings,
    };

    const imageWidth = settings.slidesToShow === 2 ? width / 2 : width;
    const imageHeight = settings.slidesToShow === 2 ? height / 2 : height;

    return (
      <div className={styles.bigSlider}>
        <div
          className={styles.sliderNav}
          style={settings.slidesToShow === 2 ? { padding: '0 0 0 15px' } : { padding: '0' }}
        >
          <div>
            <span>
              {slideCurrent} / {images.length}
            </span>
          </div>
          <div className={styles.arrows}>
            <span onClick={this.previous}>
              <img alt="slide-left" src={`data:image/svg+xml;utf8,${encodeURIComponent(arrow)}`} />
            </span>
            <span onClick={this.next}>
              <img alt="slide-right" src={`data:image/svg+xml;utf8,${encodeURIComponent(arrow)}`} />
            </span>
          </div>
        </div>
        <Slider ref={(c) => (this.slider = c)} {...settings}>
          {images.map((image) => (
            <div className={`slide ${settings.slidesToShow === 2 && 'smaller'}`}>
              <img
                alt={image.name}
                width={imageWidth}
                height={imageHeight}
                src={getImgCropped(image.name, imageWidth, imageHeight)}
              />
              {!!image.description && <span>{image.description}</span>}
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
