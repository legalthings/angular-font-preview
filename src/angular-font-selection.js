/*
* https://github.com/legalthings/angular-font-selection
* Copyright (c) 2015 ; Licensed MIT
*/

angular.module('angularFontSelection', []);

angular.module('angularFontSelection').directive('fontSelection', function () {
  'use strict';

  return {
    restrict: 'EA',
    templateUrl: '/vendor/angular-font-selection/src/angular-font-selection.tpl.html',
    replace: true,
    scope: {
      'selection': '=',
      'text': '=',
      'fonts': '='
    },
    link: function (scope, elm, attrs) {
      scope.$watch("text", function (value) {
        var canvas = document.querySelectorAll('canvas');

        for (var i = 0; i < canvas.length; ++i) {
          var ctx = canvas[i].getContext('2d');
          ctx.font = scope.fonts[i].size + " " + scope.fonts[i].family;
          ctx.clearRect(0, 0, canvas[i].width, canvas[i].height);
          ctx.fillText(value, 10, 35);
        }
      });
    },
    controller: ['$scope', function ($scope) {
      if (!$scope.text) $scope.text = "";
      $scope.fontFamily = null;

      $scope.setFont = function (font, $event) {
        $scope.fontFamily = font.family;

        $scope.resetStyling();
        var canvas = document.getElementById(font.family);
        var style = "1px solid red";
        canvas.style.border = canvas.style.border != style ? style : "1px solid black";
      };

      $scope.resetStyling = function () {
        var canvas = document.querySelectorAll('canvas');

        for (var i = 0; i < canvas.length; ++i) {
          canvas[i].style.border = "1px solid black";
        }
      };

      $scope.$watchGroup(['fontFamily', 'text'], function () {
        if ($scope.text == "") return;
        var selCanvas = document.getElementById($scope.fontFamily);
        if (selCanvas == null) return;
        var imgBase64 = selCanvas.toDataURL();
        $scope.selection = { font: $scope.font, dataUrl: imgBase64 };
      });
    }]
  };
});