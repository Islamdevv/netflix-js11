let title = document.querySelector(".title");
let year = document.querySelector(".year");
let image = document.querySelector(".image");
let video = document.querySelector(".video");
let btn_create = document.querySelector(".btn_create");
let list_movies = document.querySelector(".list_movies");
let main_edit = document.querySelector(".main-edit");
let modal_player = document.querySelector(".modal");
let iframe = document.querySelector(".iframe");
readMovies();
btn_create.addEventListener("click", () => {
  let obj = {
    title: title.value,
    year: year.value,
    image: image.value,
    video: video.value,
  };
  let data = JSON.parse(localStorage.getItem("movies")) || [];
  data.push(obj);
  localStorage.setItem("movies", JSON.stringify(data));
  readMovies();
});

function readMovies() {
  let newData = JSON.parse(localStorage.getItem("movies")) || [];
  list_movies.innerHTML = "";
  newData.forEach((el, index) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let txt_box = document.createElement("div");
    let txt_title = document.createElement("p");
    let txt_year = document.createElement("p");
    let btn_box = document.createElement("div");
    let btn_play = document.createElement("button");
    let btn_delete = document.createElement("button");
    let btn_edit = document.createElement("button");

    //? classList
    card.classList.add("card");
    img.classList.add("img");
    txt_box.classList.add("txt_box");
    txt_title.classList.add("txt_title");
    txt_year.classList.add("txt_year");
    btn_box.classList.add("btn_box");
    btn_play.classList.add("btn_play");
    btn_delete.classList.add("btn_delete");
    btn_edit.classList.add("btn_edit");
    //? classList

    //? content
    img.src = el.image;
    txt_title.innerText = el.title;
    txt_year.innerText = el.year;
    btn_play.innerHTML = `<ion-icon name="play-circle"></ion-icon>`;
    btn_delete.innerHTML = `<ion-icon name="trash"></ion-icon>`;
    btn_edit.innerHTML = `<ion-icon name="create"></ion-icon>`;
    //? content

    //? append
    txt_box.append(txt_title);
    txt_box.append(txt_year);
    btn_box.append(btn_play);
    btn_box.append(btn_delete);
    btn_box.append(btn_edit);

    card.append(img);
    card.append(txt_box);
    card.append(btn_box);
    list_movies.append(card);
    //? append

    // ? FUNCTIONS ACTION
    btn_delete.addEventListener("click", () => {
      deleteMovies(index);
    });

    btn_edit.addEventListener("click", () => {
      main_edit.style.display = "block";
      editMovies(index);
    });

    btn_play.addEventListener("click", () => {
      iframe.src = el.video;

      modal_player.style.display = "block";
    });

    // ? FUNCTIONS ACTION
  });
}

// ? deleteMovies
function deleteMovies(id) {
  let data = JSON.parse(localStorage.getItem("movies")) || [];
  data.splice(id, 1);
  localStorage.setItem("movies", JSON.stringify(data));
  readMovies();
}

// ? editMovies

let x = document.querySelector(".x");

x.addEventListener("click", () => {
  main_edit.style.display = "none";
});

let edit_title = document.querySelector(".edit_title");
let edit_year = document.querySelector(".edit_year");
let edit_image = document.querySelector(".edit_image");
let edit_video = document.querySelector(".edit_video");
let btn_save = document.querySelector(".btn_save");

function editMovies(index) {
  let data = JSON.parse(localStorage.getItem("movies")) || [];
  edit_title.value = data[index].title;
  edit_year.value = data[index].year;
  edit_image.value = data[index].image;
  edit_video.value = data[index].video;

  edit_title.setAttribute("id", index);
  edit_year.setAttribute("id", index);
  edit_image.setAttribute("id", index);
  edit_video.setAttribute("id", index);
}

btn_save.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("movies")) || [];
  let nameId = edit_title.id;
  let yearId = edit_year.id;
  let imageId = edit_image.id;
  let videoId = edit_video.id;

  let editObj = {
    title: edit_title.value,
    year: edit_year.value,
    image: edit_image.value,
    video: edit_video.value,
  };

  data.splice(nameId, 1, editObj);
  data.splice(yearId, 1, editObj);
  data.splice(imageId, 1, editObj);
  data.splice(videoId, 1, editObj);

  localStorage.setItem("movies", JSON.stringify(data));
  readMovies();
});
