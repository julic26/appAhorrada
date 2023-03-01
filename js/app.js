//atrapo todos los elementos
function $ (elem){
    return document.querySelector(elem)
}


let operaciones = []
let crearCategoria = []
let totalGanancia = 0
let totalGasto = 0
let contador = 0



window.addEventListener("load", () => {

//    localStorage.removeItem("storage_operaciones");
//     localStorage.removeItem("storage_categoria");
//     localStorage.removeItem("storage_totalGanancia");
//     localStorage.removeItem("storage_totalGasto");


    operaciones = JSON.parse(localStorage.getItem("storage_operaciones"));
    if(operaciones == null)
    {
        operaciones = []
    }
    else{
        operaciones = JSON.parse(localStorage.getItem("storage_operaciones"));
    }
    crearCategoria = JSON.parse(localStorage.getItem("storage_categoria"));
    if(crearCategoria == null)
    {
        crearCategoria = []
    }
    else{
        crearCategoria = JSON.parse(localStorage.getItem("storage_categoria"));
        var select = document.getElementById("cat1");
        var select2 = document.getElementById("catEdit");
        for(var i = 0; i < crearCategoria.length; i++) {
            
            var opt = crearCategoria[i];
    //        console.log("hola",opt)
            var option = document.createElement("option");
            var option2 = document.createElement("option");
            option.textContent = opt.Categorias;
            option2.textContent = opt.Categorias;
            select.appendChild(option);
            select2.appendChild(option2);
        }

        
    }
    
    if(totalGanancia == null)
    {
        totalGanancia = 0
    }
    else{
        totalGanancia = JSON.parse(localStorage.getItem("storage_totalGanancia"));
    }
    if(totalGasto == null)
    {
        totalGasto = 0
    }
    else{
        totalGasto = JSON.parse(localStorage.getItem("storage_totalGasto"));
    }
        
    
    

    const $inputDescription = $("#input-description")
    const $inputMonto = $("#input-monto")
    const $inputSelect = $("#input-select")
    const $inputCategoria = $("#input-categoria")
    const $inputDate = $("#input-date")
    const $inputDatee = $("#input-datee")
    const $btnSubmitForm = $("#btn-submit")
    const $print = $("#print")
    
    //Operacion
    const $containForm = $(".contain-form")
    const $btnAddOperation = $("#btn-addOperation")
    const $storage = $("btn-storage")
    const $btnCancelForm = $("#btn-cancel")

    //categoria
    const $inputCategoriadd = $("#input-categoriaAdd")
    const $btnAddCategoria = $("#btn-addCategoria")
    const $printCategoria = $("#print-categoria")
    const $btnEliminarCategoria = $(".btn-delete")
    //modal categoria
    const $btnOpenModalCategoria = $(".btnOpenModal")
    const $openModalCategoria = $(".modal-containerCategoria")
    const $closeModalCategoria = $(".close-modalCategoria")
    const $editCategoria = $(".contain-modalEdit")
    const $btnCancelCategoria = $(".close-modalEdit")


    //editar operaciones
    const $editOperaciones = $(".contain-formEdit") 
    const $btnCancelOperaciones = $(".close-modalEditOp") 
    const $btnSubmitFormEdit = $(".btn-editOp")
    

    

    const $btnaddfiltro = $("#btn-addfiltro")

  
    function fechaActual(){
        var fecha = new Date();
        var mes = fecha.getMonth() + 1;
        var dia =fecha.getDate();
        var ano = fecha.getFullYear();
        if(dia<10)
        dia = '0' + dia;
        if(mes<10)
        mes = '0' + mes;
       document.getElementById('input-date').value = ano + "-" + mes + "-" + dia ;
       document.getElementById('input-datee').value = ano + "-" + mes + "-" + dia ;
    
    }
   
    function paintBalance(totalGanancia, totalGasto){
        document.getElementById("ganancias").innerHTML = "+$"+ totalGanancia;
        document.getElementById("gastos").innerHTML = "-$"+totalGasto;  
        let total = totalGanancia - totalGasto
        document.getElementById("balance").innerHTML = total;  
    }

   
   
    const deleteOperacion = () => {
        const $btnDeleteOp = document.querySelectorAll(".btn-delete1");
        console.log($btnDeleteOp)

        $btnDeleteOp.forEach((button) => {
            button.addEventListener("click", (e) => {
                let btnId2 = e.target.id;
                operaciones = operaciones.filter(operaciones => operaciones.Id !== btnId2);

                console.log("desde eliminar",btnId2)
                localStorage.setItem("storage_operaciones", JSON.stringify(operaciones));
                paint(operaciones);                               
            })  
        }) 
    }

     //editar operacion  

      
    const editarOperacion = () => {

        const $btnEditOp = document.querySelectorAll(".btn-edit1");

        $btnEditOp.forEach((button) => {
            button.addEventListener("click", (e) => {
                let btnId3 = e.target.id;
                $editOperaciones.classList.add("show-modalOperacionesEdit")
    
                $btnSubmitFormEdit.addEventListener("click", (e) => {
                    e.preventDefault();
                    var editvalueInputDescription = document.getElementById("edit-input-description").value;
                    var editvalueInputMonto = document.getElementById("edit-input-monto").value;
                    var editvalueInputSelect = document.getElementById("edit-input-select").value;
                    var editvalueInputCategoria = document.getElementById("catEdit").value;
                    var editvalueInputDate = $inputDatee.value
                    

                    operaciones.forEach(element => {

                        if(element.Id == btnId3){
                            console.log("chorlito")
                            element.Descripcion = editvalueInputDescription
                            element.Categoria = editvalueInputCategoria
                            element.Fecha = editvalueInputDate
                            element.Monto = editvalueInputMonto
                            element.tipo = editvalueInputSelect
                        }
                    })
        
                    localStorage.setItem("storage_operaciones", JSON.stringify(operaciones));
        
                    operaciones = JSON.parse(localStorage.getItem("storage_operaciones"));
                    paint(operaciones)
                    $editOperaciones.classList.remove("show-modalOperacionesEdit")
                })
                
        

            })     

        }) 

       

        $btnCancelOperaciones.addEventListener("click", (event) => {
                event.preventDefault();
                $editOperaciones.classList.remove("show-modalOperacionesEdit")
        }) 
    }

    function paint(operaciones){
    
        $print.innerHTML = ""
        var selectTipo = document.getElementById("select-tipo");
        var selectCategoria = document.getElementById("cat1");
        var selectOrden = document.getElementById("ord");
        
        console.log(selectTipo.value)
        console.log(selectCategoria.value)
        console.log(selectOrden.value)

        if (selectTipo.value === "Todos"){
            operaciones.forEach(element => {
                $print.innerHTML += `<div class="columns is-multiline is-mobile is-vcentered">
                <div class="column is-2-tablet is-6-mobile">
                <span class="has-text-weight-semibold">Descripcion</span>
                <h3 class="has-text-weight-ligth"> ${element.Descripcion}</h3>
                </div>
                <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
                <span class="has-text-weight-semibold">Categoria</span><br>
                <span class="tag is-primary is-light">${element.Categoria}</span>
                </div>
    
                <div class="column is-2-tablet  is-hidden-mobile has-text-left-tablet">
                <span class="has-text-weight-semibold">Fecha</span><br>
                <span class:"is-link">${element.Fecha}</span>
                </div>

                <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
                <span class="has-text-weight-semibold">Tipo</span><br>
                <span class="tag is-primary is-light">${element.tipo}</span>
                </div>

                <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-left-tablet is-size-4-mobile" >
                <span class="has-text-weight-semibold">Monto</span><br>
                <span class:"is-link">${element.Monto}</span>
                </div>
    
                <div class="column is-2-tablet is-6-mobile has-text-left">
                <p class="is-fullwidth">
                <span class="has-text-weight-semibold">Acciones</span><br>
                <button class="btn-edit1" id=${element.Id}>Editar</button>
                <button class="btn-delete1" id=${element.Id}>Eliminar</button>
                </p>
                </div>
                </div>
                `
                
            });
        }else{
            
            const operaciones1 = operaciones.filter(function (operacion) { return operacion.tipo == selectTipo.value && operacion.Categoria == selectCategoria.value;})
            console.log(operaciones1)

            var operaciones2 = []

            if (selectOrden.value === "mayor monto"){
                operaciones2 = operaciones1.sort((a, b) => {
                    var a1 = parseInt(a);
                    var b1 = parseInt(b);
                    if(a1.Monto < b1.Monto) {
                        return -1 }
                    if(a1.Monto > b1.Monto) {
                        return 1 }
                    if  (a1.Monto == b1.Monto) {
                        return 0}
               })
            }else if(selectOrden.value === "menor monto"){
                operaciones2 = operaciones1.sort((a, b) => {
                    var aa1 = parseInt(a);
                    var bb1 = parseInt(b);
                    if(aa1.Monto > bb1.Monto) {
                        return -1 }
                    if(aa1.Monto < bb1.Monto) {
                        return 1 }
                    if(aa1.Monto == bb1.Monto) {
                        return 0}
               })

               operaciones2 = operaciones2.reverse()

            }else if(selectOrden.value === "menos reciente"){
                operaciones2 = operaciones1.sort((a, b) => {
                    if(Number(a.Monto) < Number(b.Monto)) {
                        return -1 }
                    if(Number(a.Monto) > Number(b.Monto)) {
                        return 1 }
                    if  (Number(a.Monto) === Number(b.Monto)) {
                        return 0}
               })
            }else if(selectOrden.value === "mas reciente"){
                operaciones2 = operaciones1.sort((a, b) => {
                    if(a.Fecha > b.Fecha) {
                        return -1 }
                    if(a.Fecha < b.Fecha) {
                        return 1 }
                    if  (a.Fecha === b.Fecha) {
                        return 0}
               })
            }else if(selectOrden.value === "z/a"){
                operaciones2 = operaciones1.sort((a, b) => {
                    if(a.Descripcion.toLowerCase() < b.Descripcion.toLowerCase()) {
                        return -1 }
                    if(a.Descripcion.toLowerCase() > b.Descripcion.toLowerCase()) {
                        return 1 }
                    if (a.Descripcion.toLowerCase() === b.Descripcion.toLowerCase()) {
                        return 0 }
             })       
             operaciones2 = operaciones2.reverse()

            }else if(selectOrden.value === "a/z"){
                operaciones2 = operaciones1.sort((a, b) => {
                    if(a.Descripcion.toLowerCase() < b.Descripcion.toLowerCase()) {
                        return -1 }
                    if(a.Descripcion.toLowerCase() > b.Descripcion.toLowerCase()) {
                        return 1 }
                    if (a.Descripcion.toLowerCase() === b.Descripcion.toLowerCase()) {
                        return 0 }
             })      
             console.log("hola",operaciones2) 

            }else{
                operaciones2 = operaciones1
            }
            
            
            operaciones2.forEach(element => {
                $print.innerHTML += `<div class="columns is-multiline is-mobile is-vcentered">
                <div class="column is-2-tablet is-6-mobile">
                <span class="has-text-weight-semibold">Descripcion</span>
                <h3 class="has-text-weight-ligth"> ${element.Descripcion}</h3>
                </div>
                <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
                <span class="has-text-weight-semibold">Categoria</span><br>
                <span class="tag is-primary is-light">${element.Categoria}</span>
                </div>
              
                <div class="column is-2-tablet  is-hidden-mobile has-text-left-tablet">
                <span class="has-text-weight-semibold">Fecha</span><br>
                <span class:"is-link">${element.Fecha}</span>
                </div>

                <div class="column is-2-tablet is-6-mobile has-text-right-mobile">
                <span class="has-text-weight-semibold">Tipo</span><br>
                <span class="tag is-primary is-light">${element.tipo}</span>
                </div>

                <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-left-tablet is-size-4-mobile" >
                <span class="has-text-weight-semibold">Monto</span><br>
                <span class:"is-link">${element.Monto}</span>
                </div>
    
                <div class="column is-2-tablet is-6-mobile has-text-left">
                <p class="is-fullwidth">
                <span class="has-text-weight-semibold">Acciones</span><br>
                <button class="btn-edit1 " id=${element.Id}>Editar</button>
                <button class="btn-delete1" id=${element.Id}>Eliminar</button>
                </p>
                </div>
                </div>
                `
                
            });
        }
        
            deleteOperacion();
            editarOperacion(); 
    }

    //modal categoria
    $btnOpenModalCategoria.addEventListener("click",() =>{
        console.log('abrecategoria')
        $openModalCategoria.classList.add("show-modalCategoria")
    })

    $closeModalCategoria.addEventListener("click",() =>{
        $openModalCategoria.classList.remove("show-modalCategoria")
    })
    

    //FUNCION ELIMINAR CATEGORIA 
    const eventoBtn = () => {

        const $btnDelete = document.querySelectorAll(".btn-delete");
        $btnDelete.forEach((btn) => {
            btn.addEventListener("click", (e) => {
            let btnId = e.target.id;
            crearCategoria = crearCategoria.filter(operacion => operacion.id !== btnId);
            //console.log("desde eliminar",contador)

            contador = contador - 1
            localStorage.setItem("storage_categoria", JSON.stringify(crearCategoria));
            paintCategoria(crearCategoria);
            
            })
        })

    //FUNCION EDITAR CATEGORIA
        const $btnEdit = document.querySelectorAll(".btn-edit");
        $btnEdit.forEach((btnn) => {
            btnn.addEventListener("click", (e) => {
            //$editCategoria.classList.add('show-modalEdit')

    
            let idd = e.target.id;
            let inputElement = document.getElementsByClassName("inputt")[idd].value
            console.log(inputElement)
            
            crearCategoria.forEach(element => {
                if(element.id == idd){
                    element.Categorias = inputElement
                    element.id = idd
                }
            })   

            // contador = contador + 1
            localStorage.setItem("storage_categoria", JSON.stringify(crearCategoria));
            paintCategoria(crearCategoria);
            
            })
        })    

        // $btnCancelCategoria.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     $editCategoria.classList.remove('show-modalEdit')
        // })
      
    }
    

    function paintCategoria(crearCategoria){
        $printCategoria.innerHTML = ""
        crearCategoria.forEach(element => {
            $printCategoria.innerHTML += `<p>${element.Categorias}</p>
            <input class="inputt" type="text" id=${element.id} > 
            <button class="btn-edit" id=${element.id}>Editar</button>
            <button class="btn-delete" id=${element.id}>Eliminar</button>

            `
        })  
        
        eventoBtn();     
    }



    //botton para ir al formulario operaciones  
    $btnAddOperation.addEventListener('click', (event) => {
        event.preventDefault();
        $containForm.classList.add('show-modal')
        var select1 = document.getElementById("cat1");
        var select = document.getElementById("cat");
        for(var i = 0; i < crearCategoria.length; i++) {
            
            var opt = crearCategoria[i];
    //        console.log("hola",opt)
            var option = document.createElement("option");
            option.textContent = opt.Categorias;
            select.appendChild(option);
        }
        for(var i = 0; i < crearCategoria.length; i++) {
            
            var opt = crearCategoria[i];
    //        console.log("hola",opt)
            var option = document.createElement("option");
            option.textContent = opt.Categorias;
            option.value = opt.Categorias;
            console.log("asdasdasdasd",option.value)
            select1.appendChild(option);
        }
    })


    $btnCancelForm.addEventListener('click', (event) => {
        event.preventDefault();
        $containForm.classList.remove('show-modal')
    })

    $btnSubmitForm.addEventListener("click", (e) => {
        e.preventDefault()
       
        let valueInputDescription = $inputDescription.value;
        let valueInputMonto = $inputMonto.value;
        let valueInputSelect = $inputSelect.value;
        let valueInputCategoria = document.getElementById("cat").value;
        let valueInputDate = $inputDate.value;

        operaciones.push({
            Id : crypto.randomUUID(),
            Descripcion: valueInputDescription,
            Categoria: valueInputCategoria,
            Fecha: valueInputDate,
            Monto: valueInputMonto,
            tipo: valueInputSelect,         
        })
        
        //BALANCE//
        //GANANCIA//
        
        localStorage.setItem("storage_operaciones", JSON.stringify(operaciones));
        arrayGanancias = operaciones.filter(operacion => operacion.tipo == "Ganancia") // FILTRO POR GANANCIAS
        const totalGanancia = arrayGanancias.reduce((accumulator, currentValue) => {return accumulator + parseInt(currentValue.Monto)}, 0);
        localStorage.setItem("storage_totalGanancia", JSON.stringify(totalGanancia));
          
        arrayGastos = operaciones.filter(operacion => operacion.tipo == "Gasto") // FILTRO POR GASTO
        const totalGasto = arrayGastos.reduce((accumulator, currentValue) => {return accumulator + parseInt(currentValue.Monto)}, 0);
        localStorage.setItem("storage_totalGasto", JSON.stringify(totalGasto));
        
        const total = totalGanancia - totalGasto   
        
        paintBalance(totalGanancia, totalGasto)
        

        localStorage.setItem("storage_operaciones", JSON.stringify(operaciones));
        $containForm.classList.remove('show-modal')
        paint(operaciones)

    })


   
    //AGREGAR CATEOGIRIA   
    $btnAddCategoria.addEventListener("click", (e) => {
        e.preventDefault()
        let valueInputCategoriaAdd = $inputCategoriadd.value;
        
        crearCategoria.push({
        id: crypto.randomUUID(),
        Categorias: valueInputCategoriaAdd
        })

        localStorage.setItem("storage_categoria", JSON.stringify(crearCategoria));
        paintCategoria(crearCategoria)
    
    })

    
    $btnaddfiltro.addEventListener("click", (e) => {
        e.preventDefault()
        paint(operaciones)
    
    })
    
    fechaActual()
    paint(operaciones)
    paintCategoria(crearCategoria)
    paintBalance(totalGanancia, totalGasto)


}) //Cierra window load
   

















