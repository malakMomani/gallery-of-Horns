'use strict';

const keywords = [];
const hornsArr = [];
function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  hornsArr.push(this);
}

Horn.prototype.render = function () {
  //  console.log("render");
  let clonedTemp = $("#photo-template").clone();
  clonedTemp.find('h2').text(this.title);
  clonedTemp.find('img').attr('src', this.image_url);
  clonedTemp.find('p').text(this.description);
  clonedTemp.removeAttr('id');
  clonedTemp.attr("class", "cloneDivs");
  $('section').append(clonedTemp);
  // console.log("end render");
}

Horn.prototype.extractKeywords = function () {
  let key = this.keyword;
  if (!(keywords.includes(key))) {
    keywords.push(key);
  }
}


const ajaxSettings = {
  method: "get",
  dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {

  console.log("ajax")
  data.forEach((horn) => {
    let hornObject = new Horn(horn);
    
    hornObject.extractKeywords();
    hornObject.render();
  });
  addList();

});

function addList() {
  //console.log(keywords);
  for (let index = 0; index < keywords.length; index++) {
    //console.log(keywords.length);
    $('select').append(`<option value= "${keywords[index]}">${keywords[index]}</option>`);
  }
}

$("select").on("change",(event)=> {
  //console.log(event.target.value);
  $('.cloneDivs').remove();
  hornsArr.forEach((element) => {
    if(element.keyword === event.target.value){
      element.render();
    }
  });
});
