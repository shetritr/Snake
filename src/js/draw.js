
var drawModule = (function () { 

    var bodySnake = function(x, y) {
          ctx.fillStyle = 'green';
          ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
          ctx.strokeStyle = 'darkgreen';
          ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }
  
    var pizza = function(x, y) {
          ctx.fillStyle = 'yellow';
          ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
          ctx.fillStyle = 'red';
          ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    }
  
    var scoreText = function() {
      var score_text = "Score: " + score;
      ctx.fillStyle = 'blue';
      ctx.fillText(score_text, 145, h-5);
    }
  
    var drawSnake = function() {
        var length = 4;
        snake = [];
        for (var i = length-1; i>=0; i--) {
            snake.push({x:i, y:0});
        }  
    }
    var drawMonsters = function() {
      monsters = [];
      monsters.push({x:0,y:30});


        // var NumOfMonsters = 3;
        // monsters = [];
        // for (var i = length-1; i>=0; i--) {
        //   monsters.push({x:i, y:5});
        // }  
    }
      
    var paint = function(){
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);
  
        btn.setAttribute('disabled', true);
  
        var snakeX = snake[0].x;
        var snakeY = snake[0].y;
  
        if (direction == 'right') { 
          snakeX++; }
        else if (direction == 'left') { 
          snakeX--; }
        else if (direction == 'up') { 
          snakeY--; 
        } else if(direction == 'down') { 
          snakeY++; }

          // moveMonsters();
  
        if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true);
  
            ctx.clearRect(0,0,w,h);
            gameloop = clearInterval(gameloop);
            Monstersloop = clearInterval(Monstersloop);

            return;          
          }
          
          if(snakeX == food.x && snakeY == food.y) {
            var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
            score ++;
            
            createFood(); //Create new food
          } else {
            var tail = snake.pop(); //pops out the last cell
            tail.x = snakeX; 
            tail.y = snakeY;
          }
          //The snake can now eat the food.
          snake.unshift(tail); //puts back the tail as the first cell
  
          for(var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
          }
          // moveMonsters();
          bodyMonsters(monsters[0].x,monsters[0].y);

          
          pizza(food.x, food.y); 
          scoreText();
    }
  
    var createFood = function() {
        food = {
          x: Math.floor((Math.random() * 30) + 1),
          y: Math.floor((Math.random() * 30) + 1)
        }
  
        for (var i=0; i>snake.length; i++) {
          var snakeX = snake[i].x;
          var snakeY = snake[i].y;
        
          if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
            food.x = Math.floor((Math.random() * 30) + 1);
            food.y = Math.floor((Math.random() * 30) + 1);
          }
        }
    }
      
    var moveMonsters = function() {
        var snakeX = snake[snake.length-1].x;
        var snakeY = snake[snake.length-1].y;
        if(Math.random()>0.5){
          if(monsters[0].x < snakeX){
            monsters[0].x = monsters[0].x + 1;
          }else if(monsters[0].x > snakeX){
            monsters[0].x = monsters[0].x - 1;
          }else if(monsters[0].y < snakeY){
            monsters[0].y = monsters[0].y + 1;
          }else if(monsters[0].y > snakeY) {
              monsters[0].y = monsters[0].y - 1;
          }
        }else{
          if(monsters[0].y < snakeY){
              monsters[0].y = monsters[0].y + 1;
          }else if(monsters[0].y > snakeY) {
              monsters[0].y = monsters[0].y - 1;
          }else if(monsters[0].x < snakeX){
            monsters[0].x = monsters[0].x + 1;
          }else if(monsters[0].x > snakeX){
            monsters[0].x = monsters[0].x - 1;
          }
        }
      
        // for (var i=0; i<monsters.length; i++) {
        //     checkarray = [false, false ,false,false]
        //     for (let j = 0; j < monsters.length; j++) {
        //         if (food.x=== monsters[i].x   && food.y === monsters[i].y +1 || monsters[j].x === monsters[i].x   && monsters[j].y === monsters[i].y +1 || monsters[i].y +1 >= w/snakeSize) {
        //           checkarray[0] = true;
        //           }
        //         if (food.x=== monsters[i].x + 1   && food.y === monsters[i].y || monsters[j].x === monsters[i].x + 1   && monsters[j].y === monsters[i].y  || monsters[i].x + 1 >= h/snakeSize ) {
        //           checkarray[1] = true;
        //         }
        //         if (food.x=== monsters[i].x    && food.y === monsters[i].y - 1 || monsters[j].x === monsters[i].x   && monsters[j].y === monsters[i].y - 1 || monsters[i].y - 1 < 0) {
        //           checkarray[2] = true;
        //         }
        //         if (food.x=== monsters[i].x - 1   && food.y === monsters[i].y || monsters[j].x === monsters[i].x - 1   && monsters[j].y === monsters[i].y || monsters[i].x - 1 < 0 ) {
        //           checkarray[3] = true;
        //         }   
        //     }
        //     if(checkarray[0] === false){
        //       monsters[i].y = monsters[i].y + 1;
        //     }else if(checkarray[1] === false){
        //       monsters[i].x = monsters[i].x + 1;
        //     }else if (checkarray[2] === false){
        //       monsters[i].y = monsters[i].y - 1;
        //     }else if (checkarray[3] === false){
        //       monsters[i].x = monsters[i].x - 1;
        //     }

        // }
    }
  
    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
          if(array[i].x === x && array[i].y === y || array[i].x === monsters[0].x && array[i].y === monsters[0].y)
          return true;
        } 
        return false;
    }
  
    var init = function(){
        direction = 'down';
        drawSnake();
        drawMonsters();
        createFood();
        gameloop = setInterval(paint, 80);
        Monstersloop = setInterval(moveMonsters, 100);

    }
    
    var bodyMonsters = function(x,y){
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

    }  
      return {
        init : init
      };
  
      
  }());
  