class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slideToScroll=1] Nombre d'éléments à faire défiler
     * @param {Object} [options.slideVisible=1] Nombre d'éléments visibles dans un slide
     * @param {boolean} [options.loop=false] Doit-on bocler en fin de slide de carousel
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            // (!) Obligé de préciser les valeurs ici pour que le script fonctionne bien
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        this.currentItem = 0
        this.isMobile = false

        let children = [].slice.call(element.children)
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallbacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallbacks.forEach(callback => callback(0))
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100/this.slidesVisible) / ratio) + "%")
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if (this.options.loop === true) {
            return
        }
        this.onMove (index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItem + this.options.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        })
    }

    next () {
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément cible
     * @param {number} index 
     */
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = `translate3d(${translateX}%, 0, 0)`
        this.currentItem = index
        this.moveCallbacks.forEach(callback => callback(index))
    }

    /**
     * 
     * @param {Carousel ~ moveCallback} callback 
     */
    onMove (callback) {
        this.moveCallbacks.push(callback)
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

    /**
     * @returns {number}
     */
    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    /**
     * @returns {number}
     */
    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

document.addEventListener('DOMContentLoaded', function () {

    new Carousel (document.querySelector('#carousel1'), {
        slidesToScroll : 2,
        slidesVisible : 3,
        loop : true
    })

    new Carousel (document.querySelector('#carousel2'), {
        slidesToScroll : 2,
        slidesVisible : 2
    })

    new Carousel (document.querySelector('#carousel3'))
})
