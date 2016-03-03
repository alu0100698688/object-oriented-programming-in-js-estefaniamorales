"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
//Prototipos
//Clase Medida (un valor numérico y la unidad de medida). Clase padre.
function Medida(num,uni){
        //Atributos de la clase
        this.numero=num;
        this.unidad=uni;
}
//Getters y Setters
Medida.prototype.get=function(atributo){
    switch(atributo)
    {
        case "numero":
            return this.numero;
        case "unidad":
            return this.unidad;
    }
};
Medida.prototype.set=function(atributo,valor){
    switch(atributo)
    {
        case "numero":
            this.numero=valor;
            break;
        case "unidad":
            this.unidad=valor;
            break;
    }
};

//Clase Temperatura que hereda de Medida
function Temperatura(num, uni){
        //Atributos de la clase
        Medida.call(this,num,uni); //Llamada al constructor de la clase padre

}

Temperatura.prototype = Object.create(Medida.prototype);

//Clase Celsius que hereda de Temperatura y sus métodos
function Celsius(num){
  Temperatura.call(this,num,'C');
}

Celsius.prototype = Object.create(Temperatura.prototype);

Celsius.prototype.toFahrenheit = function(){
  var result;
  result = (this.get("numero") * 9/5)+32;
  result = result.toFixed(1)+" Farenheit";
  return result;
};

Celsius.prototype.toKelvin = function(){
  var result;
  result = this.get("numero") + 273.15 ;
  result = result.toFixed(1)+" Kelvin";
  return result;
};

//Clase Kelvin que hereda de Temperatura y sus métodos
function Kelvin(num){
  Temperatura.call(this,num,'K');
}

Kelvin.prototype = Object.create(Temperatura.prototype);

Kelvin.prototype.toFahrenheit = function(){
  var result;
  result = ((this.get("numero")-273.15) * 9/5)+32;
  result = result.toFixed(1)+" Farenheit";
  return result;
};

Kelvin.prototype.toCelsius = function(){
  var result;
  result = this.get("numero") -  273.15;
  result = result.toFixed(1)+" Celsius";
  return result;
};

//Clase Fahrenheit que hereda de Temperatura y sus métodos
function Fahrenheit(num){
  Temperatura.call(this,num, 'F');
}

Fahrenheit.prototype = Object.create(Temperatura.prototype);

Fahrenheit.prototype.toCelsius = function(){
  var result;
  result = (this.get("numero") - 32)*5/9;
  result = result.toFixed(1)+" Celsius";
  return result;
};

Fahrenheit.prototype.toKelvin = function(){
  var result;
  result = ((5*(this.get("numero")-32))/9)+273.15;
  result = result.toFixed(1)+" Kelvin";
  return result;
};

Fahrenheit.prototype.mostrar = function(){
  console.log(this.get("numero") + " "+this.get("unidad"));
};

//Función que comprueba la expresión regular y calcula
function calcular() {
  var result;
  var salida=0;
  var temp = original.value;
  var medida = XRegExp('(?<valor> [ ]?[-+]?[0-9]+(:\.[0-9]+)?(e[-+]?[0-9]+)?[ ]*)  # valor \n'+
                       '(?<medidaIni> [kKfFcC][ ]?) # medidaIni \n' +
                       '(?<opcional> (to)?) # opcional \n'+
                       '(?<medidaFin> [ ]*[kKfFcC]) # medidaFin ','x');


   var match = XRegExp.exec(temp, medida);
   if (match) {
     var num = match[1];
     var medidaIni = match[4];
     var medidaFin = match[7];
     medidaIni.trim();
     medidaFin.trim();
     num = parseFloat(num);
     if (medidaIni[0] == 'c' || medidaIni[0] == 'C') {
       var gradosC = new Celsius(num);
       if(medidaFin[0] !='c'&& medidaFin[0]!='C'){
         if(medidaFin[0] == 'f' || medidaFin[0] == 'F'){
           result = gradosC.toFahrenheit();
         }else{
           result = gradosC.toKelvin();
         }
       }else{
         salida=1;
         converted.innerHTML = "ERROR! Conversión inválida pruebe con 32c to f";
       }
     }else{
       if(medidaIni[0] == 'f' || medidaIni[0] == 'F'){
         var gradosF = new Fahrenheit(num);
         if(medidaFin[0] !='f'&& medidaFin[0]!='F'){
           if(medidaFin[0] == 'c' || medidaFin[0] == 'C'){
             result = gradosF.toCelsius();
           }else{
             result = gradosF.toKelvin();
           }
         }else{
           salida = 1;
           converted.innerHTML = "ERROR! Conversión inválida pruebe con 32f to c, 12f k...";
         }
       }else{
         var gradosK = new Kelvin(num);
         if(medidaFin[0] !='k'&& medidaFin[0]!='K'){
           if(medidaFin[0] == 'c' || medidaFin[0] == 'C'){
             result = gradosK.toCelsius();
           }else{
             result = gradosK.toFahrenheit();
           }
         }else{
           salida=1;
           converted.innerHTML = "ERROR! Conversión inválida pruebe con 32k to f, 12k C...";
         }
       }
     }
     if(salida!=1){
       converted.innerHTML = result;
     }
  }else{
      converted.innerHTML = "ERROR! Formato incorrecto inténtelo con 32f to C, 12e10k f";
  }

}
