import anime from 'animejs/lib/anime.es.js';
import * as Utils from '../../utils';

const HEADER = `.${Utils.getElClass('component', 'header')}`;

export default (onStart = undefined, onEnd = undefined) => {
  return anime
    .timeline({
      autoplay: false,
      delay: 7000,
      duration: 5000,
      easing: 'easeInOutQuad',
      begin: onStart,
      complete: onEnd,
    })
    .add({
      targets: HEADER,
      opacity: 1,
    });
};
