define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone')
        return Backbone.Model.extend({

           
            // ici sont les propriété pour décrire l'objet Marker
            defaults: {
                position:new google.maps.LatLng(45.8972327, 6.1252035999999634),
                draggable: true,
                city : 'annecy'
            }
            

        });

    

});