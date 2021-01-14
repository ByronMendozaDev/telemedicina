let editStatus = false;
let id = "";
const userEmail = "";

// Promise.all(
//   auth.onAuthStateChanged((user) => {
//     const current_user = user.email;
//     //console.log(current_user);
//     userEmail = current_user;
//   })
// );

const register_citaform = document.getElementById("cita-form");
const listar_citas = document.getElementById("listar_citas");
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = "../index.html";
    });
});

// console.log(userEmail);

var selected_doctor = document.getElementById("select_doctor");
// Se llama el selected por el ID

var selected_item_doctor = document.getElementById("select_doctor");
selected_item_doctor.innerHTML = "";
// Agrego un option por default
selected_item_doctor.innerHTML += `
        <option value="0" selected>Selecciona el doctor</option>
    `;
// Se llaman los datos a firebase
db.collection("users")
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.data().role === "doctor") {
                //Aqui agrego los option de acuerdo a la base de datos
                selected_item_doctor.innerHTML += `
                <option value="${doc.data().fullname}">${doc.data().fullname
                    } - ${doc.data().especialidad}</option>
                `;
            }
        });
    });


const registrar = (data, e) => {
    const { hora, fecha, doctor,uid } = data;

    db.collection("citas").doc().set({
        hora,
        fecha,
        doctor,
        uid
    })
}
const getCitas = () => db.collection("citas").get();
const onGetCitas = (callback) => db.collection("citas").onSnapshot(callback);
const getCita = (id) => db.collection("citas").doc(id).get();
const deleteCita = (id) => db.collection("citas").doc(id).delete();
const updateCita = (id, updatedCita) =>
    db.collection("citas").doc(id).update(updatedCita);

window.addEventListener("DOMContentLoaded", async (e) => {
    const querySnapshot = await getCitas;

    auth.onAuthStateChanged((user) => {
        console.log(user.displayName);
        if (user) {
            console.log(user.uid);
            onGetCitas((querySnapshot) => {
                listar_citas.innerHTML = "";

                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === user.uid) {
                        const cita = doc.data();
                        cita.id = doc.id;
                        listar_citas.innerHTML += `
                    <tr>
                        <td>${doc.data().hora}</td>
                        <td>${doc.data().fecha}</td>
                        <td>${doc.data().doctor}</td>
                        <td>
                            <btn data-id="${cita.id
                            }" href="#" class="btn btn-success btn-edit" title="Edit" data-toggle="tooltip">Edit</btn>
                            <btn data-id="${cita.id
                            }" href="admin-especialidad.html" class="btn btn-danger btn-delete" title="Delete" data-toggle="tooltip">Delete</btn>
                        </td>
                    </tr>
                `;
                        const btnsDelete = document.querySelectorAll(".btn-delete");
                        btnsDelete.forEach((btn) => {
                            btn.addEventListener("click", async (e) => {
                                // console.log(e.target.dataset.id)
                                await deleteCita(e.target.dataset.id);
                            });
                        });

                        const btnsEdit = document.querySelectorAll(".btn-edit");
                        btnsEdit.forEach((btn) => {
                            btn.addEventListener("click", async (e) => {
                                // console.log(e.target.dataset.id)
                                const doc = await getCita(e.target.dataset.id);
                                const cita = doc.data();

                                editStatus = true;
                                id = doc.id;
                                statusCita = "pendiente";

                                register_citaform["cita-hora"].value = cita.hora;
                                register_citaform["cita-fecha"].value = cita.fecha;
                                selected_item_doctor.value = cita.doctor;
                                register_citaform["btn-task-form"].innerText = "Update";
                            });
                        });
                    }
                });
            });
        }
    });
});

register_citaform.addEventListener("submit", async (e) => {
    e.preventDefault();
    
        const hora = register_citaform["cita-hora"];
        const fecha = register_citaform["cita-fecha"];
        const doctor = selected_doctor;
        //const uid = user.uid;
        
        
        
        if (!editStatus) {
            const data = {
                hora: hora.value,
                fecha: fecha.value,
                doctor: doctor.value,
                //uid
            };
            registrar(data, e);
            // register_citaform.reset();
        } else {
            await updateCita(id, {
                hora: hora.value,
                fecha: fecha.value,
                doctor: doctor.value,
                // uid,
            });

            editStatus = false;
            id ="";
            register_citaform['btn-task-form'].innerText = "Save";
        }
        
        

        
    


})