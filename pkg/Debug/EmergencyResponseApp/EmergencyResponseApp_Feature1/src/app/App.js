(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'directives.dirPagination', 'emergencies', 'ui.bootstrap', 'ui.bootstrap.dialogs', 'services.utilities', 'spNgModule', 'sarsha.spinner'])
        .constant("IS_APP_WEB", false)
        .config(['$routeProvider', function ($routeprovider) {
            $routeprovider
                .when('/dashboard', {
                    templateUrl: 'app/emergencies/emergencies-db.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'dash'
                })
                .when('/listEmergencies', {
                    templateUrl: 'app/emergencies/emergencies-list.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'list'
                })
                .when('/listEmergencies/:id', {
                    templateUrl: 'app/emergencies/emergencies-list.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'list'
                })
                .when('/addEmergency', {
                    templateUrl: 'app/emergencies/emergencies-add.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'add'
                })
                .when('/viewEmergency/:id', {
                    templateUrl: 'app/emergencies/emergencies-add.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'view'
                })
                .when('/addCountryDirResponse/:id', {
                    templateUrl: 'app/emergencies/emergencies-add.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'cdir'
                })
                .when('/addSecurityResponse/:id', {
                    templateUrl: 'app/emergencies/emergencies-add.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'sec'
                })
                .when('/addProgrammesResponse/:id', {
                    templateUrl: 'app/emergencies/emergencies-add.tpl.html',
                    controller: 'emergencyCtrl as ctrl',
                    param: 'hop'
                })
                .otherwise({
                    redirectTo: '/listEmergencies'
                });
        }]);
})();