document.addEventListener("DOMContentLoaded", function () {

    let allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.addEventListener("click", function () {

            allAnswers.forEach(item => {
                let icon = item.querySelector("i");
                icon.classList.replace("bxs-circle", "bx-circle");
            });

            let selectedIcon = this.querySelector("i");
            selectedIcon.classList.replace("bx-circle", "bxs-circle");
        });
    });
});