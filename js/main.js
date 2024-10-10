class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slideToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slideVisible Nombre d'éléments visibles dans un slide
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1
        }, options)
    }
}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel (document.querySelector('#carousel1')), {
        slideToScroll : 3,
        slideVisible : 3
    }
})
