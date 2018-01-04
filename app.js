angular.module('eggly', []).
    controller('BookmarkCtrl', function($scope){
        $scope.categories = [
            {"id": 0, "name":"development"},
            {"id": 1, "name":"design"},
            {"id": 2, "name":"fitness"},
            {"id": 3, "name":"humor"},
            {"id": 4, "name":"news"},
            {"id": 5, "name":"science"}
        ]

        $scope.bookmarks = [
            {"id":0, "title":"AngularJS", "url":"http://angularjs.org", "category":"development"},
            {"id":1, "title":"Google", "url":"http://google.com", "category":"news"},
            {"id":2, "title":"Animal Planet", "url":"https://www.animalplanet.com", "category":"science"},
            {"id":3, "title":"xkcd", "url":"https://xkcd.com/", "category":"humor"},
            {"id":4, "title":"fitness.org.au", "url":"http://fitness.org.au", "category":"fitness"}
        ]

        $scope.currentCategory = null
        $scope.editedBookmark=null

        $scope.setCurrentCategory = function (category){
            $scope.currentCategory = category
            resetCreateForm()
        }

        $scope.isCurrentCategory = function(category){
            return $scope.currentCategory !== null &&
                category.name === $scope.currentCategory.name
        }

        // == manage application state ==

        $scope.isCreating = false
        $scope.isEditing = false

        $scope.startCreating = function(){
            if($scope.currentCategory){
                $scope.isCreating = true
                $scope.isEditing = false
                console.log("start creating")
                resetCreateForm()
            }
        }

        $scope.cancelCreating = function(){
            $scope.isCreating = false
            console.log("cancel creating")
        }

        $scope.startEditing = function(){
            $scope.isCreating = false
            $scope.isEditing = true
            console.log("start editing")
        }

        $scope.cancelEditing = function(){
            $scope.isEditing = false
            console.log("cancel editing")
        }

        $scope.shouldShowCreating = function(){
            return $scope.currentCategory && !$scope.isEditing && $scope.isCreating
        }

        $scope.shouldShowEditing = function(){
            return $scope.isEditing && !$scope.isCreating
        }

        // == crud operations ==

        $scope.createBookmark = function(bookmark){
            console.log("create bookmark")
            var id = 1;
            if( $scope.bookmarks.length > 0 )
                id = $scope.bookmarks[$scope.bookmarks.length-1].id + 1
            bookmark.id = id
            console.log(bookmark)
            $scope.bookmarks.push(bookmark)

            resetCreateForm()
        }

        var resetCreateForm = function(){
            if( $scope.currentCategory )
            $scope.newBookmark = {
                title:'',
                url:'',
                category:$scope.currentCategory.name
            }
        }

        $scope.setEditedBookmark = function(bookmark){
            $scope.editedBookmark = bookmark
        }

        $scope.updateBookmark = function(bookmark){
            var index = $scope.bookmarks.findIndex(function(b){
                return b.id == bookmark.id
            })

            $scope.bookmarks[index] = bookmark
            $scope.editedBookmark =null
            $scope.isEditing = false
        }

        $scope.deleteBookmark = function(bookmark){
            var index = $scope.bookmarks.findIndex(function(b){
                return b.id == bookmark.id
            })
            $scope.bookmarks.splice(index, 1)
        }
    })
