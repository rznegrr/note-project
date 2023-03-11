const smallBox_title = document.querySelector("#small_box-title");
const smallBox_desc = document.querySelector("#small_box-desc");
const btn_done = document.querySelector("#btn-done");
const set_mediumBox = document.querySelector("#set_mediumBox");
const setLarge_box = document.querySelector("#set_large_box");
const darker_screen = document.querySelector("#darker-screen");


//? make style in small-box
smallBox_desc.addEventListener("click", writeNote);
function writeNote() {
  smallBox_title.classList.remove('hidden');
  btn_done.classList.remove('hidden');
  smallBox_desc.style.margin = "0px 0px 24px 0px"
}

//? click on btn-done and send data to localstorage
btn_done.addEventListener("click", setNote);
function setNote() {
  if (smallBox_title.value == "" || smallBox_title.value == null, smallBox_desc.value == "" || smallBox_desc.value == null) {
    alert("please type something.. :)");
    return
  }
  let noteData =
  {
    title: smallBox_title.value,
    desc: smallBox_desc.value
  }
  let storage = []
  if (localStorage.getItem("notes")) {
    storage = JSON.parse(localStorage.getItem("notes"));
  }
  storage.push(noteData)
  storage.map((item, i) => {
    item.id = i + 1;
    return item
  });
  localStorage.setItem("notes", JSON.stringify(storage))
  listNote()
  if (smallBox_desc.value == " ") document.querySelector(".medium_box_title").innerHTML = " ";
  if (smallBox_title.value == " ") document.querySelector(".medium_box_desc").innerHTML = " ";
  smallBox_desc.value = "";
  smallBox_title.value = "";
}

//? show all notes in windows and make medium-box
window.addEventListener('load', listNote)
function listNote() {
  let notes = localStorage.getItem("notes")
  notes = JSON.parse(notes)
  set_mediumBox.innerHTML = ""
  notes.forEach(el => {
    set_mediumBox.innerHTML +=
      `
      <div data-id="${el.id}" class="xl:col-span-2 lg:col-span-3 md:col-span-4 col-span-6 flex flex-col m-auto mt-7 w-40 md:w-48 h-44 text-white overflow-hidden cursor-pointer custom-box relative medium_box">
      <p class="form-style text-lg font-semibold text-gray-200 break-words medium_box_title">${el.title}</p>
      <p class="form-style text-base text-white font-medium break-words medium_box_desc">${el.desc}</p>
      </div>
      `
  });

  let medium_box = document.querySelectorAll(".medium_box")
  medium_box.forEach(el => {
    el.addEventListener("click", showNote_Larger)
  })
}

//? show notes in larger-box and make larger-box
function showNote_Larger() {
  let showtitle = this.querySelector(".medium_box_title").textContent
  let showdesc = this.querySelector(".medium_box_desc").textContent
  let id = this.dataset.id
  darker_screen.classList.add("active-darker")
  setLarge_box.classList.remove("hidden")
  setLarge_box.innerHTML =
    `<div class="m-auto w-80 md:w-96 lg:w-2/6 h-56 text-white relative overflow-hidden" id="large_box">
    <div class="overflow-x-hidden overflow-y-visible h-44">
    <p class="form-style text-xl font-semibold text-gray-200 break-words focus:outline-hidden large_box-title" contenteditable="true">${showtitle}</p>
    <p class="form-style text-lg text-white font-medium break-words focus:outline-hidden large_box-desc" contenteditable="true">${showdesc}</p>
    </div>
    <button class="text-sm text-gray-300 text-right mb-2 hover:opacity-80 absolute bottom-0 right-0 pr-4 w-100" id="btn-Close"> Close </button>
    <button class="text-sm text-gray-300 text-right mb-2 hover:opacity-80 absolute bottom-0 right-12 pr-4 w-100 btn-delete"> Delete </button>
    <svg data-id="${id}" class="absolute bottom-1 left-4 mb-2 cursor-pointer btn-edit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" width="17px" height="17px">
    <g id="surface2087775">
    <path style=" stroke:none;fill-rule:nonzero;fill:rgb(80.000001%,80.000001%,80.000001%);fill-opacity:1;" d="M 22.828125 3 C 22.316406 3 21.804688 3.195312 21.414062 3.585938 L 19 6 L 24 11 L 26.414062 8.585938 C 27.195312 7.804688 27.195312 6.539062 26.414062 5.757812 L 24.242188 3.585938 C 23.851562 3.195312 23.339844 3 22.828125 3 Z M 17 8 L 5.261719 19.738281 C 5.261719 19.738281 6.175781 19.65625 6.519531 20 C 6.863281 20.34375 6.578125 22.578125 7 23 C 7.421875 23.421875 9.644531 23.125 9.964844 23.441406 C 10.28125 23.761719 10.261719 24.738281 10.261719 24.738281 L 22 13 Z M 4 23 L 3.058594 25.671875 C 3.019531 25.777344 3 25.886719 3 26 C 3 26.550781 3.449219 27 4 27 C 4.113281 27 4.222656 26.980469 4.328125 26.941406 C 4.332031 26.941406 4.335938 26.941406 4.335938 26.941406 L 4.363281 26.933594 C 4.367188 26.929688 4.367188 26.929688 4.367188 26.929688 L 7 26 Z M 4 23 "/>
    </g>
    </svg>
    </div>`

  //? delete notes from localstorage by click on btn-delete
  let btn_Delete = document.querySelectorAll(".btn-delete")
  btn_Delete.forEach(elem => {
    elem.addEventListener("click", function () {
      let storage = localStorage.getItem("notes")
      storage = JSON.parse(storage)
      storage = storage.filter(note => note.title != showtitle);
      localStorage.setItem("notes", JSON.stringify(storage))
      setLarge_box.classList.add("hidden")
      darker_screen.classList.remove("active-darker")
      listNote()
    })
  })

  //? close larger-box by click on btn-close
  let btn_Close = document.querySelector("#btn-Close")
  btn_Close.addEventListener("click", function () {
    setLarge_box.classList.add("hidden")
    darker_screen.classList.remove("active-darker")
  })

  //? edit notes by click on btn-edit 
  let btn_edit = document.querySelectorAll(".btn-edit")
  btn_edit.forEach(elem => {
    elem.addEventListener("click", function () {
      let storage = localStorage.getItem("notes")
      let edited_idset = this.dataset.id
      let edit_title = this.closest("#large_box").querySelector(".large_box-title")
      let edit_desc = this.closest("#large_box").querySelector(".large_box-desc")
      storage = JSON.parse(storage)
      storage.forEach(e => {
        if (e.id == edited_idset) {
          e.title = edit_title.textContent
          e.desc = edit_desc.textContent
        }
      })
      localStorage.setItem("notes", JSON.stringify(storage))
      listNote()
      setLarge_box.classList.add("hidden")
      darker_screen.classList.remove("active-darker")
    })
  })
}

//* increase textarea auto
const tx = document.getElementsByTagName("textarea")
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;")
  tx[i].addEventListener("input", OnInput)
}
function OnInput() {
  this.style.height = "auto"
  this.style.height = (this.scrollHeight) + "px"
}