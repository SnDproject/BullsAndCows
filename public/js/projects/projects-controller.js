(function () {
    'use strict';

    function ProjectsController(projects, identity) {
        var vm = this;
        vm.identity = identity;
        vm.publicProjects = {};
        vm.request = {
            page: 1,
            pageSize: 10
        };

        vm.prevPage = function () {
            if (vm.request.page == 1) {
                return;
            }

            vm.request.page--;
            vm.filterProjects();
        }

        vm.nextPage = function () {
            if (!vm.publicProjects || vm.publicProjects.length == 0) {
                return;
            }

            vm.request.page++;
            vm.filterProjects();
        }

        vm.filterProjects = function () {
            projects.filterProjects(vm.request)
                .then(function (filterProjects) {
                    console.log(vm.publicProjects);
                    vm.publicProjects = filterProjects;
                });

        }


        projects.getPublicProjects()
            .then(function (publicProjects) {
                vm.publicProjects = publicProjects;
            });

    }

    angular.module('myApp.controllers')
        .controller('ProjectsController', ['projects', 'identity', ProjectsController]);
}());
