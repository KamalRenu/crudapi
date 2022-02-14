const postslist = document.querySelector('.td');
const addPostForm = document.querySelector('.userform');
const nameValue = document.getElementById('name');
const emailValue = document.getElementById('email');
const phoneValue = document.getElementById('phone');
const passwordValue = document.getElementById('password');
const countryValue = document.getElementById('country');
const educationValue = document.getElementById('education');
const btnSubmit = document.querySelector('.btn');
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `<tr data-id=${post._id}><td class="card-name">${post.name}</td>
        <td class="card-email">${post.email}</td>
        <td class="card-phone">${post.phone}</td>
        <td class="card-password">${post.password}</td>
        <td class="card-country">${post.country}</td>
        <td class="card-education">${post.education}</td>
        <td><button id="edit-post">Edit</button>
        <button id="delete-post">Delete</button></td></tr>`;
    });
    postslist.innerHTML = output;
}

const url = "http://localhost:3001/users";

//get method
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

//Post method
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/create-user", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameValue.value,
            email: emailValue.value,
            phone: phoneValue.value,
            password: passwordValue.value,
            country: countryValue.value,
            education: educationValue.value
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr)
        })
        .then(() => location.reload())
})

//Delete method
postslist.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-post';
    let editButtonIsPressed = e.target.id == 'edit-post';
    let id = e.target.parentElement.parentElement.dataset.id
    console.log(id)
    if (delButtonIsPressed) {
        fetch(`http://localhost:3001/user/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if (editButtonIsPressed) {
        const parent = e.target.parentElement.parentElement;
        let nameContent = parent.querySelector('.card-name').textContent;
        let emailContent = parent.querySelector('.card-email').textContent;
        let phoneContent = parent.querySelector('.card-phone').textContent;
        let passwordContent = parent.querySelector('.card-password').textContent;
        let countryContent = parent.querySelector('.card-country').textContent;
        let educationContent = parent.querySelector('.card-education').textContent;

        nameValue.value = nameContent;
        emailValue.value = emailContent;
        phoneValue.value = phoneContent;
        passwordValue.value = passwordContent;
        countryValue.value = countryContent;
        educationValue.value = educationContent;
    }

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue.value,
                email: emailValue.value,
                phone: phoneValue.value,
                password: passwordValue.value,
                country: countryValue.value,
                education: educationValue.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })
});