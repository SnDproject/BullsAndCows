(function () {
    'use strict';

    function ProjectDetailsController($location, $routeParams, projects, commits, identity, collaborator) {
        var vm = this;
        vm.identity = identity;
        if(!identity.isAuthenticated()){
            $location.path('/unauthorized');
        }
        vm.id = $routeParams.id;

        vm.request = {
            page: 1,
            pageSize: 10
        }

        vm.addColaborator = function addCollaborator(coll){
            collaborator.addCollaborator(coll, vm.id)
                .then(function(){
                    console.log('colab added');
                })
        }

        collaborator.getCollaborators(vm.id)
            .then(function(response){
                console.log(response);
                vm.collaborators = response;
            })

        vm.prevPage = function () {
            if (vm.request.page == 1) {
                return;
            }

            vm.request.page--;
            updateCommits(vm.id, vm.request);
        }

        vm.nextPage = function () {
            if (!vm.publicProjects || vm.publicProjects.length == 0) {
                return;
            }

            vm.request.page++;
            updateCommits(vm.id, vm.request);
        }

        vm.filterCommits = function () {
            updateCommits(vm.id, vm.request);
        }


        function updateCommits(id, req){
            commits.getProjectCommits(id, req)
            .then(function(response){
                vm.commits = response;
                console.log(response);
            })
        }

        updateCommits(vm.id, vm.request);


        projects.getCurrentProject($routeParams.id)
            .then(function(response){
                vm.project = response;
            })
    }

    angular.module('myApp.controllers')
        .controller('ProjectDetailsController', ['$location', '$routeParams', 'projects', 'commits', 'identity', 'collaborator', ProjectDetailsController]);
}());
