(function () {
    'use strict';

    function CreateProjectsController($location, baseServiceUrl, projects, identity, licenses, notifier) {
        var vm = this;
        vm.identity = identity;

        licenses.getAllLicenses()
            .then(function(licenses){
                vm.licenses = licenses;
            })

        vm.create = function create(project){
            projects.createProject(project)
                .then(function(response){
                    notifier.success('Project successfully created');
                    console.log(baseServiceUrl + '/api/projects/' + response);
                    $location.path('/projects/' + response);
                })
        }

    }

    angular.module('myApp.controllers')
        .controller('CreateProjectsController', ['$location', 'baseServiceUrl', 'projects', 'identity', 'licenses' , 'notifier', CreateProjectsController]);
}());
