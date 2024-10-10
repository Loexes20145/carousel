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
            // (!) Obligé de préciser les valeurs ici pour que le script fonctionne bien
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        this.currentItem = 0

        let children = [].slice.call(element.children)
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100/this.options.slidesVisible) / ratio) + "%")
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément cible
     * @param {number} index 
     */
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = `translate3d(${translateX}%, 0, 0)`
        this.currentItem = index
    }

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel (document.querySelector('#carousel1'), {
        slidesToScroll : 2,
        slidesVisible : 3
    })

    new Carousel (document.querySelector('#carousel2'), {
        slidesToScroll : 2,
        slidesVisible : 2
    })

    new Carousel (document.querySelector('#carousel3'))
})
