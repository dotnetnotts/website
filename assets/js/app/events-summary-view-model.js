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
            fixUpEventImages(upcomingEvents);
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
            
            fixUpEventImages(pastEvents);
            
            self.pastEvents(response.results);
        });
    };

	(function init() {
		_fetchEvents();
	})();
    
    function fixUpEventImages(events) {
        _.forEach(events, function (e) {
            var desc = stripHtml(e.description);
            var avatar = "assets/img/speakers/";
            var twitterHandle = undefined;
            e.avatar = "assets/img/dotnetnotts-avatar-circle.png";
            var parts = desc.split("Twitter @");

            if (parts.length > 1) {
                twitterHandle = parts[1].split(" ")[0];           
            }
            
            if (twitterHandle) {
                e.avatar = avatar + twitterHandle.replace(/\s+/, "")  + ".png";
            }
        });
    }
    
    function stripHtml(html) {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    }
}