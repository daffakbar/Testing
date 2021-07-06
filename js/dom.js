const UNCOMPLETED_LIST_BOOK_ID = "books";
const BOOK_ITEMID = "itemId";
const COMPLETED_LIST_BOOK_ID = "completed-books";

function checkFinish() {
  var checkBox = document.getElementById("inputBookIsComplete");
  var notComplete = document.getElementById("notComplete");
  var isComplete = document.getElementById("isComplete");
  if (checkBox.checked == true) {
    isComplete.style.display = "inline";
    notComplete.style.display = "none";
  } else {
    notComplete.style.display = "inline";
    isComplete.style.display = "none";
  }
}
function addBook() {
  const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const textBook = document.getElementById("title").value;
  const textAuthor = document.getElementById("author").value;
  const textYear = document.getElementById("year").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(textBook, textAuthor, textYear, isCompleted, false);
  const bookObject = composeBookObject(
    textBook,
    textAuthor,
    textYear,
    isCompleted,
    false
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  // uncompletedBOOKList.append(book);
  if (isCompleted) {
    completedBOOKList.append(book);
  } else {
    uncompletedBOOKList.append(book);
  }
  updateDataToStorage();
}

function makeBook(title, author, year, isCompleted) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;
  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis: " + author;
  const textYear = document.createElement("span");
  textYear.innerText = "Tahun: " + year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("table-bordered");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("mb-3");
  container.append(textContainer);
  //
  //
  if (isCompleted) {
    container.append(createUnreadButton());
    container.append(createTrashButton());
  } else {
    container.append(createReadButton());

    container.append(createTrashButton());
  }
  return container;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  if (buttonTypeClass === "btn-read") {
    button.innerText = "Selesai Baca";
    button.classList.add("btn-primary");
  } else if (buttonTypeClass === "btn-unread") {
    button.innerText = "Belum Selesai Baca";
    button.classList.add("btn-primary");
  } else {
    button.innerText = "Hapus";
  }

  return button;
}
function createReadButton() {
  return createButton("btn-read", function (event) {
    addTaskCompleted(event.target.parentElement);
  });
}
function createUnreadButton() {
  return createButton("btn-unread", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}
function createTrashButton() {
  return createButton("btn-danger", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

function addTaskCompleted(taskElement) {
  const taskTitle = taskElement.querySelector(".table-bordered>h3").innerText;
  const taskAuthor = taskElement.querySelector(".table-bordered>p").innerText;
  const taskYear = taskElement.querySelector(".table-bordered>span").innerText;

  const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  listCompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage;
}

function removeTaskFromCompleted(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();
  updateDataToStorage();
}
function undoTaskFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const taskTitle = taskElement.querySelector(".table-bordered>h3").innerText;
  const taskAuthor = taskElement.querySelector(".table-bordered>p").innerText;
  const taskYear = taskElement.querySelector(".table-bordered>span").innerText;

  const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  taskElement.remove();
  updateDataToStorage();
}
