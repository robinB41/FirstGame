document.addEventListener("DOMContentLoaded", function () {
    let point = document.getElementById('point');
    let scoreDiv = document.getElementById('score');
    let pointSize = 50;
    let screenSizeX = document.body.clientWidth - 25;
    let screenSizeY = document.body.clientHeight - 25;
    let score = 0;
    let time = 5000;
    let timing;
    let pointNumber = 20;
    let pointPosX = 0;
    let information = document.getElementById("informationID");
    let endScreen = document.getElementById("endScreen");
    let gameTuto = true;
    let gameStart = document.getElementById("gameInfos__start");
    let gameInfosContainer = document.getElementById("gameInfos");
    let colors = ["green", "red", "grey", "yellow", "orange", "black", "pink", "purple", "brown"];
    let pointsGenerate = {
        color: function () {
            var number = Math.floor(Math.random() * 9);
            var colorPoint = colors[number];
            return colorPoint; 
        },
        posX: function () {
            pointPosX = Math.floor(Math.random() * screenSizeX - pointSize / 2);
            return pointPosX;
        },
        posY: function () {
            let pointPosY = Math.floor(Math.random() * screenSizeY - pointSize / 2);
            return pointPosY;
        },
    };

    function gameInfos() {
        gameTuto = !gameTuto;

        if(gameTuto === true) {
            gameInfosContainer.classList.remove("gameInfos__hidden");
            
        } else {
            gameInfosContainer.classList.add("gameInfos__hidden");
            timer();
            mainGame();
        }
    }

    gameStart.addEventListener("click", gameInfos);
    information.addEventListener("click", gameInfos);

    let target = {
        locX: 0,
        locY: 0
    }

    let mouse = {
        x: 0,
        y: 0
    };

    function scoreShow() {
        score = score + 1;
        scoreDiv.innerHTML = "Score: " + score;
    }

    function randomPoint() {
        let point = document.getElementById('point');
        let pointLocX = Math.floor(Math.random() * screenSizeX);
        let pointLocY = Math.floor(Math.random() * screenSizeY);

        point.style.top = pointLocY - pointSize / 2 + "px";
        point.style.left = pointLocX - pointSize / 2 + "px";
        point.style.width = pointSize + "px";
        point.style.height = pointSize + "px";
        target.locX = pointLocX;
        target.locY = pointLocY;
    }
    randomPoint();

    function generatePoint(pointNumber, pointSize) {
        let container = document.getElementById('container');
        container.remove();
        let containerNew = document.createElement("div");
        containerNew.setAttribute("id", "container");
        document.body.appendChild(containerNew);
        for (var i = 0; i <= pointNumber; i++) {
            let containerNew = document.getElementById('container');
            pointsGenerate;
            containerNew.insertAdjacentHTML('afterbegin', '<div class="pointGenerate" id="point' + i + '" style="position:absolute;display: inline-bloc; border-radius:' + pointSize/2 + 'px; top:' + pointsGenerate.posY() + 'px; left:' + pointsGenerate.posX() + 'px; background-color:' + pointsGenerate.color() + '; width:' + pointSize + 'px; height:' + pointSize + 'px;"></div> ');
        }
    };

    generatePoint(pointNumber, pointSize);

    function timer() {
        timing = setInterval(endGame, time);
    }

    function mainGame() {

        document.addEventListener("click", gamePlay);

        function gamePlay(e) {
            mouse.x = e.pageX;
            mouse.y = e.pageY;

            if (mouse.x >= target.locX - pointSize / 2 && mouse.x <= target.locX + pointSize / 2
                && mouse.y >= target.locY - pointSize / 2 && mouse.y <= target.locY + pointSize / 2) {
                randomPoint();
                scoreShow();
                pointSize = pointSize - pointSize / 40;
                pointNumber = pointNumber + 20;
                time = time + 500;
                clearInterval(timing);
                timer();
                generatePoint(pointNumber, pointSize);
            }
        }
    }

    function endGame() {
        clearInterval(timing);
        let endText = document.getElementById('textEnd');
        let replay = document.getElementById('replay');
        let recordScore = localStorage.getItem("score");
        endScreen.classList.remove("gameEnd__hidden");
        if(recordScore < score) {
            localStorage.setItem("score", score);
            endText.insertAdjacentHTML('afterbegin', 'WOW !!!!! Félicitation vous avez battue votre record, il est désormais de ' + score +' . ');
        } else {
            endText.insertAdjacentHTML('afterbegin', 'C\'est dommage le temps est écoulé... Votre score est de ' + score +' . ');
        };
        replay.addEventListener("click", restart);
    }

    function restart(){
        document.location.reload();
    }
});