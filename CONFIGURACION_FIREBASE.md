# 🔥 Configuración de Firebase para Academia MIRZAKHANI

## ✅ Configuración Completada en el Código

Los siguientes archivos ya están configurados con Firebase:

1. **Environments**
   - `src/environments/environment.ts` - Desarrollo
   - `src/environments/environment.prod.ts` - Producción

2. **Servicios**
   - `src/app/services/auth.service.ts` - Autenticación con Firebase Auth
   - `src/app/services/firestore.service.ts` - Base de datos Firestore

3. **Configuración**
   - `src/app/app.config.ts` - Configuración de AngularFire

4. **Reglas de Seguridad**
   - `firestore.rules` - Reglas para Firestore
   - `firebase.storage.rules` - Reglas para Storage

5. **Vercel**
   - `vercel.json` - Configuración de rutas

---

## 📋 PASOS PARA CONFIGURAR FIREBASE CONSOLE

### 1. Ve a Firebase Console
https://console.firebase.google.com/

### 2. Selecciona tu proyecto: `academia-mirzakhani`

### 3. Habilitar Authentication

1. Ve a **Authentication** en el menú izquierdo
2. Click en **Get Started**
3. En la pestaña **Sign-in method**:
   - Habilita **Email/Password**
   - Click en **Save**

### 4. Crear Usuario Admin

1. Ve a **Authentication** → **Users**
2. Click en **Add user**
3. Ingresa:
   - **Email**: `admin@mirzakhani.com`
   - **Password**: `admin2026`
4. Click en **Add user**

### 5. Configurar Firestore Database

1. Ve a **Firestore Database**
2. Click en **Create database**
3. Selecciona **Start in test mode** (luego actualizaremos las reglas)
4. Elige una ubicación (recomendado: `us-central` o `southamerica-east1`)
5. Click en **Enable**

### 6. Aplicar Reglas de Seguridad

1. En **Firestore Database**, ve a la pestaña **Rules**
2. Copia y pega el contenido de `firestore.rules`
3. Click en **Publish**

### 7. Configurar Storage (para PDFs y archivos)

1. Ve a **Storage** en el menú izquierdo
2. Click en **Get Started**
3. Click en **Next** (ubicación por defecto)
4. Click en **Done**
5. Ve a la pestaña **Rules**
6. Copia y pega el contenido de `firebase.storage.rules`
7. Click en **Publish**

### 8. Agregar Datos Iniciales a Firestore

Ve a **Firestore Database** → **Start collection** y crea:

#### Colección: `cursos`

**Documento 1:**
```
ID: 1
nombre: "Álgebra Lineal: Dominio Total"
descripcion: "De matrices a espacios vectoriales. Incluye 20 horas de video."
precio: 45
categoria: "Matemáticas"
activo: true (boolean)
icono: "functions"
gradiente: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)"
tipo: "CLASE GRABADA"
```

**Documento 2:**
```
ID: 2
nombre: "Pack: Cálculo Diferencial"
descripcion: "La guía definitiva en PDF con 200 ejercicios resueltos"
precio: 25
categoria: "Matemáticas"
activo: true (boolean)
icono: "description"
gradiente: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)"
tipo: "MATERIAL PDF"
```

**Documento 3:**
```
ID: 3
nombre: "Física I: Mecánica y Estática"
descripcion: "Domina los diagramas de cuerpo libre y las leyes de Newton"
precio: 39
categoria: "Física"
activo: true (boolean)
icono: "rocket_launch"
gradiente: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
tipo: "CLASE GRABADA"
```

#### Colección: `usuarios`

**Documento: admin**
```
ID: admin (o el UID del usuario admin creado en Authentication)
uid: admin
nombre: "Administrador"
email: "admin@mirzakhani.com"
dni: "00000000"
telefono: "+51 999 999 999"
rol: "admin"
activo: true (boolean)
cursosMatriculados: [] (array)
fechaRegistro: [fecha actual en ISO]
```

---

## 🚀 DEPLOY A VERCEL

### 1. Subir a GitHub

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"

# Inicializar git
git init
git add .
git commit -m "Initial commit - Firebase integration"

# Crear repositorio en GitHub y seguir instrucciones
git branch -M main
git remote add origin https://github.com/TU_USUARIO/academia-mirzakhani.git
git push -u origin main
```

### 2. Conectar Vercel

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en **New Project**
4. Importa tu repositorio `academia-mirzakhani`
5. En **Build and Output Settings**:
   - **Framework Preset**: Angular
   - **Root Directory**: `package` (importante!)
   - **Build Command**: `ng build --configuration production`
   - **Output Directory**: `dist/spike/browser`
6. Click en **Deploy**

### 3. Variables de Environment en Vercel (opcional)

Si quieres usar variables de environment en Vercel:

1. Ve a **Settings** → **Environment Variables**
2. Agrega las mismas credenciales de Firebase:

```
FIREBASE_API_KEY=AIzaSyA7sp5UVJKsbT9STGgPoNo91T1V59MKP5I
FIREBASE_AUTH_DOMAIN=academia-mirzakhani.firebaseapp.com
FIREBASE_PROJECT_ID=academia-mirzakhani
FIREBASE_STORAGE_BUCKET=academia-mirzakhani.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=715154984866
FIREBASE_APP_ID=1:715154984866:web:69a9cf8bc1eff1e4a4acfb
```

**Nota**: Actualmente las credenciales están hardcodeadas en `environment.prod.ts`, lo cual funciona para Firebase ya que son credenciales públicas.

---

## 🔒 IMPORTANTE: Seguridad en Producción

### Lo que está configurado:

✅ **Authentication**: Email/Password habilitado
✅ **Firestore Rules**: Solo usuarios autenticados pueden acceder
✅ **Storage Rules**: Archivos protegidos por rol
✅ **Admin Guard**: Rutas de admin protegidas

### Credenciales de Acceso:

**Admin:**
- Email: `admin@mirzakhani.com`
- Password: `admin2026`

**Estudiante de prueba (crear en Firebase Console):**
- Email: `juan@email.com`
- Password: `123456782026`

---

## 🧪 PROBAR LOCALMENTE

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"
ng serve -o
```

La aplicación se abrirá en: http://localhost:4200

### URLs para probar:

- **Login**: http://localhost:4200/authentication/login
- **Registro**: http://localhost:4200/registro
- **Cursos Públicos**: http://localhost:4200/cursos-public
- **Dashboard Admin**: http://localhost:4200/admin/dashboard
- **Dashboard Estudiante**: http://localhost:4200/estudiante/dashboard

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Firebase: Error (auth/invalid-credential)"
- Verifica que Email/Password esté habilitado en Firebase Authentication
- Verifica que el usuario exista en Firebase Console

### Error: "Firebase: Error (firestore/permission-denied)"
- Verifica que las reglas de Firestore estén publicadas
- Verifica que el usuario esté autenticado

### Error: "Cannot GET /ruta"
- Verifica que `vercel.json` esté en la raíz del proyecto
- Verifica que el Build Output Directory sea correcto

### Error de compilación
```bash
npm install
ng build
```

---

## 📞 URLs ÚTILES

- **Firebase Console**: https://console.firebase.google.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentación Firebase**: https://firebase.google.com/docs

---

## ✅ CHECKLIST FINAL

- [ ] Authentication habilitado (Email/Password)
- [ ] Usuario admin creado (`admin@mirzakhani.com`)
- [ ] Firestore Database creado
- [ ] Reglas de Firestore publicadas
- [ ] Storage bucket creado
- [ ] Reglas de Storage publicadas
- [ ] Colección `cursos` con datos
- [ ] Colección `usuarios` con admin
- [ ] Repositorio GitHub creado
- [ ] Proyecto Vercel conectado
- [ ] Deploy exitoso

---

## 🎉 ¡LISTO!

Tu aplicación está configurada con Firebase Auth y Firestore. El login ahora persistirá entre recargas y funcionará correctamente en Vercel.
