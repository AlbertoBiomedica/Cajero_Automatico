class Persona{
    constructor(usuario,nombre,apellido,password,cuentas,saldo,movimientos,url){
        this._usuario = usuario;
        this._nombre = nombre;
        this._apellido = apellido;
        this._password = password;
        this._cuentas = cuentas;
        this._saldo = saldo;
        this._movimientos = movimientos;
        this._url = url
    }
    get Usuario(){
        return this._usuario;
    }
    set Usuario(usuario){
        this._usuario = usuario;
    }
    get Nombre(){
        return this._nombre;
    }
    set Nombre(nombre){
        this._nombre = nombre;
    }
    get Apellido(){
        return this._apellido;
    }
    set Apellido(apellido){
        this._apellido = apellido;
    }
    get Cuentas(){
        return this._cuentas;
    }
    set Cuentas(cuentas){
        this._cuentas = cuentas;
    }
    get Password(){
        return this._password;
    }
    set Password(password){
        this._password = password;
    }
    get Saldo(){
        return this._saldo
    }
    set Saldo(saldo){
        this._saldo = saldo;
    }
    get Movimientos(){
        return this._movimientos;
    }
    set Movimientos(movimientos){
        this._movimientos = movimientos;
    }
    get Url(){
        return this._url;
    }
    set Url(url){
        this._url = url;
    }
    ingresarMonto(ingreso){
        this.Saldo = (parseInt(this._saldo) + parseInt(ingreso));
    }
    retirarMonto(retiro){
        this.Saldo = (parseInt(this._saldo) - parseInt(retiro));
    }
    toString(){
        return this._nombre + " " + this._apellido;
    }

}