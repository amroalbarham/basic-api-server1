'use strict';
const uuid = require('uuid').v4;

class Clothe {
  constructor() {
    this.db = [];
  }
  create(obj) {
    if (obj.name && obj.price) {

      const record = {
        id: uuid(),
        data: {
          name: obj.name,
          price: obj.price,
        },
      };
      this.db.push(record);
      return record;
    }
  }
  read(id) {
    if (id) {
      return this.db.find((record) => record.id === id);
    } else {
      return this.db;
    }
  }
  update(id, obj) {
    for (let i = 0; i < this.db.length; i++) {
      if (id == this.db[i].id) {
        this.db[i].data.name = obj.name;
        this.db[i].data.price = obj.price;
        return this.db[i];
      }
    }
  }

  delete(id) {
    this.db = this.db.filter((element) => {
      return (id != element.id);
    });
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id == id) {
        return this.db[i];
      }
    }
  }

}

module.exports = Clothe;