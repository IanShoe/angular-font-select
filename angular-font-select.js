angular.module('ui.bootstrap.font-group', []).
run(["$templateCache", function($templateCache) {
	$templateCache.put("template/font-group/font-group.html",
		"<div class=\"dropdown\">" +
			"<input class=\"dropdown-toggle font-group-selector\" ng-style=\"{'font-family': font}\" ng-model=\"font\" readonly>" +
			"<div class=\"font-group-options dropdown-menu\">" +
				"<div class=\"font-group-list-item\" ng-repeat=\"fontOption in fonts\" ng-style=\"{'font-family': fontOption}\" ng-class=\"{'active': currentFont == fontOption}\" ng-click=\"selectFont(fontOption)\"><span>{{fontOption}}</span></div>" +
			"</div>" +
		"</div>"
		);
}]).
directive('fontGroup', ['$document', function ($document) {
	return {
		restrict: 'EA',
		scope: {
			fonts: '=',
			font: '='
		},
		templateUrl: 'template/font-group/font-group.html',
		replace: true,
		link: function(scope, element, attrs) {
			scope.currentFont = scope.font || scope.fonts[0];
			var index = scope.fonts.indexOf(scope.currentFont);

			scope.$watch('font', function(newValue){
				if(newValue){
					scope.currentFont = newValue;
					index = scope.fonts.indexOf(scope.currentFont);					
				}
			});

			scope.selectFont = function(font) {
				scope.font = font;
			};

			element.bind('keydown', function (evt) {
				evt.preventDefault();
				if (evt.which === 40) {
					element.addClass('open');
					if(index < scope.fonts.length -1){
						scope.$apply(function(){
							scope.currentFont = scope.fonts[index +1] || scope.fonts[index];
							index++;
						});
					}
				} else if (evt.which === 38) {
					element.addClass('open');
					if(index > 0){
						scope.$apply(function(){
							scope.currentFont = scope.fonts[index -1] || scope.fonts[index];
							index--;
						});
					}
				} else if (evt.which === 13 || evt.which === 9) {
					scope.$apply(function() {
						scope.font = scope.currentFont;
					});
					close();
				} else if (evt.which === 27) {
					index = scope.fonts.indexOf(scope.font);
					evt.stopPropagation();
					close();
				}
			});

			function close() {
				element.trigger('click');
				element.removeClass('open');
				element.focus();
			};
		}
	}
}]);