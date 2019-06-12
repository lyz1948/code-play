requirejs.config({
  paths: {
    ramda: 'https://cdn.bootcss.com/ramda/0.13.0/ramda.min',
    jquery: 'https://cdn.bootcss.com/jquery/2.2.2/jquery.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function (_, $) {
    ////////////////////////////////////////////
    // Utils

    var Impure = {
      getJSON: _.curry(function(callback, url) {
        $.getJSON(url, callback);
      }),

      setHtml: _.curry(function(sel, html) {
        $(sel).html(html);
      })
    };

    var img = function (url) {
      return $('<img />', { src: url });
    };

    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });

    var url = function (t) {
      return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + t + '&format=json&jsoncallback=?';
    };

    var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

    var srcs = _.compose(_.map(mediaUrl), _.prop('items'));

    var images = _.compose(_.map(img), srcs);

    var renderImages = _.compose(Impure.setHtml($('#container')), images);

    var app = _.compose(Impure.getJSON(renderImages), url);

    var input = document.getElementById('input');
    app("cats");

    var btn = document.getElementById('btn')
    btn.onclick = function() {
      app(input.value)
    }
  });