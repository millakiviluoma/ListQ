
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 


document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function onPhotoURISuccess(imageURI) {

  var largeImage = document.getElementById('largeImage');

  largeImage.style.display = 'inline';

  largeImage.src = imageURI;
    
    $('#listat').css("background-image", "url("+imageURI+")");
    $('imageURI').css("transform", "rotate(90deg)");
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100,
    saveToPhotoAlbum: true });
}
        
function getPhoto() {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM });
    }

function onFail(message) {
  alert('Failed because: ' + message);
}
