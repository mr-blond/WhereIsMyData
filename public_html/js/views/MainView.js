define(function (require) {

    "use strict";
    
    
     var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        MapView             = require('views/map/MapView'),
      //  ContentView             = require('views/ContentView'),
        MainTemplate = require('text!templates/Main.html');
        
 


  return Backbone.View.extend({
    el: $("#main"),
   

    render: function(){
      
    
        this.$el.html(MainTemplate);
        
        
        //var contentView = new ContentView({model:this.model});
        var mapView = new MapView({model:this.model});
        
        mapView.render();
        //contentView.render();
    }

  });


  
});
