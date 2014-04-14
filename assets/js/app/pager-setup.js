var viewModel = { 
	home: null,
	events: null,
	sponsors: null,
	venue: null
};

pager.Href.hash = '#!/';
pager.extendWithPage(viewModel);
ko.applyBindings(viewModel);
pager.start();