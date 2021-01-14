let editStatus = false;
let id ='';

const register_especialityform = document.getElementById('register_especiality');
const listar_especialidad = document.getElementById("listar_especialidad");
const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        // console.log("User signed out");
        location.href = "admin-login.html";
    });
});

const createEspeciality = (nombre, description) =>
    db.collection('medicine_esp').doc().set({
        nombre,
        description
    })


const getEspecialities = () => db.collection("medicine_esp").get();
const onGetEspecialities = (callback) => db.collection("medicine_esp").onSnapshot(callback);
const getEspeciality = (id) => db.collection('medicine_esp').doc(id).get();
const deleteEspeciality = id  => db.collection('medicine_esp').doc(id).delete();
const updateEspeciality = (id, updatedEspeciality) => db.collection('medicine_esp').doc(id).update(updatedEspeciality);

window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getEspecialities;

    onGetEspecialities((querySnapshot) => {
        listar_especialidad.innerHTML = '';
        querySnapshot.forEach((doc) => {
            //console.log(doc.data())
            const especiality = doc.data();
            especiality.id = doc.id;
            listar_especialidad.innerHTML += `
                <tr>
                    <td>${especiality.nombre}</td>
                    <td>${especiality.description}</td>
                    <td>
                        <btn data-id="${especiality.id}" href="#" class="btn btn-success btn-edit" title="Edit" data-toggle="tooltip">Edit</btn>
                        <btn data-id="${especiality.id}" href="admin-especialidad.html" class="btn btn-danger btn-delete" title="Delete" data-toggle="tooltip">Delete</btn>
                    </td>
                </tr>
            `;
            const btnsDelete = document.querySelectorAll('.btn-delete');
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    // console.log(e.target.dataset.id)
                    await deleteEspeciality(e.target.dataset.id);
                })
            });

            const btnsEdit = document.querySelectorAll('.btn-edit');
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    // console.log(e.target.dataset.id)
                    const doc = await getEspeciality(e.target.dataset.id);
                    const especialidad = doc.data();

                    editStatus = true;
                    id = doc.id;

                    register_especialityform['name_especiality'].value = especialidad.nombre;
                    register_especialityform['description'].value = especialidad.description;
                    register_especialityform['btn-task-form'].innerText = 'Update';
                })
            })
        });
    });
});
register_especialityform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = register_especialityform['name_especiality'];
    const description = register_especialityform['description'];

    if (!editStatus) {
        await createEspeciality(nombre.value,description.value);
    } else{
        await updateEspeciality(id, {
            nombre: nombre.value,
            description: description.value

        })

        editStatus = false;
        id = '';
        register_especialityform['btn-task-form'].innerText = 'Save';

    }

    
    register_especialityform.reset();
    nombre.focus()
})