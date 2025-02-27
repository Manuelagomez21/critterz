const sectionSeleccionarAtaque = document.getElementById("Seleccionar-ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("Seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let critterez = []
let critterezEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeCritterz
let inputHipodoge  
let inputCapipepo
let inputRatigueya
let inputPydos
let inputNebola
let inputRagnar
let mascotaJugador
let mascotaJugadorObjeto 
let ataquesCritterz
let ataquesCritterzEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mapa.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 390

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


    class Critterz {
     constructor (nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques= []
        this.tipo = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho )
        this.y = aleatorio(0, mapa.height - this.alto )
       
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
       pintarCritterz() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
         )
       }
    }

    let hipodoge = new Critterz ("Hipodoge", "./assets/HIPODOGUE.png", 5, "./assets/HIPODOGUE_head.png")
    let capipepo = new Critterz ("Capipepo", "./assets/CAPIPEPO.png", 5, "./assets/CAPIPEPO_head.png"  )
    let ratigueya = new Critterz ("Ratigueya", "./assets/RATIGUEYA.png", 5, "./assets/RATIGUEYA_head.png" )  
    let pydos = new Critterz ("Pydos","./assets/PYDOS.jpg", 5, "./assets/PYDOS_head.png" )
    let nebola = new Critterz ("Nebola", "./assets/NEBOLA.jpg", 5, "./assets/NEBOLA_head.png" )
    let ragnar = new Critterz("Ragnar", "./assets/RAGNAR.jpg", 5, "./assets/RAGNAR_head.png" )

    const HIPODOGUE_ATAQUES = [
        { nombre: "💧", id: "boton-agua"},
        { nombre: "💧", id: "boton-agua"},
        { nombre: "💧", id: "boton-agua"},
        { nombre: "🔥", id: "boton-fuego"},
        { nombre: "🌱", id: "boton-tierra"},
        {nombre: "🔥", id: "boton-fuego"},
    ]
    hipodoge.ataques.push(...HIPODOGUE_ATAQUES)

    const CAPIPEPO_ATAQUES = [
        { nombre: "🌱", id: "boton-tierra"},
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "🌱", id: "boton-tierra"},
        { nombre: "💧", id: "boton-agua"},
        { nombre: "🔥", id: "boton-fuego"},
        {nombre: "🔥", id: "boton-fuego"},
    ]

    capipepo.ataques.push(...CAPIPEPO_ATAQUES)

    const RATIGUEYA_ATAQUES = [
        {  nombre: "💧", id: "boton-agua"},
        { nombre: "💧", id: "boton-agua"},
        { nombre: "🔥", id: "boton-fuego"},
        { nombre: "💧", id: "boton-agua"},
        { nombre: "🌱", id: "boton-tierra"},
        {nombre: "🔥", id: "boton-fuego"},
    ]

    ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

    const PYDOS_ATAQUES=[
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🌱", id: "boton-tierra"},
    ]

    pydos.ataques.push(...PYDOS_ATAQUES)


    const NEBOLA_ATAQUES = [
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🌱", id: "boton-tierra"},
    ]

    nebola.ataques.push(...NEBOLA_ATAQUES)

    const RAGNAR_ENEMIGOS = [
        {nombre: "🌱", id: "boton-tierra"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "💧", id: "boton-agua"},
        {nombre: "🔥", id: "boton-fuego"},
        {nombre: "🌱", id: "boton-tierra"},
    ]

    ragnar.ataques.push(...RAGNAR_ENEMIGOS)

    critterez.push(hipodoge,capipepo,ratigueya, pydos, nebola, ragnar )

    function iniciarJuego(){
     sectionSeleccionarAtaque.style.display = "none"
     sectionVerMapa.style.display = "none"

      critterez.forEach((critterz) => {
        opcionDeCritterz = `
          <input type="radio" name="mascota" id=${critterz.nombre} />
            <label class="tarjeta-de-critterz"  for=${critterz.nombre}>
                 <P>${critterz.nombre}</P>
                 <img src=${critterz.foto} alt=${critterz.nombre}>
            </label>
            `  
      contenedorTarjetas.innerHTML += opcionDeCritterz 

      inputHipodoge = document.getElementById("Hipodoge")
      inputCapipepo = document.getElementById("Capipepo")
      inputRatigueya = document.getElementById("Ratigueya")
      inputPydos = document.getElementById("Pydos")
      inputNebola = document.getElementById("Nebola")
      inputRagnar = document.getElementById("Ragnar")
    })
   
        botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
        botonReiniciar.addEventListener("click", reiniciarJuego)
         sectionReiniciar.style.display = "none"

        unirseAlJuego()
    }

    function unirseAlJuego(){
        fetch("http://192.168.43.13:8080/unirse") //llama al servidor
        .then(function (res){ //función asíncrona, cuando le contesten hará la siguiente función
            if(res.ok){
                res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
                }
            })
        }
    

    function seleccionarMascotaJugador(){
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id

    }else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
       
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id

    }else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id

    }else if(inputNebola.checked){
        spanMascotaJugador.innerHTML = inputNebola.id
        mascotaJugador = inputNebola.id

    }else if(inputRagnar.checked){
        spanMascotaJugador.innerHTML = inputRagnar.id
        mascotaJugador = inputRagnar.id

    }else {
        alert("SELECCIONA UNA MASCOTA")
        return  
    }
        sectionSeleccionarMascota.style.display = "none"
        selecccionarCritterz(mascotaJugador)
        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
        iniciarMapa()
    }

    function selecccionarCritterz(mascotaJugador){
        fetch(`http://192.168.43.13:8080/critterz/${jugadorId}`, {
            method : "post",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                critterz : mascotaJugador
            })
        })
    }

    function extraerAtaques (mascotaJugador){
     let ataques 
      for (let i = 0; i < critterez.length; i++) {
        if  (mascotaJugador === critterez[i].nombre) {
            ataques = critterez[i].ataques
    }
    }
        mostrarAtaques(ataques)
    }
    
    function mostrarAtaques(ataques){
     ataques.forEach((ataque) => {
      ataquesCritterz = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesCritterz
    })
        botonFuego = document.getElementById("boton-fuego")
        botonAgua = document.getElementById("boton-agua") 
        botonTierra = document.getElementById("boton-tierra")
        botones = document.querySelectorAll(".BAtaque")
    }

    function secuenciaAtaque(){
     botones.forEach ((boton) => {
      boton.addEventListener("click", (e) => {
        
        let ataqueSeleccionado = e.target.textContent
        switch (ataqueSeleccionado) {
            case "🔥":
                ataqueJugador.push("Fuego")
                break;
            case "💧":
                ataqueJugador.push("Agua")
                break;
            default:
                ataqueJugador.push("Tierra")
        }
        console.log(ataqueJugador)
        boton.style.background = '#112f58'
        boton.disabled = true
        if(ataqueJugador.length === 6){
            enviarAtaques()

        }
    })
    })
    }

    function enviarAtaques(){
        fetch (`http://192.168.43.13:8080/critterz/${jugadorId}/ataques`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        })
           intervalo = setInterval(obtenerAtaques, 50)
    }

    function obtenerAtaques(){
        fetch (`http://192.168.43.13:8080/critterz/${enemigoId}/ataques`)
        .then(function (res){
            if (res.ok){
                res.json()
                .then(function ({ataques}){
                    if (ataques.length === 6){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
    }

    function seleccionarMascotaEnemigo (enemigo){
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesCritterzEnemigo = enemigo.ataques
        secuenciaAtaque()
    }


    function ataqueAleatorioEnemigo() {
        console.log("ataquesEnemigo", ataquesCritterzEnemigo)
      let ataqueAleatorio = aleatorio(0, ataquesCritterzEnemigo.length -1 )
      

      if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
             ataqueEnemigo.push("Fuego")
        } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
            ataqueEnemigo.push("Agua")
        }else {
          ataqueEnemigo.push("Tierra")
       
        }
        console.log(ataqueEnemigo)
        iniciarPelea()
    }
        
    function iniciarPelea(){
        if (ataqueJugador.length === 6) {
            combate()
        }
    }

    function indexAmbosOponentes(jugador, enemigo){
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    }
    
    function combate(){
        clearInterval(intervalo)
        for (let index = 0; index < ataqueJugador.length; index++) {
            if (ataqueJugador[index] === ataqueEnemigo[index]) {
                indexAmbosOponentes(index, index)
                crearMensaje("empate")

            }else if(ataqueJugador[index] === "Fuego" && ataqueEnemigo[index] === "Tierra"){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if(ataqueJugador[index] === "Agua" && ataqueEnemigo[index] === "Fuego"){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }else if (ataqueJugador[index] === "Tierra" && ataqueEnemigo[index] === "Agua"){
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            
            }else {
                indexAmbosOponentes(index, index)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
            
        }
        revisarVidas()
    }
        
 

    function revisarVidas(){
        if(victoriasJugador === victoriasEnemigo){
            crearMensajeFinal("hubo un empate 😳")
        }else if (victoriasJugador > victoriasEnemigo ){
            crearMensajeFinal("GANASTE! 🎉")
         }else{
            crearMensajeFinal("HAS PERDIDO LA BATALLA 😭")   
        }
        }

    function crearMensaje(resultado){
        let nuevoAtaqueDelJugador = document.createElement("p")
        let nuevoAtaqueDelEnemigo = document.createElement("p")

        sectionMensajes.innerHTML=resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo


        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  
    }
    
    function crearMensajeFinal(resultadoFinal) {
        
        sectionReiniciar.style.display = "block"

        sectionMensajes.innerHTML = resultadoFinal
          
    }   

    function reiniciarJuego(){
         location.reload()
    }
   
    function aleatorio (min,max){
      return Math.floor(Math.random() * (max - min + 1)+ min)
      
    }

    function pintarCanvas(){
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(
            mapaBackground, 
            0,
            0,
            mapa.width,
            mapa.height
        )
       mascotaJugadorObjeto.pintarCritterz()

        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

      critterezEnemigos.forEach(function (critterz){
        critterz.pintarCritterz()
        revisarColision(critterz)
      })
    }

    function enviarPosicion(x, y){
        fetch(`http://192.168.43.13:8080/critterz/${jugadorId}/posicion`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
    
        })
    .then(function (res){
      if (res.ok){
           res.json()
    .then(function ({enemigos}){
       console.log(enemigos)
         critterezEnemigos = enemigos.map(function (enemigo){
            let critterzEnemigo = null
           const critterzNombre = enemigo.critterz.nombre || ""
        if(critterzNombre === "Hipodoge"){
           critterzEnemigo  = new Critterz("Hipodoge", "./assets/HIPODOGUE.png", 5, "./assets/HIPODOGUE_head.png",enemigo.id)
        }else if (critterzNombre === "Capipepo"){
           critterzEnemigo = new Critterz ("Capipepo", "./assets/CAPIPEPO.png", 5, "./assets/CAPIPEPO_head.png", enemigo.id)
        }else if(critterzNombre === "Ratigueya"){
           critterzEnemigo = new Critterz ("Ratigueya", "./assets/RATIGUEYA.png", 5, "./assets/RATIGUEYA_head.png",enemigo.id) 
        }else if (critterzNombre === "Pydos"){
            critterzEnemigo = new Critterz ("Pydos","./assets/PYDOS.jpg", 5, "./assets/PYDOS_head.png",enemigo.id)
        }else if(critterzNombre === "Nebola"){
            critterzEnemigo = new Critterz ("Nebola", "./assets/NEBOLA.jpg", 5, "./assets/NEBOLA_head.png", enemigo.id)
        }else if(critterzNombre === "Ragnar"){
            critterzEnemigo = new Critterz("Ragnar", "./assets/RAGNAR.jpg", 5, "./assets/RAGNAR_head.png", enemigo.id)
        }

        critterzEnemigo.x = enemigo.x
        critterzEnemigo.y = enemigo.y
        
        return critterzEnemigo

        })
                    
        })
            }
        })
    }

    function moverRight(){
        mascotaJugadorObjeto.velocidadX = 5
    }

    function moverLeft(){
        mascotaJugadorObjeto.velocidadX = -5
    }

    function moverUp(){
        mascotaJugadorObjeto.velocidadY = -5
    }

    function moverDown(){
        mascotaJugadorObjeto.velocidadY = 5
    }

    function detenerMovimiento(){
        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }
// el juego funcione con el teclado
    function sePresionaUnaTecla(event){
        switch (event.key) {
            case "ArrowUp":
            case "w":
                moverUp()
                 break;
             case "ArrowDown":
             case "s" :   
             moverDown ()
                 break;
             case "ArrowLeft":
             case "a" :
                moverLeft()
                 break;
             case "ArrowRight":
             case "d" :
                moverRight()     
                 break;
            default:
                 break;
        }
    }
    
    function iniciarMapa(){
      
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
        console.log(mascotaJugadorObjeto, mascotaJugador)
        intervalo = setInterval(pintarCanvas, 50)

     window.addEventListener("keydown", sePresionaUnaTecla)
     window.addEventListener("keyup", detenerMovimiento)
    }

    function obtenerObjetoMascota(){
        for (let i = 0; i < critterez.length; i++) {
            if  (mascotaJugador === critterez[i].nombre) {
                return critterez[i]
        }
        }
    }

    function revisarColision(enemigo){
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x

        const arribaMascota = mascotaJugadorObjeto.y
        const abajoMascota =  mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = mascotaJugadorObjeto.x


        if(abajoMascota < arribaEnemigo ||
          arribaMascota > abajoEnemigo ||
          derechaMascota < izquierdaEnemigo ||
          izquierdaMascota > derechaEnemigo
        ){
            return
        }

        detenerMovimiento()
        clearInterval(intervalo)
        console.log("se detecto una colision ")

        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none" 
        seleccionarMascotaEnemigo(enemigo)
        
    }



    window.addEventListener("load", iniciarJuego)


