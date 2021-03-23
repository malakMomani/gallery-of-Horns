'use strict';

let keywords = [];
let hornsArr = [];
const ajaxSettings = {
  method: "get",
  dataType: "json",
};

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  this.class = horn.class;
  hornsArr.push(this);
}

// using jQuery clone
// Horn.prototype.render = function () {
//   //  console.log("render");
//   let clonedTemp = $("#photo-template").clone();
//   clonedTemp.find('h2').text(this.title);
//   clonedTemp.find('img').attr('src', this.image_url);
//   clonedTemp.find('p').text(this.description);
//   clonedTemp.removeAttr('id');
//   clonedTemp.attr("class", "cloneDivs");
//   $('#gallery').append(clonedTemp);
//   // console.log("end render");
// }



// using mustache
Horn.prototype.renderGallery = function () {
  let template = $("#photo-template").html();
  let clonedHtml = Mustache.render(template, this);
  $('#gallery').append(clonedHtml);

}


Horn.prototype.extractKeywords = function () {
  let key = this.keyword;
  if (!(keywords.includes(key))) {
    keywords.push(key);
  }
}

renderPage('data/page-1.json');

$("#pages").on("click", (event) => {
  //console.log(event.target.id);
  hornsArr = [];

  switch (event.target.id) {
    case 'page1':
      $("#photo-template div").nextAll().remove();
      renderPage('data/page-1.json')
      break;
    case 'page2':
      $("#photo-template div").nextAll().remove();
      renderPage('data/page-2.json')
      break;
    default:
      break;
  }
})

$("select").on("change", (event) => {
  //console.log(event.target.value);
  removeOld();
  $('#photo-template').html();
  hornsArr.forEach((element) => {
    if (element.keyword === event.target.value) {
      element.renderGallery();
    }
  });
});

$('#sorting').on('click', (event) => {
  //console.log(event.target.id);
  switch (event.target.id) {
    case 'byTitle':
      sortHornsByTitle(hornsArr);
      removeOld();
      $('#byNum').removeAttr('checked');
      hornsArr.forEach((horn) => {
        horn.renderGallery();
      });
      break;
    case 'byNum':
      sortHornsByNum(hornsArr)
      removeOld();
      $('#byTitle').removeAttr('checked');
      hornsArr.forEach((horn) => {
        horn.renderGallery();
      });
      break;
    default:
      break;
  }
});

function renderPage(fileName) {

  $.ajax(fileName, ajaxSettings).then((data) => {
    keywords = [];
    removeOld();
    data.forEach((horn) => {
      let hornObject = new Horn(horn);
      hornObject.extractKeywords();

    });
    if ($('#byTitle').is(':checked')) {
      sortHornsByTitle(hornsArr);
    } else if ($('#byNum').is(':checked')) {
      sortHornsByNum(hornsArr);
    }
    addList();
    hornsArr.forEach((horn) => {
      horn.renderGallery();
    });
  });

}


function addList() {
  //console.log(keywords);
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  for (let index = 0; index < keywords.length; index++) {
    //console.log(keywords.length);
    $('select').append(`<option value= "${keywords[index]}">${keywords[index]}</option>`);
  }
}

function sortHornsByTitle(horns) {
  horns.sort((hornTitle1, hornTitle2) => {
    if (hornTitle1.title.toLowerCase() < hornTitle2.title.toLowerCase()) {
      return -1;
    }
    if (hornTitle1.title.toLowerCase() > hornTitle2.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

function sortHornsByNum(horns) {
  horns.sort((hornTitle1, hornTitle2) => {
    if (hornTitle1.horns < hornTitle2.horns) {
      return -1;
    }
    if (hornTitle1.horns > hornTitle2.horns) {
      return 1;
    }
    return 0;
  });
}

function removeOld() {
  $('.page1').remove();
  $('.page2').remove();
}