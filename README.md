API de Gestión de Comidas
¡Bienvenido a la API de Gestión de Comidas! Esta API te permite gestionar información relacionada con diferentes tipos de comidas, como su nombre, tipo, ingredientes, precio, descripción y origen. A continuación, te explico cómo puedes comenzar a utilizarla:

Uso
La API está desplegada en la nube en Render y puedes acceder a ella a través del siguiente URL base:
https://api-project-ugvk.onrender.com
Tomemos en cuenta que solamente es la parte Backend, así que tendremos que hacer uso de algún software
como Postman para comprobar su usabilidad.

Endpoints Disponibles
A continuación, te detallo los endpoints disponibles y cómo puedes interactuar con ellos:

GET /api/comidas
Este endpoint te permite obtener todas las comidas almacenadas en la base de datos.
Ejemplo de Solicitud:
GET - https://api-project-ugvk.onrender.com/api/comidas/

Respuesta Exitosa:
[
  {
    "_id": "id_de_la_comida",
    "nombre": "Nombre de la Comida",
    "tipo": "Tipo de Comida",
    "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
    "precio": 10.99,
    "descripcion": "Descripción de la Comida",
    "origen": "Origen de la Comida"
  },
  // Otras comidas
]

Respuesta de Error:
{
  "message": "No se encontraron comidas"
}
O:

POST /api/comidas
Este endpoint te permite crear una nueva comida.
POST - https://api-project-ugvk.onrender.com/api/comidas/
Ejemplo de Solicitud:
{
  "nombre": "Nueva Comida",
  "tipo": "Tipo de Comida",
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "precio": 15.99,
  "descripcion": "Descripción de la Nueva Comida",
  "origen": "Origen de la Nueva Comida"
}

Respuesta Exitosa:
{
  "_id": "id_de_la_nueva_comida",
  "nombre": "Nueva Comida",
  "tipo": "Tipo de Comida",
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "precio": 15.99,
  "descripcion": "Descripción de la Nueva Comida",
  "origen": "Origen de la Nueva Comida"
}

Respuesta de Error:
{
  "message": "Error al crear la comida"
}

GET /api/comidas/
Este endpoint te permite obtener una comida específica por su ID.
Ejemplo de Solicitud:
GET - https://api-project-ugvk.onrender.com/api/comidas/nombre_de_la_comida

Respuesta Exitosa:
{
  "_id": "id_de_la_comida",
  "nombre": "Nombre de la Comida",
  "tipo": "Tipo de Comida",
  "ingredientes": ["Ingrediente 1", "Ingrediente 2"],
  "precio": 10.99,
  "descripcion": "Descripción de la Comida",
  "origen": "Origen de la Comida"
}

Respuesta de Error:
{
  "message": "Comida no encontrada"
}

Ruta para editar comida por nombre:
PUT - https://api-project-ugvk.onrender.com/api/comidas/:nombre

Ruta para eliminar comida por nombre:
DELETE - https://api-project-ugvk.onrender.com/api/comidas/:nombre

# Buscar por nombre
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?nombre=NombreDeLaComida

# Buscar por tipo
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?tipo=TipoDeComida

# Buscar por ingredientes
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?ingredientes=Ingrediente1,Ingrediente2

# Buscar por precio
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?precio=PrecioDeLaComida

# Buscar por descripción
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?descripcion=DescripcionDeLaComida

# Buscar por origen
GET https://api-project-ugvk.onrender.com/api/comidas/buscar?origen=OrigenDeLaComida



Autenticación
La API utiliza JSON Web Tokens (JWT) para la autenticación. Para realizar operaciones protegidas, incluye el token JWT en el encabezado Authorization.

POST /api/auth/login
Este endpoint te permite registrarte e iniciar sesión y obtener un token JWT.
Ejemplo de Solicitud:
Ruta para registro:
POST - https://api-project-ugvk.onrender.com/api/auth/register
Ruta para loggearse:
POST - https://api-project-ugvk.onrender.com/api/auth/login

{
  "username": "tu_usuario",
  "password": "tu_contraseña"
}

Al loggearse te arrojará un token que usarás para poder acceder a las rutas:
Respuesta Exitosa:
{
  "token": "tu_token_jwt"
}

Respuesta de error:
{
  "message": "Credenciales incorrectas"
}

Asegúrate de utilizar adecuadamente los tokens JWT para las operaciones que requieren autenticación.
