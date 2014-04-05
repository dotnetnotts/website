NottsDotNet.ViewModels.EventsSummaryViewModel = function(limit) {
	var self = this;

	self.delegate = {
		initialFetchCompleted: function() { }
	};

	self.events = ko.observableArray();

	var _fetchEvents = function() {
		$.ajax({
			type: "GET",
			url: "https://api.meetup.com/2/events",
			crossDomain: true,
			dataType: "jsonp",
			data: {
				group_id: 13372672,
				key: NottsDotNet.Constants.MeetupApiKey,
				sign: true,
				limit: limit
			}
		})
		.done(function(response) {
			var upcomingEvents = _.where(response.results, { status: "upcoming", visibility: "public" });
			upcomingEvents = _.first(upcomingEvents, limit);
			self.events(upcomingEvents);
			self.delegate.initialFetchCompleted();
		});
	};

	(function init() {
		_fetchEvents();
	})();
}