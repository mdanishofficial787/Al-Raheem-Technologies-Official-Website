(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });



})(jQuery);

// Open every website email link in Gmail's compose window. This avoids relying
// on a mail app being configured on the visitor's computer.
document.addEventListener('click', function (event) {
    const emailLink = event.target.closest('a[href^="mailto:"]');

    if (!emailLink) {
        return;
    }

    event.preventDefault();

    const mailto = emailLink.getAttribute('href').slice(7);
    const [recipient, query = ''] = mailto.split('?');
    const mailtoParams = new URLSearchParams(query);
    const gmailComposeUrl = new URL('https://mail.google.com/mail/');

    gmailComposeUrl.searchParams.set('view', 'cm');
    gmailComposeUrl.searchParams.set('fs', '1');
    gmailComposeUrl.searchParams.set('to', recipient);

    const subject = mailtoParams.get('subject') || mailtoParams.get('Subject');
    if (subject) {
        gmailComposeUrl.searchParams.set('su', subject);
    }

    window.open(gmailComposeUrl.toString(), '_blank', 'noopener');
});
