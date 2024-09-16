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
        x=1
        eval(expresion,{"x":x, **allow_function})
        return True
    except Exception as e:
        print(f"Error en la expresion: {e}")
        return False
    
while True:
   # expresion = input("Ingresa la función matemática en terminos de x (ejemplo: x**2 + 3*x + 1, tambien se puede usar sin,cos, log,exp,etc): ")
    if validate(expresion):
        print("Expresion válida.")
        break
    else:
        print("Expresion ingresada no válida")
        input("Presiona cualquier tecla para intentar de nuevo...")
        limpiar_pantalla()
        
def iteration(x,mistake,function,derivate):
    result=[]
    ideal_mistake=mistake+1
    x_sym = sp.symbols('x')
    while ideal_mistake>mistake:

        fx = function.subs(x_sym,x)
        dfx = derivate.subs(x_sym,x)

        xi_plus=x-((fx)/dfx)
        result.append("xi: ",round(xi_plus,5))

        x_before=x
        x=xi_plus

        ideal_mistake = abs((xi_plus - x_before) / xi_plus) * 100
        print("Error: ", round(ideal_mistake,4))
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
            return render_template('index.html', expresion=expresion, derivada=str(dfx),results=results)
        else:
            return render_template('index.html', error="Expresión inválida")
    return render_template('index.html') 

if __name__ =='__main__':
    app.run(debug=True)
       
"""   print(f"Funcion: {expresion}")
    print(f"La derivada es: {dfx}")
    mistake = -1
    while mistake<0:
        mistake = float(input("Ingrese el porcentaje de error deseado: "))
"""
#print("iteracion: ", iteration(value_x))
