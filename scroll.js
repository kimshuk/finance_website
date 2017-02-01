var offsetHeight = 110;

$(document).ready(function () {

    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".section--navigation",
        offset: offsetHeight
    });

    $('.section--navigation a').on('click', function (e) {
            // Prevent default anchor click behavior
            e.preventDefault();


            var scrollPos = $($(this).attr('href')).offset().top - offsetHeight;

            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
                scrollTop: scrollPos
            }, 800)
        } // End if
    )


})