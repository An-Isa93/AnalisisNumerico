function validar() {
    const tablaContainer = document.getElementById('tablaContainer');
    tablaContainer.innerHTML = ""; // Limpia el contenido del contenedor
    
    // Obtén el valor del input como cadena
    const sizeInput = document.getElementById("size").value;
    // Muestra el valor del input para depuración
    console.log("Valor del input:", sizeInput);
    
    // Convierte el valor a número
    const n = parseFloat(sizeInput);
    
    // Muestra el valor convertido para depuración
    console.log("Valor convertido a número:", n);
    
    // Verifica si el valor convertido es válido y es un entero
    if (isNaN(n) || n <= 0 || !Number.isInteger(n) || n>100 || n==1) {
        alert('Tamaño de la matriz inválido.');
        return;
    }
    // Si el tamaño es válido, puedes generar la tabla
    generarTabla(n);
}

function generarTabla(n) {
    const contenedorResultados = document.getElementById('tabla-matriz');
    contenedorResultados.innerHTML = ""; // Limpia el contenido del contenedor
    // Obtener el contenedor de la tabla
    const tablaContainer = document.getElementById("tablaContainer");
    tablaContainer.innerHTML = ''; // Limpiar contenido previo

    // Crear la tabla
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse"; // Opcional para estilo de tabla

    for (let i = 0; i < n; i++) {
        const tr = document.createElement("tr");
   
        for (let j = 0; j < n+1; j++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number"; 
            input.style.border = "1px solid black";
            input.style.width = "50px"; 
            input.style.height = "30px"; 
            td.appendChild(input);
            tr.appendChild(td);
            if (j === n - 1) {
                td.style.borderRight = "2px solid black"; // Estilo para la línea vertical
            }
            
            tr.appendChild(td);
        }
        
        table.appendChild(tr);
    }
    // Añadir la tabla al contenedor

    tablaContainer.appendChild(table); 
}
function Menu(){
    const n = parseInt(document.getElementById('size').value);
    const opcion = document.getElementById("opcion").value;

    if (opcion === "1") {
        const matriz = obtenerMatrizDesdeInputs(n,"1");
        console.log("Seleccionado: Gauss Jordan");
        gaussJordan(n, matriz);  // Llama a la función gaussJordan
        // Llama a la función que implementa Gauss Jordan
    } else if (opcion === "2") {
        console.log("Seleccionado: Método Montante");
        const matriz = obtenerMatrizDesdeInputs(n,"2");
        montante(n,matriz);
        // Llama a la función que implementa el Método Montante
    }
}

function obtenerMatrizDesdeInputs(n,opcion) {
    let matriz = [];
    const inputs = document.querySelectorAll('#tablaContainer input');
    let inputIndex = 0;
    if(opcion === "1")
    {
        for (let i = 0; i < n; i++) {
            let fila = [];
            for (let j = 0; j <= n; j++) {
                fila.push(parseFloat(inputs[inputIndex].value) || 0); 
                inputIndex++;
            }
            matriz.push(fila);
        }    
    }else if(opcion === "2"){
        for (let i = 0; i < n; i++) {
            let fila = [];
            let terminosIndependientes = 0;
            for (let j = 0; j <= n - 1; j++) {
                fila.push(parseFloat(inputs[inputIndex].value) || 0); 
                inputIndex++;
            }
    
            // Añadir la matriz identidad a la izquierda
           /* for (let j = 0; j < n; j++) {
                if (i === j) {
                    fila.push(1); // Coloca 1 en la diagonal principal
                } else {
                    fila.push(0); // Coloca 0 en los demás elementos
                }
            }*/
    
            // Extraer y añadir el término independiente al final
            terminosIndependientes = parseFloat(inputs[inputIndex].value) || 0;
            fila.push(terminosIndependientes);
            inputIndex++;
    
            matriz.push(fila);
        }
    
    }
    
    console.log("Matriz obtenida:", matriz); // Depuración
    return matriz;
}



function mostrarMatriz(n, matriz, opcion) {
    const contenedor = document.getElementById('tabla-matriz');
    
    // Crea una nueva tabla
    let tabla = document.createElement('table');
    tabla.border = 1; // Agrega borde a la tabla para visualización clara
    if (opcion === "1") {
        // Itera sobre cada fila de la matriz
        for (let i = 0; i < n; i++) {
            let fila = document.createElement('tr'); // Crea una nueva fila
    
            // Itera sobre cada columna
            for (let j = 0; j <= n; j++) {
                let celda = document.createElement('td'); // Crea una nueva celda
                celda.innerText = matriz[i][j].toFixed(2); // Inserta el valor de la matriz en la celda (redondeado a 2 decimales)
                fila.appendChild(celda); // Añade la celda a la fila
            }
    
            tabla.appendChild(fila); // Añade la fila a la tabla
        }
    
        // Inserta la nueva tabla en el contenedor sin borrar las anteriores
        contenedor.appendChild(document.createElement('br')); // Añade un salto de línea
        contenedor.appendChild(tabla);
    
    } else  if (opcion === "2") {
        // Itera sobre cada fila de la matriz extendida
        for (let i = 0; i < n; i++) {
            let fila = document.createElement('tr'); // Crea una nueva fila

            // Itera sobre cada columna de la matriz extendida
            for (let j = 0; j <= n; j++) {
                let celda = document.createElement('td'); // Crea una nueva celda
                celda.innerText = matriz[i][j].toFixed(2); // Inserta el valor de la matriz en la celda (redondeado a 2 decimales)
                fila.appendChild(celda); // Añade la celda a la fila
            }
           /* for (let k = 0; k < n; k++) {
                matriz[k][n + k] = 1;
              }*/

            tabla.appendChild(fila); // Añade la fila a la tabla
        }
        
        // Inserta la nueva tabla en el contenedor sin borrar las anteriores
        contenedor.appendChild(document.createElement('br')); // Añade un salto de línea
        contenedor.appendChild(tabla);
    }
}

function limpiar(){
  const contenedor = document.getElementById('tabla-matriz');
  contenedor.innerHTML="";

  const table = document.getElementById("tablaContainer");
  table.innerHTML="";


}


function gaussJordan(n, matriz) {
    const contenedorResultados = document.getElementById('tabla-matriz');
    contenedorResultados.innerHTML = ""; // Limpia el contenido del contenedor
    mostrarMatriz(n,matriz,"1");

    for (let i = 0; i < n; i++) {
        let piv = matriz[i][i]; // Pivote

        // Verificar si el pivote es 0 y realizar intercambio de filas si es necesario
        if (piv === 0) {
            let swapped = false;
            
            // Intentar intercambiar filas
            for (let k = i + 1; k < n; k++) {
                if (matriz[k][i] !== 0) {
                    [matriz[i], matriz[k]] = [matriz[k], matriz[i]];
                    piv = matriz[i][i]; // Actualizar pivote después del intercambio
                    swapped = true;
                    console.log("Intercambio de filas realizado");
                    break;
                }
            }

            // Si no se intercambió fila, intentar intercambiar columnas
            if (!swapped) {
                for (let j = i + 1; j < n; j++) {
                    if (matriz[i][j] !== 0) {
                        for (let k = 0; k < n; k++) {
                            let temp = matriz[k][i];
                            matriz[k][i] = matriz[k][j];
                            matriz[k][j] = temp;
                        }
                        piv = matriz[i][i]; // Actualizar pivote después del intercambio  
                        swapped = true;
                        console.log("Intercambio de columnas realizado");
                        break;
                    }
                }
            }
        }

        // Verifica si la fila actual es completamente cero excepto en el término independiente
        let allZeroes = true;
        for (let j = 0; j < n; j++) {
            if (matriz[i][j] !== 0) {
                allZeroes = false;
                break;
            }
        }
        if (allZeroes && matriz[i][n] !== 0) {
            alert("Sistema inconsistente. No tiene solución.");
            return;
        }

        // Verificación de soluciones infinitas
        let infinitas = true;
        for (let j = 0; j <= n; j++) {
            if (matriz[i][j] !== 0) {
                infinitas = false;
                break;
            }
        }
        if (infinitas) {
            alert("El sistema tiene soluciones infinitas");
            return;
        }

        // Normalizar la fila
        for (let j = 0; j <= n; j++) {
            matriz[i][j] /= piv; // Normalizar fila i
        }

        // Hacer ceros en la columna del pivote para las otras filas
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matriz[k][i];
                for (let j = 0; j <= n; j++) {
                    matriz[k][j] -= factor * matriz[i][j]; // Hacer ceros
                }
            }
        }

        console.log(matriz);
        mostrarMatriz(n, matriz, "1");
    }

    console.log("Soluciones:");
    let textoS = document.createElement('p');
    textoS.innerText="Soluciones";
    contenedorResultados.appendChild(textoS);
    for (let i = 0; i < n; i++) {
        let resultados= document.createElement('p');
        resultados.innerHTML="x<sub>"+(i+1) + "</sub> = " + matriz[i][n].toFixed(4);
        contenedorResultados.appendChild(resultados);
        console.log("x" + (i + 1) + ": " + matriz[i][n]);
    }
}



function montante(n, m) {
    let pivAct = 0, pivAnt = 1, determinante = 1;
    let matriz2 = [];
    const contenedor = document.getElementById('tabla-matriz');
    let tablaAdjunta = document.createElement('table');
    tablaAdjunta.border=1;
    let tablaInversa = document.createElement('table');
    tablaInversa.border=1;
    contenedor.innerHTML = ""; // Limpia el contenido del contenedor
    mostrarMatriz(n,m,"2");
    // Inicializar la matriz2 como una matriz de n x (2n+1)
    for (let i = 0; i < n; i++) {
        matriz2[i] = [];
        for (let j = 0; j <= 2 * n; j++) {
            matriz2[i][j] = 0;
        }
    }

    for (let i = 0; i < n; i++) {
        pivAct = m[i][i]; // El pivote actual
     // Verificar si el pivote es 0 y realizar intercambio de filas si es necesario
     if (pivAct === 0) {
        let swapped = false;
        
        // Intentar intercambiar filas
        for (let k = i + 1; k < n; k++) {
            if (m[k][i] !== 0) {
                [m[i], m[k]] = [m[k], m[i]];
                pivAct = m[i][i]; // Actualizar pivote después del intercambio
                swapped = true;
                console.log("Intercambio de filas realizado");
                break;
            }
            mostrarMatriz(n, m, "2");
        }

        // Si no se intercambió fila, intentar intercambiar columnas
        if (!swapped) {
            for (let j = i + 1; j < n; j++) {
                if (m[i][j] !== 0) {
                    for (let k = 0; k < n; k++) {
                        let temp = m[k][i];
                        m[k][i] = m[k][j];
                        m[k][j] = temp;
                    }
                    pivAct = m[i][i]; // Actualizar pivote después del intercambio  
                    swapped = true;
                    console.log("Intercambio de columnas realizado");
                    break;
                }
            }
            mostrarMatriz(n, m, "2");
        }
    }
     // Verifica si la fila actual es completamente cero excepto en el término independiente
     let allZeroes = true;
     for (let j = 0; j < n; j++) {
         if (m[i][j] !== 0) {
             allZeroes = false;
   
         }
     }
     if (allZeroes && m[i][n] !== 0) { // m[i][2 * n] es el término independiente
        alert("Sistema inconsistente. No tiene solución.");
        return;
    }

    // Verificación de soluciones infinitas
    if (allZeroes && m[i][n] === 0) {
        alert("El sistema tiene soluciones infinitas");
        return;
    }
        for (let j = 0; j < n; j++) {
            if (j != i) { // No modificar la fila del pivote
                for (let k = 0; k <=n; k++) {
                    matriz2[j][k] = ((m[i][i] * m[j][k]) - (m[j][i] * m[i][k])) / pivAnt;
                }
            }
     
        }

        pivAnt = pivAct; // Actualizar pivote anterior

        for (let p = 0; p < n; p++) {
            for (let q = 0; q <= (n); q++) {
                if (p != i) {
                    m[p][q] = matriz2[p][q];
                }
            }
        }

        mostrarMatriz(n, m, "2"); // Mostrar la matriz en cada paso
        determinante = m[i][i];
    }

   // Mostrar el determinante
    console.log("El determinante es: " + determinante);
    let det = document.createElement('p'); 
    det.innerText="El determinante es: "+ determinante;
    contenedor.appendChild(det);

    // Mostrar las soluciones
    console.log("Las soluciones son:");
    let textoS = document.createElement('p');
    textoS.innerText="Soluciones";
    contenedor.appendChild(textoS);
  
    for (let i = 0; i < n; i++) {
       let resultados= document.createElement('p');
        resultados.innerHTML="x<sub>"+(i+1) + "</sub> = " + (m[i][n] / m[i][i]).toFixed(4);
        contenedor.appendChild(resultados);
        console.log("x" + (i + 1) + " = " + (m[i][n] / m[i][i]));
    }

    // Mostrar la adjunta
    /*let texto = document.createElement('p');
    texto.innerText="La adjunta es:";
    contenedor.appendChild(texto);
    console.log("\nLa adjunta es:");
    for (let i = 0; i < n; i++) {
        let fila = document.createElement('tr'); // Crea una nueva fila
        let adjuntaFila = [];
        for (let j = 0; j < n; j++) {
            let celda = document.createElement('td'); 
            celda.innerText = m[i][n+j].toFixed(2); 
            fila.appendChild(celda);
            adjuntaFila.push(m[i][n + j]);
        }
        console.log(adjuntaFila.join(" "));
        tablaAdjunta.appendChild(fila); 
         //Agrega la tabla al contenedor

    }

    contenedor.appendChild(tablaAdjunta);
    contenedor.appendChild(document.createElement('br')); 
    // Mostrar la inversa
    if(determinante === 0){
        console.log("La matriz no tiene inversa debido a que el determinante es 0");
    }
    else{
        let textIn = document.createElement('p');
        textIn.innerText="La inversa es:";
        contenedor.appendChild(textIn);
        console.log("\nLa inversa es:");
        for (let i = 0; i < n; i++) {
            let fila = document.createElement('tr');
            let inversaFila = [];
            for (let j = 0; j < n; j++) {
                let celda = document.createElement('td'); 
                celda.innerText = (m[i][n+j]/determinante).toFixed(2); 
                fila.appendChild(celda);
                inversaFila.push((m[i][n + j] / determinante).toFixed(2));
            }
            console.log(inversaFila.join(" "));
            tablaInversa.appendChild(fila); 
        }
        contenedor.appendChild(tablaInversa);

    }*/
}




