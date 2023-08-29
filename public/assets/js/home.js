firebase.auth().onAuthStateChanged(userAuthenticated => {
    if (userAuthenticated) {
        const displayName = userAuthenticated.email;
        console.log("Nome do usuário:", displayName);
        $('#username').text()
    } else {
        console.log("Nenhum usuário autenticado.")
    }
});

function findUsers() {
    firebase.firestore()
    .collection('users')
    .get()
    .then(snapshot => {
        const users = snapshot.docs.map(doc => doc.data());
        // addUserstoScreen(users);
        console.log(users);
    });
}

findUsers();

function addUserstoScreen(users) {
    const orderedList = document.getElementById('users');

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.classList.add(user.listUsers);

        const name = document.createElement('td');
        name.innerHTML = user.name;
        tr.appendChild(name);

        const email = document.createElement('td');
        email.innerHTML = user.email;
        tr.appendChild(email);

        const password = document.createElement('td');
        password.innerHTML = user.password;
        tr.appendChild(password);

        orderedList.appendChild(tr);
    });
}