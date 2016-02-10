(function () {
    'use strict';

    function projects(data) {
        var PROJECTS_URL = 'api/projects';

        function getPublicProjects() {
            return data.get(PROJECTS_URL);
        }

        function filterProjects(filters) {
            return data.get(PROJECTS_URL + '/all', filters);
        }

        function createProject(project){
            return data.post(PROJECTS_URL, project);
        }

        function getCurrentProject(id){
            return data.get(PROJECTS_URL + '/' + id );
        }

        return {
            getPublicProjects: getPublicProjects,
            filterProjects: filterProjects,
            createProject: createProject,
            getCurrentProject: getCurrentProject
        }
    }

    angular.module('myApp.services')
        .factory('projects', ['data', projects])
}());
