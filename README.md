# viveverde – e-commerce react

Sitio de e-commerce con react + vite. catálogo y detalle desde firestore, carrito global con context y checkout que genera un **pedido** en firestore y muestra el **id de pedido** al usuario.

## funcionalidades

- listado de productos y detalle por id desde firestore  
- categorías con filtro en `/categoria/interior` y `/categoria/exterior`  
- carrito global con context para agregar, quitar, vaciar, subtotales, total y contador en el header  
- itemcount con validaciones y oculto tras agregar al carrito  
- checkout con validaciones de formulario y creación de **pedido** en firestore  
- mensajes condicionales para cargando, sin stock y carrito vacío  
- persistencia del carrito en `localStorage` para sobrevivir recargas  
- navegación spa con react router sin recargas del navegador

## stack

- react  
- vite  
- firebase firestore  
- css

## variables de entorno

creá un archivo `.env` en la raíz con estas claves:

VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

## cómo ejecutar

- `npm install`  
- `npm run dev` para desarrollo  
- `npm run build` para producción  
- `npm run preview` para previsualizar el build

## estructura principal

src/
components/
NavBar/
NavBar.jsx
NavBar.css
CartWidget/
CartWidget.jsx
CartWidget.css
ItemListContainer/
ItemListContainer.jsx
ItemList/
ItemList.jsx
ItemList.css
Item/
Item.jsx
Item.css
ItemDetailContainer/
ItemDetailContainer.jsx
ItemDetail/
ItemDetail.jsx
ItemDetail.css
ItemCount/
ItemCount.jsx
Cart/
Cart.jsx
Cart.css
CartItem/
CartItem.jsx
CartItem.css
CheckoutForm/
CheckoutForm.jsx
CheckoutForm.css
Home/
Home.jsx
Home.css
JsonPlaceHolder/
GanadoresSorteo.jsx
context/
CartContext.jsx
services/
firebase.js
App.jsx
App.css
main.jsx
## firestore

- colección `products` con campos `nombre`, `precio`, `imagen`, `stock`, `categoria`, `descripcion`  
- colección `orders` donde se guardan los **pedidos** al confirmar el checkout

## notas
 
- el carrito se mantiene entre recargas gracias a `localStorage`  
- el checkout valida nombre, emails coincidentes, formato de email y teléfono con al menos 11 dígitos  
- se muestra el **id de pedido** al finalizar
