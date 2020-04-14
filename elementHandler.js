class ElementHandler {
    constructor(changeValue) {
        this.changeValue = changeValue
    }
    element(element) {
        // An incoming element, such as `div`
        element.setInnerContent(this.changeValue)
    }
}

class LinkHandler {
    constructor(changeValue) {
        this.changeValue = changeValue
    }
    element(element) {
        // An incoming element, such as `div`
        element.setAttribute('href', this.changeValue)
    }
}

export {
    ElementHandler, LinkHandler
};