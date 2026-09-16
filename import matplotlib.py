import sympy as sp

# Define the variables
x, y, z = sp.symbols('x y z')

# Define the function
f = x**3 + 2*x*y*z - y**2*z
# Compute partial derivatives
fx = sp.diff(f, x)
fy = sp.diff(f, y)
fz = sp.diff(f, z)  # Additional derivative with respect to z
fxx = sp.diff(fx, x)
fyy = sp.diff(fy, y)
fzz = sp.diff(fz, z)
fxy = sp.diff(fx, y)
fxz = sp.diff(fx, z)
fyz = sp.diff(fy, z)
# Print the results
print("f(x, y, z) =", f)
print("f_x =", fx)
print("f_y =", fy)
print("f_z =", fz)
print("f_{xx} =", fxx)
print("f_{yy} =", fyy)
print("f_{zz} =", fzz)
print("f_{xy} =", fxy)
print("f_{xz} =", fxz)
print("f_{yz} =", fyz)