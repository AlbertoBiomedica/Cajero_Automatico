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
    {
        _usuario: "Alberto17",
        _nombre: "Alberto",
        _apellido: "Vázquez Espinoza",
        _password: "12345",
        _cuentas: "987456321",
        _saldo: "500",
        _movimientos: "",
        _url: "C:\\fakepath\\user1-128x128.jpg"
    },
    {
        _usuario: 'Dey18',
        _nombre: 'Deysi',
        _apellido: "Vázquez Espinoza",
        _password: '54321',
        _cuentas: '123456789',
        _saldo: "700",
        _movimientos: "",
        _url: "C:\\fakepath\\user1-128x128.jpg"
    }
];
const persona = new Persona();
var contador = 0;

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
function verificarMovimiento(moviento_, cantidad, saldo) {
    if (cantidad === "") {
        alert("No se ha ingresado ninguna cantidad. Vuelva a intentarlo");
        formAgregar.reset();
        formRetiro.reset();
    } else {
        if (moviento_ === "deposito") {
            persona.ingresarMonto(cantidad);
            if (persona.Saldo > 990) {
                alert(`El monto ingresado de ${cantidad} hace que su saldo exceda de $980. \n Ingrese un monto menor`);
                persona.Saldo = saldo;
                formAgregar.reset();
            } else {
                saldo = parseFloat(persona.Saldo);
                moviento(persona, saldo, cantidad, moviento_);
            }
        } else if(moviento_ === "retiro") {
            persona.retirarMonto(cantidad);
            if (persona.Saldo < 10) {
                alert(`El monto retirado de ${cantidad} hace que su saldo minimo sea menor de $10. \n Ingrese un monto menor`);
                persona.Saldo = saldo;
                formRetiro.reset();
            } else {
                saldo = parseInt(persona.Saldo);
                moviento(persona, saldo, cantidad, moviento_);
            }
        }
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
                personas[contador] = personaIngresada;
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
        if (!user.value.trim() || !password.value.trim()) {
            alert("El campo de usuario o contraseña esta vacio. Verifique y vuela a intentar");
        } else {
            let usuario = personas.find((userIngresado) => {
                if (userIngresado._usuario === user.value) {
                    return userIngresado;
                }
            })
            if (usuario == null) {
                alert("El usuario ingresado no existe");
            } else {
                console.log(usuario);
                if (usuario._usuario === user.value && usuario._password === password.value) {
                    persona.Usuario = usuario._usuario;
                    persona.Nombre = usuario._nombre;
                    persona.Apellido = usuario._apellido;
                    persona.Password = usuario._password;
                    persona.Cuentas = usuario._cuentas;
                    persona.Saldo = usuario._saldo;
                    persona.Movimientos = usuario._movimientos;
                    persona.Url = usuario._url;
                    let saldoTemporal = parseFloat(persona.Saldo);
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
                        verificarMovimiento("deposito", cantidad.value, saldoTemporal);
                    });
                    // Evento para retirar dinero
                    btnCantidadRetirada.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        verificarMovimiento("retiro", cantidadRetiro.value, saldoTemporal);
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
                            if (personas[i]._usuario === persona.Usuario) {
                                personas[i]._saldo = persona.Saldo;
                                personas[i]._movimientos = contenedorModalConsulta.querySelectorAll("p");
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
            }
        }
    });
})
