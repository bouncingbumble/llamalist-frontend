export default function AppleExplosion() {
    let targetNode = document.getElementById('flame')

    function workOnClassAdd() {
        goB()
    }

    function workOnClassRemoval() {}

    // watch for a specific class change
    let classWatcher = new ClassWatcher(
        targetNode,
        'flame',
        workOnClassAdd,
        workOnClassRemoval
    )

    var flyingMen = []

    var text = { value: '🍎' }
    var button = document.getElementById('flame')

    //emoji object
    function emoji(face, startx, starty, flour, fs, flyUpMax) {
        this.isAlive = true
        this.face = face
        this.x = startx
        this.y = starty
        this.flourLevel = flour
        this.increment = -Math.floor(Math.random() * flyUpMax + 4)
        this.xincrement = Math.floor(Math.random() * 2 + 1)
        this.xincrement *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
        this.element = document.createElement('div')
        this.element.innerHTML = face
        this.element.style.position = 'absolute'
        this.element.style.fontSize = fs + 'px'
        this.element.style.color = 'white'
        document.getElementById('fa').appendChild(this.element)

        this.refresh = function () {
            if (this.isAlive) {
                //------Y axis-----

                this.y += this.increment
                this.x += this.xincrement
                this.increment += 0.25

                if (this.y >= this.flourLevel) {
                    if (this.increment <= 5) {
                        this.isAlive = false
                    }
                    this.increment = -this.increment + 5
                }

                this.element.style.transform =
                    'translate(' + this.x + 'px, ' + this.y + 'px)'
            } else {
                this.element.style.transform = 'translate(px, px)'
            }
        }
    }

    function goB() {
        var fontsize = 24
        var xv = 5
        var yv = 5
        var fl = button.getBoundingClientRect().top + 30
        var face = text.value
        for (var i = 0; i < 5; i++) {
            var coolGuy = new emoji(face, xv, yv, fl, fontsize, 2)
            flyingMen.push(coolGuy)
        }
    }

    //Rendering
    function render() {
        for (var i = 0; i < flyingMen.length; i++) {
            if (flyingMen[i].isAlive == true) {
                flyingMen[i].refresh()
            } else {
                flyingMen[i].element.remove()
                flyingMen.splice(i, 1)
            }
        }
        requestAnimationFrame(render)
    }

    render()
}

class ClassWatcher {
    constructor(
        targetNode,
        classToWatch,
        classAddedCallback,
        classRemovedCallback
    ) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'class'
            ) {
                let currentClassState = mutation.target.classList.contains(
                    this.classToWatch
                )
                if (this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if (currentClassState) {
                        this.classAddedCallback()
                    } else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}
