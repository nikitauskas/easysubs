import { ready } from "./ready"
import Onvix from './onvix';
import Subs from './subs';

chrome.runtime.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js1");
      // ----------------------------------------------------------

      const subsElement = Onvix.createSubsElement();
      const video: HTMLVideoElement = document.querySelector('video');

      Onvix.getSubs("eng")
        .then(function (subs) {
          subsElement.textContent = ""; // Clear subs loading text
          ready('video', function (element: HTMLVideoElement) {
            element.ontimeupdate = (event) => {
              Subs.updateSubs(element, subs, subsElement);
            };

            subsElement.addEventListener("mouseenter", () => {
              element.pause();
            });
            subsElement.addEventListener("mouseleave", () => {
              element.play();
            });
          });
        })
    }
  }, 1000);
});

