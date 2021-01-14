let editStatus = false;
let id = "";
const role = "doctor";
const register_especialityform = document.getElementById("signup-form");
const listar_especialidad = document.getElementById("listar_doctores");
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = "admin-login.html";
    });
});

const registrar = (data, e) => {

    const { email, password, fullname, especialidad, role, username } = data;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            const uid = result.user.uid;
            result.user.updateProfile({
                displayName: fullname,
            });
            db.collection("users").doc().set({
                uid,
                email,
                especialidad,
                fullname,
                role,
                username,
            });
            console.log(e);
        })
        .catch(function (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("El correo ya existe.");
            } else if (error.code === "auth/weak-password") {
                alert("Ingrese contraseña");
            } else {
                console.log(error);
            }
        });
};

// const registerUserDoctor = (email, password, fullname) => {
//     console.log(fullname);
//     auth
//         .createUserWithEmailAndPassword(email, password)
//         .then((result) => {
//             console.log(result.user.uid);
//             // db.collection("users").doc().set({
//             //     id: uid,
//             //     email,
//             //     especialidad,
//             //     fullname,
//             //     role,
//             //     username,
//             //   });
//             result.user.updateProfile({
//                 displayName: fullname,
//             });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };

const createEspeciality = (email, especialidad, fullname, role, username) => {
    db.collection("users").doc().set({
        email,
        especialidad,
        fullname,
        role,
        username,
    });
};

auth.onAuthStateChanged((user) => {
    console.log(user.displayName);
    console.log(user.email);
});

var signupespecialidad = document.getElementById("select_especialidad");
// Se llama el selected por el ID
var selected_item = document.getElementById("select_especialidad");
selected_item.innerHTML = "";
//Agrego un option por default
selected_item.innerHTML += `
	<option value="0" selected>Selecciona la especialidad</option>
`;
//Se llaman los datos a firebase
db.collection("medicine_esp")
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            //Aqui agrego los option de acuerdo a la base de datos
            selected_item.innerHTML += `
				<option value="${doc.data().nombre}">${doc.data().nombre}</option>
			`;
        });
    });

const getEspecialities = () => db.collection("users").get();
const onGetEspecialities = (callback) =>
    db.collection("users").onSnapshot(callback);
const getEspeciality = (id) => db.collection("users").doc(id).get();
const deleteEspeciality = (id) => db.collection("users").doc(id).delete();
const updateEspeciality = (id, updatedEspeciality) =>
    db.collection("users").doc(id).update(updatedEspeciality);

window.addEventListener("DOMContentLoaded", async (e) => {
    const querySnapshot = await getEspecialities;

    onGetEspecialities((querySnapshot) => {
        listar_especialidad.innerHTML = "";
        querySnapshot.forEach((doc) => {
            if (doc.data().role === "doctor") {
                //console.log(doc.data())
                const especiality = doc.data();
                especiality.id = doc.id;
                listar_especialidad.innerHTML += `
                    <tr>
                        <td>${doc.data().fullname}</td>
                        <td>${doc.data().username}</td>
                        <td>${doc.data().email}</td>
                        <td>${doc.data().especialidad}</td>
                        <td>
                            <btn data-id="${especiality.id
                    }" href="#" class="btn btn-success btn-edit" title="Edit" data-toggle="tooltip">Edit</btn>
                            <btn data-id="${especiality.id
                    }" href="admin-especialidad.html" class="btn btn-danger btn-delete" title="Delete" data-toggle="tooltip">Delete</btn>
                        </td>
                    </tr>
                `;
                const btnsDelete = document.querySelectorAll(".btn-delete");
                btnsDelete.forEach((btn) => {
                    btn.addEventListener("click", async (e) => {
                        // console.log(e.target.dataset.id)
                        await deleteEspeciality(e.target.dataset.id);
                    });
                });

                const btnsEdit = document.querySelectorAll(".btn-edit");
                btnsEdit.forEach((btn) => {
                    btn.addEventListener("click", async (e) => {
                        // console.log(e.target.dataset.id)
                        const doc = await getEspeciality(e.target.dataset.id);
                        const especialidad = doc.data();

                        editStatus = true;
                        id = doc.id;

                        register_especialityform["signup-full_name"].value =
                            especialidad.fullname;
                        register_especialityform["signup-email"].value = especialidad.email;
                        register_especialityform["signup-user_name"].value =
                            especialidad.username;
                        signupespecialidad.value = especialidad.especialidad;

                        register_especialityform["btn-task-form"].innerText = "Update";
                        
                    });
                });
            }
        });
    });
});

register_especialityform.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullname = register_especialityform["signup-full_name"];
    const email = register_especialityform["signup-email"];
    const username = register_especialityform["signup-user_name"];
    const password = register_especialityform["signup-password"];
    const especialidad = signupespecialidad;

    

    if (!editStatus) {
        const data = {
            email: register_especialityform["signup-email"].value,
            fullname: register_especialityform["signup-full_name"].value,
            username: register_especialityform["signup-user_name"].value,
            password: register_especialityform["signup-password"].value,
            especialidad: signupespecialidad.value,
            role,
        };
        registrar(data, e);
        // await registerUserDoctor(email.value, password.value, fullname.value);
        // console.log(password.value);
        // await createEspeciality(
        //   email.value,
        //   especialidad.value,
        //   fullname.value,
        //   role,
        //   username.value
        // );
    } else {
        await updateEspeciality(id, {
            email: email.value,
            especialidad: especialidad.value,
            fullname: fullname.value,
            role,
            username: username.value,
        });

        editStatus = false;
        id = "";
        register_especialityform["btn-task-form"].innerText = "Save";
    }

    //   register_especialityform.reset();
});