define(function (require) {

    "use strict";
    
    
     var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
       
        mySelf =    '';

  return Backbone.View.extend({
    el: $("#content"),
  
    initialize : function(){
         mySelf = this;
        this.model.on('change:position', function(){
            mySelf.render();
        });
        
    },

    render: function(){
      
        
    
      $("#content").html('<p>Position Marker : ' + this.model.get('position'));
    }

  });


  
});
