class Card {
  isInGame = false
  isVisible = false
  constructor(color, type, id) {
    this.color = color
    this.type = type
    this.id = color + '_' + type + '_' + id
  }

  play() {
    this.isInGame = true
  }

  show() {
    this.isVisible = true
  }

  hide() {
    this.isVisible = false
  }

  getInfo() {
    return this
  }
}

export default Card
