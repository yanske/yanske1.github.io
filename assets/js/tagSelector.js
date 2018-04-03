function onTagClick(tagId) {
  setTagActive(tagId);
  filterElements(tagId);
}

function setTagActive(tagId) {
  var tags = document.getElementsByClassName('tag')
  for(var i = 0; i < tags.length; i++) {
    var content = tags[i].textContent.replace(/^\s+|\s+$/g, '');
    if (content == tagId) {
      tags[i].setAttribute('class', 'tag active');
    } else {
      tags[i].setAttribute('class', 'tag')
    }
  }
}

function filterElements(tagId) {
  var projects = document.getElementsByClassName('project');
  for(var i = 0; i < projects.length; i++) {
    var project_tags = projects[i].getElementsByClassName('hidden-tag');
    let contains_tag = false;
    for(var j = 0; j < project_tags.length; j++) {
      var hidden_tag = project_tags[j].textContent.replace(/^\s+|\s+$/g, '');
      if (hidden_tag == tagId) {
        contains_tag = true;
        break;
      }
    }

    if (contains_tag || tagId == 'All') {
      projects[i].setAttribute('class', 'project');
    } else {
      projects[i].setAttribute('class', 'project hidden');
    }
  }
}
