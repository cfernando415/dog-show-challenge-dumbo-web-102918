document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/dogs").then(res => res.json()).then(loadDogsHandler);
  document.getElementById("table-body").addEventListener("click", editDog);
  document.getElementById("dog-form").addEventListener("submit", updateDogHandler);

});

function loadDogsHandler(dogs) {
  let tBody = document.getElementById("table-body");

  for(dog of dogs) {

    let tRow = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdBreed = document.createElement("td");
    let tdSex = document.createElement("td");
    let tdEdit = document.createElement("td");
    let btnEdit = document.createElement("button");

    tdName.innerText = `${dog.name}`;
    tdBreed.innerText = `${dog.breed}`;
    tdSex.innerText = `${dog.sex}`;
    btnEdit.innerText = `Edit ${dog.name}`;
    btnEdit.setAttribute("type","button");
    btnEdit.dataset.id = `${dog.id}`;

    tRow.appendChild(tdName);
    tRow.appendChild(tdBreed);
    tRow.appendChild(tdSex);
    tdEdit.appendChild(btnEdit);
    tRow.appendChild(tdEdit);
    tBody.appendChild(tRow);
  }
}

function editDog(e) {
  if(e.target.type === "button") {
    let dogID = parseInt(e.target.dataset.id);

    fetch(`http://localhost:3000/dogs/${dogID}`).then(res => res.json()).then((dog) => {
      let form = document.getElementById("dog-form");
      form.name.value = `${dog.name}`;
      form.name.dataset.id = `${dog.id}`;
      form.breed.value = `${dog.breed}`;
      form.sex.value = `${dog.sex}`;
    });
  }
}

function updateDogHandler(e) {
  e.preventDefault();
  let dogID = e.target.name.dataset.id;
  let dogName = e.target.name.value;
  let dogBreed = e.target.breed.value;
  let dogSex = e.target.sex.value;

  fetch(`http://localhost:3000/dogs/${dogID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Accept": "appliation/json" },
    body: JSON.stringify({ name: dogName, breed: dogBreed, sex: dogSex })
  });
  
  window.location.reload();
}
