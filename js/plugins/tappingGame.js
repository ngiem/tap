//-----------------------------------------------------------------------------
// Tap_Item
//
//

function Tap_Item() {
    this.initialize.apply(this, arguments);
}

Tap_Item.prototype.initialize = function(img_filename, bubble_filename, clickedImg_filename, clickedBubble_filename, id1, id2, cat, adjustmentScore, adjustmentTime, adjustmentCoin, gainItem, quantityGained, gainActor, anim, frameNum, animSpeed, animAfter, frameNumAfter, animSpeedAfter) {
   this._imgFile = img_filename;
   this._bubbleFile = bubble_filename;

   this._clickedImgFile = clickedImg_filename;
   this._clickedBubbleFile = clickedBubble_filename;

   this._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
   this._timeBeforeMoving_Counter = 0;
   this._imgPictureId = id1;
   this._bubblePictureId = id2;
   this._visible = false;
   this._scaleX = 100;
   this._scaleY = 100;
   this._orginalScaleX = this._scaleX;
   this._orginalScaleY = this._scaleY;

   this._scaleMaxX = 100;
   this._scaleMaxY = 100;

   this._originalBubbleName = bubble_filename;
   this._category = cat;
   this._soundWhenClicked = {name:"bop01",volume:50,pan:0,pitch:100};
   this._patternIndex = 1;
   this._patternMax = 33;
   this._originalPatternIndex = this._patternIndex;
   this._shownCounter = 0;
   this._shownAt = 25;
   this._X = 0;
   this._Y = 0;
   
   var r = Math.floor((Math.random() * 2)-2);
   this._moveSpeedX =  r/5;

   r = Math.floor((Math.random() * 2)-2);
   this._moveSpeedY = -.3;

   this._originalMoveSpeedX = this._moveSpeedX;
   this._originalMoveSpeedY = this._moveSpeedY;

   this._returnOriginalSpeedX = true;
   this._returnOriginalSpeedY = true;   

   this._reverseXSpeedAfterCount = Math.floor((Math.random() * 70)+40);
   this._reverseYSpeedAfterCount = 0;

   this._reverseXSpeedAfterCount_Index = 0;
   this._reverseYSpeedAfterCount_Index = 0;

   this._reverseXSpeedAfterCount_AfterTap = true;
   this._reverseYSpeedAfterCount_AfterTap = true;
   
   this._exactXSpeedAfterCount_AfterTap = 0;
   this._exactYSpeedAfterCount_AfterTap = .5;

   this._waitToShow = 360;
   this._waitToShow_Index = 0;
   this._waiting = false;

   this._rotateSpeed = 0;
   this._orignalRotateSpeed = this._rotateSpeed ;
   this._rotateSpeedAfterClicked = 10;

   this._orignalAngle = 0;

   this._animationNumber = 4;
   this._releasedAnimationNumber = 5;
   this._scoreAnimationNumber = 134;
   
   this._opacityAfterClicked = 255;
   this._bubbleOpacityAfterClicked = 200;

   this._opacityAdjustmentAfterClicked = -10;
   
   this._imgOpacity = 255;
   this._bubbleOpacity = 200;
   
   this._wallBounceActiveX = true;
   this._wallBounceActiveY = true;

   this._spawnMode = "random";
   
   this._scaleXRate = 1;
   this._scaleYRate = 1;
   
   this._timeAdjustment = 0;
   this._scoreAdjustment = 0;
   this._coinAdjustment = adjustmentCoin;
   
   this._effect = "breathe";

   this._anim = anim;
   this._frames = frameNum;
   this._animSpeed = animSpeed;
   
   this._animAfter = animAfter;
   this._framesAfter = frameNumAfter;
   this._animSpeedAfter =  animSpeedAfter;

   this._gainActor = gainActor;

   this._gainItem = gainItem;
   this._quantityGained = quantityGained;

   if (cat.toLowerCase().includes("score")){this._scoreAdjustment = adjustmentScore;}
   if (cat.toLowerCase().includes("time")){this._timeAdjustment = adjustmentTime*60;}
   if (cat.toLowerCase().includes("coin")){this._coinAdjustment = adjustmentCoin;}
};


//-----------------------------------------------------------------------------
// Tapping_Game
//
//

function Tapping_Game() {
    this.initialize.apply(this, arguments);
}

Tapping_Game.prototype.initialize = function(tapItems, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight) {
    if (!mode){mode="standard";}
    if (!inputMode){inputMode="swipe";}
    if (!endAfterTapGoal){endAfterTapGoal=false;}
    if (!tapGoal){tapGoal=50;}
    if (!timeLimit){timeLimit=60;}
    if (!maxItems){maxItems=3;}
    if (!maxCoinItems){maxCoinItems=3;}
    if (!increaseTappingItemChance){increaseTappingItemChance=30;}
    if (!tapScreenX){tapScreenX=100;}
    if (!tapScreenY){tapScreenY=240;}
    if (!tapScreenWidth){tapScreenWidth=360;}
    if (!tapScreenHeight){tapScreenHeight=800;}


    this._tapItems = tapItems;
    this._mode = mode;
    this._inputMode = inputMode;
    this._endAfterTapGoal = endAfterTapGoal;
    this._tapGoal = tapGoal;
    this._timeLimit = timeLimit;
    this._tapScreenX = tapScreenX;
    this._tapScreenY = tapScreenY;
    this._tapScreenWidth = tapScreenWidth;
    this._tapScreenHeight = tapScreenHeight;
    this._maxItems = maxItems;
    this._originalMaxItems = this._maxItems;
    this._maxCoinItems = maxCoinItems;
    this._increaseTappingItemChance = increaseTappingItemChance;

    //Continued here

    this._tapItemCount = 0;
    this._timeBeforeMoving = Math.floor((Math.random() * 100)+200);
    this._originalTimeBeforeMoving = this._timeBeforeMoving;
    this._timeBeforeMoving_Counter = this._timeBeforeMoving;
    this._hasWon = false;
    this._hasLost = false;
    this._maxItemsOnScreen = 4;
    this._bubblesReleased = 0;
    
    this._background = null;
    this._negitiveStrikeMax = null;
    
    this._tapZonePictureId = null;
};

Tapping_Game.prototype.getTapItem = function(itemSet, number){
  var img = "blank";
  if (itemSet === "animals"){
     switch (number){
       case 1:
            img = "Animals_Bat";
            break;
       case 2:
            img = "Animals_Bee";
            break;
       case 3:
            img = "Animals_Bird";
            break;
       case 4:
            img = "Animals_Blue_Bettle";
            break;
       case 5:
            img = "Animals_Brown_Beetle";
            break;
       case 6:
            img = "Animals_Brown_Caterpillar";
            break;
       case 7:
            img = "Animals_Bug";
            break;
       case 8:
            img = "Animals_Butterfly";
            break;
       case 9:
            img = "Animals_Cat";
            break;
       case 10:
            img = "Animals_Cute_Butterfly";
            break;
       case 11:
            img = "Animals_Cute_Ladybug";
            break;
       case 12:
            img = "Animals_Cute_Snail";
            break;
       case 13:
            img = "Animals_Dog";
            break;
       case 14:
            img = "Animals_Dragonfly";
            break;
       case 15:
            img = "Animals_Fly";
            break;
       case 16:
            img = "Animals_Fox";
            break;
       case 17:
            img = "Animals_Funny_Fish";
            break;
       case 18:
            img = "Animals_Green_Beetle";
            break;
       case 19:
            img = "Animals_Green_Caterpillar";
            break;
       case 20:
            img = "Animals_Hedgehog";
            break;
       case 21:
            img = "Animals_Kangaroo";
            break;
       case 22:
            img = "Animals_Kangaroo_Cub";
            break;
       case 23:
            img = "Animals_Ladybug";
            break;
       case 24:
            img = "Animals_Lizzard";
            break;
       case 25:
            img = "Animals_Octopus";
            break;
       case 26:
            img = "Animals_Pig";
            break;
       case 27:
            img = "Animals_Puppy";
            break;
       case 28:
            img = "Animals_Sheep";
            break;
       case 29:
            img = "Animals_Smiling_Bee";
            break;
       case 30:
            img = "Animals_Smiling_Dragonfly";
            break;
       case 31:
            img = "Animals_Snail";
            break;
       case 32:
            img = "Animals_Worm";
            break;
       case 33:
            img = "Animals_X-Rayed_Lizard";
            break;
     }
  }

  if (itemSet === "christmas"){
     switch (number){
       case 1:
            img = "tappingGame_present01";
            break;
       case 2:
            img = "tappingGame_candyCane01";
            break;
       case 3:
            img = "tappingGame_gingerBreadMan01";
            break;
       case 4:
            img = "tappingGame_ornament01";
            break;
       case 5:
            img = "tappingGame_raindeer01";
            break;
       case 6:
            img = "tappingGame_snowMan01";
            break;
       case 7:
            img = "tappingGame_penguin01";
            break;
     }
  }

  return img;
}

Tapping_Game.prototype.randomImg = function(imgSet, maxNum){
  var randomNumber = Math.floor((Math.random() * maxNum)+1);
  var img = this.getTapItem(imgSet, randomNumber);
  return img;
}

Tapping_Game.prototype.checkForAddTapItemCount = function(){
      if (!this._hasWon && !this._hasLost){
        if ($gameSwitches.value(65)){
          this._bubblesReleased++;
          $gameVariables.setValue(124, this._bubblesReleased);
      
          var r = Math.floor((Math.random() * this._increaseTappingItemChance)+1);
          if (r === 1){
            if ($tappingGame){
              $tappingGame._maxItems = this._maxCoinItems;
            }
          }

        }
      }
};

Tapping_Game.prototype.showTapItem = function(tapItem){
if ($tappingGame){
  if (tapItem._spawnMode === "random"){
    var x = Math.floor((Math.random() * this._tapScreenWidth)+this._tapScreenX);
    var y = Math.floor((Math.random() * this._tapScreenHeight)+this._tapScreenY);
  }

  tapItem._visible = true;
  $tappingGame._tapItemCount++;
//  console.log($tappingGame._tapItemCount);

  var img = tapItem._imgFile;

   switch (img){
     case "~pattern_animals~":
        if (tapItem._patternIndex < tapItem._patternMax){
          tapItem._patternIndex++
        }else{
          tapItem._patternIndex = tapItem._originalPatternIndex;
        }
        img = this.getTapItem("animals", tapItem._patternIndex);
        break;

     case "~pattern_christmas~":
        if (tapItem._patternIndex < tapItem._patternMax){
          tapItem._patternIndex++
        }else{
          tapItem._patternIndex = tapItem._originalPatternIndex;
        }
        img = this.getTapItem("christmas", tapItem._patternIndex);
        break;

     case "~random_christmas~":
        img = this.randomImg("christmas", 7);
        break;
   }

  $gameScreen.showPicture(tapItem._imgPictureId, img.toLowerCase(), 'center', 0, 0, tapItem._orginalScaleX, tapItem._orginalScaleY, 0, 0);
  $gameScreen.showPicture(tapItem._bubblePictureId, tapItem._bubbleFile.toLowerCase(), 'center', 0, 0, tapItem._orginalScaleX, tapItem._orginalScaleY, 0, 0);

  if (tapItem._effect === "breathe"){
    //var pw = 5;
    //var pw = pw * 0.01;
    //var pw2 = 15;
    //var pw2 = 1 + (pw2 * 0.1);
    //$gameScreen.picture(tapItem._imgPictureId)._breathEffect = [true,0,0,0,pw,pw2]
  }
  
  if (tapItem._anim === true){
    var frm = Math.min(Math.max(tapItem._frames,1),999);
    var speed = tapItem._animSpeed;
    $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
  }

if (img.toLowerCase() === "[anim]cat_01"){
  var frm = Math.min(Math.max(10,1),999);
  var speed = 4;
  $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
}
if (img.toLowerCase() === "[anim]dog_01"){
  var frm = Math.min(Math.max(10,1),999);
  var speed = 4;
  $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
}
//  $gameScreen.picture(tapItem._imgPictureId).initBasic();
//  Game_Interpreter.prototype.picEfctSetAni("pic_breath", 0, tapItem._imgPictureId, true, 0, 0, 0, 4, 2);

  this.moveTapItem($tappingGame._tapItemCount-1);
}
};


Tapping_Game.prototype.updateGame = function(){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++){
    var tapItem = $tappingGame._tapItems[i];
    if (tapItem._visible === true){

      $tappingGame.adjustTapItem(i);
      tapItem._timeBeforeMoving_Counter++;
      if (tapItem._timeBeforeMoving_Counter >= tapItem._timeBeforeMoving){
          tapItem._timeBeforeMoving_Counter = 0;
          for (var j = 0; j < $tappingGame._tapItems.length; j++){
            $tappingGame._tapItems[j]._waitToShow_Index = 0;
          }
          $tappingGame.moveTapItem(i);
          break;
      }
    }
    if (tapItem._waiting){
      tapItem._waitToShow_Index++;
      if (tapItem._waitToShow_Index > tapItem._waitToShow){
        tapItem._waiting = false;
        for (var j = 0; j < $tappingGame._tapItems.length; j++){
            $tappingGame._tapItems[j]._waitToShow_Index = 0;
        }
        $tappingGame.moveTapItem(i);
        break;
      }
    }else{

    }
  }
}
}

Tapping_Game.prototype.moveTapItem = function(i){
if ($tappingGame){
  if (i <= $tappingGame._maxItems){
   var tapItem = $tappingGame._tapItems[i];
   var moveTapItem = true;

   if ($gameTimer._working){
    // if ($gameTimer.seconds() <= 2){moveTapItem=false;}
   }

     if (moveTapItem){
       tapItem._waiting = false;
       tapItem._timeBeforeMoving_Counter = 0;
       $tappingGame._timeBeforeMoving_Counter = 0;
       
       if ($gameScreen.picture(tapItem._imgPictureId)){
         $gameScreen.picture(tapItem._imgPictureId).rotate(tapItem._orignalRotateSpeed);

         if (tapItem._returnOriginalSpeedX){tapItem._moveSpeedX = tapItem._originalMoveSpeedX;}
         if (tapItem._returnOriginalSpeedY){tapItem._moveSpeedY = tapItem._originalMoveSpeedY;}

         var noEmptySpot = true;

         while (noEmptySpot){
            var noEmptySpot = false;

            var x = Math.floor((Math.random() * this._tapScreenWidth)+this._tapScreenX);
            var y = Math.floor((Math.random() * this._tapScreenHeight)+this._tapScreenY);

            for (var i = 0; i < $tappingGame._tapItems.length; i++) {
              var tp = $tappingGame._tapItems[i];
              if (!tp._waiting){
                if ((x > tp._X - 140) && (x < tp.X + 140)){
                  if ((y > tp._Y - 140) && (y < tp.Y + 140)){
                    noEmptySpot = true;
                  }
                }
              }
            }
         }

          var img = tapItem._imgFile;

          switch (img){
            case "~pattern_animals~":
              if (tapItem._patternIndex < tapItem._patternMax){
                tapItem._patternIndex++
              }else{
                tapItem._patternIndex = tapItem._originalPatternIndex;
              }
              img = this.getTapItem("animals", tapItem._patternIndex);
              break;

           case "~pattern_christmas~":
              if (tapItem._patternIndex < tapItem._patternMax){
                tapItem._patternIndex++
              }else{
                tapItem._patternIndex = tapItem._originalPatternIndex;
              }
              img = this.getTapItem("christmas", tapItem._patternIndex);
              break;

           case "~random_christmas~":
              img = this.randomImg("christmas", 7);
              break;
         }

         tapItem._X = x;
         tapItem._Y = y;
//         console.log($gameSystem);

       	 var sprite = new Sprite_Base();
       	 var animId = tapItem._releasedAnimationNumber;

      	 sprite.anim = $dataAnimations[animId];
  	 sprite.x = tapItem._X;
  	 sprite.y = tapItem._Y;
  	 sprite.mirror = 0;
  	 sprite.delay = 0;
         sprite.waitFor = 0;
         sprite.dump = true;
         if(SceneManager._scene){
  	   SceneManager._scene.addChild(sprite);
  	   sprite.startAnimation(sprite.anim, sprite.mirror, sprite.delay);
  	 }

         tapItem._scaleX = tapItem._orginalScaleX;
         tapItem._scaleY = tapItem._orginalScaleY;

        if (tapItem._anim === true){
          var frm = Math.min(Math.max(tapItem._frames,1),999);
          var speed = tapItem._animSpeed;
          $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
        }

         if ($gameScreen.picture(tapItem._imgPictureId)){
           $gameScreen.picture(tapItem._imgPictureId)._angle = tapItem._orignalAngle;
           $gameScreen.picture(tapItem._imgPictureId)._name = img.toLowerCase();
           $gameScreen.picture(tapItem._imgPictureId)._x = x;
           $gameScreen.picture(tapItem._imgPictureId)._y = y;
           $gameScreen.picture(tapItem._imgPictureId)._scaleX = tapItem._scaleX;
           $gameScreen.picture(tapItem._imgPictureId)._scaleY = tapItem._scaleY;
           $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._imgOpacity;
        }

        if ($gameScreen.picture(tapItem._bubblePictureId)){
          $gameScreen.picture(tapItem._bubblePictureId)._name = tapItem._originalBubbleName.toLowerCase();
          $gameScreen.picture(tapItem._bubblePictureId)._scaleX = tapItem._scaleX;
          $gameScreen.picture(tapItem._bubblePictureId)._scaleY = tapItem._scaleY;
          $gameScreen.picture(tapItem._bubblePictureId)._x = x;
          $gameScreen.picture(tapItem._bubblePictureId)._y = y;
          $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacity;
        }



          this.checkForAddTapItemCount();
      }
    }
  }
}
};

Tapping_Game.prototype.adjustTapItem = function(i){
if ($tappingGame){
  var tapItem = $tappingGame._tapItems[i];
  
  if (tapItem._waiting){
    if (tapItem._opacityAdjustmentAfterClicked){
      $gameScreen.picture(tapItem._imgPictureId)._opacity = $gameScreen.picture(tapItem._imgPictureId)._opacity + tapItem._opacityAdjustmentAfterClicked;
    }
  }

  if (tapItem._scaleX < tapItem._scaleMaxX){
    tapItem._scaleX = tapItem._scaleX + tapItem._scaleXRate;
    if ($gameScreen.picture(tapItem._bubblePictureId)){
      $gameScreen.picture(tapItem._bubblePictureId)._scaleX = tapItem._scaleX;
    }
    if ($gameScreen.picture(tapItem._imgPictureId)){
      $gameScreen.picture(tapItem._imgPictureId)._scaleX = tapItem._scaleX;
    }
  }

  if (tapItem._scaleY < tapItem._scaleMaxY){
    tapItem._scaleY = tapItem._scaleY + tapItem._scaleYRate;
    if ($gameScreen.picture(tapItem._bubblePictureId)){
      $gameScreen.picture(tapItem._bubblePictureId)._scaleY = tapItem._scaleY;
    }
    if ($gameScreen.picture(tapItem._imgPictureId)){
      $gameScreen.picture(tapItem._imgPictureId)._scaleY = tapItem._scaleY;
    }
  }

  tapItem._reverseXSpeedAfterCount_Index++;
  tapItem._reverseYSpeedAfterCount_Index++;
  
  if (tapItem._reverseXSpeedAfterCount > 0){
    if (tapItem._reverseXSpeedAfterCount_Index >= tapItem._reverseXSpeedAfterCount){
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }
  }

  if (tapItem._reverseYSpeedAfterCount > 0){
    if (tapItem._reverseYSpeedAfterCount_Index >= tapItem._reverseYSpeedAfterCount){
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }
  }
  
  if (tapItem._wallBounceActiveX){
    if ((tapItem._X) <= $tappingGame._X){
      tapItem._X = $tappingGame._X;
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }

    if ((tapItem._X) >= $tappingGame._X+$tappingGame._screenWidth){
      tapItem._X = $tappingGame._X+$tappingGame._screenWidth;
      tapItem._moveSpeedX = -tapItem._moveSpeedX;
      tapItem._reverseXSpeedAfterCount_Index = 0;
    }
  }
  
  if (tapItem._wallBounceActiveY){
    if ((tapItem._Y) <= $tappingGame._Y){
      tapItem._Y = $tappingGame._Y;
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }

    if ((tapItem._Y) >= $tappingGame._Y+$tappingGame._screenHeight){
      tapItem._Y = $tappingGame._Y+$tappingGame._screenHeight;
      tapItem._moveSpeedY = -tapItem._moveSpeedY;
      tapItem._reverseYSpeedAfterCount_Index = 0;
    }
  }

  tapItem._X = tapItem._X + tapItem._moveSpeedX;
  tapItem._Y = tapItem._Y + tapItem._moveSpeedY;

  if ($gameScreen.picture(tapItem._imgPictureId)){
    $gameScreen.picture(tapItem._imgPictureId)._x = tapItem._X;
    $gameScreen.picture(tapItem._imgPictureId)._y = tapItem._Y;

  }

  if ($gameScreen.picture(tapItem._bubblePictureId)){
    $gameScreen.picture(tapItem._bubblePictureId)._x = tapItem._X;
    $gameScreen.picture(tapItem._bubblePictureId)._y = tapItem._Y;
  }
};

Tapping_Game.prototype.eraseTapping = function(){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    $tappingGame._tapItems[i]._visible = false;
  }

  for (var i = 0; i < $tappingGame._tapItems.length; i++){
    $gameScreen.erasePicture($tappingGame._tapItems[i]._imgPictureId);
    $gameScreen.erasePicture($tappingGame._tapItems[i]._bubblePictureId);
  }
}
};

Tapping_Game.prototype.resetTapping = function(){
    this._tapItemCount = 0;
    this._timeBeforeMoving = this._originalTimeBeforeMoving;
    this._timeBeforeMoving_Counter = 0;
    this._tapGoal = 10;
    this._hasWon = false;
    this._hasLost = false;
}

var calculateAddedHearts = function(){
  var howManyMinutesForHeart = $gameVariables.value(22);

  // If Hearts < Max Hearts From Timer
  if ($gameVariables.value(21) < $gameVariables.value(23)){

    var heartsGained = 0;

    // Declare new Date Object
    var dateObj = new Date();

    // Store the Saved Time and The Current Time in Variables
    var savedMs = $gameVariables.value(151);
    var newMs = dateObj.getTime();

    // Calculate the remaining time left on the clock
    var savedClockMs = ((((howManyMinutesForHeart-1)-$gameVariables.value(2))*60)+(60-$gameVariables.value(1)))*1000

    // Calculate the amount of time that has passed (Ms);
    var timePassedMs = newMs - savedMs;

    // If the amount of time passed is greater than the remaining of time on the saved clock time...
    if (timePassedMs > savedClockMs){
      // Reset the Time Clock
      $gameVariables.setValue(1, 0); // (Seconds)
      $gameVariables.setValue(2, 0); // (Minutes)
//      console.log("Clock Set to 0");

      // Subtract the saved amount of time from the amount of time passed for later use.
      timePassedMs = timePassedMs - savedClockMs;

      // Add a heart
      heartsGained++;

      // Calculate how many minutes have passed after subtracted the remaining
      var minutesPassed = ((timePassedMs / 1000) / 60);
//      console.log("Minutes Passed: " + minutesPassed);

      // Add hearts from minutes passed
      var heartsGained = heartsGained + Math.floor(minutesPassed / howManyMinutesForHeart);
      $gameVariables.setValue(21, $gameVariables.value(21) + heartsGained);
//      console.log("Added hearts from time passed: " + heartsGained);
      
      // If hearts are greater than max hearts from Timer...
      if ($gameVariables.value(21) > $gameVariables.value(23)) {

        // Set hearts to max hearts from timer
        $gameVariables.setValue(21, $gameVariables.value(23));
      }
//      alert("Hearts Gained: " + heartsGained);

    }else{
//      alert("Time Passed: " + timePassedMs);
      // New Time Remaining in Milliseconds
      var newTimeForClockMs = savedClockMs - timePassedMs;

      // Calculate minutes remaining
      var clockMin = parseInt((savedClockMs / 900) / 60);

      // Calculate seconds remaining
      var clockSec = (savedClockMs / 900) % 60;

      // Set the Time Clock to the Correct Time
      $gameVariables.setValue(1, clockSec); // (Seconds)
      $gameVariables.setValue(2, clockMin); // (Minutes)
    }
  }

  //EXTRA: Add a rare tappable item on the screen
  if (timePassedMs > 0){
    if (Math.floor((Math.random() * 40)+1) === 1){
      if (Math.floor((Math.random() * 2)+1) === 1){
        //Bottom
        if (Math.floor((Math.random() * 2)+1) === 1){
          var x = Math.floor((Math.random() * 90)+48);
          var y = Math.floor((Math.random() * 360)+692);
        }else{
          var x = Math.floor((Math.random() * 408)+100);
          var y = Math.floor((Math.random() * 260)+392);
        }
      }else{
        //Top
        var x = Math.floor((Math.random() * 200)+208);
        var y = Math.floor((Math.random() * 120)+108);
      }

      $gameScreen.showPicture(97, "rare_01", 'center', x, y, 50, 50, 255, 0);
      $gameVariables.setValue(155, 0);
      $gameVariables.setValue(156, 300);
      $gameSwitches.setValue(172, true);
    }
  }
}

var cute_monsters_setup = function(){
  var tapItems = [];

  return tapItems;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var setup_Tapping_Game = function(taps, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight){
  var tapItems = [];
  if (taps){
    // **************** Cute Monsters ******************
    if (taps[0] === "cute monsters"){
    // ************* Set 1 - Cute Monsters ***************
     if (taps[1] === 1){
       var randomNumbers = [];

       for (var i = 1; i <= 86; i++){
         randomNumbers.push(i);
       }

       for (var i = 1; i < 9; i=i+2){
         // Get a random number using the length of the array
         var rndIndex = getRandomInt(1,randomNumbers.length)-1;
         var rndNum = randomNumbers[rndIndex];
    
         switch(rndNum) {
         case 1:
             tapItems.push(new Tap_Item("cute_monster_a(1)", "bubble001_114x196", "cute_monster_a(1)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 2:
             tapItems.push(new Tap_Item("cute_monster_a(2)", "bubble001_146x146", "cute_monster_a(2)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 3:
             tapItems.push(new Tap_Item("cute_monster_a(3)", "bubble001_178x178", "cute_monster_a(3)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 4:
             tapItems.push(new Tap_Item("cute_monster_a(4)", "bubble001_114x196", "cute_monster_a(4)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 5:
             tapItems.push(new Tap_Item("cute_monster_a(5)", "bubble001_178x178", "cute_monster_a(5)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 6:
             tapItems.push(new Tap_Item("cute_monster_a(6)", "bubble001_132x196", "cute_monster_a(6)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 7:
             tapItems.push(new Tap_Item("cute_monster_a(7)", "bubble001_178x178", "cute_monster_a(7)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 8:
             tapItems.push(new Tap_Item("cute_monster_a(8)", "bubble001_142x172", "cute_monster_a(8)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 9:
             tapItems.push(new Tap_Item("cute_monster_a(9)", "bubble001_178x178", "cute_monster_a(9)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 10:
             tapItems.push(new Tap_Item("cute_monster_a(10)", "bubble001_146x146", "cute_monster_a(10)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 11:
             tapItems.push(new Tap_Item("cute_monster_a(11)", "bubble001_114x196", "cute_monster_a(11)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 12:
             tapItems.push(new Tap_Item("cute_monster_a(12)", "bubble001_166x166", "cute_monster_a(12)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 13:
             tapItems.push(new Tap_Item("cute_monster_a(13)", "bubble001_178x178", "cute_monster_a(13)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 14:
             tapItems.push(new Tap_Item("cute_monster_a(14)", "bubble001_178x178", "cute_monster_a(14)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 15:
             tapItems.push(new Tap_Item("cute_monster_a(15)", "bubble001_166x166", "cute_monster_a(15)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 16:
             tapItems.push(new Tap_Item("cute_monster_a(16)", "bubble001_178x178", "cute_monster_a(16)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 17:
             tapItems.push(new Tap_Item("cute_monster_a(17)", "bubble001_114x196", "cute_monster_a(17)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 18:
             tapItems.push(new Tap_Item("cute_monster_a(18)", "bubble001_178x178", "cute_monster_a(18)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 19:
             tapItems.push(new Tap_Item("cute_monster_a(19)", "bubble001_178x178", "cute_monster_a(19)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 20:
             tapItems.push(new Tap_Item("cute_monster_a(20)", "bubble001_166x166", "cute_monster_a(20)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 21:
             tapItems.push(new Tap_Item("cute_monster_a(21)", "bubble001_114x196", "cute_monster_a(21)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 22:
             tapItems.push(new Tap_Item("cute_monster_a(22)", "bubble001_166x166", "cute_monster_a(22)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 23:
             tapItems.push(new Tap_Item("cute_monster_a(23)", "bubble001_178x178", "cute_monster_a(23)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 24:
             tapItems.push(new Tap_Item("cute_monster_a(24)", "bubble001_178x178", "cute_monster_a(24)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 25:
             tapItems.push(new Tap_Item("cute_monster_a(25)", "bubble001_178x178", "cute_monster_a(25)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 26:
             tapItems.push(new Tap_Item("cute_monster_a(26)", "bubble001_166x166", "cute_monster_a(26)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 27:
             tapItems.push(new Tap_Item("cute_monster_a(27)", "bubble001_114x196", "cute_monster_a(27)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 28:
             tapItems.push(new Tap_Item("cute_monster_a(28)", "bubble001_178x178", "cute_monster_a(28)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 29:
             tapItems.push(new Tap_Item("cute_monster_a(29)", "bubble001_146x146", "cute_monster_a(29)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 30:
             tapItems.push(new Tap_Item("cute_monster_a(30)", "bubble001_166x166", "cute_monster_a(30)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 31:
             tapItems.push(new Tap_Item("cute_monster_a(31)", "bubble001_178x178", "cute_monster_a(31)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 32:
             tapItems.push(new Tap_Item("cute_monster_a(32)", "bubble001_178x178", "cute_monster_a(32)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 33:
             tapItems.push(new Tap_Item("cute_monster_a(33)", "bubble001_178x178", "cute_monster_a(33)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 34:
             tapItems.push(new Tap_Item("cute_monster_a(34)", "bubble001_166x166", "cute_monster_a(34)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 35:
             tapItems.push(new Tap_Item("cute_monster_a(35)", "bubble001_166x166", "cute_monster_a(35)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 36:
             tapItems.push(new Tap_Item("cute_monster_a(36)", "bubble001_178x178", "cute_monster_a(36)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 37:
             tapItems.push(new Tap_Item("cute_monster_a(37)", "bubble001_178x178", "cute_monster_a(37)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 38:
             tapItems.push(new Tap_Item("cute_monster_a(38)", "bubble001_178x178", "cute_monster_a(38)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 39:
             tapItems.push(new Tap_Item("cute_monster_a(39)", "bubble001_178x178", "cute_monster_a(39)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 40:
             tapItems.push(new Tap_Item("cute_monster_a(40)", "bubble001_178x178", "cute_monster_a(40)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 41:
             tapItems.push(new Tap_Item("cute_monster_a(41)", "bubble001_178x178", "cute_monster_a(41)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 42:
             tapItems.push(new Tap_Item("cute_monster_a(42)", "bubble001_178x178", "cute_monster_a(42)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 43:
             tapItems.push(new Tap_Item("cute_monster_a(43)", "bubble001_166x166", "cute_monster_a(43)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 44:
             tapItems.push(new Tap_Item("cute_monster_a(44)", "bubble001_178x178", "cute_monster_a(44)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 45:
             tapItems.push(new Tap_Item("cute_monster_a(45)", "bubble001_166x166", "cute_monster_a(45)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 46:
             tapItems.push(new Tap_Item("cute_monster_a(46)", "bubble001_166x166", "cute_monster_a(46)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 47:
             tapItems.push(new Tap_Item("cute_monster_a(47)", "bubble001_189x189", "cute_monster_a(47)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 48:
             tapItems.push(new Tap_Item("cute_monster_a(48)", "bubble001_166x166", "cute_monster_a(48)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 49:
             tapItems.push(new Tap_Item("cute_monster_a(49)", "bubble001_178x178", "cute_monster_a(49)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 50:
             tapItems.push(new Tap_Item("cute_monster_a(50)", "bubble001_178x178", "cute_monster_a(50)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 51:
             tapItems.push(new Tap_Item("cute_monster_a(51)", "bubble001_178x178", "cute_monster_a(51)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 52:
             tapItems.push(new Tap_Item("cute_monster_a(52)", "bubble001_178x178", "cute_monster_a(52)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 53:
             tapItems.push(new Tap_Item("cute_monster_a(53)", "bubble001_178x178", "cute_monster_a(53)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 54:
             tapItems.push(new Tap_Item("cute_monster_a(54)", "bubble001_178x178", "cute_monster_a(54)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 55:
             tapItems.push(new Tap_Item("cute_monster_a(55)", "bubble001_189x189", "cute_monster_a(55)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 56:
             tapItems.push(new Tap_Item("cute_monster_a(56)", "bubble001_146x146", "cute_monster_a(56)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 57:
             tapItems.push(new Tap_Item("cute_monster_a(57)", "bubble001_178x178", "cute_monster_a(57)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 58:
             tapItems.push(new Tap_Item("cute_monster_a(58)", "bubble001_178x178", "cute_monster_a(58)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 59:
             tapItems.push(new Tap_Item("cute_monster_a(59)", "bubble001_189x189", "cute_monster_a(59)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 60:
             tapItems.push(new Tap_Item("cute_monster_a(60)", "bubble001_178x178", "cute_monster_a(60)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 61:
             tapItems.push(new Tap_Item("cute_monster_a(61)", "bubble001_178x178", "cute_monster_a(61)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 62:
             tapItems.push(new Tap_Item("cute_monster_a(62)", "bubble001_178x178", "cute_monster_a(62)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 63:
             tapItems.push(new Tap_Item("cute_monster_a(63)", "bubble001_178x178", "cute_monster_a(63)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 64:
             tapItems.push(new Tap_Item("cute_monster_a(64)", "bubble001_189x189", "cute_monster_a(64)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 65:
             tapItems.push(new Tap_Item("cute_monster_a(65)", "bubble001_146x146", "cute_monster_a(65)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 66:
             tapItems.push(new Tap_Item("cute_monster_a(66)", "bubble001_146x146", "cute_monster_a(66)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 67:
             tapItems.push(new Tap_Item("cute_monster_a(67)", "bubble001_166x166", "cute_monster_a(67)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 68:
             tapItems.push(new Tap_Item("cute_monster_a(68)", "bubble001_166x166", "cute_monster_a(68)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 69:
             tapItems.push(new Tap_Item("cute_monster_a(69)", "bubble001_166x166", "cute_monster_a(69)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 70:
             tapItems.push(new Tap_Item("cute_monster_a(70)", "bubble001_178x178", "cute_monster_a(70)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 71:
             tapItems.push(new Tap_Item("cute_monster_a(71)", "bubble001_178x178", "cute_monster_a(71)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 72:
             tapItems.push(new Tap_Item("cute_monster_a(72)", "bubble001_114x196", "cute_monster_a(72)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 73:
             tapItems.push(new Tap_Item("cute_monster_a(73)", "bubble001_132x196", "cute_monster_a(73)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 74:
             tapItems.push(new Tap_Item("cute_monster_a(74)", "bubble001_166x166", "cute_monster_a(74)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 75:
             tapItems.push(new Tap_Item("cute_monster_a(75)", "bubble001_144x186", "cute_monster_a(75)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 76:
             tapItems.push(new Tap_Item("cute_monster_a(76)", "bubble001_144x186", "cute_monster_a(76)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 77:
             tapItems.push(new Tap_Item("cute_monster_a(77)", "bubble001_146x146", "cute_monster_a(77)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 78:
             tapItems.push(new Tap_Item("cute_monster_a(78)", "bubble001_146x146", "cute_monster_a(78)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 79:
             tapItems.push(new Tap_Item("cute_monster_a(79)", "bubble001_146x146", "cute_monster_a(79)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 80:
             tapItems.push(new Tap_Item("cute_monster_a(80)", "bubble001_166x166", "cute_monster_a(80)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 81:
             tapItems.push(new Tap_Item("cute_monster_a(81)", "bubble001_178x178", "cute_monster_a(81)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 82:
             tapItems.push(new Tap_Item("cute_monster_a(82)", "bubble001_178x178", "cute_monster_a(82)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 83:
             tapItems.push(new Tap_Item("cute_monster_a(83)", "bubble001_166x166", "cute_monster_a(83)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 84:
             tapItems.push(new Tap_Item("cute_monster_a(84)", "bubble001_178x178", "cute_monster_a(84)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 85:
             tapItems.push(new Tap_Item("cute_monster_a(85)", "bubble001_178x178", "cute_monster_a(85)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;
         case 86:
             tapItems.push(new Tap_Item("cute_monster_a(86)", "bubble001_166x166", "cute_monster_a(86)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, null));
             break;

         default:
             tapItems.push(new Tap_Item("blank", "bubble001_146x146", "cute_monster_a(1)", "blank", i, i+1, "none", 1, 0, 0, 0, 0, 2));
         }

         // Remove the number from the array
         randomNumbers.splice(rndIndex, 1);
     }

      tapItems.push(new Tap_Item("coin_01", "bubble001_106x106","coin_01","blank", i, i+1, "coin", 0, 0, 1));
      tapItems.push(new Tap_Item("[anim]frog_01", "bubble001_106x106","[anim]frog_01","blank", i+2, i+3, "none", 0, 0, 0, null, null, null, true, 48, 4, true, 48, 4));
      tapItems[tapItems.length-1]._
    }
    //********* End of set 1 - Cute Monsters ************

   // No Set defined use parameters instead
   }else{
     var tapItems = taps;
   }
  }
  if (!maxItems){maxItems = tapItems.length-1;}
  if (!maxCoinItems){maxCoinItems = tapItems.length-1;}
  $tappingGame = new Tapping_Game(tapItems, mode, inputMode, endAfterTapGoal, tapGoal, timeLimit, maxItems, maxCoinItems, increaseTappingItemChance, tapScreenX, tapScreenY, tapScreenWidth, tapScreenHeight);
};

var batchSetTapItems = function(timeBeforeMoving, moveSpeedX, moveSpeedY, returnOriginalSpeedX, returnOriginalSpeedY, reverseXSpeedAfterCount, reverseYSpeedAfterCount,
                     reverseXSpeedAfterCount_AfterTap, reverseYSpeedAfterCount_AfterTap, exactXSpeedAfterCount_AfterTap, exactYSpeedAfterCount_AfterTap, waitToShow,
                     rotateSpeed, rotateSpeedAfterClicked, orignalAngle, animationNumber, releasedAnimationNumber, opacityAfterClicked, opacityAdjustmentAfterClicked,
                     imgOpacity, bubbleOpacity){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i];
    tapItem._timeBeforeMoving = timeBeforeMoving;
    tapItem._timeBeforeMoving_Counter = 0;
    tapItem._moveSpeedX = moveSpeedX;
    tapItem._moveSpeedY = moveSpeedY;
    tapItem._originalMoveSpeedX = tapItem._moveSpeedX;
    tapItem._originalMoveSpeedY = tapItem._moveSpeedY;
    tapItem._returnOriginalSpeedX = returnOriginalSpeedX;
    tapItem._returnOriginalSpeedY = returnOriginalSpeedY;
    tapItem._reverseXSpeedAfterCount = reverseXSpeedAfterCount;
    tapItem._reverseYSpeedAfterCount = reverseYSpeedAfterCount;
    tapItem._reverseXSpeedAfterCount_Index = 0;
    tapItem._reverseYSpeedAfterCount_Index = 0;
    tapItem._reverseXSpeedAfterCount_AfterTap = reverseXSpeedAfterCount_AfterTap;
    tapItem._reverseYSpeedAfterCount_AfterTap = reverseYSpeedAfterCount_AfterTap;
    tapItem._exactXSpeedAfterCount_AfterTap = exactXSpeedAfterCount_AfterTap;
    tapItem._exactYSpeedAfterCount_AfterTap = exactYSpeedAfterCount_AfterTap;
    tapItem._waitToShow = waitToShow;
    tapItem._waitToShow_Index = 0;
//    tapItem._waiting = false;
   tapItem._rotateSpeed = rotateSpeed;
   tapItem._orignalRotateSpeed = tapItem._rotateSpeed;
   tapItem._rotateSpeedAfterClicked = rotateSpeedAfterClicked;
   tapItem._orignalAngle = orignalAngle;
   tapItem._animationNumber = animationNumber;
   tapItem._releasedAnimationNumber = releasedAnimationNumber;
   tapItem._opacityAfterClicked = opacityAfterClicked;
   tapItem._opacityAdjustmentAfterClicked = opacityAdjustmentAfterClicked;
   tapItem._imgOpacity = imgOpacity;
   tapItem._bubbleOpacity = bubbleOpacity;
  }
}
}

var start_Tapping = function(){
  if ($tappingGame){
    $tappingGame.showTapItem($tappingGame._tapItems[0]);
  }
};

var tappingGame_checkInput = function(){
if ($tappingGame){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i]
    if (tapItem._waiting === false){
      if (tapItem._visible === true){
        var halfWidth = ($gameScreen.picture(tapItem._bubblePictureId)._width*($gameScreen.picture(tapItem._bubblePictureId)._scaleX/100))/2;
        var halfHeight = ($gameScreen.picture(tapItem._bubblePictureId)._height*($gameScreen.picture(tapItem._bubblePictureId)._scaleY/100))/2;

        if (TouchInput._x > $gameScreen.picture(tapItem._bubblePictureId)._x-(halfWidth) && TouchInput._x < $gameScreen.picture(tapItem._bubblePictureId)._x+(halfWidth)) {
          if (TouchInput._y > $gameScreen.picture(tapItem._bubblePictureId)._y-(halfHeight) && TouchInput._y < $gameScreen.picture(tapItem._bubblePictureId)._y+(halfHeight)) {
             if (tapItem._reverseXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = -tapItem._moveSpeedX;
             }

             if (tapItem._reverseYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = -tapItem._moveSpeedY;
             }
             
             if (tapItem._exactXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = tapItem._exactXSpeedAfterCount_AfterTap;
             }
             
             if (tapItem._exactYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = tapItem._exactYSpeedAfterCount_AfterTap;
             }

             $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._opacityAfterClicked;
             $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacityAfterClicked;

             if (tapItem._animAfter === true){
                var frm = Math.min(Math.max(tapItem._framesAfter,1),999);
                var speed = tapItem._animSpeedAfter;
                $gameScreen.picture(tapItem._imgPictureId)._animeData = [true,frm,9999,0,speed];
             }

             $gameSwitches.setValue(66, true);
             $gameVariables.setValue(140, i);
             break;
          }
        }
      }
    }
  }
}  
}

var tappingGame_checkInput_tapZone = function(){
  for (var i = 0; i < $tappingGame._tapItems.length; i++) {
    var tapItem = $tappingGame._tapItems[i]
    if (tapItem._waiting === false){
      if (tapItem._visible === true){
        var halfWidth = ($gameScreen.picture(tapItem._bubblePictureId)._width*($gameScreen.picture(tapItem._bubblePictureId)._scaleX/100))/2;
        var halfHeight = ($gameScreen.picture(tapItem._bubblePictureId)._height*($gameScreen.picture(tapItem._bubblePictureId)._scaleY/100))/2;

        if (TouchInput._x > $gameScreen.picture(tapItem._bubblePictureId)._x-(halfWidth) && TouchInput._x < $gameScreen.picture(tapItem._bubblePictureId)._x+(halfWidth)) {
          if (TouchInput._y > $gameScreen.picture(tapItem._bubblePictureId)._y-(halfHeight) && TouchInput._y < $gameScreen.picture(tapItem._bubblePictureId)._y+(halfHeight)) {
             if (tapItem._reverseXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = -tapItem._moveSpeedX;
             }

             if (tapItem._reverseYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = -tapItem._moveSpeedY;
             }
             
             if (tapItem._exactXSpeedAfterCount_AfterTap){
               tapItem._moveSpeedX = tapItem._exactXSpeedAfterCount_AfterTap;
             }
             
             if (tapItem._exactYSpeedAfterCount_AfterTap){
               tapItem._moveSpeedY = tapItem._exactYSpeedAfterCount_AfterTap;
             }

             $gameScreen.picture(tapItem._imgPictureId)._opacity = tapItem._opacityAfterClicked;
             $gameScreen.picture(tapItem._bubblePictureId)._opacity = tapItem._bubbleOpacityAfterClicked;
             $gameSwitches.setValue(66, true);
             $gameVariables.setValue(140, i);
          }
        }
      }
    }
  }
}

/* SceneManager.terminate = function() {
    var dateObj = new Date();
    $gameVariables.setValue(151, dateObj.getTime());
    alert("Saving Game, Time = " + $gameVariables.value(151));

    $gameSystem.onBeforeSave();
    DataManager.saveGame(1);
    window.close();
};

SceneManager.exit = function() {
    var dateObj = new Date();
    $gameVariables.setValue(151, dateObj.getTime());
    alert("Saving Game, Time = " + $gameVariables.value(151));

    $gameSystem.onBeforeSave();
    DataManager.saveGame(1);

    this.goto(null);
    this._exiting = true;
}; */


var setup_menu = function(){
    var start_X = 20;
    var start_Y = 20;

    var icon_spacing_X = 166;
    var icon_spacing_Y = 0;

    var spacing_X = 10;
    var spacing_Y = 0;

    var livesIcon_X = start_X;
    var livesIcon_Y = start_Y;

    var livesNumber_X = livesIcon_X+4;
    var livesNumber_Y = livesIcon_Y+12;

    var livesTimer_X = livesIcon_X + 48;
    var livesTimer_Y = livesIcon_Y + 14;

    var livesFull_X = livesIcon_X + 42 + spacing_X;
    var livesFull_Y = livesIcon_Y + 14;

    var coinsIcon_X = livesIcon_X + icon_spacing_X;
    var coinsIcon_Y = livesIcon_Y;

    var coinsNumber_X = coinsIcon_X + 62 + spacing_X;
    var coinsNumber_Y = coinsIcon_Y + 14;

    var starsIcon_X = coinsIcon_X + icon_spacing_X;
    var starsIcon_Y = livesIcon_Y;

    var starsNumber_X = starsIcon_X + 48 + spacing_X;
    var starsNumber_Y = starsIcon_Y + 14;

    $gameVariables.setValue(161, livesNumber_X);
    $gameVariables.setValue(162, livesNumber_Y);
    
    $gameVariables.setValue(163, livesTimer_X);
    $gameVariables.setValue(164, livesTimer_Y);

    $gameVariables.setValue(165, livesFull_X);
    $gameVariables.setValue(166, livesFull_Y);

    $gameVariables.setValue(167, coinsNumber_X);
    $gameVariables.setValue(168, coinsNumber_Y);

    $gameVariables.setValue(169, starsNumber_X);
    $gameVariables.setValue(170, starsNumber_Y);

    $gameScreen.showPicture(93, "lives", 0, livesIcon_X, livesIcon_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(94, "coins", 0, coinsIcon_X, coinsIcon_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(95, "stars", 0, starsIcon_X, starsIcon_Y, 100, 100, 255, 0);
};

var displayLivesTimer = function(){
    return (("0"+(($gameVariables.value(22)-1)-$gameVariables.value(2))).slice(-2)+":"+("0"+(60-$gameVariables.value(1))).slice(-2));
};