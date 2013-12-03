define(function (require) {

    "use strict";
    
    
     var $                  = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        FeedZillaCollection = require('collections/feedzillaCollection'),
        mySelf =    '',
        FeedsListTemplate = require('text!templates/feeds/feeds.html');

  return Backbone.View.extend({
    el: $("#content"),
    currentCity : 'annecy',
    initialize : function(){
        mySelf = this;
        this.isLoading = false;
        this.feedzillaCollection = new FeedZillaCollection([],this.currentCity);
        this.model.on('change:position', function(){
            if(mySelf.currentCity === mySelf.model.get('city') ){
               $("#content").html("La région pointé n'est pas une ville");  
            }else{
                mySelf.feedzillaCollection.changeQuery(mySelf.model.get('city'));
                mySelf.render();
            }
        });
        
        
    },

    render: function(){
      
      this.loadResults();
    },
    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.feedzillaCollection.fetch({ 
        success: function (feeds) {
            console.log(feeds);
          // Once the results are returned lets populate our template
          if(feeds.length>0){
            $("#content").html(_.template(FeedsListTemplate, {feeds: feeds.models, _:_}));              
          }else{
             $("#content").html("Cette ville n'est pas apparu récament dans la presse") 
          }
          // Now we have finished loading set isLoading back to false
          //$("#content").html('<p>feedzilla Position Marker : ' + this.model.get('position'));
          that.isLoading = false;
        }
      });      
    },

  });


  
});
