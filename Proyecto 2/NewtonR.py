#pip install sympy
#pip install
import math
import os
import sympy as sp

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
    expresion = input("Ingresa la función matemática en terminos de x (ejemplo: x**2 + 3*x + 1, tambien se puede usar sin,cos, log,exp,etc): ")
    if validate(expresion):
        print("Expresion válida.")
        break
    else:
        print("Expresion ingresada no válida")
        input("Presiona cualquier tecla para intentar de nuevo...")
        limpiar_pantalla()
        
def iteration(x,mistake,function,derivate):
    ideal_mistake=mistake+1
    while ideal_mistake>mistake:

        fx = function.subs(x_sym,x)
        dfx = derivate.subs(x_sym,x)

        xi_plus=x-((fx)/dfx)
        print("xi: ",round(xi_plus,5))

        x_before=x
        x=xi_plus

        ideal_mistake = abs((xi_plus - x_before) / xi_plus) * 100
        print("Error: ", round(ideal_mistake,4))

       
       
x = float(input("Ingresa el valor inicial de x: "))
x_sym=sp.symbols('x')
fx = sp.sympify(expresion)
dfx = sp.diff(expresion,x_sym)

print(f"Funcion: {expresion}")
print(f"La derivada es: {dfx}")
mistake = -1
while mistake<0:
    mistake = float(input("Ingrese el porcentaje de error deseado: "))
iteration(x,mistake,fx,dfx)
#print("iteracion: ", iteration(value_x))
 