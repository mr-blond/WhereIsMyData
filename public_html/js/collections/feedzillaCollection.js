define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var FeedCollection = Backbone.Collection.extend({
    query : '',
    initialize: function(models,options) {

        this.query = options;
    },
    changeQuery : function(options){
         this.query = options;
    },
    url: function () {
        console.log('http://api.feedzilla.com/v1/articles/search.json?culture_code=fr&order=relevance&title_only=1&q='+this.query)
      return 'http://api.feedzilla.com/v1/articles/search.json?culture_code=fr&order=relevance&title_only=1&q='+this.query;
    },
    // Because twitter doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
        console.log(xhr);
      return resp.articles;
    },
    page: 1
    
  });

  return FeedCollection;
});