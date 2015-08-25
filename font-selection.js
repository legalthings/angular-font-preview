/*
* https://github.com/legalthings/angular-font-selection
* Copyright (c) 2015 ; Licensed MIT
*/

angular.module('fontSelection', []);

angular.module('fontSelection').directive('fontSelection', function () {
  'use strict';

  return {
    restrict: 'EA',
    template: '\
    <div class="font-preview-container">\
      <div ng-repeat="font in fonts">\
        <div class="font-preview" style="font-family:{{font.family}};font-size:{{font.size}};">\
          <canvas id="{{font.family}}" width="1" height="1" ng-click="setFont(font)">\
        </div>\
      </div>\
    </div>\
    ',
    replace: true,
    scope: {
      'selection': '=',
      'text': '=',
      'fonts': '=',
      'width': '@',
      'height': '@'
    },
    link: function (scope, elm, attrs) {
      scope.$watch("text", function (value) {
        var canvas = document.querySelectorAll('canvas');
        
        if (!scope.width) scope.width = 300;
        if (!scope.height) scope.height = 50;

        for (var i = 0; i < canvas.length; ++i) {
          canvas[i].width = scope.width;          
          canvas[i].height = scope.height;
          
          var ctx = canvas[i].getContext('2d');
          ctx.font = scope.fonts[i].size + " " + scope.fonts[i].family;
          ctx.clearRect(0, 0, scope.width, scope.height);
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
        $scope.selection = { font: $scope.fontFamily, dataUrl: imgBase64 };
      });
    }]
  };
});