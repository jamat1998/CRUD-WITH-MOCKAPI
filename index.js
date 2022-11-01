const btnDelete = document.getElementById("btnDelete");
const btnPut = document.getElementById("btnPut");
const btnPost = document.getElementById("btnPost");
const btnGet1 = document.getElementById("btnGet1");
const inputGet1Id = document.getElementById("inputGet1Id");
const inputDelete = document.getElementById("inputDelete");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const inputPutId = document.getElementById("inputPutId");
const inputPutApellido = document.getElementById("inputPutApellido");
const inputPutNombre = document.getElementById("inputPutNombre");
const btnSendChanges = document.getElementById("btnSendChanges");
const results = document.getElementById("results");
const alertaError = document.getElementById("alertaError");
//boton agregar
inputPostNombre.addEventListener("input", () => {
  if (inputPostNombre.value !== "" && inputPostApellido.value !== "") {
    btnPost.removeAttribute("disabled");
  } else btnPost.setAttribute("disabled", "");
});
inputPostApellido.addEventListener("input", () => {
  if (inputPostApellido.value !== "" && inputPostApellido.value !== "") {
    btnPost.removeAttribute("disabled");
  } else btnPost.setAttribute("disabled", "");
});
//boton borrar
inputDelete.addEventListener("input", () => {
  if (inputDelete.value !== "") {
    btnDelete.removeAttribute("disabled");
  } else btnDelete.setAttribute("disabled", "");
});
//boton modificar
inputPutId.addEventListener("input", () => {
  if (inputPutId.value !== "") {
    btnPut.removeAttribute("disabled");
  } else btnPut.setAttribute("disabled", "");
});

//function leer(trae todos los items solicitados)
async function get() {
  let response = await getJSONData(
    "https://635f2f423e8f65f283adcbef.mockapi.io/users"
  );
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    for (let i of jsonResponse) {
      results.innerHTML += `
        <div class='border m-1'>
        <p class='m-0'>Id: ${i.id}</p>
        <p class='m-0'>Name: ${i.name}</p>
        <p class='m-0'>Lastname: ${i.lastname}</p>
        </div>
        `;
      alertaError.classList.remove("show");
    }
  } else alertaError.classList.add("show");
}
//boton buscar
btnGet1.addEventListener("click", async () => {
  results.innerHTML = ``;
  if (inputGet1Id.value === "") {
    get();
  }

  if (inputGet1Id.value !== "") {
    let response = await getJSONData(
      `https://635f2f423e8f65f283adcbef.mockapi.io/users/${inputGet1Id.value}`
    );
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      results.innerHTML = `
    <div class='border m-1'>
    <p class='m-0'>Id: ${jsonResponse.id}</p>
    <p class='m-0'>Name: ${jsonResponse.name}</p>
    <p class='m-0'>Lastname: ${jsonResponse.lastname}</p>
    </div>
    `;
      alertaError.classList.remove("show");
    } else return alertaError.classList.add("show");
  }
});

//boton borrar
btnDelete.addEventListener("click", async () => {
  let response = await deleteJSONData(
    `https://635f2f423e8f65f283adcbef.mockapi.io/users/${inputDelete.value}`
  );
  if (response.status >= 200 && response.status <= 299) {
    await response.json();
    results.innerHTML = ``;
    alertaError.classList.remove("show");
    get();
  } else return alertaError.classList.add("show");
});

//boton modificar
btnPut.addEventListener("click", async () => {
  let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  let response = await getJSONData(
    `https://635f2f423e8f65f283adcbef.mockapi.io/users/${inputPutId.value}`
  );
  if (response.status >= 200 && response.status <= 299) {
    modal.show();
    const jsonResponse = await response.json();
    alertaError.classList.remove("show");
    inputPutApellido.value = jsonResponse.lastname;
    inputPutNombre.value = jsonResponse.name;
  }
  if (response.status == 500) {
    modal.hide();
    alertaError.classList.add("show");
  }
});

btnSendChanges.addEventListener("click", async () => {
  await putJSONData(
    `https://635f2f423e8f65f283adcbef.mockapi.io/users/${inputPutId.value}`,
    {
      name: inputPutNombre.value,
      lastname: inputPutApellido.value,
    }
  );
  results.innerHTML = ``;
  get();
});

//boton agregar
btnPost.addEventListener("click", async () => {
  await postJSONData(`https://635f2f423e8f65f283adcbef.mockapi.io/users`, {
    name: inputPostNombre.value,
    lastname: inputPostApellido.value,
  });
  results.innerHTML = ``;
  get();
});
