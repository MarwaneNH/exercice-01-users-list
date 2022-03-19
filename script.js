// Our users
let users = [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584"
    },
     {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594"
    },
    {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576"
    }
  ];

// Selection
const tableBody = document.querySelector('tbody');

// Functions 
const convertDate = (date) => { // Date converting
    date = date.slice(8,10) + "/" + date.slice(5,7) + "/" + date.slice(0,4)
    return date;
};
const showUsers = (users) => users.map( user => {
    // Get the correcte (Color) classe of the status
    const etatClass = () =>{ if(user.status === 'En validation') { return 'on-validation'} else if(user.status === 'Validé') {return 'valide'} else if(user.status === 'Rejeté'){return 'rejected'}};
    return `
        <tr class="list-user">
            <td>${user.id}</td>
            <td>${convertDate(user.createdDate)}</td>
            <td colspan="4" class="etat--td"><p class=${etatClass()}>${user.status}</p></td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.userName}</td>
            <td>${user.registrationNumber}</td>
            <td></td>
            <td class="action--td"><i class="fa-solid fa-trash-can"></i></td>
        </tr>
    `
}).join('');

// Render array 
tableBody.innerHTML = showUsers(users);

// Delete user
tableBody.addEventListener('click',deleteUser)

function deleteUser(e){
    const item = e.target;
    const trItem = item.parentElement.parentElement;
    const ItemID = trItem.querySelector('td').textContent;
    // Delete
    if(item.classList[0] === 'fa-solid') {
        // Delete from the array
        users.forEach(element => {
            const index = users.indexOf(element);
            if(element.id === ItemID) users.splice(index, 1);
        });
        // Delete from the table
        trItem.remove();
        // Render the new users
        tableBody.innerHTML = showUsers(users);
    }
}

// Selection
const addBtn = document.querySelector('.add--btn');
const addTitle = document.querySelector('h2');
const saveBtn = document.querySelector('.save--btn');
const inputsContainer = document.querySelector('.inputs--container');

// Get inputs
const firstName = document.querySelector(`input[name=firstName]`)
const lastName = document.querySelector(`input[name=lastName]`)
const status = document.querySelector(`input[name=status]`)
const userName = document.querySelector(`input[name=userName]`)
const createdDate = document.querySelector(`input[name=createdDate]`)
const registrationNumber = document.querySelector(`input[name=registrationNumber]`)

// Toggle inputs
function toggleInputs(){
    addTitle.classList.toggle('displayNone')
    saveBtn.classList.toggle('displayNone')
    inputsContainer.classList.toggle('displayNone')
    addBtn.classList.toggle('displayNone')
}
addBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    showModal()
})

// Get inputs value
saveBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    // Create user info
    const newUser = {
        id: Math.floor(Math.random()*1000000000).toString(),
        [createdDate.name]: createdDate.value,
        [status.name]: status.value,
        [firstName.name]: firstName.value,
        [lastName.name]: lastName.value,
        [userName.name]: userName.value,
        [registrationNumber.name]: registrationNumber.value,
    }
    // Add user to the array of users
    users.push(newUser)
    // Add user to the table in the page
    tableBody.innerHTML = showUsers(users);
    // Hide Inputs
    // toggleInputs()
    // Clean Inputs
    const allInputs =  [...inputsContainer.querySelectorAll('input')]
    allInputs.forEach(element => element.value = "")
    hideModal()
})
// added user notification
const modal = document.querySelector('.modal');

// Close the modal on clicking anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        hideModal()
    }
  }



function showModal(){
    modal.style.display = "flex";
}
function hideModal(){
    modal.style.display = "none"
}