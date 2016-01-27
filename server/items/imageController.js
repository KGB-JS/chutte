var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: 'chutte',
	api_key: 'api_key',
	api_secret: 'api_secret'
});

module.exports = {
	getImageUrl: function (file) {
		cloudinary.uploader.upload(file, function(result){
			return result.secure_url;
		})
	}
}