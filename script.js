
document.addEventListener("DOMContentLoaded", function () {

    console.log("TypeMaster JavaScript loaded!");

    const practiceText =
    "Technology plays an important role in our daily lives. It helps people communicate, learn new skills, solve problems and complete tasks more efficiently. With regular practice and dedication, anyone can improve their typing speed and accuracy.";

    let timeLeft = 60;
    let timer = null;
    let started = false;
    let finished = false;

    const timerDisplay = document.getElementById("timer");
    const wpmDisplay = document.getElementById("wpm");
    const accuracyDisplay = document.getElementById("accuracy");
    const paragraphDisplay = document.getElementById("paragraph");
    const input = document.getElementById("input");

    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const tryAgainButton = document.getElementById("tryAgain");

    const result = document.getElementById("result");
    const progress = document.getElementById("progress");

    // Display paragraph
    function displayParagraph() {

        paragraphDisplay.innerHTML = "";

        for (let i = 0; i < practiceText.length; i++) {

            const span = document.createElement("span");
            span.textContent = practiceText[i];

            paragraphDisplay.appendChild(span);
        }
    }

    // Check typing and calculate results
    function checkTyping() {

        const typedText = input.value;
        const characters = paragraphDisplay.children;

        let correct = 0;

        for (let i = 0; i < practiceText.length; i++) {

            characters[i].className = "";

            if (i < typedText.length) {

                if (typedText[i] === practiceText[i]) {
                    characters[i].classList.add("correct");
                    correct++;
                } else {
                    characters[i].classList.add("incorrect");
                }
            }
        }

        const accuracy = typedText.length === 0
            ? 100
            : (correct / typedText.length) * 100;

        const elapsedTime = 60 - timeLeft;

        const wpm = elapsedTime > 0
            ? Math.round((correct / 5) / (elapsedTime / 60))
            : 0;

        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent =
            Math.round(accuracy) + "%";

        progress.textContent =
            typedText.length + " / " +
            practiceText.length + " characters typed";

        return {
            correct: correct,
            accuracy: Math.round(accuracy),
            wpm: wpm
        };
    }

    // Finish the test
    function endTest() {

        if (finished) return;

        finished = true;

        clearInterval(timer);

        input.disabled = true;

        const scores = checkTyping();

        document.getElementById("finalWpm").textContent =
            scores.wpm;

        document.getElementById("finalAccuracy").textContent =
            scores.accuracy + "%";

        document.getElementById("finalCorrect").textContent =
            scores.correct;

        result.hidden = false;
    }

    // Countdown
    function startTimer() {

        timer = setInterval(function () {

            timeLeft--;

            timerDisplay.textContent = timeLeft;

            checkTyping();

            if (timeLeft <= 0) {
                endTest();
            }

        }, 1000);
    }

    // Start test
    startButton.addEventListener("click", function () {

        if (started || finished) return;

        started = true;

        input.disabled = false;
        input.focus();

        startButton.disabled = true;

        startTimer();
    });

    // Check every typed character
    input.addEventListener("input", function () {

        if (started && !finished) {
            checkTyping();
        }
    });

    // Reset test
    function restartTest() {

        clearInterval(timer);

        timeLeft = 60;
        started = false;
        finished = false;

        timerDisplay.textContent = 60;
        wpmDisplay.textContent = 0;
        accuracyDisplay.textContent = "100%";

        input.value = "";
        input.disabled = true;
        input.maxLength = practiceText.length;

        startButton.disabled = false;

        progress.textContent = "0 characters typed";

        result.hidden = true;

        displayParagraph();
    }

    restartButton.addEventListener("click", restartTest);
    tryAgainButton.addEventListener("click", restartTest);

    // Initialize website
    restartTest();

});
