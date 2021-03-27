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

        const menu = () => {
            const btn = $('.js-btn-menu')
            const menu = $('.header__nav')
            btn.on('click', function () {
                function open() {
                    $(this).toggleClass('is-active')
                    menu.slideToggle()
                    config.container.toggleClass('js-lock menu-open')
                }
                open()
            })
            function close() {
                btn.removeClass('is-active')
                menu.removeAttr('style')
                config.container.removeClass('js-lock menu-open')
            }
            $(window).resize(function () {
                close()
            })
            if ($(window).width() > 580) {
                close()
            }
        }

        const scrollCounter = (elem, number) => {
            let counted = 0;
            const section = $(elem)
            if (section.length > 0)
                $(window).scroll(function () {
                    let oTop = section.offset().top - window.innerHeight;
                    if (counted === 0 && $(window).scrollTop() > oTop) {
                        $(number).each(function () {
                            const $this = $(this),
                                countTo = $this.attr('data-number');
                            $({
                                countNum: $this.text()
                            }).animate({
                                countNum: countTo
                            }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function () {
                                    $this.text(Math.floor(this.countNum) + '+');
                                    $this.attr('data-count', Math.floor(this.countNum));
                                },
                                complete: function () {
                                    $this.text(this.countNum + '+');
                                    $this.attr('data-count', this.countNum)
                                }

                            });
                        });
                        counted = 1;
                    }

                });
        }
        scrollCounter('.statistics', '.statistics__count')

        toggleSlide('.js-mobile-toggle')
        resizeAnimationStopper()
        menu()
    },

    init: () => {
        defaults.events();
    }
}

export {defaults}