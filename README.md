# Angular Font Selection

Angular directive to display and select a font using canvases.

## Installation

    bower install angular-font-selection --save

## Usage

```js
angular.module('app', [
  'fontSelection'
]);

angular.module('app').controller('typeController', function ($scope) {
  $scope.fonts = [
    { name: "Arial", family: "arial", size: "25px" },
    { name: "Verdana", family: "verdana", size: "25px" },
    { name: "Georgia", family: "georgia", size: "25px" },
    { name: "Times New Roman", family: "times new roman", size: "25px" }
  ];

  $scope.$watch('selectedFont', function () {
    var font = $scope.selectedFont.font;
    var dataURL = $scope.selectedFont.dataUrl;
    
    // Use font and/or dataURL
  });
});
```

```html
<input ng-model="myText">
<font-selection text="myText" selection="selectedFont" fonts="fonts"></font-selection>
```
