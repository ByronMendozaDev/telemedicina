let editStatus = false;
let id = '';
const userEmail = "";

const register_citaform = document.getElementById('cita-form');
const listar_citas = document.getElementById("listar_citas");
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = "../index.html";
    });
});

console.log(userEmail);

var selected_doctor = document.getElementById("select_doctor");
// Se llama el selected por el ID

var selected_item_doctor = document.getElementById("select_doctor");
selected_item_doctor.innerHTML = "";
// Agrego un option por default
selected_item_doctor.innerHTML += `
        <option value="0" selected>Selecciona el doctor</option>
    `;
// Se llaman los datos a firebase
db.collection('users')
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.data().role === "doctor") {
                //Aqui agrego los option de acuerdo a la base de datos
                selected_item_doctor.innerHTML += `
                <option value="${doc.data().fullname}">${doc.data().fullname} - ${doc.data().especialidad}</option>
                `;

            }
        });
    });

const getCitas = () => db.collection("citas").get();
const onGetCitas = (callback) => db.collection("citas").onSnapshot(callback);
const getCita = (id) => db.collection('citas').doc(id).get();
const deleteCita = id => db.collection('citas').doc(id).delete();
const updateCita = (id, updatedCita) => db.collection('citas').doc(id).update(updatedCita);

window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getCitas;
    auth.onAuthStateChanged((user) => {
        if(user) {
            onGetCitas((querySnapshot) => {
                listar_citas.innerHTML = '';
        
                querySnapshot.forEach((doc) => {
                    if (doc.data().emailDoctor === user.email) {
                        //console.log(doc.data())
                        const cita = doc.data();
                        cita.id = doc.id;
                        listar_citas.innerHTML += `
                <tr>
                    <td>${doc.data().hora}</td>
                    <td>${doc.data().fecha}</td>
                    <td>${doc.data().doctor}</td>
                    <td>
                        <btn data-id="${cita.id}" href="#" class="btn btn-success btn-edit" title="Edit" data-toggle="tooltip">Edit</btn>
                        <btn data-id="${cita.id}" href="admin-especialidad.html" class="btn btn-danger btn-delete" title="Delete" data-toggle="tooltip">Delete</btn>
                    </td>
                </tr>
            `;
                        const btnsDelete = document.querySelectorAll('.btn-delete');
                        btnsDelete.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                // console.log(e.target.dataset.id)
                                await deleteCita(e.target.dataset.id);
                            })
                        });
        
                        const btnsEdit = document.querySelectorAll('.btn-edit');
                        btnsEdit.forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                // console.log(e.target.dataset.id)
                                const doc = await getCita(e.target.dataset.id);
                                const cita = doc.data();
        
                                editStatus = true;
                                id = doc.id;
                                statusCita = "pendiente";
        
                                register_citaform['cita-hora'].value = cita.hora;
                                register_citaform['cita-fecha'].value = cita.fecha;
                                selected_item_doctor.value = cita.doctor;
                                register_citaform['btn-task-form'].innerText = 'Update';
                            })
                        })
                    }
        
        
        
                });
            });
        }
    
    });
    
});

