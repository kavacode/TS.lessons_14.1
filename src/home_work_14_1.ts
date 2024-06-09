interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: "completed" | "pending";
  confirmEdit: boolean;
}

class TodoList {
  notes: Note[];

  constructor() {
    this.notes = [];
  }

  addNote(note: Note) {
    if (note.title.trim() === "" || note.content.trim() === "") {
      throw new Error("Нотатка не може бути порожньою");
    }
    this.notes.push(note);
  }

  deleteNote(id: string) {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  editNote(id: string, newContent: string) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      if (note.confirmEdit) {
        throw new Error("Редагування цієї нотатки вимагає підтвердження");
      }
      note.content = newContent;
      note.updatedAt = new Date();
    }
  }

  getNote(id: string) {
    return this.notes.find((note) => note.id === id);
  }

  getAllNotes() {
    return this.notes;
  }

  markAsCompleted(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (note) {
      note.status = "completed";
    }
  }

  getPendingNotes() {
    return this.notes.filter((note) => note.status === "pending");
  }

  searchNotes(query: string) {
    return this.notes.filter(
      (note) => note.title.includes(query) || note.content.includes(query)
    );
  }

  sortNotes(by: "status" | "createdAt") {
    return this.notes.sort((a, b) =>
      a[by] > b[by] ? 1 : b[by] > a[by] ? -1 : 0
    );
  }
}

// Створюємо новий список нотаток
const todoList = new TodoList();

// Додаємо нову нотатку
todoList.addNote({
  id: "1",
  title: "Перша нотатка",
  content: "Це перша нотатка",
  createdAt: new Date(),
  updatedAt: new Date(),
  status: "pending",
  confirmEdit: false,
});

// Виводимо всі нотатки
console.log(todoList.getAllNotes());

// Відмічаємо нотатку як виконану
todoList.markAsCompleted("1");

// Виводимо всі нотатки
console.log(todoList.getAllNotes());
