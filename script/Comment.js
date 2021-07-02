export default class Comment {
    constructor(name, email, text) {
        this.id = this.uuidv4();
        this.name = name;
        this.email = email;
        this.text = text;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
}