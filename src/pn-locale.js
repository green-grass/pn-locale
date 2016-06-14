(function () {

    'use strict';

    var module = angular.module('pnLocale', ['ngResource']);

    module.directive('pnLocale', ['$resource',
        function ($resource) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var url = attrs.pnLocale;
                    $resource(url).get(function (resources) {
                        for (var name in resources) {
                            var resource = resources[name];
                            if (typeof resource === 'string' && resource.indexOf('{') !== -1) {
                                resources['format' + name] = (function (resource) {
                                    return function (params) {
                                        var result = resource;
                                        for (var paramKey in params) {
                                            result = result.replace('{' + paramKey + '}',
                                                params[paramKey] !== undefined && params[paramKey] !== null ? params[paramKey] : '');
                                        }
                                        return result;
                                    };
                                })(resource);
                            }
                        }
                        scope.locale = resources;
                    });
                }
            };
        }
    ]);

})();
