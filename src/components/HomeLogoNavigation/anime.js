import anime from "animejs/lib/anime.es.js";
import * as Utils from "../../utils";

const HOME_LOGO_CONTAINER = `.${Utils.getElClass(
  "component",
  "homeLogo-container"
)}`;
const COMING_SOON_TEXT = `.coming-soon span:first-child`;
const ISH_TEXT = `.coming-soon span:last-child`;

export default (onStart = undefined, onEnd = undefined) => {
  return anime
    .timeline({
      autoplay: false,
      delay: 4000,
      duration: 5000,
      easing: "easeInOutQuad",
      begin: onStart,
      complete: onEnd,
    })
    .add({
      targets: HOME_LOGO_CONTAINER,
      opacity: 1,
    })
    .add(
      {
        targets: COMING_SOON_TEXT,
        opacity: 1,
        duration: 2000,
      },
      "-=4000"
    )
    .add(
      {
        targets: ISH_TEXT,
        opacity: 1,
        duration: 1000,
      },
      "-=1500"
    );
};
