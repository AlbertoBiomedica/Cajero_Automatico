// Variables para ininiar sesion
let user = document.getElementById("user");
let password = document.getElementById("password");

// Variables para registrar personas
let userRegistro = document.getElementById("user_");
let nombre = document.getElementById("nombre");
let apellidoRegistro = document.getElementById("apellidos_")
let passwordRegistro = document.getElementById("password_");
let cuenta = document.getElementById("cuenta");
let saldo = document.getElementById("saldo");
let url = document.getElementById("url");

// Botones de navegación
let btnIniciar = document.getElementById("btn-inicio");
let btnRegistro = document.getElementById("btn-registrar");
let btnRegistrar = document.getElementById("btn-registrar_");
let btnHome = document.getElementById("btn-home_");

// Layouts de control
let layoutRegistro = document.getElementById("registro_");
let layoutLogin = document.getElementById("login_");
let layoutPrincipal = document.getElementById("banca");
let layoutContenedorLogin = document.getElementById("contenedor_login");

//Variables del layout principal
let contenedorModal = document.getElementById("contenedor-modal-agregar");
let contenedorModalRetiro = document.getElementById("contenedor-modal-retiro");
let contenedorModalConsulta = document.getElementById("contenedor-modal-consulta");
let bienvenida = document.getElementById("bienvenida");
let noCuenta = document.getElementById("no-cuenta");
let saldoCuenta = document.getElementById("saldo-cuenta");
let formRetiro = document.getElementById("form-retiro");
let formAgregar = document.getElementById("form-agregar");
let cantidad = document.getElementById("cantidad");
let btnCantidadAgregada = document.getElementById("btn-cantidad-agregada");
let cantidadRetiro = document.getElementById("cantidad-retiro");
let btnCantidadRetirada = document.getElementById("btn-cantidad");
let btnCierre = document.getElementById("btn-cierre-sesion");
let consulta = document.getElementById("consulta");
let imgPerfil = document.getElementById("img-perfil");
// Variable global para almacenar los datos de los usuarios
const personas = [
    ['Alberto17', 'Alberto', 'Vázquez Espinoza', '12345', '987456321', '800', "", 'C:\\fakepath\\avatar5.png'],
    ['Dey18', 'Deysi', 'Vázquez Espinoza', '54321', '123456789', '500', "", ""]
];
const persona = new Persona();
var contador = 0;
// Eventos de los botones
btnRegistro.addEventListener("click", (event) => {
    event.preventDefault();
    layoutRegistro.style.display = "flex";
    layoutLogin.style.display = "none";
});
btnRegistrar.addEventListener("click", (event) => {
    event.preventDefault();
    if (userRegistro.value === "" || nombre.value === "" || apellidoRegistro.value === "" || passwordRegistro.value === "" || cuenta.value === "" || saldo.value === "") {
        alert("Alguno de los campos estan vacios, complete nuevamente el formulario de manera correcta");
        layoutRegistro.reset();
    } else {
        if (parseInt(saldo.value) >= 10 && parseInt(saldo.value) <= 990) {
            let personaIngresada = new Persona(userRegistro.value, nombre.value, apellidoRegistro.value, passwordRegistro.value, cuenta.value, saldo.value, "", url.value);
            personas[contador] = Object.values(personaIngresada);
            contador++;
            layoutRegistro.reset();
            alert("Se ha registrado el usuario con exito");
        } else {
            alert(`El saldo ingresado de $ ${saldo.value}, no esta dentro del parametro recuerde lo siguiente: \n Saldo minimo: $10. \n Saldo Maximo: $980.`);
            layoutRegistro.reset();
        }
    }
});
btnHome.addEventListener("click", (event) => {
    event.preventDefault();
    layoutRegistro.style.display = "none";
    layoutLogin.style.display = "flex";
});
btnIniciar.addEventListener("click", (event) => {
    event.preventDefault();
    for (let i = 0; i < personas.length; i++) {
        if (personas[i].includes(user.value) || personas[i].includes(password.value)) {
            let datosPersona = [];
            for (let j = 0; j < 8; j++) {
                datosPersona[j] = personas[i][j];
            }
            if (datosPersona[0] == user.value && datosPersona[3] == password.value) {
                persona.Usuario = datosPersona[0];
                persona.Nombre = datosPersona[1];
                persona.Apellido = datosPersona[2];
                persona.Password = datosPersona[3];
                persona.Cuentas = datosPersona[4];
                persona.Saldo = datosPersona[5];
                persona.Movimientos = datosPersona[6];
                persona.Url = datosPersona[7];
                let saldoTemporal = parseInt(persona.Saldo);
                layoutContenedorLogin.style.display = "none";
                layoutPrincipal.style.display = "flex";
                bienvenida.innerHTML = "Bienvenido" + " " + persona.toString();
                noCuenta.innerHTML = "No. cuenta: " + " " + persona.Cuentas.toString();
                saldoCuenta.innerHTML = "Saldo:" + " $" + persona.Saldo;
                let urlTem = persona.Url.split("\\");
                imgPerfil.src = `./img/${urlTem[2]} `;
                console.log(urlTem[2]);
                // Evento para agregar un deposito
                btnCantidadAgregada.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (cantidad.value === "") {
                        alert("No se ha ingresado ninguna cantidad. Vuelva a intentarlo");
                        formAgregar.reset();
                    } else {
                        let cantidadAgregada = cantidad.value;
                        persona.ingresarMonto(cantidadAgregada);
                        if (persona.Saldo > 990) {
                            alert(`El monto ingresado de ${cantidadAgregada} hace que su saldo exceda de $980. \n Ingrese un monto menor`);
                            persona.Saldo = saldoTemporal;
                            formAgregar.reset();
                        } else {
                            saldoTemporal = parseInt(persona.Saldo);
                            moviento(persona, saldoTemporal, cantidadAgregada, "deposito");
                        }

                    }
                });
                // Evento para retirar dinero
                btnCantidadRetirada.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (cantidadRetiro.value === "") {
                        alert("No se ha ingresado ninguna cantidad. Vuelva a intentarlo");
                        formRetiro.reset();
                    } else {
                        let cantidadRetirada = cantidadRetiro.value;
                        persona.retirarMonto(cantidadRetirada);
                        if (persona.Saldo < 10) {
                            alert(`El monto retirado de ${cantidadRetirada} hace que su saldo minimo sea menor de $10. \n Ingrese un monto menor`);
                            persona.Saldo = saldoTemporal;
                            formRetiro.reset();
                        } else {
                            saldoTemporal = parseInt(persona.Saldo);
                            console.log("Saldo despues de agregar un monto: " + saldoTemporal);
                            moviento(persona, saldoTemporal, cantidadRetirada, "retiro");
                        }
                    }
                });
                //Evento para guradar los movimientos
                consulta.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    if (persona.Movimientos === "") {
                        return
                    } else {
                        persona.Movimientos.forEach((value) => {
                            contenedorModalConsulta.appendChild(value);
                        });
                    }
                })
                //Evento para cerrar 
                btnCierre.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    saldoTemporal = 0;
                    for (let i = 0; i < personas.length; i++) {
                        for (let j = 0; j < 1; j++) {
                            if (personas[i][j] === persona.Usuario) {
                                personas[i][5] = persona.Saldo;
                                personas[i][6] = contenedorModalConsulta.querySelectorAll("p");
                            }
                        }
                    }
                    contenedorModal.querySelectorAll("p").forEach((value) => {
                        value.remove();
                    });
                    contenedorModalRetiro.querySelectorAll("p").forEach((value) => {
                        value.remove();
                    });
                    contenedorModalConsulta.querySelectorAll("p").forEach((value) => {
                        value.remove();
                    });
                    layoutLogin.reset();
                    layoutContenedorLogin.style.display = "flex";
                    layoutPrincipal.style.display = "none";
                });
            } else {
                alert("El usuario o la contraseña no son correctas");
                layoutLogin.reset();
            }
            break;
        }
    }
});

let borbujas_ = document.getElementById("burbujas_");
// Funciones
// Función que controla los depositos, los retiros y las consultas
function moviento(persona, saldo, cantidad, tipoMovimiento) {
    let childElement = document.createElement("p");
    let childElementConsulta = document.createElement("p");
    if (tipoMovimiento === "deposito") {
        let saldoAnterior = parseInt(saldo) - parseInt(cantidad);
        contenedorModal.querySelectorAll("p").forEach((value) => {
            value.remove();
        });
        childElement.innerHTML = ` La cantidad agredada es: $${cantidad}. </br>
        El nuevo saldo es: $ ${persona.Saldo}.`;
        childElementConsulta.innerHTML = ` Saldo anterior: $${saldoAnterior}. </br>
        Deposito de $${cantidad}. </br>
        Nuevo saldo: $${persona.Saldo}`;
        contenedorModal.appendChild(childElement);
        contenedorModalConsulta.appendChild(childElementConsulta);
        saldoCuenta.innerHTML = "Saldo:" + " $" + persona.Saldo;
        formAgregar.reset();
    } else if (tipoMovimiento === "retiro") {
        let saldoAnterior = parseInt(saldo) + parseInt(cantidad);
        contenedorModalRetiro.querySelectorAll("p").forEach((value) => {
            value.remove();
        });
        childElement.innerHTML = ` La cantidad retirada es es: $ ${cantidad}. </br>
        El nuevo saldo es: $${persona.Saldo}.`;
        childElementConsulta.innerHTML = ` Saldo anterior: $${saldoAnterior}. </br>
        Retiro de $${cantidad}.</br>
        Nuevo saldo: $${persona.Saldo}`;
        contenedorModalRetiro.appendChild(childElement);
        contenedorModalConsulta.appendChild(childElementConsulta);
        saldoCuenta.innerHTML = "Saldo:" + " $" + persona.Saldo;
        formRetiro.reset();
    }
}
function borbujas() {
    let borbujas = "div ";
    let numBorbujas = borbujas.repeat(10);
    let arrayBorbujas = numBorbujas.split(" ");
    arrayBorbujas.pop();
    for (let i = 0; i < arrayBorbujas.length; i++) {
        const elementsDivs = document.createElement(arrayBorbujas[i]);
        elementsDivs.classList.add('burbuja');
        borbujas_.appendChild(elementsDivs);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    borbujas();
})
