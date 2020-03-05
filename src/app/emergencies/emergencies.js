(function () {
    'use strict';

    angular
        .module('emergencies', ['country.directors', 'services.emergencies'])
        .controller('emergencyCtrl', EmergenciesCtrlFunction);

    EmergenciesCtrlFunction.$inject = ['$q', '$location', '$routeParams', '$route', 'countrydirsvc', 'emergenciesSvc', '$dialogAlert', '$dialogConfirm', 'UtilService', 'spinnerService'];
    function EmergenciesCtrlFunction($q, $location, $routeParams, $route, countrydirsvc, emergenciesSvc, $dialogAlert, $dialogConfirm, UtilService, spinnerService) {
        var ctrl = this;
        ctrl.title = "Add Emergency";
        ctrl.emergency = {};
        ctrl.emergresdir = {};
        ctrl.hostWebUrl = emergenciesSvc.hostWebUrl;
        ctrl.action = $route.current.$$route.param;
        ctrl.userid = _spPageContextInfo.userId;
        spinnerService.show('spinner1');
        if (ctrl.action != 'add' && $routeParams.id) {
            emergenciesSvc
                .fetchEmergencyById($routeParams.id)
                .then(function (res) {
                    ctrl.emergency = res.emerg;
                    ctrl.emergresdir = res.emerdir;
                    ctrl.emergressec = res.emersec;
                    spinnerService.closeAll();
                })
                .catch(function (error) {
                    console.log('An Error Occured!', error);
                });
        }

        var promises = [];
        promises.push(countrydirsvc.getAllItems());
        promises.push(emergenciesSvc.getAllItems());
        promises.push(emergenciesSvc.checkIfUserSecurity());

        $q.all(promises)
            .then(function (results) {
                ctrl.countrydirectors = results[0];
                ctrl.emergencies = results[1];
                ctrl.userinsecurity = results[2];
                ctrl.filterEmergencies = _.cloneDeep(ctrl.emergencies);

                ctrl.totalreq = 0;
                ctrl.countrydir = 0;
                ctrl.security = 0;
                ctrl.completed = 0;

                ctrl.totalreq = ctrl.emergencies.length;
                ctrl.countrydir = _.filter(ctrl.emergencies, ['status', 'Director']).length;
                ctrl.security = _.filter(ctrl.emergencies, ['status', 'Security']).length;
                ctrl.completed = _.filter(ctrl.emergencies, ['status', 'Completed']).length;

                //if (ctrl.action == 'dash' && ctrl.emergencies.length > 0) {
                //    ctrl.totalreq = ctrl.emergencies.length;
                //    ctrl.countrydir = _.filter(ctrl.emergencies, ['status', 'Pending']).length;
                //    ctrl.security = _.filter(ctrl.emergencies, ['status', 'Director']).length;
                //    ctrl.completed = _.filter(ctrl.emergencies, ['status', 'Completed']).length;
                //}

                if (ctrl.action == 'list' && $routeParams.id) {
                    if ($routeParams.id == 0) {
                    } else if ($routeParams.id == 1) {
                        ctrl.emergencies = _.filter(ctrl.emergencies, ['status', 'Director']);
                    } else if ($routeParams.id == 2) {
                        ctrl.emergencies = _.filter(ctrl.emergencies, ['status', 'Security']);
                    } else if ($routeParams.id == 3) {
                        ctrl.emergencies = _.filter(ctrl.emergencies, ['status', 'Completed']);
                    }
                }
                spinnerService.closeAll();
            })
            .catch(function (error) {
                console.log('An Error Occured!', error);
            });

        ctrl.addEmergency = function () {
            $dialogConfirm('Add Record?', 'Confirm Transaction')
                .then(function () {
                    spinnerService.show('spinner1');
                    if (ctrl.action == 'add') {
                        emergenciesSvc
                            .addEmergency(ctrl.emergency)
                            .then(function (res) {
                                ctrl.emergencies = res;
                                UtilService.showSuccessMessage('#notification-area', 'Emergency Details Added Successfully!');
                                $location.path("/listEmergencies");
                                spinnerService.closeAll();
                            })
                            .catch(function (error) {
                                $dialogAlert(error, 'Unable to add record');
                            });
                    } else if (ctrl.action == 'cdir') {
                        ctrl.emergresdir.id = $routeParams.id;
                        emergenciesSvc
                            .addDirectorResponse(ctrl.emergresdir)
                            .then(function (res) {
                                ctrl.emergencies = res;
                                UtilService.showSuccessMessage('#notification-area', 'Coutry Director Response Added Successfully!');
                                $location.path("/listEmergencies");
                                spinnerService.closeAll();
                            })
                            .catch(function (error) {
                                $dialogAlert(error, 'Unable to add record');
                            });
                    } else if (ctrl.action == 'sec') {
                        ctrl.emergressec.id = $routeParams.id;
                        emergenciesSvc
                            .addSecurityComments(ctrl.emergressec)
                            .then(function (res) {
                                ctrl.emergencies = res;
                                UtilService.showSuccessMessage('#notification-area', 'Safety Committee Response Added Successfully!');
                                $location.path("/listEmergencies");
                                spinnerService.closeAll();
                            })
                            .catch(function (error) {
                                $dialogAlert(error, 'Unable to add record');
                            });
                    }
                });
        };

        ctrl.filterByEmergencyReportDates = function () {
            ctrl.emergencies = ctrl.filterEmergencies;
            ctrl.emergencies = _.filter(ctrl.emergencies, function (emergency) {
                var createddate = new Date(emergency.created.getFullYear(), emergency.created.getMonth(), emergency.created.getDate());
                return (createddate >= ctrl.sStartDate && createddate <= ctrl.sEndDate);
            });
        };

        ctrl.init = function () {
            $route.reload();
        };

        ctrl.deleteEmergency = function (id) {
            $dialogConfirm('Delete Record?', 'Confirm Transaction')
                .then(function () {
                    emergenciesSvc
                        .DeleteEmergency(id)
                        .then(function (res) {
                            ctrl.emergencies = res;
                        })
                        .catch(function (error) {
                            $dialogAlert(error, 'Unable to add record');
                        })
                });
        };
    }
})();