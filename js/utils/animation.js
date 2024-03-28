
document.addEventListener('DOMContentLoaded', function () {
    var filterbars = document.querySelectorAll(".dropdown-toggle");

    filterbars.forEach((filterbar) => {
        filterbar.addEventListener('shown.bs.dropdown', (event)=> {
            var filterImg = event.currentTarget.querySelector("img.fleche");
            filterImg.style.transform = "rotate(180deg)";
        });

        filterbar.addEventListener('hidden.bs.dropdown',  (event)=>  {
            var filterImg = event.currentTarget.querySelector("img.fleche");
            filterImg.style.transform = "rotate(0deg)";
        });
    });
});