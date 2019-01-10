$(document).ready(function(){
  $("body").on("click",".add_site_btn",function(e){
      window.open(chrome.runtime.getURL("/add_sites/add_site.html"));
      window.close();
  });

});
