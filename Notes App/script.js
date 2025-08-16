let allNotes = [];
let editingNoteId = null;


const addNote = document.getElementById('add-note');
const dialogBox = document.querySelector('.dialog-box');
const formCloseBtn = document.getElementById("form-close-btn");
const noteInputField = document.getElementById("note-title");
const submitBtn = document.getElementById("submit-btn");



const updateNotes = () => {
    const notetitle = document.getElementById("note-title").value.trim();
    const notecontent = document.getElementById("note-content").value.trim();

    if(!notetitle) {
        alert("Note Title Cannot be Empty");
        return;
    } 
    
     if (editingNoteId) {
        const note = allNotes.find(n => n.id === editingNoteId);
        if (note) {
            note.title = notetitle;
            note.content = notecontent;
        }
        editingNoteId = null;
    } else {
        allNotes.unshift({
            id : Date.now(),
            title : notetitle,
            content : notecontent
        })
    }

    return true;
}

const renderNotes = () => {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    allNotes.forEach(note => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");
        noteCard.innerHTML = `
            <div class="note-card-header">
                <h3>${note.title}</h3>
                <div class="note-card-buttons">
                    <button type="button" id="edit-btn" data-id=${note.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                    </button>
                    <button type="button" id="delete-btn" data-id=${note.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
            </div>
            <p class="note-card-content">${note.content}</p>
        `
        notesList.appendChild(noteCard);
    });
}

document.getElementById("notes-list").addEventListener("click", e => {
    if (e.target.closest("#delete-btn")) {
        const noteId = Number(e.target.closest("#delete-btn").dataset.id);
        allNotes = allNotes.filter(note => note.id !== noteId);
        renderNotes();
    }
});

document.getElementById("notes-list").addEventListener("click", e => {
    if (e.target.closest("#edit-btn")) {
        const noteId = Number(e.target.closest("#edit-btn").dataset.id);
        startEdit(noteId);
    }
});

document.getElementById("back-btn").addEventListener("click",(e)=>{
    e.preventDefault();
    dialogBox.close();
})


const startEdit = (noteId) => {
    const noteToEdit = allNotes.find(note => note.id === noteId)

    if(!noteToEdit) return;

    document.getElementById("note-title").value = noteToEdit.title;
    document.getElementById("note-content").value = noteToEdit.content;
    editingNoteId = noteId;

    dialogBox.showModal();
}


submitBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    const success = updateNotes();
    if (success) {
        dialogBox.close();
        document.getElementById("note-title").value = "";
        document.getElementById("note-content").value = "";
        renderNotes();
    }
})


addNote.addEventListener("click", ()=> {
    dialogBox.showModal();
    noteInputField.focus();
})

formCloseBtn.addEventListener("click", ()=> {
    dialogBox.close();
})