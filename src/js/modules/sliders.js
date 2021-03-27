import "owl.carousel";
import { defaults } from "./defaults";

var sliders = {
    selector: ".js-slider",

    settings: {
        items: 1,
        nav: false,
        dots: false,
        loop: false,
        autoplay: false,
        smartSpeed: 600,
        margin: 20,
        responsiveRefreshRate: 50,
        navText: [
            '<svg class="icon icon-longArrowLeft" viewBox="0 0 25 16"><use xlink:href="/app/icons/sprite.svg#longArrow"></use></svg>',
            '<svg class="icon icon-longArrowLeft" viewBox="0 0 25 16"><use xlink:href="/app/icons/sprite.svg#longArrow"></use></svg></span>',
        ],
    },

    build: (selector) => {
        let data = $(selector).attr("data-settings")
            ? $(selector).data("settings")
            : {};

        let clone = JSON.parse(JSON.stringify(sliders.settings));

        let current = Object.assign(clone, data);

        $(selector)
            .addClass("owl-carousel")
            .on("initialized.owl.carousel", (e) => {
                let $slider = $(e.target);
                let $logos = $slider.find(".js-logo:not([style])");

                if ($logos.length) {
                    $logos.each((i, el) => {
                        if ($(el).hasClass("is-changed")) return false;

                        defaults.logoLoading(el);
                    });
                }

                // counter
                let $counter = $(e.target).find(".owl-counter");
                let carousel = e.relatedTarget;
                let length = carousel.items().length;
                let current = carousel.relative(carousel.current()) + 1;

                if (!$counter.length)
                    $(e.target).append(
                        `<div class="owl-counter"><span>${current}</span> / ${length}</div>`
                    );
            })

            .on("drag.owl.carousel", (event) => {
                document.ontouchmove = (e) => {
                    e.preventDefault();
                };
            })
            .on("dragged.owl.carousel", (event) => {
                document.ontouchmove = (e) => {
                    return true;
                };
            })
            .on("changed.owl.carousel", (e) => {
                if (!e.namespace) {
                    return;
                }
                let carousel = e.relatedTarget;
                let length = carousel.items().length;
                let current = carousel.relative(carousel.current()) + 1;

                $(e.target)
                    .find(".owl-counter")
                    .html(`<span>${current}</span> / ${length}`);
            })
            .owlCarousel(current);
    },

    destroy: (selector) => {
        if ($(selector).hasClass("owl-loaded"))
            $(selector)
                .trigger("destroy.owl.carousel")
                .removeClass("owl-carousel");
        $(selector).find(".owl-counter").remove();
    },

    run: (selector) => {
        sliders.build(selector);
    },

    init: () => {
        if (!$(sliders.selector).length) return false;

        $(window).on("load", (e) => {
            $(sliders.selector).each((i, el) => {
                sliders.run(el);
            });
        });
    },
};

export { sliders };
