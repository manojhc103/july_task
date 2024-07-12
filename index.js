let cont = document.getElementById("container");
let form = document.getElementById("form");
let btn = document.getElementById("btn");
let arr = [];
let state = false;
let currentId = null;
// letb/ url=""
async function postData() {
  let obj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    sports: document.getElementById("sports").value,
    image: document.getElementById("image").value,
  };
  try {
    let response = await axios.post(
      "https://json-server2-7e8q.onrender.com/data",
      obj
    );
    alert("Your data added successfully");
    getValueApi();
    displayData()
    form.reset()
  } catch (error) {
    console.log(error);
  }
}

async function getValueApi() {
  try {
    let response = await axios.get(
      "https://json-server2-7e8q.onrender.com/data"
    );
    arr = response.data;
    displayData(arr);
    console.log(arr);
  } catch (error) {
    console.log(error);
  }
}

async function deleteData(id) {
  try {
    let res = await axios.delete(
      `https://json-server2-7e8q.onrender.com/data/${id}`
    );
    console.log(res);
    // alert("Your card deleted successfully");
    getValueApi(); // Call to update UI after deletion
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
function editData(data) {
    let detsils = {
      name: (document.getElementById("name").value = data.name),
      email: (document.getElementById("email").value = data.email),
      address: (document.getElementById("address").value = data.address),
      sports: (document.getElementById("sports").value = data.sports),
      image: (document.getElementById("image").value = data.image),
    };
    console.log(detsils);
    btn.innerText = "Update";
    state = true;
    currentId = data.id;
    console.log(state,currentId);
  }
  
  async function updateData() {
    let newobj = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      sports: document.getElementById("sports").value,
      image: document.getElementById("image").value,
    };
    try {
      let res = await axios.patch(
        `https://json-server2-7e8q.onrender.com/data/${currentId}`,
        newobj
      );
      alert("Your data updated successfully");
      state = false;
      btn.innerText = "Submit";
      getValueApi();
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  function displayData(data) {
    cont.innerHTML = "";
    data.forEach((ele) => {
      let card = document.createElement("div");
      card.className = "card";
  
      let name = document.createElement("h2");
      name.innerText = ele.name;
  
      let email = document.createElement("h2");
      email.innerText = ele.email;
  
      let address = document.createElement("h4");
      address.innerText = ele.address;
  
      let sports = document.createElement("h4");
      sports.innerText = ele.sports;
  
      let image = document.createElement("img");
      image.src = ele.image;
  
      let del = document.createElement("button");
      del.innerText = "Delete";
      del.className = "del";
      del.addEventListener("click", (e) => {
        e.preventDefault();
        deleteData(ele.id);
      });
  
      let edit = document.createElement("button");
      edit.innerText = "Edit";
      edit.className = "edit ";
      edit.addEventListener("click", (e) => {
        e.preventDefault();
        editData(ele);
        document.getElementById("form").scrollIntoView({ behavior: 'smooth' });
      });
  
      card.append(image, name, email,sports, address, edit, del);
      cont.append(card);
    });
  }
  



btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (state) {
    updateData();
  } else {
    postData();
  }
});

// Initial data load
getValueApi();
