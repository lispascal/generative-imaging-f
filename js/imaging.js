var imagingApp = angular.module('imagingApp', []);

imagingApp.controller('imagingSimulation', function($scope) {
    $scope.width = 20;
    $scope.height = 20;
    var size = 18;
    var border = 1;
    $scope.canvas = new Canvas(document.getElementById('canvas'), 
        size, border, $scope.width, $scope.height);


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
    $scope.redraw = function() {
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
    }
});

