"use strict";

var imageContainer = document.getElementById('image-container');
var loader = document.getElementById('loader');
var ready = false;
var imagesLoaded = 0;
var totalImages = 0;
var photoArray = []; // Unsplah API

var count = 10;
var apiKey = 'S6Ho3qnuO99eZSMIBwsP4SDtyHm4t-rbxWPz5Qh40RM';
var apiUrl = "https://api.unsplash.com/photos/random/?client_id=".concat(apiKey, "&count=").concat(count); // Check if all image were loaded

function imageLoaded() {
  console.log(imagesLoaded);
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
} // Helper Funtion to set Attributes on DOM Elements


function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
} // Create Elements From Links & Photos, Add to DOM


function displayPhotos() {
  imagesLoaded = 0; // Reset imageLoaded = 0

  totalImages = photoArray.length;
  console.log('total images', totalImages); // Run function for each object in photosArray

  photoArray.forEach(function (photo) {
    // Create <a> to link to Unsplash
    var item = document.createElement('a'); // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    }); // Create <img> for photo

    var img = document.createElement('img'); // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    }); // Event Listener, check when each is finished loading

    img.addEventListener('load', imageLoaded); // Put <img> inside <a>, then put both inside imageContainer Element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
} // Get photos from nsplah API


function getPhotos() {
  var response;
  return regeneratorRuntime.async(function getPhotos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(apiUrl));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          photoArray = _context.sent;
          displayPhotos();
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
} //  Check to see if scrolling near bottom of page, Load More Photos


window.addEventListener('scroll', function () {
  // "&& ready" - ready neeeded to be true
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false; // Set ready to be ready again

    getPhotos();
    console.log('Load More');
  }
});
getPhotos();