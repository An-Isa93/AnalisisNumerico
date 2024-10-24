from flask import Flask, render_template,request
import math
import sympy as sp

app = Flask(__name__)

function={
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "log": math.log,
    "exp": math.exp,
    "sqrt": math.sqrt,
    "e": math.e,
    "pi": math.pi
}

def validate(expresion):
    try:
        x=1
        eval(expresion,{"x":x, **function})
        return True
    except Exception as e:
        print(f"Error en la expresion: {e}")
        return False

def lineal(fx0,fx1,x1,x2,x):
    r = fx0+(((fx1-fx0)/(x2-x1))*(x-x1))
    return r

def mistake(result,fxx):
    error=abs((fxx-result)/fxx)*100
    return error

def matriz(n,x_values,y_values):
    matrix=[]
    for i in range (n):
        row=[1]
        x=x_values[i]
        for j in range (1,n):
            row.append(x)
            x=x*x_values[i]
        y=y_values[i]
        row.append(y)
        matrix.append(row)
    return matrix

def gauss(n, matrix):
    for i in range(n):
        piv = matrix[i][i]
        if piv == 0:
            for k in range(i + 1, n):
                if matrix[k][i] != 0:
                    matrix[i], matrix[k] = matrix[k], matrix[i]  
                    piv = matrix[i][i]
                    break
        
            if piv == 0:
                raise ValueError("Error en la matriz")

        for j in range(n + 1):
            matrix[i][j] /= piv

   
        for k in range(n):
            if k != i:
                factor = matrix[k][i]
                for j in range(n + 1):
                    matrix[k][j] -= factor * matrix[i][j]

    result = [[round(matrix[i][j], 4) for j in range(n + 1)] for i in range(n)]
    return result

def interpolacion(vector,n,x_in):
    interp=vector[0]
    for i in range(n-1):
        interp+=(vector[i+1])*(x_in**(i+1))
    return interp

@app.route('/interLineal', methods=['GET', 'POST'])
def interLineal():
    result = None
    expresion = None
    error= None
    if request.method == 'POST':
        expresion = request.form.get('expresion')
        x0 = request.form.get('x0')
        x1 = request.form.get('x1')
        x_input = request.form.get('x_input')

        # Imprimir los valores recibidos
        print("Expresión recibida:", expresion)
        print("x0:", x0)
        print("x1:", x1)
        print("x_input:", x_input)
        x0=float(x0)
        x1=float(x1)
        x_input=float(x_input)
        # Asegúrate de que el campo de expresión esté presente
        x_sym = sp.symbols('x')
        if validate(expresion):
            fx = sp.sympify(expresion)
            print("Expresión validada:", fx)
            fx0=fx.subs(x_sym,x0)
            fx1=fx.subs(x_sym,x1)
            fxx=fx.subs(x_sym,x_input)
            result=lineal(fx0,fx1,x0,x1,x_input)
            error=mistake(result,fxx)
            result=round(result,4)
            error=round(error,4)
            print("El resultado es: ",result,"\nEl error es: ", error)
        else:
            return render_template('interlineal.html',p='Expresion invalida')
    
    return render_template('interlineal.html', expresion=expresion, result=result,error=error)

@app.route('/interUnico', methods=['GET', 'POST'])
def interUnico():
    result = None 
    n = None
    gaussR = None
    x_in = None
    x_values = []
    y_values = []
    matrix = []

    if request.method == 'POST':
        try:
            n = request.form.get('n')
            x_in = request.form.get('x')
            print(n)

            if n and x_in:
                n = int(n)  
                x_in = float(x_in)
                n += 1

                for i in range(n):
                    x_val = request.form.get(f'x_value{i}')
                    y_val = request.form.get(f'y_value{i}')
                    if x_val is not None and y_val is not None:
                        x_values.append(float(x_val))
                        y_values.append(float(y_val))

                print('Valores recibidos:')
                print('n:', n)
                print('Valores de x:', x_values)
                print('Valores de y:', y_values)

                matrix = matriz(n, x_values, y_values)
                for row in matrix:
                    print(row)

                gaussR = gauss(n, matrix)
                for row in gaussR:
                    print(row)

                vector = [gaussR[i][n] for i in range(n)]
                result = interpolacion(vector, n, x_in)
                print('\nP', n-1, '(', x_in, ') = ', result)

        except (ValueError, TypeError) as e:
            print("Error processing input:", e)
            result = "Error in input data. Please check your values."

    return render_template('interUnico.html', n=n, result=result, matrix=matrix, gaussR=gaussR, x_in=x_in)


@app.route('/', methods=['GET', 'POST'])
def index():
    opcion = None
    if request.method == 'POST':
        opcion = request.form.get('opcion')
        print(opcion)
    return render_template('index.html',opcion=opcion)
     
if __name__ =='__main__':
    app.run(debug=True)