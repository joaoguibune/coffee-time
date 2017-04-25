angular.module("coffee").directive("awCoffee", function () {
  return {
    restrict: "A",
    scope: {
      coffee: '=awCoffee',
      fnFechar: '&'
    },
    templateUrl: "scripts/components/coffeeDirective/coffee.directive.html",
    link: function (scope, element, attr) {
      element.addClass('filme com-cartaz');

      if (!attr.fnFechar) {
        element.find('button').remove();
      }
    }
  };
})