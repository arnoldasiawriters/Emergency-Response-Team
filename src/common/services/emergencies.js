(function () {
    'use strict';

    angular
        .module('services.emergencies', [])
        .service('emergenciesSvc', EmergenciesSvcFunction);

    EmergenciesSvcFunction.$inject = ['$q', 'ShptRestService'];
    function EmergenciesSvcFunction($q, ShptRestService) {
        var svc = this;        
        var curUserName = _spPageContextInfo.userDisplayName;
        var curUserId = _spPageContextInfo.userId;
        
        var emergList = null;
        var listname = 'EmergencyResponseDetails';
        svc.hostWebUrl = ShptRestService.hostWebUrl;
        svc.getAllItems = function () {
            var defer = $q.defer();
            var queryParams = "$select=Id,Title,EmergencyCountry,Author/Id,Author/Title,Created,ResponseStatus&$expand=Author";

            ShptRestService
                .getListItems(listname, queryParams)
                .then(function (data) {
                    emergList = [];
                    _.forEach(data.results, function (o) {
                        var emerg = {};
                        emerg.id = o.Id;
                        emerg.title = o.Title;
                        emerg.country = o.EmergencyCountry;
                        emerg.created = new Date(o.Created);
                        emerg.author = _.isNil(o.Author) ? "" : { id: o.Author.Id, title: o.Author.Title };
                        emerg.status = o.ResponseStatus;
                        emergList.push(emerg);
                    });
                    defer.resolve(emergList);
                })
                .catch(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        };

        svc.addEmergency = function (emerg) {
            var defer = $q.defer();
            var data = {
                Title: emerg.title,
                EmergencyCountry: emerg.country.country,
                DisasterLocation: emerg.disasterlocation,
                PrimaryActorsAffected: emerg.primaryactorsaffected,
                PrimaryDisaster: emerg.primarydisaster,
                SecondaryDisaster: emerg.secondarydisaster,
                Impact: emerg.impact,
                PrimaryNeeds: emerg.primaryneeds,
                PrimaryNeedsMet: emerg.primaryneedsmet,
                EmergingNeeds: emerg.emergingneeds,
                PartnersCapacity: emerg.partnerscapacity,
                ExistingProgrammes: emerg.existingprogrammes,
                StaffCapacity: emerg.staffcapacity,
                CommunityVolunteers: emerg.communityvolunteers,
                NationalVolunteers: emerg.nationalvolunteers,
                InternationalVolunteers: emerg.internationalvolunteers,
                NationalCoordination: emerg.nationalcoordination,
                AgenciesIdentified: emerg.agenciesidentified,
                ResponseStatus: 'Director'
            };

            ShptRestService
                .createNewListItem(listname, data)
                .then(function (response) {
                    var emg = {};
                    emg.id = response.ID;
                    emg.title = emerg.title;
                    emg.country = emerg.country;
                    emg.created = response.Created;
                    emg.author = _.isNil(response.AuthorId) ? "" : { id: response.AuthorId, title: curUserName };
                    emg.status = 'Director';
                    emergList.push(emg);
                    defer.resolve(emergList);
                })
                .catch(function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        };

        svc.addDirectorResponse = function (emergresdir) {
            var defer = $q.defer();
            var data = {
                Title: 'Country Director Response',
                EmergencyResponseId: emergresdir.id,
                DisasterLocation: emergresdir.disasterlocation,
                PrimaryActorsAffected: emergresdir.primaryactorsaffected,
                PrimaryDisaster: emergresdir.primarydisaster,
                SecondaryDisaster: emergresdir.secondarydisaster,
                Impact: emergresdir.impact,
                PrimaryNeeds: emergresdir.primaryneeds,
                PrimaryNeedsMet: emergresdir.primaryneedsmet,
                EmergingNeeds: emergresdir.emergingneeds,
                PartnersCapacity: emergresdir.partnerscapacity,
                ExistingProgrammes: emergresdir.existingprogrammes,
                StaffCapacity: emergresdir.staffcapacity,
                CommunityVolunteers: emergresdir.communityvolunteers,
                NationalVolunteers: emergresdir.nationalvolunteers,
                InternationalVolunteers: emergresdir.internationalvolunteers,
                NationalCoordination: emergresdir.nationalcoordination,
                AgenciesIdentified: emergresdir.agenciesidentified,
                GeneralComments: emergresdir.generalcomments,
                MoralResponsibility: emergresdir.moralresponsibiity,
                Reputation: emergresdir.reputation,
                Accountability: emergresdir.accountability,
                ProgramGrowth: emergresdir.programgrowth
            };

            ShptRestService
                .createNewListItem('CountryDirectorResponses', data)
                .then(function (response) {
                    var dt = {
                        ResponseStatus: 'Security'
                    };
                    ShptRestService
                        .updateListItem('EmergencyResponseDetails', emergresdir.id, dt)
                        .then(function (res) {
                            _.forEach(emergList, function (o) {
                                if (o.id == emergresdir.id) {
                                    o.status = 'Security';
                                }
                            });
                            defer.resolve(emergList);
                        })
                        .catch(function (error) {
                            defer.reject(error);
                        });
                })
                .catch(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        };

        svc.addSecurityComments = function (emergressec) {
            var defer = $q.defer();
            var data = {
                Title: 'Safety Committee Response',
                EmergencyResponseId: emergressec.id,
                SafetyComments: emergressec.safetycomments
            };

            ShptRestService
                .createNewListItem('SafetyCommitteeResponses', data)
                .then(function (response) {
                    var dt = {
                        ResponseStatus: 'Completed'
                    };
                    ShptRestService
                        .updateListItem('EmergencyResponseDetails', emergressec.id, dt)
                        .then(function (res) {
                            _.forEach(emergList, function (o) {
                                if (o.id == emergressec.id) {
                                    o.status = 'Completed';
                                }
                            });
                            defer.resolve(emergList);
                        })
                        .catch(function (error) {
                            defer.reject(error);
                        });
                })
                .catch(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        };

        svc.fetchEmergencyById = function (id) {
            var defer = $q.defer();
            var promisesEmerg = [];
            
            var queryParams = "$select=Id,Title,EmergencyCountry,Author/Id,Author/Title,Created,DisasterLocation,PrimaryActorsAffected,PrimaryDisaster," +
                "SecondaryDisaster,Impact,PrimaryNeeds,PrimaryNeedsMet,EmergingNeeds,PartnersCapacity,ExistingProgrammes,StaffCapacity,CommunityVolunteers," +
                "NationalVolunteers,InternationalVolunteers,NationalCoordination,AgenciesIdentified,ResponseStatus&$expand=Author&$filter=ID eq " + id;

            var query = '$select=Id,Title,EmergencyResponse/Id,EmergencyResponse/Title,Author/Id,Author/Title,Created,DisasterLocation,' +
                'PrimaryActorsAffected,PrimaryDisaster,SecondaryDisaster,Impact,PrimaryNeeds,PrimaryNeedsMet,EmergingNeeds,PartnersCapacity,' +
                'ExistingProgrammes,StaffCapacity,CommunityVolunteers,NationalVolunteers,InternationalVolunteers,NationalCoordination,AgenciesIdentified,' +
                'GeneralComments,MoralResponsibility,Reputation,Accountability,ProgramGrowth&$expand=Author,EmergencyResponse&$filter=EmergencyResponse/Id eq ' + id;

            var querysec = '$select=Id,Title,EmergencyResponse/Id,EmergencyResponse/Title,Author/Id,Author/Title,Created,SafetyComments&$expand=Author,' +
                'EmergencyResponse&$filter=EmergencyResponse/Id eq ' + id;


            promisesEmerg.push(ShptRestService.getListItems(listname, queryParams));
            promisesEmerg.push(ShptRestService.getListItems('CountryDirectorResponses', query));
            promisesEmerg.push(ShptRestService.getListItems('SafetyCommitteeResponses', querysec));

            $q
                .all(promisesEmerg)
                .then(function (promisesEmergRes) {
                    var data = promisesEmergRes[0];
                    var resData = promisesEmergRes[1];
                    var secData = promisesEmergRes[2];

                    var emerg = {};
                    if (data.results.length > 0) {
                        emerg.id = data.results[0].Id;
                        emerg.title = data.results[0].Title;
                        emerg.country = data.results[0].EmergencyCountry;
                        emerg.created = data.results[0].Created;
                        emerg.author = _.isNil(data.results[0].Author) ? "" : { id: data.results[0].Author.Id, title: data.results[0].Author.Title };
                        emerg.disasterlocation = data.results[0].DisasterLocation;
                        emerg.primaryactorsaffected = data.results[0].PrimaryActorsAffected;
                        emerg.primarydisaster = data.results[0].PrimaryDisaster;
                        emerg.secondarydisaster = data.results[0].SecondaryDisaster;
                        emerg.impact = data.results[0].Impact;
                        emerg.primaryneeds = data.results[0].PrimaryNeeds;
                        emerg.primaryneedsmet = data.results[0].PrimaryNeedsMet;
                        emerg.emergingneeds = data.results[0].EmergingNeeds;
                        emerg.partnerscapacity = data.results[0].PartnersCapacity;
                        emerg.existingprogrammes = data.results[0].ExistingProgrammes;
                        emerg.staffcapacity = data.results[0].StaffCapacity;
                        emerg.communityvolunteers = data.results[0].CommunityVolunteers;
                        emerg.nationalvolunteers = data.results[0].NationalVolunteers;
                        emerg.internationalvolunteers = data.results[0].InternationalVolunteers;
                        emerg.nationalcoordination = data.results[0].NationalCoordination;
                        emerg.agenciesidentified = data.results[0].AgenciesIdentified;
                        emerg.status = data.results[0].ResponseStatus;
                    }

                    var emerdir = {};
                    if (resData.results.length > 0) {
                        emerdir.id = resData.results[0].Id;
                        emerdir.primarydisaster = resData.results[0].PrimaryDisaster;
                        emerdir.secondarydisaster = resData.results[0].SecondaryDisaster;
                        emerdir.disasterlocation = resData.results[0].DisasterLocation;
                        emerdir.primaryactorsaffected = resData.results[0].PrimaryActorsAffected;
                        emerdir.impact = resData.results[0].Impact;
                        emerdir.primaryneeds = resData.results[0].PrimaryNeeds;
                        emerdir.primaryneedsmet = resData.results[0].PrimaryNeedsMet;
                        emerdir.emergingneeds = resData.results[0].EmergingNeeds;
                        emerdir.partnerscapacity = resData.results[0].PartnersCapacity;
                        emerdir.existingprogrammes = resData.results[0].ExistingProgrammes;
                        emerdir.staffcapacity = resData.results[0].StaffCapacity;
                        emerdir.communityvolunteers = resData.results[0].CommunityVolunteers;
                        emerdir.nationalvolunteers = resData.results[0].NationalVolunteers;
                        emerdir.internationalvolunteers = resData.results[0].InternationalVolunteers;
                        emerdir.nationalcoordination = resData.results[0].NationalCoordination;
                        emerdir.agenciesidentified = resData.results[0].AgenciesIdentified;
                        emerdir.generalcomments = resData.results[0].GeneralComments;
                        emerdir.moralresponsibiity = resData.results[0].MoralResponsibility;
                        emerdir.reputation = resData.results[0].Reputation;
                        emerdir.accountability = resData.results[0].Accountability;
                        emerdir.programgrowth = resData.results[0].ProgramGrowth;
                    }

                    var emersec = {};
                    if (secData.results.length > 0) {
                        emersec.id = secData.results[0].Id;
                        emersec.title = secData.results[0].Title;
                        emersec.safetycomments = secData.results[0].SafetyComments;
                    }

                    var emergres = {};
                    emergres.emerg = emerg;
                    emergres.emerdir = emerdir;
                    emergres.emersec = emersec;
                    defer.resolve(emergres);
                })
                .catch(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        };

        svc.DeleteEmergency = function (id) {
            var defer = $q.defer();
            if (id) {
                ShptRestService
                    .deleteListItem(listname, id)
                    .then(function () {
                        defer.resolve(_.pull(emergList, ['id', id ]));
                    })
                    .catch(function (error) {
                        defer.reject(error);
                    });
            } else {
                defer.reject('Emergency is missing id value.');
            }
            return defer.promise;
        };

        svc.checkIfUserSecurity = function () {
            var userInSecGrp = false;
            var defer = $q.defer();
            defer.resolve(true);
            //ShptRestService
            //    .getUserById(curUserId)
            //    .then(function (user) {
            //        _.forEach(user.groups, function (g) {
            //            if (g.Title == 'SecurityCommittee') {
            //                userInSecGrp = true;
            //            }
            //        });
            //        defer.resolve(userInSecGrp);
            //    })
            //    .catch(function (error) {
            //        defer.reject(error);
            //    });
            return defer.promise;
        };
    }
})();