//atrapo todos los elementos
function $ (elem){
    return document.querySelector(elem)
}
  


window.addEventListener("load", () => {

    //atrapo las variables
    //Nueva operacion
    const $inputDescription = $("#input-description")
    const $inputMonto = $("#input-monto")
    const $inputSelect = $("#input-select")
    const $inputCategoria = $("#input-categoria")
    const $inputDate = $("#input-date")
    const $btnSubmitForm = $("#btn-submit")
    const $print = $("#print")
    //Operacion
    const $containForm = $(".contain-form")
    const $btnAddOperation = $("#btn-addOperation")
    const $btnCancelForm = $("#btn-cancel")

    //categoria
        const $inputCategoriadd = $("#input-categoriaAdd")
        const $btnAddCategoria = $("#btn-addCategoria")
        const $printCategoria = $("#print-categoria")
        const $btnEliminarCategoria = $(".btn-delete")
        

    //botton para ir al formulario operaciones  
    $btnAddOperation.addEventListener('click', (event) => {
        event.preventDefault();
        $containForm.classList.add('show-modal')

        var select = document.getElementById("cat");
        for(var i = 0; i < crearCategoria.length; i++) {
            
            var opt = crearCategoria[i];
    //        console.log("hola",opt)
            var option = document.createElement("option");
            option.textContent = opt.Categorias;
            select.appendChild(option);
        }
    })

    $btnCancelForm.addEventListener('click', (event) => {
        event.preventDefault();
        $containForm.classList.remove('show-modal')
    })

    //Agregar operaciones dentro del form
    //creo el array
   
    let operaciones = []
    let contador2 = 0
    
    $btnSubmitForm.addEventListener("click", (e) => {
        e.preventDefault()
        
        let valueInputDescription = $inputDescription.value;
    //    console.log(valueInputDescription)
        let valueInputMonto = $inputMonto.value;
    //    console.log(valueInputMonto)
        let valueInputSelect = $inputSelect.value;
    //    console.log(valueInputSelect)
        let valueInputCategoria = document.getElementById("cat").value;
        console.log(valueInputCategoria)
        let valueInputDate = $inputDate.value;
    //    console.log(valueInputDate)

        operaciones.push({
            Id : crypto.randomUUID(),
            Descripcion: valueInputDescription,
            Categoria: valueInputCategoria,
            Fecha: valueInputDate,
            Monto: valueInputMonto,
            tipo: valueInputSelect,        
        })


        

        arrayGanancias = operaciones.filter(operacion => operacion.tipo == "Ganancia") // FILTRO POR GANANCIAS
        console.log("me quedo con las que son ganancias ",arrayGanancias);

        const totalGanancia = arrayGanancias.reduce((accumulator, currentValue) => {return accumulator + parseInt(currentValue.Monto)}, 0);
        console.log(totalGanancia)
        document.getElementById("ganancias").innerHTML = totalGanancia;

        
        

        arrayGastos = operaciones.filter(operacion => operacion.tipo == "Gasto") // FILTRO POR GANANCIAS
        console.log("me quedo con las que son ganancias ",arrayGastos);

        const totalGasto = arrayGastos.reduce((accumulator, currentValue) => {return accumulator + parseInt(currentValue.Monto)}, 0);
        console.log(totalGasto)
        document.getElementById("gastos").innerHTML = totalGasto;
        
        const total = totalGanancia - totalGasto 
        console.log(total)
        document.getElementById("balance").innerHTML = total;

        //guard en el browser

        localStorage.setItem("arrayOpe", JSON.stringify(operaciones));
        paint(operaciones)

    })

    

    //funcion imprimir   
        function paint(operaciones){
            $print.innerHTML = ""
            operaciones.forEach(element => {
                $print.innerHTML += `<div class="columns is-multiline is-mobile is-vcentered">
                <div class="column is-3-tablet is-6-mobile">
                <span class="has-text-weight-semibold">Descripcion</span>
                <h3 class="has-text-weight-ligth"> ${element.Descripcion}</h3>
                </div>
                <div class="column is-3-tablet is-6-mobile has-text-right-mobile">
                <span class="has-text-weight-semibold">Categoria</span><br>
                <span class="tag is-primary is-light">${element.Categoria}</span>
                </div>
                <div class="column is-2-tablet  is-hidden-mobile has-text-left-tablet">
                <span class="has-text-weight-semibold">Fecha</span><br>
                <span class:"is-link">${element.Fecha}</span>
                </div>
                <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-left-tablet is-size-4-mobile" >
                <span class="has-text-weight-semibold">Monto</span><br>
                <span class:"is-link">${element.Monto}</span>
                </div>

                <div class="column is-2-tablet is-6-mobile has-text-left">
                <p class="is-fullwidth">
                <span class="has-text-weight-semibold">Acciones</span><br>
                <button class="btn-edit " id=${element.id}>Editar</button>
                <button class="btn-delete1" id=${element.id}>Eliminar</button>
                </p>
                </div>
                </div>
                `
                
            });
                eventoBtn2();
        }   
       
        const eventoBtn2 = () => {
            const $btnDeleteOp = document.querySelectorAll(".btn-delete1");
            $btnDeleteOp.forEach((button) => {
                button.addEventListener("click", (e) => {
                    let btnId2 = e.target.id;

                    operaciones = operaciones.filter(operacion => operacion.id !== btnId2);

                    console.log("desde eliminar",btnId2)
                    
                    paint(operaciones);
                    
                
                 
                })
    
            })
            
        }

        
    //CATEGORIAS
    //nuevo array categorias
    let crearCategoria = []
    let contador = 0

    //AGREGAR CATEOGIRIA   
    $btnAddCategoria.addEventListener("click", (e) => {
        e.preventDefault()
        let valueInputCategoriaAdd = $inputCategoriadd.value;
        
        crearCategoria.push({
        id: crypto.randomUUID(),
        Categorias: valueInputCategoriaAdd
        })

        localStorage.setItem("arrayOpe1", JSON.stringify(crearCategoria));
        paintCategoria(crearCategoria)
    
    })

    //FUNCION IMPRIMIR CATEGORIA
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

    //FUNCION ELIMINAR CATEGORIA 
    const eventoBtn = () => {

        const $btnDelete = document.querySelectorAll(".btn-delete");
        $btnDelete.forEach((btn) => {
            btn.addEventListener("click", (e) => {
            let btnId = e.target.id;
            crearCategoria = crearCategoria.filter(operacion => operacion.id !== btnId);
            //console.log("desde eliminar",contador)
            paintCategoria(crearCategoria);
            localStorage.setItem("arrayOpe1", JSON.stringify(crearCategoria));
            contador = contador - 1
            })
        })

    //FUNCION EDITAR CATEGORIA
        const $btnEdit = document.querySelectorAll(".btn-edit");
        $btnEdit.forEach((btnn) => {
            btnn.addEventListener("click", (e) => {


            let idd = e.target.id;
            let inputElement = document.getElementsByClassName("inputt")[idd].value
            console.log(inputElement)
            
            crearCategoria.forEach(element => {
                if(element.id == idd){
                    element.Categorias = inputElement
                    element.id = idd
                }
            })


            localStorage.setItem("arrayOpe1", JSON.stringify(crearCategoria));
            contador = contador + 1
            paintCategoria(crearCategoria);
            
            })
        })
            
       
    }

 //FUNCION AGREGAR CATEGORIA     
     

    paintCategoria(crearCategoria)


//Funcion filtros




}) //Cierra window load
   

      




















const filtrarPorFechaMayorOIgualA = (fecha, operaciones) => {
    return operaciones.filter((operacion) => {
      const fechaOperacion = new Date(operacion.fecha)
      return fechaOperacion.getTime() >= fecha.getTime()
    })
  }
  
  const filtrarPorCategoria = (idCategoria, operaciones) => {
    return operaciones.filter((operacion) => operacion.categoria === idCategoria)
  }
  
  const filtrarPorMes = (mes, anio, operaciones) => {
    return operaciones.filter((operacion) => {
      const fecha = new Date(operacion.fecha)
      return fecha.getFullYear() === anio && fecha.getMonth() === mes
    })
  }
  
  const ordernarPorFecha = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      const fechaA = new Date(a.fecha)
      const fechaB = new Date(b.fecha)
      return orden === 'ASC'
        ? fechaA.getTime() - fechaB.getTime()
        : fechaB.getTime() - fechaA.getTime()
    })
  }
  
  const ordernarPorMonto = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      return orden === 'ASC' ? a.monto - b.monto : b.monto - a.monto
    })
  }
  
  const ordernarPorDescripcion = (operaciones, orden) => {
    return [...operaciones].sort((a, b) => {
      const fechaA = new Date(a)
      const fechaB = new Date(b)
      return orden === 'ASC'
        ? fechaA.getTime() < fechaB.getTime()
        : fechaA.getTime() > fechaB.getTime()
    })
  }
  