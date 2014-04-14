var dotnetnotts = {};
dotnetnotts.Plugins = {
    initSocialNetworkIcons: function() {
        $(".social-networks li a").hover(function() {
            $(this).children('.normal').animate({
                marginTop: '-31px'
            }, 200);
        }, 
        function() {
            $(this).children('.normal').animate({
                marginTop: '0px'
            }, 200);
        });
    },
    initBrowserPlaceholder: function() {
        $('input, textarea').placeholder();
    }
};