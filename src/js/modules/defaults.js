import { config } from "../config";

var defaults = {

    events: () => {
        const resizeAnimationStopper = () => {
            let resizeTimer;
            window.addEventListener("resize", () => {
                document.body.classList.add("resize-animation-stopper");
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    document.body.classList.remove("resize-animation-stopper");
                }, 400);
            });
        }

        const toggleSlide = (element) => {
            $(window).resize(function () {
                mobileVersion()
            })
            function mobileVersion() {
                let elem = $(element);
                if ($(window).width() < 860) {

                    elem.on('click', function (e) {
                        $(this).next().toggleClass('is-show')
                    })
                    $(document).on('click', function () {
                        if(!elem.next().length && elem.next().hasClass('is-show')) {
                            elem.next().removeClass('is-show')
                        }
                    });
                }
            }
            mobileVersion()
        }

        const menuOpen = () => {
            const btn = $('.js-btn-menu')
            const menu = $('.header__nav')
            btn.on('click', function () {
                $(this).toggleClass('is-active')
                menu.slideToggle()
                config.container.toggleClass('js-lock menu-open')
            })
        }

        toggleSlide('.js-mobile-toggle')
        resizeAnimationStopper()
        menuOpen()
    },

    init: () => {
        defaults.events();
    }
}

export {defaults}