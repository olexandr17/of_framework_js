function pokeapi() {
  var limit = 12;

  var baseURL = "http://pokeapi.co/";

  var listURL = baseURL + "api/v1/pokemon/?limit={l}&offset={o}";
  var detailsURL = baseURL + "api/v1/pokemon/{i}";
  var imageURL = baseURL + "media/img/{i}.png";
  var typesURL = baseURL + "api/v1/type/?limit=999";

  this.getListURL = function(offset) {
    return listURL.replace("{l}", limit).replace("{o}", offset || 0);
  };

  this.getDetailsURL = function(id) {
    return detailsURL.replace("{i}", id);
  };

  this.getImageURL = function(id) {
    return imageURL.replace("{i}", id);
  };

  this.getTypesURL = function() {
    return typesURL;
  };

  this.loadData = function(url, success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            if (success)
              success(xhr.responseText);
        }
    };
    xhr.onerror = function() {
      if (fail)
        fail("loading error (state: " + xhr.readyState + ", status: " + xhr.status + ")");
    };
    xhr.send();
  };

}
