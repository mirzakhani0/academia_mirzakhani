# 🔥 Reconfiguración de Firebase Console - Academia MIRZAKHANI

## ✅ PASOS PARA RECONFIGURAR FIREBASE (5 minutos)

### 1. Abrir Firebase Console
Ve a: **https://console.firebase.google.com/**

Inicia sesión con tu cuenta de Google y selecciona el proyecto: **`academia-mirzakhani`**

---

### 2. Verificar/Habilitar Authentication

1. En el menú izquierdo, click en **Authentication**
2. Click en la pestaña **Sign-in method**

**Verifica que Email/Password esté HABILITADO:**
- Si está deshabilitado (gris), haz click en él
- Activa el interruptor **Enable**
- Click en **Save**

**Debe verse así:**
```
✅ Email/Password - Enabled
```

---

### 3. Crear/Verificar Usuario Admin

1. En **Authentication**, ve a la pestaña **Users**
2. Busca el usuario: `admin@mirzakhani.com`

**Si YA EXISTE:**
- ✅ Perfecto, no necesitas hacer nada
- La contraseña es: `admin2026`

**Si NO EXISTE o quieres resetearlo:**

**Opción A - Crear desde Firebase Console:**
1. Click en **Add user**
2. Email: `admin@mirzakhani.com`
3. Password: `admin2026`
4. Click en **Add user**

**Opción B - Si ya existe y quieres cambiar la contraseña:**
1. Click en los 3 puntos verticales (⋮) al lado del usuario
2. Selecciona **Reset password**
3. Ingresa: `admin2026`
4. Click en **Save**

---

### 4. Verificar Firestore Database

1. En el menú izquierdo, click en **Firestore Database**

**Si YA EXISTE la base de datos:**
- ✅ Verifica que esté en modo **Production** o **Test mode**
- No necesitas cambiar nada si ya funcionaba antes

**Si NO EXISTE o quieres recrearla:**

1. Click en **Create database**
2. Selecciona **Start in production mode** (recomendado) o **Test mode**
3. Elige ubicación: **southamerica-east1 (Santiago)** o **us-central1 (Iowa)**
4. Click en **Enable**

---

### 5. Publicar Reglas de Seguridad de Firestore

1. En **Firestore Database**, ve a la pestaña **Rules**

2. **Borra todo el contenido actual**

3. **Copia y pega** las siguientes reglas:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función auxiliar para verificar si el usuario está autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función para verificar si el usuario es admin
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin';
    }
    
    // ===== USUARIOS =====
    match /usuarios/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow delete: if isAdmin();
    }
    
    // ===== CURSOS =====
    match /cursos/{cursoId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin();
    }
    
    // ===== SOLICITUDES =====
    match /solicitudes/{solicitudId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }
    
    // ===== CONTENIDOS =====
    match /contenidos/{contenidoId} {
      allow read, create, update, delete: if isAdmin();
    }
  }
}
```

4. Click en **Publish** (botón azul arriba a la derecha)

**Debe aparecer:** ✅ Rules published successfully

---

### 6. Verificar/Configurar Storage (Opcional - para PDFs)

**Si NO vas a subir PDFs todavía, puedes saltar este paso.**

1. En el menú izquierdo, click en **Storage**
2. Click en **Get started** (si es la primera vez)
3. Click en **Next** (ubicación por defecto)
4. Click en **Done**
5. Ve a la pestaña **Rules**
6. Reemplaza con:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

7. Click en **Publish**

---

### 7. Agregar Datos Iniciales (Recomendado)

**Esto es para que puedas probar la aplicación inmediatamente:**

1. En **Firestore Database**, ve a la pestaña **Data**

2. **Crear colección `cursos`:**
   - Click en **Start collection**
   - Collection ID: `cursos`
   - Click en **Next**

   **Documento 1:**
   - Document ID: `1`
   - Fields:
     ```
     nombre: "Álgebra Lineal: Dominio Total"
     descripcion: "De matrices a espacios vectoriales"
     precio: 45 (number)
     categoria: "Matemáticas"
     activo: true (boolean)
     ```
   - Click en **Save**

   **Documento 2:**
   - Click en **Add document**
   - Document ID: `2`
   - Fields:
     ```
     nombre: "Pack: Cálculo Diferencial"
     descripcion: "Guía PDF con 200 ejercicios"
     precio: 25 (number)
     categoria: "Matemáticas"
     activo: true (boolean)
     ```
   - Click en **Save**

   **Documento 3:**
   - Click en **Add document**
   - Document ID: `3`
   - Fields:
     ```
     nombre: "Física I: Mecánica y Estática"
     descripcion: "Domina diagramas de cuerpo libre"
     precio: 39 (number)
     categoria: "Física"
     activo: true (boolean)
     ```
   - Click en **Save**

3. **Crear colección `usuarios`:**
   - Click en **Start collection**
   - Collection ID: `usuarios`
   - Click en **Next**

   **Documento Admin:**
   - Document ID: `admin` (o el UID del usuario admin)
   - Fields:
     ```
     nombre: "Administrador"
     email: "admin@mirzakhani.com"
     dni: "00000000"
     telefono: "+51 999 999 999"
     rol: "admin"
     activo: true (boolean)
     cursosMatriculados: [] (array)
     fechaRegistro: [fecha actual en formato ISO, ej: "2026-03-04T00:00:00.000Z"]
     ```
   - Click en **Save**

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada ítem una vez completado:

- [ ] Authentication → Sign-in method → Email/Password: **Enabled** ✅
- [ ] Authentication → Users → `admin@mirzakhani.com`: **Existe** ✅
- [ ] Firestore Database: **Creada** ✅
- [ ] Firestore Rules: **Publicadas** ✅
- [ ] Colección `cursos`: **3 documentos creados** ✅
- [ ] Colección `usuarios`: **Admin creado** ✅

---

## 🧪 PROBAR QUE FUNCIONA

### Test 1: Verificar Authentication

1. Ve a **Authentication** → **Users**
2. Deberías ver al menos 1 usuario: `admin@mirzakhani.com`

### Test 2: Verificar Firestore

1. Ve a **Firestore Database** → **Data**
2. Deberías ver:
   - Colección `cursos` con 3 documentos
   - Colección `usuarios` con 1 documento (admin)

### Test 3: Probar Login Localmente

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"
ng serve -o
```

En el navegador:
1. Ve a: http://localhost:4200/authentication/login
2. Login con:
   - Email: `admin@mirzakhani.com`
   - Password: `admin2026`
3. **Debe redirigirte al dashboard de admin** ✅

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Firebase: Error (auth/invalid-credential)"

**Causa:** El usuario no existe o la contraseña es incorrecta

**Solución:**
1. Ve a **Authentication** → **Users**
2. Verifica que `admin@mirzakhani.com` exista
3. Si existe, haz **Reset password** y pon `admin2026`

### Error: "Firebase: Error (firestore/permission-denied)"

**Causa:** Las reglas de Firestore no están publicadas o son incorrectas

**Solución:**
1. Ve a **Firestore Database** → **Rules**
2. Copia y pega las reglas de arriba
3. Click en **Publish**

### Error: "No existe la base de datos"

**Causa:** Firestore no está creado

**Solución:**
1. Ve a **Firestore Database**
2. Click en **Create database**
3. Sigue los pasos del punto 4

---

## 📞 URLs Directas

- **Firebase Console:** https://console.firebase.google.com/
- **Authentication:** https://console.firebase.google.com/project/academia-mirzakhani/authentication
- **Firestore:** https://console.firebase.google.com/project/academia-mirzakhani/firestore
- **Storage:** https://console.firebase.google.com/project/academia-mirzakhani/storage

---

## ✅ ¿LISTO?

Una vez completada la reconfiguración:

1. **Prueba localmente:** `ng serve -o`
2. **Login:** `admin@mirzakhani.com` / `admin2026`
3. **Si funciona:** ¡Listo para deploy a Vercel!

¿Necesitas ayuda con algún paso en particular?
