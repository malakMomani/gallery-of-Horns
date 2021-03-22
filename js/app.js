'use strict';

 function Horn(horn) {
   this.image_url = horn.image_url;
   this.title = horn.title;
   this.description = horn.description;
   this.keyword = horn.keyword;
   this.horns = horn.horns;
 }

 Horn.prototype.render = function() {
  //  console.log("render");
   let clonedTemp = $("#photo-template").clone();
   clonedTemp.find('h2').text(this.title);
   clonedTemp.find('img').attr('src',this.image_url);
   clonedTemp.find('p').text(this.description);
   clonedTemp.removeAttr('id');
   clonedTemp.attr("class", this.name);
   $('section').append(clonedTemp);
  console.log("end render");
 }

 const ajaxSettings = {
  method: "get",
  dataType: "json",
};

$.ajax("data/page-1.json", ajaxSettings).then((data) => {

  console.log("ajax")
  data.forEach((horn) => {
    let hornObject = new Horn(horn);
    hornObject.render();
  });
});