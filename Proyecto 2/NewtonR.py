#pip install sympy
#pip install Flask
from flask import Flask, render_template,request
import math
import os
import sympy as sp

app = Flask(__name__)
allow_function = {
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "log": math.log,
    "exp": math.exp,
    "sqrt": math.sqrt,
    "e": math.e,
    "pi": math.pi
}
def limpiar_pantalla():
    if os.name == 'nt':  
        os.system('cls')
        

def validate(expresion):
    try:
        #Se prueba la expresion con un valor de prueba para validar que sea una función
        x=1
        eval(expresion,{"x":x, **allow_function})
        return True
    except Exception as e:
        print(f"Error en la expresion: {e}")
        return False
        
def iteration(x, mistake, function, derivate):
    result = []
    ideal_mistake = mistake + 1  # Inicializamos el error para entrar al ciclo
    x_sym = sp.symbols('x')

    while ideal_mistake > mistake:
        # Se sustituye el valor de x en la función y su derivada
        fx = function.subs(x_sym, x)
        dfx = derivate.subs(x_sym, x)

        xi_plus = x - (fx / dfx)

        # Cálculo del error
        ideal_mistake = abs((xi_plus - x) / xi_plus) * 100

        # Agregar a la lista de resultados el xi y el error
        result.append({"xi": round(xi_plus, 5), "error": round(ideal_mistake, 6)})

        # Actualizar x
        x = xi_plus

        # Si el error es suficientemente pequeño, salir del ciclo
        if ideal_mistake <= mistake:
            break

    return result


@app.route('/', methods=['GET', 'POST'])       
def index(): 
    if request.method == 'POST':   
        expresion = request.form['expresion']
        x = float(request.form['x'])
        mistake = float(request.form['mistake'])

        if validate(expresion):
            x_sym=sp.symbols('x')
            fx = sp.sympify(expresion)
            dfx = sp.diff(expresion,x_sym)

            results = iteration(x,mistake,fx,dfx)
            
            return render_template('index.html', expresion=expresion, derivada=str(dfx),results=results,x=x)
            
        else:
            return render_template('index.html', error="Expresión inválida")
        
    return render_template('index.html') 

if __name__ =='__main__':
    app.run(debug=True)
       

