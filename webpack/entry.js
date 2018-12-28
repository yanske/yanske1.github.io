// Main JS to be compiled and served to Jekyll

import Swup from 'swup';

var MAIN_PAGES = ['/', '/projects.html', '/blog.html']

let accepted_links = []
MAIN_PAGES.forEach(function(link) {
  accepted_links.push('a[href="' + link + '"]');
  accepted_links.push('a[href="' + window.location.origin + link + '"]');
});

let option = {
  elements: ['.content'],
  LINK_SELECTOR: accepted_links.join(' ,'),
  scroll: false,
  debugMode: false
}

const swup = new Swup(option);
swup.on('contentReplaced', function () {
  let nav = document.getElementsByTagName('nav')[0];
  let uls = nav.getElementsByTagName('li');
  var CUR_PATH = window.location.pathname;

  for (let i = 0; i < uls.length; i++) {
    if (uls[i].dataset.target == CUR_PATH) {
      uls[i].classList.add('active');
    } else {
      uls[i].classList.remove('active');
    }
  }
});
