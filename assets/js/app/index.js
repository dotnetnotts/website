var gurequire = function(viewModelFactory) {
	var self = this;

	var _viewModels = [];
	var _viewModelFactory = viewModelFactory;

	self.getViewModel = function(id) {
		var viewModel = _viewModels[id];
		if (!viewModel) {
			viewModel = _viewModelFactory.initViewModel(id);
			_viewModels[id] = viewModel;
		}
		return viewModel;
	};
};

var viewModelFactory = {
	initViewModel: function(id) {
		switch (id) {
			case "home":
				return new NottsDotNet.ViewModels.EventsSummaryViewModel(1);

			case "events":
				return new NottsDotNet.ViewModels.EventsSummaryViewModel(10);
		}
	}
};

var require = new gurequire(viewModelFactory);

var getViewModel = function(callback, page) {
	var viewModel = require.getViewModel(page.id());
	callback(viewModel);

};

var venueOnShow = function(callback, page) {
    var location = new google.maps.LatLng(52.952751,-1.144389);

    var mapOptions = {
      	zoom: 13,
      	center: location,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: false,
      	draggable: false
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var contentString = '<p style="line-height: 20px;"><strong>Eve\'s Cafe</strong></p><p>Lace Market Square, Nottingham<br /><a href="https://www.google.co.uk/maps/place/Nottingham/@52.9527845,-1.144595,17z/data=!3m1!4b1!4m2!3m1!1s0x4879c17d8e55f2c7:0x41df8e6b8e905e01">Get directions</a></p>';

    var infowindow = new google.maps.InfoWindow({
      	content: contentString
    });

    var marker = new google.maps.Marker({
      	position: location,
      	map: map,
      	title: "Venue"
    });

    google.maps.event.addListener(marker, "click", function() {
      	infowindow.open(map, marker);
    });
};

var globalOnShow = function(callback, page) {
    dotnetnotts.Plugins.initSocialNetworkIcons();
    dotnetnotts.Plugins.initBrowserPlaceholder();
}
