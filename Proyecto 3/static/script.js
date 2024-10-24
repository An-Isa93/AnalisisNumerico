 function enviarDatos() {
    var n = document.getElementById('n').value;
    var x =document.getElementById('x').value;

    
    // Verifica si n tiene un valor antes de enviarlo
    if (n === '') {
        alert('Por favor, ingresa un valor para n');
        return; // Detener la función si n está vacío
    }
 

    var formData = new FormData();
    formData.append('n', n);
    formData.append('x',x);
  
    
    for (var i = 0; i <= n; i++) {
        formData.append(`x_value${i}`, document.getElementById(`x_value${i}`).value);
        formData.append(`y_value${i}`, document.getElementById(`y_value${i}`).value);
    }

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        // Aquí puedes manejar la respuesta del servidor si es necesario
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function tabla() {
    var n = document.getElementById('n').value;
    var contenedor = document.getElementById("container");
    contenedor.innerHTML = ''; 

    var x = '<tr><th>x</th>';
    var y = '<tr><th>y</th>';

    for (var i = 0; i <= n; i++) {
        x += `<td><ion-input fill="solid" type="number" id="x_value${i}" name="x_value${i}" step="0.00000001" /></td>`;
        y += `<td><ion-input fill="solid" type="number" id="y_value${i}" name="y_value${i}" step="0.00000001" /></td>`;
    }

    x += '</tr>';
    y += '</tr>';
    contenedor.innerHTML =  `<table>${x}${y}</table>`;

    var button = document.createElement('ion-button');
    button.textContent = 'Calcular';
    button.type = 'submit'; // Evitar el envío del formulario
    button.onclick = enviarDatos; // Asigna la función enviarDatos al evento onclick

    contenedor.appendChild(button);
}
function redireccionar() {
    let opcion = document.getElementById('opcion').value;
    
    // Redirigir a una página diferente dependiendo de la opción seleccionada
    if (opcion === "1") {
        window.location.href = "/interLineal";  // Ruta para interpolación lineal
    } else if (opcion === "2") {
        window.location.href = "/interUnico";   // Ruta para polinomio de interpolación único
    }
}
function volver() {
    window.location.href = "/"; 
    var contenedor = document.getElementById("container");
    contenedor.innerHTML = ''; 
}

window.onload = function() {
    // Recuperar la opción seleccionada desde localStorage
    const opcionGuardada = localStorage.getItem('opcionSeleccionada');
    
    if (opcionGuardada) {
        // Asignar la opción guardada al select
        document.getElementById('opcion').value = opcionGuardada;

        // Llamar a la función para mostrar los divs correctos
        options();
    }
};

