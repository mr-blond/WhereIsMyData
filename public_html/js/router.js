// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/twitter/TwitterView',
  'views/feedzilla/feedzillaView',
  'views/footer/FooterView',
  'views/MainView',
  'models/map/MarkerModel'
], function($, _, Backbone, TwitterView,FeedZilla,FooterView,MainView,MarkerModel) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
        
      //------------
      'twitter':'showTwitter',
      // Define some URL routes
      'feedzilla': 'showFeedzilla',
      'googleplace': 'showGoogleplace',
      
      // Default
      '*actions': 'showTwitter'
    }
  });
  
  var initialize = function(){
    
    var app_router = new AppRouter;
    var markerModel = new MarkerModel();
    console.log(markerModel.get('position'));
    var mainView = new MainView({model:markerModel});
     mainView.render();  
    app_router.on('route:showTwitter', function(){
    
    
   
        // Call render on the module we loaded in via the dependency array
        var twitterView = new TwitterView({model:markerModel});
        twitterView.render();

    });
    app_router.on('route:showFeedzilla', function(){
   
        // Call render on the module we loaded in via the dependency array
        var feedzillaView = new FeedZilla({model:markerModel});
        feedzillaView.render();

    });

    

    

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    var footerView = new FooterView();

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
