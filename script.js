/* VARIABLES */
let isToggled = true;

let difficultyDropdown, avatarDropdown;

let level1Img, level2Img, level3Img;
let level1Icon, level2Icon, level3Icon;

let screen = 'gameHomeScreen';
let redemptionScreenActive = false;

let difficulty = 'easy';

let lives = 3;
let level = 1;
let score = 0;
let highscore = 0;
let currentScore = 0;

let arrowFired = false;

let playerHP = 100;
let enemyHP = 100;

let catcher, fallingObject1, fallingObject2, fallingObject3, fallingObject4, fallingObject5;

let backgroundImg, catcherImg, fallingObject1Img, fallingObject2Img,fallingObject3Img, fallingObject4Img, fallingObject5Img;

let player, walls;
let archer, knight, sorceress, warrior, wizard, darkmage;
let avatar;
let selectedAvatar = "Archer";

let startTime;
let totalTime = 10;
let remainingTime; 

let moveDown = true;

/* PRELOAD LOADS FILES */
function preload(){
  //Load images
  level1Img = loadImage("assets/book.png");
  level2Img = loadImage("assets/potion.png");
  level3Img = loadImage("assets/maze.png");

  backgroundImg = loadImage("assets/forest.jpeg");
  backgroundImg2 = loadImage("assets/battleground.png");
  backgroundImg3 = loadImage("assets/battleground2.png");
  catcherImg = loadImage("assets/basket.png");
  fallingObject1Img = loadImage("assets/apple.png");
  fallingObject2Img = loadImage("assets/orange.png");
  fallingObject3Img = loadImage("assets/lemon.png");
  fallingObject4Img = loadImage("assets/twig.png");
  fallingObject5Img = loadImage("assets/rock.png");

  archer = loadImage("assets/archer.png");
  knight = loadImage("assets/knight.png");
  sorceress = loadImage("assets/sorceress.png");
  warrior = loadImage("assets/warrior.png");
  wizard = loadImage("assets/wizard.png");
  darkmage = loadImage("assets/darkmage.png");
  darkmage0 = loadImage("assets/darkmage0.png");
  skeleton = loadImage("assets/skeleton.png");

  fireballImg = loadImage("assets/fireball.png");
  arrowImg = loadImage("assets/arrow.png");

  //Load sounds
  catchSound = loadSound("assets/catch.wav");
  missSound = loadSound("assets/miss.wav");
  arrowsHitSound = loadSound("assets/arrowsHit.wav");
  fireballHitSound = loadSound("assets/fireballHit.wav");
  fireExtinguishedSound = loadSound("assets/fireExtinguished.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  noStroke();
  setStyle("An Ambitious \nAdventure", 200, 120);
  text("Click to continue...", width/2, 300);

  //Timer initialization
  startTime = millis();
  remainingTime = totalTime;

  //Resize images
  level1Img.resize(80,80);
  level2Img.resize(80,80);
  level3Img.resize(80,80);

  backgroundImg.resize(500,400);
  backgroundImg2.resize(550,400);
  backgroundImg3.resize(700,400);
  catcherImg.resize(100,100);
  fallingObject1Img.resize(30,30);
  fallingObject2Img.resize(30,30);
  fallingObject3Img.resize(30,30);
  fallingObject4Img.resize(60,30);
  fallingObject5Img.resize(30,30);

  archer.resize(80,80);
  knight.resize(80,80);
  sorceress.resize(80,80);
  warrior.resize(80,80);
  wizard.resize(80,80);
  darkmage.resize(80,80);
  darkmage0.resize(80,80);
  skeleton.resize(110,80);

  fireballImg.resize(30,30);
  arrowImg.resize(80,60);

  avatar = archer;

  // Create and position the difficulty dropdown menu
  difficultyDropdown = createSelect();
  difficultyDropdown.position(-400,-400);
  difficultyDropdown.option('Easy');
  difficultyDropdown.option('Medium');
  difficultyDropdown.option('Hard');
  difficultyDropdown.changed(handleDifficultyDropdownChange);

  // Create and position the avatar dropdown menu
  avatarDropdown = createSelect();
  avatarDropdown.position(-500,-500);
  avatarDropdown.option('Archer');
  avatarDropdown.option('Knight');
  avatarDropdown.option('Sorceress');
  avatarDropdown.option('Warrior');
  avatarDropdown.option('Wizard');
  avatarDropdown.changed(handleAvatarDropdownChange);

  //Create Level Icons
  level1Icon = new Sprite(level1Img,-100,-150,80,80, "s");
  level2Icon = new Sprite(level2Img,-300,-150,80,80, "s");
  level3Icon = new Sprite(level3Img,-200,-250,80,80, "s");

  //Create catcher 
  catcher = new Sprite(catcherImg,-400,-400,80,55, 'k');

  //Create falling objects
  fallingObject1 = new Sprite(fallingObject1Img,random(width),-200,30);
  fallingObject2 = new Sprite(fallingObject2Img,random(width),-300,30);
  fallingObject3 = new Sprite(fallingObject3Img,random(width),-500,30);
  fallingObject4 = new Sprite(fallingObject4Img,random(width),-500,60,30);
  fallingObject5 = new Sprite(fallingObject5Img,random(width),-100,30);

  //Create player avatar
  player = new Sprite(avatar, -350, -350, 60, 65, "k");
  player.rotationLock = true;
  player.layer = 1;

  //Create enemies
  enemy = new Sprite(darkmage, -450, -450, 60, 65, "s");
  enemy.rotationLock = true;
  enemy.layer = 3;

  enemy0 = new Sprite(darkmage0,-500,-500,60,65, "s");
  enemy0.rotationLock = true;
  enemy.layer = 3;

  skeleton = new Sprite(skeleton,-400,-400,90,65, "s")

  //Create fireballs
  fireball1 = new Sprite(fireballImg, -550, -550, 25, "s");
  fireball2 = new Sprite(fireballImg, -550, -550, 25, "s");
  fireball1.layer = 1;
  fireball2.layer = 1;

  //Create arrow
  arrow = new Sprite(arrowImg,-400,-400, 80, 60, "s");

  //Create the maze
  walls = new Group();

  new walls.Sprite(160, 10, 300, 5,);
  new walls.Sprite(10, height/2, 5, height - 15);  
  new walls.Sprite(200, 60, 5, 100);
  new walls.Sprite(width/2 + 42, 390, 310, 5);
  new walls.Sprite(50, 300, 75, 5); 
  new walls.Sprite(340, 146, 110, 5);
  new walls.Sprite(340, 250, 110, 5);
  new walls.Sprite(285, 198, 5, 109);
  new walls.Sprite(185, 332, 5, 109);
  new walls.Sprite(190, 197, 185, 5);
  new walls.Sprite(395, 200, 5, 380);

  walls.collider = 's';
  walls.color = 'black';
  moveWalls(-800, -800)

  //Create buttons
  startButton = new Sprite(-25,-25,120,40, "s");
  directionsButton = new Sprite(-20,-20,120,40, "s");
  levelsButton = new Sprite(-30,-30,120,40, "s");
  menuButton = new Sprite(-40,-40,120,40, "s");
  backButton = new Sprite(-50,-50,120,40, "s");
  yesButton = new Sprite(-60,-60,50,40, "s");
  noButton = new Sprite(-70,-70,50,40, "s");
  nextLevelButton = new Sprite(-80,-80,100,40, "s");
  retryButton = new Sprite(-90, -90, 80, 40, "s");
  settingsButton = new Sprite(-100,-100,120,40, "s");
  a1Button = new Sprite(-110,-110,130,50, "s");
  a2Button = new Sprite(-120,-120,130,50, "s");
  continueButton = new Sprite(-130, -130,120,40, "s");
  playButton = new Sprite(-140, -140,120,40, "s");

  createButtons(["Start", "Directions", "Levels", "Menu", "Back", "Yes", "No", "Next Level", "Retry","Settings", "A1", "A2", "Continue", "Play"]);
}

/* DRAW LOOP REPEATS */
function draw() {
  
  if((screen == 'gameHomeScreen' && mouseIsPressed) || menuButton.mouse.pressed()){
    showMenuScreen();
  }
  else if(startButton.mouse.pressed()){
    if(screen == 'menuScreen'){
      showLevel1HomeScreen();
    }
  }
  else if(playButton.mouse.pressed()){
    if(screen == 'level1HomeScreen'){
      if(difficulty == 'easy'){
        showLevel1Screen1();
      }
      else{
        showHardLevel1Screen1();
      }
    }
    else if(screen == 'level2HomeScreen'){
      showLevel2GameScreen();
    }
    else if(screen == 'level3HomeScreen'){
      showLevel3GameScreen();
    }
    else if(screen == 'bonusLevelHomeScreen'){
      showBonusLevelGameScreen();
      fireball1.pos = {x:355, y:225};
      fireball2.pos = {x:385, y:270};
    }
  }
  else if(directionsButton.mouse.pressed()){
    if(screen == 'menuScreen'){
      showDirectionsScreen(0);
    }
    else if(screen == 'level1HomeScreen'){
      showDirectionsScreen(1);
    }
    else if(screen == 'level2HomeScreen'){
      showDirectionsScreen(2);
    }
    else if(screen == 'level3HomeScreen'){
      showDirectionsScreen(3);
    }
    else if(screen == 'bonusLevelHomeScreen'){
      showDirectionsScreen(4);
    }
  }
  else if(levelsButton.mouse.pressed()){
    showLevelsScreen();
  }
  else if(settingsButton.mouse.pressed()){
    showSettingsScreen();
  }
  else if(backButton.mouse.pressed()){
    if(screen == 'level1DirectionsScreen'){
      showLevel1HomeScreen();
    }
    else if(screen == 'level2DirectionsScreen'){
      showLevel2HomeScreen();
    }
    else if(screen == 'level3DirectionsScreen'){
      showLevel3HomeScreen();
    }
  }
  else if(nextLevelButton.mouse.pressed()){
    if(screen == 'level1Screen3a' || screen == 'hardLevel1Screen3a' || screen == 'hardLevel1Screen4i'){
      showLevel2HomeScreen();
    }
    else if(screen == 'level2WinScreen'){
      level = 5;
      showLevel3HomeScreen()
    }
  }
  else if (retryButton.mouse.pressed()) {
    if(screen == 'level2LoseScreen'){
      lives = 3;
      score = 0;
      level = 1;
      showLevel2GameScreen();
    }
    else if(screen == 'level3LoseScreen'){
      showLevel3GameScreen();
    }
  }
  
  if(difficulty == 'easy'){
    if(yesButton.mouse.pressed()){
      if(screen == 'level1Screen1' || screen == 'level1Screen1b'){
        showLevel1Screen1a();
        screen = 'level1Screen1a';
      }
      else if(screen == 'level1Screen1a' || screen == 'level1Screen2b'){
        showLevel1Screen2a()
        screen = 'level1Screen2a';
      }
      else if(screen == 'level1Screen2a' || screen == 'level1Screen3b'){
        showLevel1Screen3a()
        screen = 'level1Screen3a';
      }
    }
    else if(noButton.mouse.pressed()){
      if(screen == 'level1Screen1'){
        showLevel1Screen1b();
        screen = 'level1Screen1b';
      }
      else if(screen == 'level1Screen1a'){
        showLevel1Screen2b();
        screen = 'level1Screen2b';
      }
      else if(screen == 'level1Screen2a'){
        showLevel1Screen3b();
        screen = 'level1Screen3b';
      }
      else if(screen == 'level1Screen1b' || screen == 'level1Screen2b' || screen == 'level1Screen3b'){
        if(isToggled){
          missSound.play();
        }
        showGameOverScreen();
      }
    }
  }
  else if(difficulty == 'medium' || difficulty == 'hard'){
    if(a1Button.mouse.pressed()){
      if(screen == 'hardLevel1Screen1'){
        showHardLevel1Screen1a();
      }
      else if(screen == 'hardLevel1Screen1a'){
        showHardLevel1Screen2a();
      }
      else if(screen == 'hardLevel1Screen1ii'){
        showHardLevel1Screen2i();
      }
      else if(screen == 'hardLevel1Screen2a'){
        showHardLevel1Screen3a();
      }
      else if(screen == 'hardLevel1Screen2b'){
        showHardLevel1Screen1a();
      }
      else if(screen == 'hardLevel1Screen2i'){
        showHardLevel1Screen3i();
      }
      else if(screen == 'hardLevel1Screen2ii'){
        showHardLevel1Screen4i();
      }
      else if(screen == 'hardLevel1Screen3b'){
        showHardLevel1Screen2a();
      }
      else if(screen == 'hardLevel1Screen3i'){
        showHardLevel1Screen2i();
      }
      else if(screen == 'hardLevel1Screen4ii'){
        if(avatar == archer && difficulty == 'hard'){
          showBonusLevelHomeScreen();
        }
        else{
          showHardLevel1Screen2ii();
        }
      }
    }
    else if(a2Button.mouse.pressed()){
      if(screen == 'hardLevel1Screen1'){
        showHardLevel1Screen1ii();
      }
      else if(screen == 'hardLevel1Screen1a'){
        showHardLevel1Screen2b();
      }
      else if(screen == 'hardLevel1Screen1ii'){
        if(avatar == archer && difficulty == 'hard'){
          showBonusLevelHomeScreen();
        }
        else{
          showHardLevel1Screen2ii();
        }
      }
      else if(screen == 'hardLevel1Screen2a'){
        showHardLevel1Screen3b();
      }
      else if(screen == 'hardLevel1Screen2b' || screen == 'hardLevel1Screen3b' || screen == 'hardLevel1Screen3i' || screen == 'hardLevel1Screen4ii'){
        if(isToggled){
          missSound.play();
        }
        showGameOverScreen();
      }
      else if(screen == 'hardLevel1Screen2i'){
        showHardLevel1Screen3ii();
      }
      else if(screen == 'hardLevel1Screen2ii'){
        showHardLevel1Screen4ii();
      }
    }
    else if(continueButton.mouse.pressed()){
      if(screen == 'hardLevel1Screen3ii'){
        showHardLevel1Screen2ii();
      }
    }
  }
  if(screen == 'settingsScreen'){
    // Draw the toggle button
    if (isToggled) {
      stroke('green'); // Green color for "ON" state
    } else {
      stroke('grey'); // Gray color for "OFF" state
    }
    strokeWeight(30);
    line(260, 110, 290, 110);
    noStroke();
    ellipse(isToggled ? 260 : 290, 110, 23, 23);
  }
  else if(screen == 'bonusLevelGameScreen'){
    image(backgroundImg3,-100,0);
    createHealthBar(90,200,selectedAvatar, playerHP);
    createHealthBar(340,200,"Dark Mage", enemyHP);

    //Fire arrows when user clicks
    if (kb.presses('space') && !arrowFired && fireball1.x > 200 && fireball2.x > 200) {
      fireArrow();
    }
    if (arrowFired) {
      arrow.position.x += 5; 
      if (arrow.position.x > 300) {
        if(isToggled){
          arrowsHitSound.play();
        }
        enemyHP -= 20;
        resetArrow();
      }
    }

    fireball1.position.x -= 3;
    fireball2.position.x -= 2;

    //Resets fireball if off-screen
    if(fireball1.x < 0){
      moveFireballs(1,-3);
    }
    else if(fireball2.x < 0){
      moveFireballs(2,-2);
    }

    //Player loses 20 HP when hit
    if(player.collides(fireball1)){
      if(isToggled){
        fireballHitSound.play();
      }
      fireball1.collider = 's';
      playerHP -= 20;
      moveFireballs(1,3);
    }
    else if(player.collides(fireball2)){
      if(isToggled){
        fireballHitSound.play();
      }
      fireball2.collider = 's';
      playerHP -= 20;
      moveFireballs(2,2);
    }

    //Changes collider type when neccessary
    if(fireball1.x < 150){
      fireball1.collider = 'd';
      fireball1.resize
    }
    if(fireball1.x > 150){
      fireball1.collider = 's';
    }
    if(fireball2.x < 150){
      fireball2.collider = 'd';
    }
    if(fireball2.x > 150){
      fireball2.collider = 's';
    }

    //Fireballs disappear when pressed in range
    if(mouseIsPressed){
      if(fireball1.x < 150 && mouseOverFireball(fireball1)){
        if(isToggled){
          fireExtinguishedSound.play();
        }
        fireball1.collider = 'd';
        fireball1.pos = {x:random(355,385), y:random(225,270)};
      }
      else if(fireball2.x < 150 && mouseOverFireball(fireball2)){
        if(isToggled){
          fireExtinguishedSound.play();
        }
        fireball2.collider = 'd';
        fireball2.pos = {x:random(355,385), y:random(225,270)};
      }
    }

    if(enemyHP == 0){
      if(isToggled){
        catchSound.play();
      }
      showBonusLevelWinScreen();
    }
    else if(playerHP == 0){
      if(isToggled){
        missSound.play();
      }
      showGameOverScreen()
    }
  }
  else if(screen == 'bonusLevelWinScreen'){
    if(mouseIsPressed){
      showHardLevel1Screen2ii();
    }
  }
  else if(screen == 'level2GameScreen'){
    image(backgroundImg,0,0);

    //Level, Score, and Highscore
    textSize(20);
    textAlign(LEFT);
    drawHearts();
    fill(255);
    text("Level: " + level, 10, 60);
    text("Score: " + score, 10, 90);
    text("Highscore: " + highscore, 260, 30);

    //If objects reach bottom, reset to random top position
    if(fallingObject1.y >= 400){
      resetFruits(1, false);
    }
    else if(fallingObject2.y >= 400){
      resetFruits(2, false);
    }
    else if(fallingObject3.y >= 400){
      resetFruits(3,false);
    }
    //Lower chances of obstacles falling
    else if(fallingObject4.y >= 400){
      resetObstacles(4, false);
    }
    else if(fallingObject5.y >= 400){
      resetObstacles(5, false);
    }

    //Movement
    if(kb.pressing('left')){
      catcher.vel.x = -3;
    }
    else if(kb.pressing('right')){
      catcher.vel.x = 3;
    }
    else{
      catcher.vel.x = 0;
    }

    //Stop catcher at end of screen
    if(catcher.x < 50){
      catcher.x = 50;
    }
    else if(catcher.x > 350){
      catcher.x = 350;
    }

    //If objects collide with catcher, reset to random top position
    if(fallingObject1.collides(catcher)){
      resetFruits(1, true);
    }
    else if(fallingObject2.collides(catcher)){
      resetFruits(2, true);
    }
    else if(fallingObject3.collides(catcher)){
      resetFruits(3, true);
    }
    else if(fallingObject4.collides(catcher)){
      resetObstacles(4, true);
    }
    else if(fallingObject5.collides(catcher)){
      resetObstacles(5, true);
    }
  }
  else if(screen == 'level3GameScreen'){
    background("seagreen");
    player.collider = 'd';
    showTimer();

    if(difficulty == 'medium' || difficulty == 'hard'){
      //Move skeleton up and down in a loop
      if (moveDown) {
        skeleton.position.y += 1;
        if (skeleton.position.y >= 160) {
          moveDown = false;
        }
      } else {
        skeleton.position.y -= 1;
        if (skeleton.position.y <= 50) {
          moveDown = true;
        }
      }

      if(player.collides(skeleton)){
        if(isToggled){
          missSound.play();
        }
        movePlayer(false);
      }

      if(difficulty != 'medium'){
        //Move enemy left and right in  a loop
        if(enemy0.x < 245){
          enemy.visible = false;
          enemy0.visible = true;
          enemy0.position.x += 2;
        }
        else if(enemy0.x > 245){
          enemy0.visible = false;
          enemy.visible = true;
          if(enemy.x >= 50){
            enemy.position.x -= 2;
          }
          else{
            enemy.visible = false;
            enemy0.visible = true;
            enemy0.x = 50;
            enemy.x = 245;
          }
        }

        if(player.collides(enemy0) || player.collides(enemy)){
          if(isToggled){
            missSound.play();
          }
          movePlayer(false);
        }
      }
    }

    // Timer update
    let currentTime = millis();
    remainingTime = totalTime - (currentTime - startTime) / 1000;
    // Check if time is up
    if (remainingTime <= 0) {
      remainingTime = 0;
      if(isToggled){
        missSound.play();
      }
      if (screen == 'level3GameScreen') {
        showLevel3LoseScreen();
        screen = 'level3LoseScreen';
        return;
      }
    }
    
    //Move the player
    if(kb.pressing('left')){
      player.vel.x = -3;
    }
    else if(kb.pressing('right')){
      player.vel.x = 3;
    }
    else if(kb.pressing('up')){
      player.vel.y = -3;
    }
    else if(kb.pressing('down')){
      player.vel.y = 3;
    }
    else{
      player.vel.x = 0;
      player.vel.y = 0;
    }

    // Draw start and end text
    fill(0);
    textSize(20);
    text('End', 370, 20);
    text('Start', 70, 395);

    //Player cannot go below maze
    if (player.y > 350) {
      player.y = 350;
    }

    // Player wins
    if (player.y < 45) {
      if(isToggled){
        catchSound.play();
      }
      player.vel.x = 0;
      player.vel.y = 0;
      showLevel3WinScreen();
    }
  }
  else if(screen == 'level3WinScreen' && mouseIsPressed){
    showConclusionScreen();
  }

  //Calculate score
  currentScore = (level - 1)*5 + score
  if(currentScore > highscore){
    highscore = currentScore;
  }

  //Level up
  if(score > 4){
    level += 1;
    score = 0;
    if(difficulty == 'easy' || difficulty == 'medium'){
      lives = 3;
    }
  }

  //Display score when necessary
  if(score < 0 || level == 2 || lives == 0){
    showResults(score);
  }

  //Check if redemption screen is active
  if(redemptionScreenActive) {
      if(mouseIsPressed){
          if(isToggled){
            missSound.play();
          }
          showGameOverScreen();
          redemptionScreenActive = false; 
      }
  }
  //allSprites.debug = mouse.pressing();
}

/* FUNCTIONS */

function mousePressed() {
  // Check if the mouse is within the boundaries of the button
  if (mouseX > 245 && mouseX < 305 && mouseY > 95 && mouseY < 125) {
    isToggled = !isToggled;
    console.log(isToggled);
  }
}

//Style Functions

//Set same style buttons
function setStyle(textDisplayed,x,y){
  textStyle(BOLD);
  background('seagreen');
  textSize(40);
  textAlign(CENTER);
  fill('#50C878');
  text(textDisplayed,x,y);
  textSize(15);
  fill(255);
}

//Create all the buttons with the same style
function createButtons(names){
  let buttonsList = [startButton, directionsButton, levelsButton, menuButton, backButton, yesButton, noButton, nextLevelButton, retryButton, settingsButton, a1Button, a2Button, continueButton, playButton];
  for(let i = 0; i < buttonsList.length; i++){
    buttonsList[i].text = names[i];
    buttonsList[i].textColor = 'seagreen';
    buttonsList[i].color = "#50C878";
  }
}

// Function to wrap text
function wrapText(txt, x, y, maxWidth, lineHeight) {
  let words = txt.split(' ');
  let line = '';
  textAlign(LEFT);

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth) {
      text(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  text(line, x, y);
}

//Dropdown Functions

//Handles the selected option for changing difficulty level
function handleDifficultyDropdownChange() {
  let selectedOption = difficultyDropdown.value();

  if (selectedOption === 'Easy') {
    difficulty = 'easy';
    totalTime = 10;
  } else if (selectedOption === 'Medium') {
    difficulty = 'medium';
    totalTime = 20;
  } else if (selectedOption === 'Hard') {
    difficulty = 'hard';
    totalTime = 20;
  }
}

//Handles the selected option for changing the avatar
function handleAvatarDropdownChange(){
  selectedAvatar = avatarDropdown.value();

  if(selectedAvatar === "Archer"){
    avatar = archer;
  }
  else if(selectedAvatar === "Knight"){
    avatar = knight;
  }
  else if(selectedAvatar === "Sorceress"){
    avatar = sorceress;
  }
  else if(selectedAvatar === "Warrior"){
    avatar = warrior;
  }
  else if(selectedAvatar === "Wizard"){
    avatar = wizard;
  }

  //Hide previously selected options
  fill('seagreen');
  rect(160,230,80,80);
  
  player.image = avatar;
}

//Movement Functions

//Moves the menu buttons off-screen or in position
function moveMenuButtons(offscreen){
  if(offscreen){
    startButton.pos = {x:-100, y:-100};
    directionsButton.pos = {x:-150, y:-150};
    levelsButton.pos = {x:-200, y:-200};
    settingsButton.pos = {x:-250, y:-250};
  }
  else{
    startButton.pos = {x:width/2, y:150};
    directionsButton.pos = {x:width/2, y:210};
    levelsButton.pos = {x:width/2, y:270};
    settingsButton.pos = {x:width/2, y:330};
  }
}

//Moves directions and play button off-screen or in position
function moveDirectionsAndPlayButton(offscreen){
  if(offscreen){
    directionsButton.pos = {x:-100, y:-100};
    playButton.pos = {x:-150, y:-150};
  }
  else{
    directionsButton.pos = {x:width/2-100, y:height/2+100};
    playButton.pos = {x:width/2+100, y:height/2+100};
  }
}

//Moves the level icons off-screen or in position
function moveLevelIcons(offscreen){
  if(offscreen){
    level1Icon.pos = {x:-100, y:-150};
    level2Icon.pos = {x:-300, y:-150};
    level3Icon.pos = {x:-200, y:-250};
  }
  else{
    level1Icon.pos = {x:100, y:170};
    level2Icon.pos = {x:300, y:170};
    level3Icon.pos = {x:200, y:270};
  }
}

//Moves the back button off-screen or in position
function moveBackButton(offscreen){
  if(offscreen){
    backButton.pos = {x:-50, y:-50};
  }
  else{
    backButton.pos = {x:width/2, y:350};
  }
}

//Moves the yes and no buttons off-screen or in position
function moveYesAndNoButtons(offscreen){
  if(offscreen){
    yesButton.pos = {x:-60, y:-60};
    noButton.pos = {x:-70, y:-70};
  }
  else{
    yesButton.pos = {x:120, y:330};
    noButton.pos = {x:280, y:330};
  }
}

//Moves the next level button off-screen or in position
function moveNextLevelButton(offscreen){
  if(offscreen){
    nextLevelButton.pos = {x:-80, y:-80};
  }
  else{
    nextLevelButton.pos = {x:width/2, y:320};
  }
}

//Move catcher off-screen or in position
function moveCatcher(offscreen){
  if(offscreen){
    catcher.pos = {x:-250, y:-250};
  }
  else{
    catcher.pos = {x: 200, y: 380};
  }
}

//Move retry button off-screen or in position
function moveRetryButton(offscreen){
  if(offscreen){
    retryButton.pos = {x:-300, y:-300};
  }
  else{
    retryButton.pos = {x: width/2, y: height/2+50};
  }
}

//Moves both option buttons off-screen or in position
function moveA1AndA2Buttons(offscreen){
  if(offscreen){
    a1Button.pos = {x:-110, y:-110};
    a2Button.pos = {x:-120, y:-120};
  }
  else{
    a1Button.pos = {x:width/2-80, y:320};
    a2Button.pos = {x:width/2+80, y:320};
  }
}

//Move player avatar off-screen or in position
function movePlayer(offscreen){
  if(offscreen){
    player.pos = {x:-350, y:-350};
  }
  else{
    player.pos = {x: 60, y: 345};
  }
}

// Move the entire walls group by an offset
function moveWalls(offsetX, offsetY) {
  walls.forEach(wall => {
    wall.x += offsetX;
    wall.y += offsetY;
  });
}

//Move falling objects off screen
function moveFallingObjects(){
  let fallingObjects = [fallingObject1, fallingObject2, fallingObject3, fallingObject4, fallingObject5];
  for(let i = 0; i < 5; i++){
    fallingObjects[i].pos = {x: random(width), y: -10-random(height)};
  }
}

//Setting Functions

//Set initial conditions for falling objects
function setObjectsInitial(){
  let fallingObjectsList = [fallingObject1, fallingObject2, fallingObject3, fallingObject4, fallingObject5];
  for(let i = 0; i < 5; i++){
    fallingObjectsList[i].vel.y = 2;
    fallingObjectsList[i].rotationLock = true;
    fallingObjectsList[i].direction = 'down';
  }
}

//Set initial conditions for fireballs
function setFireballsInitial(){
  fireball1.rotationLock = true;
  fireball1.direction = 'left';
  fireball1.x = 420;

  fireball2.rotationLock = true;
  fireball2.direction = 'left';
  fireball2.x = 420;
}

//Sets the fireballs speed and position 
function moveFireballs(number, speed){
  if(number == 1){
    fireball1.pos = {x:random(355,385), y:random(225,270)};
    fireball1.position.x += speed;
  }
  else if(number == 2){
    fireball2.pos = {x:random(355,385), y:random(225,270)};
    fireball2.position.x += speed;
  }
}

function mouseOverFireball(fireball) {
  return mouseX >= fireball.position.x - fireball.width / 2 &&
         mouseX <= fireball.position.x + fireball.width / 2 &&
         mouseY >= fireball.position.y - fireball.height / 2 &&
         mouseY <= fireball.position.y + fireball.height / 2;
}

//Fires the arrows
function fireArrow() {
  arrowFired = true;
  arrow.position.x = player.position.x + 50; 
  arrow.position.y = player.position.y;
  arrow.visible = true; 
}

//Resets the arrows after firing
function resetArrow() {
  arrowFired = false; 
  arrow.pos = {x:-900, y:-900};
  arrow.visible = false;
}

//Creates health bars (used for player and enemy)
function createHealthBar(x, y, name, health){
  let barColor;
  if(health > 40){
    barColor = 'green'; 
  }
  else if(health > 30){
    barColor = 'yellow';
  }
  else if(health > 10){
    barColor = 'orange';
  }
  else{
    barColor = 'red';
  }
  text("HP", x-90,y+5); //HP = health points
  text(name,x-30,y-20);
  stroke(0);
  strokeWeight(15);
  line(x-50,y,x+50,y);
  stroke(255);
  strokeWeight(12);
  line(x-50,y,x+50,y);
  stroke(barColor);
  line(x-50,y,x-50+health,y);
  noStroke();
}

//Set the velocity of the falling objects
function setFallingObjectsVel(velocity){
  let fallingObjects1 = [fallingObject1, fallingObject2, fallingObject3, fallingObject4, fallingObject5];
  for(let i = 0; i < 5; i++){
    fallingObjects1[i].vel.y = velocity;
  }
}

//Reset falling fruits to random top position
function resetFruits(number, caught){
  let fallingFruits = [fallingObject1, fallingObject2, fallingObject3];
  for(let i = 0; i < 3; i ++){
    if(number == (i+1)) {
      fallingFruits[i].y = 0-random(height);
      fallingFruits[i].x = random(width);
      fallingFruits[i].vel.y = random(1,5);
      fallingFruits[i].direction = 'down';
    }
  }
  if(caught){
    score += 1;
    if(isToggled){
      catchSound.play();
    }
  }
  else if(difficulty == 'easy' && score == 0){
    lives -= 1;
  }
  else{
    score -= 1;
    lives -= 1;
    if(isToggled){
      missSound.play();
    }
  }
}

//Reset falling obstacles to random top position
function resetObstacles(number, caught){
  let fallingObstacles = [fallingObject4, fallingObject5];
  for(let i = 0; i < 2; i++){
    if(number == (i+4)){
      fallingObstacles[i].y = -300;
      fallingObstacles[i].x = random(width);
      fallingObstacles[i].vel.y = random(1,5);
      fallingObstacles[i].direction = 'down';
    }
  }
  if(difficulty == 'easy' && score == 0){
    lives -= 1;
  }
  else if(caught){
    score -= 1;
    lives -= 1;
    if(isToggled){
      missSound.play();
    }
  }
}

//Create hearts to represent lives
function drawHeart(x, y, size) {
  fill('red');
  // Calculate dimensions of the ovals
  let ovalWidth = size * 0.4;
  let ovalHeight = size * 0.7;
  let angle = 45;

  // Draw left oval
  push();
  translate(x - size / 7, y);
  rotate(-angle);
  ellipse(0, 0, ovalWidth, ovalHeight);
  pop();

  // Draw right oval
  push();
  translate(x + size / 7, y);
  rotate(angle);
  ellipse(0, 0, ovalWidth, ovalHeight);
  pop();
}

function drawHearts(){
  for(let i = 0; i < lives; i++){
    drawHeart(20 + i *35, 20, 30)
  }
}

//Show the result of the game once it ends
function showResults(score, outcome){
  let result = "";
  let instructions = "";

  //Lose state
  if(score < 0 || lives == 0){
    result = "YOU LOSE!";
    instructions = "Press 'Retry' to play again";
    screen = 'level2LoseScreen';
    moveRetryButton(false);
  }
  //Win State
  else if(level == 2){
    result = "YOU WIN!";
    instructions = "Press to advance to level 3"
    screen = 'level2WinScreen';
    moveNextLevelButton(false);
  }

  setStyle(result,200,160);
  text(instructions, 200,190);

  moveCatcher(true);

  moveFallingObjects();
  setFallingObjectsVel(0);
}

//Level 0 Screens (e.g. home and menu screens)

//Shows the menu screen
function showMenuScreen(){
  setStyle("Main Menu", 200, 80);
  moveMenuButtons(false);
  moveLevelIcons(true);
  movePlayer(true);

  continueButton.pos = {x:-50, y:-50};
  menuButton.pos = {x:-60, y:-60};
  difficultyDropdown.position(-400,-400);
  avatarDropdown.position(-500,-500);

  screen = 'menuScreen';
}

//Shows the settings screen
function showSettingsScreen(){
  setStyle("Settings", 200, 80);

  moveMenuButtons(true);
  player.pos = {x:width/2, y:height/2+70};
  menuButton.pos = {x:width/2, y:350};

  text("Toggle sound effects: ", width/2-50, height/2-83);
  text("Choose difficulty level: ", width/2-50, height/2-43);
  difficultyDropdown.position(width/2+50, height/2 -50);

  text("Choose your avatar: ", width/2-50, height/2-3);
  avatarDropdown.position(width/2+40, height/2-10);

  screen = 'settingsScreen';
}

//Shows the directions screen for each level
function showDirectionsScreen(level){
  setStyle("DIRECTIONS",200,70);
  if(level == 0){
    wrapText("Embark on an epic quest to save your dying village, journeying through three challenging levels! In level one, make wise choices to uncover information about the cure and its location. In level two, gather the necessary ingredients for the remedy. Finally, in level three, race against time to return home and deliver the cure!",20,110,370,30);
    menuButton.pos = {x:width/2, y:340};
    screen = 'gameDirectionsScreen';
  }
  else if(level == 1){
    wrapText("Read the story on the screen carefully, and make your decision by pressing the button that corresponds to your choice. Each choice you make will guide you through different paths of the adventure. Take your time, think wisely, and enjoy the journey.",20,130,370,30);
    moveDirectionsAndPlayButton(true);
    moveBackButton(false);
    screen = 'level1DirectionsScreen';
  }
  else if(level == 2){
    wrapText("Move the basket using the left and right arrow keys to catch the falling fruits. Your goal is to score 15 points by successfully collecting the magic fruits before they hit the ground. Be careful to avoid the rocks and twigs, as they can reduce your score and slow you down. Keep your focus sharp and your reflexes quick.",20,130,370,30);
    moveDirectionsAndPlayButton(true);
    moveBackButton(false);
    screen = 'level2DirectionsScreen';
  }
  else if(level == 3){
    wrapText("Use the left and right arrow keys to guide your avatar through the intricate maze ahead. Your goal is to reach the maze's end before time runs. Navigate carefully, avoiding dead ends and traps that could slow your progress. Stay focused, strategize your moves, and aim to conquer this challenging level before the time elapses", 20,130,370,30);
    moveDirectionsAndPlayButton(true);
    moveBackButton(false);
    screen = 'level3DirectionsScreen';
  }
  else if(level == 4){
    wrapText("Use the up and down arrow keys to dodge the fireballs or click on them to deflect it when they are in range. Your goal is to defeat the enemy monster while defending yourself against its attacks. Press the spacebar to unleash your avatar's special attack!", 20,130,370,30);
    moveDirectionsAndPlayButton(true);
    moveBackButton(false);
    screen = 'level3DirectionsScreen';
  }

  moveMenuButtons(true);
}

// Shows the levels screen
function showLevelsScreen(){
  setStyle("LEVELS",200,70);
  
  moveMenuButtons(true);
  moveLevelIcons(false);
  menuButton.pos = {x:width/2, y:350};

  text("Level 1",100,120);
  text("Level 2",300,120);
  text("Level 3",200,220);

  screen = 'levelsScreen';
}

//Level 1 Screens

// Shows the level 1 home screen
function showLevel1HomeScreen(){
  setStyle("Level 1: \nQuick Quest", 200, 70);
  wrapText("Make wise choices in this choose-your-own adventure level to obtain information about a cure and advance to the next level! Click for more directions or start playing now...", 20, 170,370,30);
  moveMenuButtons(true);
  
  playButton.pos = {x:width/2+90, y:height/2+120};
  directionsButton.pos = {x:width/2-90, y:height/2+120};
  backButton.pos = {x:-50, y:-50};

  screen = 'level1HomeScreen';
}

//Following CYOA screens for the easy difficulty

//Shows level 1, screen 1
function showLevel1Screen1(){
  background('seagreen');
  wrapText("One day, your village is struck by a mysterious and seemingly incurable disease. You alone remain healthy. You realize you are their last hope. The responsibility weighs heavily on you, but determination sparks within. The task ahead is daunting and fraught with dangers, but you cannot allow fear and despair to hold you back. Do you have the strength and resolve to embark on this quest in hopes of finding the cure to save your people?", 30, 45, 340, 25);
  
  moveYesAndNoButtons(false);
  moveMenuButtons(true);
  playButton.pos = {x:-140, y:-140};

  screen = 'level1Screen1';
}

//Shows level 1, screen 1a
function showLevel1Screen1a(){
  background('seagreen');
  wrapText("You make a brave decision to leave the village in search of a cure. Though unsure if one even exists, you cling to hope. On your journey through tall mountains and treacherous paths, you encounter a disheveled witch begging for food. Her eyes are filled with desperation. You only have enough provisions for yourself, making this a difficult choice. Will you help the stranger in need?", 30, 45, 340, 25);
}

//Shows level 1, screen 1b
function showLevel1Screen1b(){
  background('seagreen');
  wrapText("You decide to stay in the village rather than seeking a cure. Over time, more villagers succumb to the relentless disease. Eventually, you too fall ill. As the fever grips your body, you realize the enormity of your decision. Guilt weighs heavily as you acknowledge that leaving might have offered a chance. With the last shreds of hope extinguished, you join the many lost to the plague. Would you like to change your decision?", 30, 45, 340, 25);
}

//Shows level 1, screen 2a
function showLevel1Screen2a(){
  background('seagreen');
  wrapText(`You decide to share your rations with the witch. She declines your offer and reveals herself as a beautiful enchantress. "You have a pure heart, young ${selectedAvatar.toLowerCase()}", she says. "Despite the despair that clings to it, I see the glimmer of hope that remains. As a reward for your kindness, I shall grant you the information you seek. The cure lies deep in the enchanted forest, within the magical fruits. But beware, the forest is filled with dangers. Are you brave enough to continue your adventure?"`, 30, 45, 340, 25);
}

//Shows level 1, screen 2b
function showLevel1Screen2b(){
  background('seagreen');
  wrapText("You choose to keep all your food for yourself. Enraged by your greed, the witch's eyes blaze with fury as she curses you: 'You shall be cursed with gluttony. No matter how much you eat, you will never be satisfied and starve.' At first, you dismiss her words. But, despite consuming everything in sight, the hunger persists, tormenting you until your strength wanes and you succumb to starvation. Would you like to change your decision?", 30, 45, 340, 25);
}

//Shows level 1, screen 3a
function showLevel1Screen3a(){
  background('seagreen');
  wrapText("You venture into the enchanted forest in search of the magical fruit. As you delve deeper, sunlight filters through the dense canopy, illuminating a mesmerizing sight—a cascade of magical fruit falling from towering trees. Guided by the hope of a cure for your village, you reach out to collect these ingredients. To embark on the next phase of your quest, click below to start level 2.", 30, 45, 340, 25);

  moveYesAndNoButtons(true);
  moveNextLevelButton(false);
}

//Shows level 1, screen 3b
function showLevel1Screen3b(){
  background('seagreen');
  wrapText("You decide to return to the village rather than continue. Fear has held you back from embarking on the dangerous mission to find a cure, opting instead for safety. You return defeated and empty-handed, unable to face the unknown dangers beyond the village's borders. Now, as the disease ravages your body, you realize the full extent of your mistake. Would you like to change your decision?", 30, 45, 340, 25);
}

//Allows user to go back after wrong choice
function showRedemption(){
  if(difficulty == 'medium'){
    wrapText("Would you like to change your previous choice and let hope guide you down a different path?", 30, 250, 340, 25);

    a1Button.pos = {x:width/2-80, y:320};
    a1Button.text = "Yes";

    a2Button.pos = {x:width/2+80, y:320};
    a2Button.text = "No";
  }
  else if(difficulty == 'hard'){
    moveA1AndA2Buttons(true);
    text("Click to continue", 130, 300);
    redemptionScreenActive = true;
  }
}

//Following CYOA screens for the medium and hard difficulty

//Shows level 1, screen 1
function showHardLevel1Screen1(){
  background('seagreen');
  wrapText("In the quiet village of Aeloria, a deadly plague has mercilessly swept through. Only you stand as the sole survivor, your heart heavy with grief yet ablaze with a flicker of undying hope. You must venture out into the unknown to seek a cure, knowing that the fate of your people depends on your success. Standing at the edge of the village, two paths lie before you:", 30, 45, 340, 25);
  a1Button.pos = {x:width/2-80, y:320};
  a1Button.text = "Journey to \nthe mountains";

  a2Button.pos = {x:width/2+80, y:320};
  a2Button.text = "Travel to \nthe library";

  moveMenuButtons(true);
  playButton.pos = {x:-140, y:-140};

  screen = 'hardLevel1Screen1';
}

//Shows level 1, screen 1a
function showHardLevel1Screen1a(){
  background('seagreen');
  wrapText("You have chosen to journey to the mountains to find a renowned but reclusive healer. You climb the steep, rocky paths, the air growing thinner and colder as you ascends. Despite the challenges, your hope guides you, reminding you of your purpose. You knows the healer, Liora, lives somewhere high above, hidden away from the world. As you continue on the treacherous path, it suddenly forks in two: ", 30, 45, 340, 25);
  a1Button.text = "Follow the \nnarrow trail";
  a2Button.text = "Climb the \nsteep slope";

  screen = 'hardLevel1Screen1a';
}

//Shows level 1, screen 1ii
function showHardLevel1Screen1ii(){
  background('seagreen');
  wrapText("You have chosen to travel to the prestigious library in the city of Elarion to find a book pertaining to the cure. You walk along the dusty road, the sun beating down on you relentlessly. The journey is long, and you feel the weight of exhaustion. Yet, your hope remains unshaken, pushing you forward. In the distance, you see an abandoned farmhouse that might offer some respite.", 30, 45, 340, 25);
  a1Button.text = "Seek \nshelter";
  a2Button.text = "Continue \nwalking";

  screen = 'hardLevel1Screen1ii';
}

//Shows level 1, screen 2a
function showHardLevel1Screen2a(){
  background('seagreen');
  wrapText("You have chosen to follow the narrow, winding trail leading deeper into the mountains, which seems safer but longer. You tread carefully along the trail, your steps cautious but hopeful. The path twists and turns, and after several hours, you find a small, hidden hut nestled between two towering cliffs. Through the window, you can see the healer Liora, who is still unaware of your presence. ", 30, 45, 340, 25);
  a1Button.text = "Ask Liora \nfor help";
  a2Button.text = "Explore the \nsurroundings";

  screen = 'hardLevel1Screen2a';
}

//Shows level 1, screen 2b
function showHardLevel1Screen2b(){
  background('seagreen');
  wrapText("You have chosen to climb the steep, rocky slope for a quicker route, though it is fraught with danger. The rocks are loose and slippery, making your ascent perilous. Halfway up, you loses your footing and fall, succumbing to your injuries.", 30, 45, 340, 25);
  showRedemption();

  screen = 'hardLevel1Screen2b';
}

//Shows level 1, screen 2i
function showHardLevel1Screen2i(){
  background('seagreen');
  wrapText("You have chosen to seek shelter in the abandoned farmhouse you spotted ahead. You enter the farmhouse cautiously. It is dark and eerily quiet. You notice strange noises coming from the cellar below, a soft, unsettling sound. Despite the fear, hope keeps you steady. However, you also feel curious and wonder whether you should investigate the mysterious noise or just ignore it.", 30, 45, 340, 25);
  a1Button.text = "Investigate \nthe noise";
  a2Button.text = "Ignore \nthe noise";

  moveMenuButtons(true);

  screen = 'hardLevel1Screen2i';
}

//Shows level 1, screen 2ii
function showHardLevel1Screen2ii(){
  background('seagreen');
  wrapText("You have chosen to continue walking towards the ancient library, hoping to reach it before nightfall. You push on, your feet aching and your throat parched. As the sun sets, you finally arrives at the grand entrance of the library. Inside, you are greeted by a wise old librarian, who looks at you with kind but weary eyes. Your hope is renewed at the sight of the vast knowledge within these walls.", 30, 45, 340, 25);
  a1Button.pos = {x:width/2-80, y:320};
  a1Button.text = "Ask librarian \nfor help";

  a2Button.pos = {x:width/2+80, y:320};
  a2Button.text = "Search the \nlibrary yourself";

  continueButton.pos = {x:-130, y:-130};

  screen = 'hardLevel1Screen2ii';
}

//Shows level 1, screen 3a
function showHardLevel1Screen3a(){
  background('seagreen');
  wrapText("You decide to ask for Liora's help. You explain your village's plight to Liora, who is moved by your determination and courage. Liora invites you inside and shares her knowledge, revealing the secrets of the cure. You discover that you must collect the magical fruit from the enchanted forest to make the cure. Congratulations! You have completed level 1.", 30, 45, 340, 25);
  moveA1AndA2Buttons(true);
  moveNextLevelButton(false);
  
  screen = 'hardLevel1Screen3a';
}

//Shows level 1, screen 3b
function showHardLevel1Screen3b(){
  background('seagreen');
  wrapText("You have chosen explore the area around the hut for any clues that might help. You begin to search the surroundings of the hut. Despite the daunting task, hope keeps you moving. However, as you venture too close to the edge of a cliff, a sudden rockslide occurs. You are caught in the cascade of rocks and debris and tragically do not survive.", 30, 45, 340, 25);
  showRedemption()

  screen = 'hardLevel1Screen3b';
}

//Shows level 1, screen 3i
function showHardLevel1Screen3i(){
  background('seagreen');
  wrapText("You have chosen to investigate the noises. You slowly descends into the dark, musty cellar. There, you find an old, dusty book on a pedestal. As you open it, a curse is triggered. The air grows cold, and you feel a dark force envelop you, leading to your demise.", 30, 45, 340, 25);
  showRedemption()

  screen = 'hardLevel1Screen3i';
}

//Shows level 1, screen 3ii
function showHardLevel1Screen3ii(){
  background('seagreen');
  wrapText("You have chosen to ignore the unsettling sounds and find a corner to rest. As you drift off to sleep, you are awakened by rough hands grabbing her. Turns out that the noises were coming from bandits who have taken shelter here as well. They attack you, but you are able to fend them off and run away. It it still light out, so you head towards the anciet library.", 30, 45, 340, 25);

  continueButton.pos = {x:width/2, y:height/2+100};
  moveA1AndA2Buttons(true);

  screen = 'hardLevel1Screen3ii';
}

//Shows level 1, screen 4i
function showHardLevel1Screen4i(){
  background('seagreen');
  wrapText("You have chosen to ask the librarian for help. You explain your dire situation to the librarian, who nods thoughtfully. The librarian leads you to a hidden section of the library where ancient texts are kept. There, you find an old manuscript detailing the cure for the plague. You discover that you need to collect magical fruit from the enchanted forest to make the cure. Congratulations, you have completed level 1!", 30, 45, 340, 25);

  moveNextLevelButton(false);
  moveA1AndA2Buttons(true);

  screen = 'hardLevel1Screen4i';
}

//Shows level 1, screen 4ii
function showHardLevel1Screen4ii(){
  background('seagreen');
  wrapText("You have decided to search for the book on your own. You begin to scour the endless rows of books. The library is vast and labyrinthine, and you quickly become overwhelmed. Lost among the towering shelves, you succumb to exhaustion and despair.", 30, 45, 340, 25);
  showRedemption()

  screen = 'hardLevel1Screen4ii';
}

// Bonus Level (appears between level 1 and 2)

//Shows bonus level home screen
function showBonusLevelHomeScreen(){
  background('seagreen');
  setStyle("Bonus Level: \nBoss Battle", 200, 70);
  wrapText("On your way to the anciet library, an enemy has appeared before you! Defeat the enemy to continue on your journey! Click for more directions or start playing now...", 20,170,370,30);
  moveDirectionsAndPlayButton(false);
  moveA1AndA2Buttons(true);
  continueButton.pos = {x:-50, y:-50};

  setFireballsInitial();

  screen = 'bonusLevelHomeScreen';
}

//Shows bonus level game screen
function showBonusLevelGameScreen(){
  image(backgroundImg3, -100,0);
  moveDirectionsAndPlayButton(true);

  arrow.visible = false;
  
  playerHP = 100;
  enemyHP = 100;

  player.pos = {x:50, y:270};
  enemy.pos = {x:360, y:250};
  
  screen = 'bonusLevelGameScreen';
}

//Shows bonus level win screen
function showBonusLevelWinScreen(){
  background("seagreen");
  setStyle("YOU WIN!",200,180);
  text("You defeated the boss! \nClick to continue on your way to the ancient library", 200,220);

  enemy.pos = {x:-350, y:-350};
  fireball1.pos = {x:-450, y:-450};
  fireball2.pos = {x:-450, y:-550};

  movePlayer(true);
  screen = 'bonusLevelWinScreen';
}

//Shows the game over screen (level 1)
function showGameOverScreen(){
  textAlign(CENTER);
  setStyle("GAME OVER!", 200, 170);
  moveYesAndNoButtons(true);
  moveA1AndA2Buttons(true);
  
  menuButton.pos = {x:width/2, y:220};
  movePlayer(true);
  enemy.pos = {x:-350, y:-350};
  fireball1.pos = {x:-450, y:-450};
  fireball2.pos = {x:-450, y:-550};
  arrow.pos = {x:-700, y:-700};
  
  screen = 'gameOverScreen'
}

//Level 2 Screens

//Shows the level 2 home screen
function showLevel2HomeScreen(){
  background('seagreen');
  setStyle("Level 2: \nFruit Frenzy", 200, 70);
  wrapText("Collect and dodge objects in this fast-paced  collection level to gather the ingredients for the cure and advance to the next level! Click for more directions or start playing now...", 20,170,370,30);

  moveDirectionsAndPlayButton(false);
  moveBackButton(true);
  moveCatcher(true);
  moveNextLevelButton(true);

  setObjectsInitial();
  setFallingObjectsVel(0);

  screen = 'level2HomeScreen';
}

//Shows the level 2 game screen
function showLevel2GameScreen(){
  moveDirectionsAndPlayButton(true);
  moveRetryButton(true);
  moveCatcher(false);

  moveFallingObjects();
  setFallingObjectsVel(random(1,5));

  screen = 'level2GameScreen';
}

//Level 3 Screens

//Shows the level 3 home screen
function showLevel3HomeScreen(){
  background('seagreen');
  setStyle("Level 3: \nMysterious Maze", 200, 70);
  wrapText("Navigate through the maze to find your way back home before the time runs out! Click for more directions or start playing now...", 20,170,370,30);
  
  moveNextLevelButton(true);
  moveDirectionsAndPlayButton(false);
  moveBackButton(true);

  screen = 'level3HomeScreen';
}

//Shows the level 3 game screen
function showLevel3GameScreen(){
  background('seagreen');

  startTime = millis();
  remainingTime = totalTime;

  if(difficulty == 'medium' || difficulty == 'hard'){
    skeleton.pos = {x:145, y:50};
    if(difficulty != 'medium'){
      enemy0.pos = {x:50, y:240};
      enemy.pos = {x:250, y:240};
    }
  }
  moveDirectionsAndPlayButton(true);
  movePlayer(false);
  moveWalls(800, 800)
  moveRetryButton(true);

  screen = 'level3GameScreen';
}

//Shows the timer (level 3)
function showTimer() {
  let minutes = floor(remainingTime / 60);
  let seconds = floor(remainingTime % 60);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  textAlign(RIGHT);
  text(`Time: ${minutes}:${seconds}`, width - 10, height/2);
}

//Shows the level 3 lose screen
function showLevel3LoseScreen(){
  background("seagreen");
  setStyle("YOU LOSE!",200,180);
  text("Press 'Retry' to play again", 200,220);

  skeleton.pos = {x:-700, y:-700};
  enemy0.pos = {x:-400, y:-400};
  enemy.pos = {x:-550, y:-550};
  movePlayer(true);
  moveWalls(-800, -800);
  moveRetryButton(false);
  screen = 'level3LoseScreen';
}

//Shows the level 3 win screen
function showLevel3WinScreen(){
  background("seagreen");
  setStyle("YOU WIN!",200,180);
  text("Click to continue", 200,220);

  enemy0.pos = {x:-400, y:-400};
  enemy.pos = {x:-550, y:-550};
  skeleton.pos = {x:-700, y:-700};
  movePlayer(true);
  moveWalls(-800, -800);
  screen = 'level3WinScreen';
}

//Shows the game's conclusion screen
function showConclusionScreen(){
  setStyle("THE END",200,350);
  wrapText("You safely return to the village with the ingredients for the magical cure. The village healer uses the magical fruit to concoct the remedy and administers it to the sick villagers. As dawn breaks, a miraculous transformation unfolds - the village, once shrouded in despair, bursts back to life with joy and laughter. Thanks to your bravery and determination, everyone is cured, and hope is not just restored but flourishes stronger than ever!", 30, 45, 340, 25);

  screen = 'conclusionScreen';
}