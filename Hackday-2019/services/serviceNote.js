const Note = require("../models/note");

class ServiceNote {
  /**
   * Handles the various APIs for displaying and managing Notes
   * @param {Note} note
   */
  constructor(note) {
    this.note = note;
  }
  async showNotes(req, res) {
    const querySpec = {
      query: "SELECT * FROM root r WHERE r.completed=@completed",
      parameters: [
        {
          name: "@completed",
          value: false
        }
      ]
    };

    const items = await this.note.find(querySpec);
    res.render("note", {
      title: "My ToDo List ",
      tasks: items
    });
  }

  async addNote(req, res) {
    const item = req.body;
    await this.note.addItem(item);
    res.redirect("/notes");
  }

  async completeNote(req, res) {
    const completedNotes = Object.keys(req.body);
    const notes = [];

    completedNotes.forEach(note => {
      notes.push(this.note.updateItem(note));
    });

    await Promise.all(notes);

    res.redirect("/notes");
  }
}

module.exports = ServiceNote;