const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const addNote = (text="") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML=` <div class="tool">
                <i class="fa-solid fa-floppy-disk save"></i>
                <i class="fa-solid fa-trash trash"></i>
            </div>
            <textarea>${text}</textarea>`
    
    note.querySelector(".trash").addEventListener("click",()=>{
        note.remove()
    })

    note.querySelector(".save").addEventListener("click",()=>{
        saveNotes()
    })

    note.querySelector(".textarea").addEventListener("click",()=>{
        "focusout", 
        function(){
            saveNotes()
        }
    })

    main.appendChild(note)
    saveNotes()
}

const saveNotes=()=>{
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note)=>{
        data.push(note.value)
    })
    // console.log(data)
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
}

(function(){
     const lsNotes = JSON.parse(localStorage.getItem("notes"))
     if(lsNotes === null){
         addNote()
     }else{
        lsNotes.forEach((lsNote)=>{
            addNote(lsNote)
        })
     }
}
)()

addBtn.addEventListener("click",()=>{
    addNote()
})