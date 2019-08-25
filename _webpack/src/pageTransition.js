import Swup from 'swup';

const mainPages = ['/', '/projects.html', '/blog.html']
const option = {
  containers: ['.content'],
  linkSelector: mainPages.map(link => 'a[href="' + link + '"]').join(' ,'),
}

const swup = new Swup(option);
swup.on('contentReplaced', function () {
  const nav = document.getElementsByTagName('nav')[0];
  const tabs = nav.getElementsByTagName('li');

  for (var tab of tabs) {
    if (tab.dataset.target == window.location.pathname) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  }
});

module.exports = swup;
