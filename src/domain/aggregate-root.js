class AggregateRoot{
  constructor() {
    if (this.constructor === AggregateRoot) {
      throw new TypeError('AggregateRoot cannot be instantiated directly.')
    }

    this.events = []
  }

  addEvent(event) {
    this.events.push(event);
  }

  getEvents() {
    return this.events;
  }

  clearEvents(){
    this.events = [];
  }

}

module.exports = AggregateRoot;