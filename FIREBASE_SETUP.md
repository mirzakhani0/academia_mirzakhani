# 🚀 Guía de Configuración - Academia MIRZAKHANI

## ✅ Configuración Completada

### Archivos Creados:

1. **Environments**
   - `src/environments/environment.ts` - Configuración Firebase (desarrollo)
   - `src/environments/environment.prod.ts` - Configuración Firebase (producción)

2. **Servicios Firebase**
   - `src/app/services/firebase-auth.service.ts` - Autenticación
   - `src/app/services/firestore.service.ts` - Base de datos

3. **Configuración**
   - `src/app/app.config.ts` - Configuración principal con Firebase

---

## 📋 PASOS SIGUIENTES

### 1. Instalar Dependencias (si no se completó)

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"
npm install firebase @angular/fire@18.0.0 --save
```

### 2. Ejecutar la Aplicación

```bash
ng serve -o
```

La aplicación se abrirá en: http://localhost:4200

---

## 🔥 FIREBASE - PRÓXIMOS PASOS

### En la Consola de Firebase:

1. **Crear Colecciones:**
   - Ve a Firestore Database
   - Click en "Comenzar colección"
   - Crea las colecciones: `cursos`, `usuarios`, `solicitudes`, `contenidos`

2. **Crear Usuario Admin:**
   - Ve a Authentication
   - Click en "Add user"
   - Email: `admin@mirzakhani.com`
   - Contraseña: `admin2026`

3. **Agregar Datos de Ejemplo:**
   - En Firestore, ve a la colección `cursos`
   - Click en "Agregar documento"
   - Agrega estos campos:
     ```
     nombre: "Álgebra Lineal: Dominio Total"
     descripcion: "De matrices a espacios vectoriales"
     precio: 45
     categoria: "Matemáticas"
     activo: true
     ```

---

## 🌐 DEPLOY A VERCEL (Cuando estés listo)

### 1. Subir a GitHub

```bash
# Inicializar git
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub y seguir instrucciones
git remote add origin https://github.com/TU_USUARIO/academia-mirzakhani.git
git push -u origin main
```

### 2. Conectar Vercel

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona tu repositorio
5. Click en "Deploy"

### 3. Configurar Variables de Environment en Vercel

En Vercel, ve a Settings → Environment Variables y agrega:

```
FIREBASE_API_KEY=AIzaSyA7sp5UVJKsbT9STGgPoNo91T1V59MKP5I
FIREBASE_AUTH_DOMAIN=academia-mirzakhani.firebaseapp.com
FIREBASE_PROJECT_ID=academia-mirzakhani
FIREBASE_STORAGE_BUCKET=academia-mirzakhani.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=715154984866
FIREBASE_APP_ID=1:715154984866:web:69a9cf8bc1eff1e4a4acfb
```

---

## 🎯 URLs DE LA APLICACIÓN

### Local:
- Inicio: http://localhost:4200/inicio
- Cursos: http://localhost:4200/cursos-public
- Login: http://localhost:4200/authentication/login
- Admin Dashboard: http://localhost:4200/admin/dashboard
- Admin Matrículas: http://localhost:4200/admin/matriculas

### Producción (después de deploy):
- https://academia-mirzakhani.vercel.app

---

## 📞 SOPORTE

Si tienes problemas:

1. **Error de Firebase:** Verifica que las credenciales en `environment.ts` sean correctas
2. **Error de compilación:** Ejecuta `npm install` nuevamente
3. **Error de Firebase Auth:** Verifica que Email/Password esté habilitado en Firebase Console

---

## 🎉 ¡LISTO!

Tu aplicación está configurada con Firebase y lista para usar.

**Próximas funcionalidades a implementar:**
- [ ] Migrar datos de ejemplo a Firestore
- [ ] Actualizar componentes para usar servicios de Firebase
- [ ] Implementar subida de PDFs a Firebase Storage
- [ ] Deploy a Vercel
