NottsDotNet.ViewModels.EventsSummaryViewModel = function(limit) {
	var self = this;

	self.delegate = {
		initialFetchCompleted: function() { }
	};

	self.events = ko.observableArray();
    
    self.pastEvents = ko.observableArray();

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
			var upcomingEvents = _.first(response.results, limit);
			self.events(upcomingEvents);
			self.delegate.initialFetchCompleted();
            _fetchPastEvents();
		});
	};
    
    var _fetchPastEvents = function () {
        $.ajax({
			type: "GET",
			url: "https://api.meetup.com/2/events",
			crossDomain: true,
			dataType: "jsonp",
			data: {
				group_id: 13372672,
				key: NottsDotNet.Constants.MeetupApiKey,
				sign: true,
				limit: limit,
                status: "past"
			}
		}).done(function(response) {
            var pastEvents = response.results.sort(function (a,b) { 
                if (a.time < b.time) return 1;
                if (b.time < a.time) return -1;
                return 0;
            });
            self.pastEvents(response.results);
        });
    };

	(function init() {
		_fetchEvents();
	})();
}