var imagingApp = angular.module('imagingApp', []);

imagingApp.controller('imagingSimulation', function($scope) {
    $scope.width = 20;
    $scope.height = 20;
    $scope.saveList = [];
    $scope.saveName = "";
    $scope.squareSize = 18;
    $scope.borderSize = 1;
    $scope.canvas = new Canvas(document.getElementById('canvas'), 
        $scope.squareSize, $scope.borderSize, $scope.width, $scope.height);


    $scope.arr = [];
    for (var i=0; i < $scope.height; i++) {
        $scope.arr[i] = [];
        for (var j = 0; j < $scope.width; j++)
            $scope.arr[i][j] = false;
    }
    $scope.handleClick = function(event) {
        var size = $scope.canvas.getCellSize();
        var x = Math.floor((event.offsetX) / size);
        var y = Math.floor((event.offsetY) / size)
        // console.log(x);
        // console.log(y);
        if (x >= 0 && x < $scope.canvas.width && y >= 0 && y < $scope.canvas.height) {
            $scope.arr[x][y] = !$scope.arr[x][y];
            $scope.redraw();
            // $scope.canvas.drawSquare(x, y, ($scope.arr[x][y] === true ? 1 : 0) );
        }
    };
    // Draws the board from the given array
    $scope.redraw = function() {
        $scope.canvas.clearBoard();
        for (var i=0; i < $scope.height; i++)
            for (var j = 0; j < $scope.width; j++)
                $scope.canvas.drawSquare(i, j, ($scope.arr[i][j] === true ? 1 : 0) );
    };
    
    $scope.step = function() {
        var newArr = [];
        for (var i=0; i < $scope.height; i++) {
            newArr[i] = $scope.arr[i].slice(0);  // Deep copy
        }
        for (var i=0; i < $scope.height; i++) {
            for (var j = 0; j < $scope.width; j++) {
                // count things next to you
                var neighbors = countNeighbors(i, j);
                // birth
                if($scope.arr[i][j] == false && neighbors == 3)
                    newArr[i][j] = true;
                // survive
                else if($scope.arr[i][j] == true && (neighbors == 2 || neighbors == 3))
                    newArr[i][j] = true;
                // death
                else
                    newArr[i][j] = false;
            }
        }
        $scope.arr = newArr;
        $scope.redraw();
            
    };
    countNeighbors = function(i, j) {
        var result = 0;
        //left column
        if(i > 0) { 
            if(j != 0)
                if($scope.arr[i-1][j-1])
                    result++;
            if($scope.arr[i-1][j])
                result++;
            if(j < $scope.height - 1)
                if($scope.arr[i-1][j+1])
                    result++;
        }
        // middle column
        if(j != 0)
            if($scope.arr[i][j-1])
                result++;
        if(j < $scope.height - 1)
            if($scope.arr[i][j+1])
                result++;
        // right column
        if(i < $scope.width - 1) { 
            if(j != 0)
                if($scope.arr[i+1][j-1])
                    result++;
            if($scope.arr[i+1][j])
                result++;
            if(j < $scope.height-1)
                if($scope.arr[i+1][j+1])
                    result++;
        }
        return result;
    };
    $scope.clear = function() {
        for (var i=0; i < $scope.height; i++)
            for (var j = 0; j < $scope.width; j++)
                $scope.arr[i][j] = false;
        $scope.redraw();
    };
    $scope.randomize = function() {
        for (var i=0; i < $scope.height; i++)
            for (var j = 0; j < $scope.width; j++) {
                $scope.arr[i][j] = (Math.random() < .5) ? false : true;
            }
        $scope.redraw();
    };
    $scope.save = function() {
        var obj = {width: $scope.width, height: $scope.height};
        obj.name = $scope.saveName;
        if(obj.name == null || obj.name === "")
            return;
        obj.arr = [];
        for (var i=0; i < $scope.height; i++)
            obj.arr[i] = $scope.arr[i].slice(0);  // Deep copy

        var prevEntryIndex = $scope.saveList.findIndex(function(e, i, a){ // if object exists already
                return e.name === obj.name;
        });
        if(prevEntryIndex != -1)
            $scope.saveList[prevEntryIndex] = obj; // overwrite previous entry
        else
            $scope.saveList.push(obj); // create new entry
    };
    $scope.load = function() {
        var name = $scope.saveName;
        if(name == null || name === "")
            return;
        var obj = $scope.saveList.find(function(e, i, a){ // if object exists already
                return e.name === name;
        });
        if(obj === undefined)
            return;

        $scope.arr = [];
        for (var i=0; i < $scope.height; i++)
            $scope.arr[i] = obj.arr[i].slice(0);  // Deep copy

        $scope.canvas.resize($scope.squareSize, $scope.borderSize, obj.width, obj.height);
        $scope.redraw();
    };
});

