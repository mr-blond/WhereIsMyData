define(function (require) {

    "use strict";
    
    
     var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        mapTemplate = require('text!templates/map/mapTemplate.html'),
        mySelf = '';
        
        
  return Backbone.View.extend({
    el: $("#map-canvas"),
    initialPlace:'',
    marker:'',
    mapOptions:'',
    map:'',
    geocoder:'',

    initialize : function(){
        mySelf = this;
        this.geocoder = new google.maps.Geocoder();
        var currentPosition = this.model.get('position');
        this.initialPlace =  new google.maps.LatLng(currentPosition.ob, currentPosition.pb);
        this.mapOptions = {
           zoom: 4,
           mapTypeId: google.maps.MapTypeId.ROADMAP,
           center: this.initialPlace
         };
        this.map = new google.maps.Map(window.document.getElementById('map-canvas'), this.mapOptions);

       this.marker = new google.maps.Marker({
         map:this.map,
         draggable:this.model.get('draggable'),
         position: this.initialPlace
       });
       
       google.maps.event.addListener(this.marker, 'mouseup', function() {
           //console.log(mySelf.marker.getPosition());
           mySelf.changeValueOfMarkerModel();
        });
    },
    
    changeValueOfMarkerModel : function(){
        console.log(this.marker);
        this.model.set('position',this.marker.getPosition());
        mySelf.geocoder.geocode({'latLng': this.marker.getPosition()}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                  for (var i = 0; i < results[1].address_components.length; i++) {
                    for (var j = 0; j < results[1].address_components[i].types.length; j++) {
                        if(results[1].address_components[i].types[j] == 'locality') {
                            var city_name = results[1].address_components[i].long_name;
                            //alert(city_name);
                            mySelf.model.set({'city':city_name});
                        }
                    }
                }
              } else {
                alert('No results found');
              }
            } else {
              alert('Geocoder failed due to: ' + status);
            }
          });
    },
    render: function(){
      
        
        

 
    }

  });


  
});
