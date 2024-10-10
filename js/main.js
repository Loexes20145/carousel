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
            slidesToScroll: 1,
            slidesVisible: 3
        }, options)
        let children = [].slice.call(element.children)

        let root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        root.appendChild(this.container)
        this.element.appendChild(root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
    }

    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100/this.options.slidesVisible) / ratio) + "%")
    }

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel (document.querySelector('#carousel1')), {
        slidesVisible : 3
    }
})
