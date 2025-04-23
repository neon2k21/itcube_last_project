class UndoRedoStack {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    execute(action) {
        this.undoStack.push(action);
        this.redoStack = []; 
        console.log(`Выполнено действие: ${action}`);
    }

   
    undo() {
        if (this.undoStack.length > 0) {
            const action = this.undoStack.pop();
            this.redoStack.push(action);
            console.log(`Отменено действие: ${action}`);
            return action;
        } else {
            console.log("Нет действий для отмены.");
            return null;
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const action = this.redoStack.pop();
            this.undoStack.push(action);
            console.log(`Повторено действие: ${action}`);
            return action;
        } else {
            console.log("Нет действий для повторения.");
            return null;
        }
    }

    printStates() {
        console.log("Текущие действия (Undo):", this.undoStack);
        console.log("Текущие действия (Redo):", this.redoStack);
    }
}

const editor = new UndoRedoStack();

function main() {
    const actions = ["Действие 1", "Действие 2", "Действие 3"];
    
    actions.forEach(action => editor.execute(action));

    editor.printStates();
    
    editor.undo();
    editor.printStates();

    
    editor.redo();
    editor.printStates();

  

}


main();
