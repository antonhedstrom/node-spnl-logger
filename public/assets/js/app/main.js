require.config({
  baseUrl: "/assets/js",
  paths: {
      "jquery": "libs/jquery-2.1.1.min.js"
  },
  waitSeconds: 15
});

(function(window) {
  console.log("Testing");
  require([
    'jquery'
  ], function(
  ) {
    console.log("Got jquery");
  });
})(window);
