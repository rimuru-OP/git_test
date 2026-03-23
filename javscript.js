const myLibrary = [];

function Book(title, author, pages, read){
  if(!new.target){
    throw('Please use "new"');
  }
  this.id = crypto.randomUUID();
  this.title = title.trim();
  this.author = author.trim();
  this.pages = parseInt(pages);
  this.read = read;
}

Book.prototype.info = function(){
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};

function removeBook(id) {
  const index = myLibrary.findIndex(book=>book.id===id);
  if(index!==-1){
    myLibrary.splice(index, 1);
    loopBooks();
  }
}

function addBookToLibrary(title, author, pages, read){
  myLibrary.push(new Book(title, author, pages, read));
}

const container = document.querySelector(".book");

function loopBooks(){
    container.textContent = "";

    myLibrary.forEach(book=>{
        const temp = document.createElement("div");

        temp.classList.add(book.read ? "read" : "unread");

        const text = document.createElement("p");
        text.textContent = book.info();

        const btn1 = document.createElement("button");
        const btn2 = document.createElement("button");

        btn2.textContent = book.read ? "Mark unread" : "Mark read";
        btn1.textContent = "Remove";

        btn1.addEventListener("click", ()=>{
            removeBook(book.id);
        });

        btn2.addEventListener("click", ()=>{
            book.read = !book.read;
            loopBooks();
        });

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-group");

        btnContainer.appendChild(btn2);
        btnContainer.appendChild(btn1);

        temp.appendChild(text);
        temp.appendChild(btnContainer);

        container.appendChild(temp);
    });
}
const form = document.querySelector(".info");
const btn = document.querySelector(".start");
btn.addEventListener('click', ()=>{
  form.classList.remove('hidden');
})

const submit = document.querySelector(".sub1");
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  loopBooks();
  form.classList.add('hidden');
  btn.textContent = "Add Another";
  form.reset();
})
