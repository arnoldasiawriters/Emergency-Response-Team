(function () {
    'use script';

    angular
        .module('country.directors', [])
        .service('countrydirsvc', CountryDirFunction);

    CountryDirFunction.$inject = ['$q', 'ShptRestService'];
    function CountryDirFunction($q, ShptRestService) {
        var svc = this;
        var listname = 'CountryDirectors';
        var curUserId = _spPageContextInfo.userId;
        var dirList = null;

        svc.getAllItems = function () {
            var defer = $q.defer();
            var queryParams = "$select=Id,Title,Country,Director/Id,Director/Title&$expand=Director";
            ShptRestService
                .getListItems(listname, queryParams)
                .then(function (data) {
                    dirList = [];
                    _.forEach(data.results, function (o) {
                        var dir = {};
                        dir.id = o.Id;
                        dir.title = o.Title;
                        dir.country = o.Country;
                        dir.director = _.isNil(o.Director) ? "" : { id: o.Director.Id, title: o.Director.Title };
                        dirList.push(dir);
                    });
                    defer.resolve(dirList);
                })
                .catch(function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        };

        svc.checkIfUserDirector = function () {
            var userDir = false;
            var deferred = $q.defer();
            svc
                .getAllItems()
                .then(function (data) {
                    _.forEach(data, function (d) {
                        if (d.director.id == curUserId) {
                            userDir = true;
                        }
                    });          
                    deferred.resolve(userDir);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
})();