# 🚀 Deploy a Vercel - Academia MIRZAKHANI

## Configuración Automática en Vercel

Vercel detectará automáticamente que es un proyecto Angular. Sin embargo, necesitas configurar lo siguiente:

### 1. Root Directory

Cuando importes el repositorio en Vercel, configura:

- **Root Directory**: `package`

Esto es importante porque el proyecto Angular está dentro de la carpeta `package`.

### 2. Build Settings

- **Framework Preset**: Angular
- **Build Command**: `ng build --configuration production`
- **Output Directory**: `dist/Spike/browser`
- **Install Command**: `npm install`

### 3. Environment Variables (Opcional)

Las credenciales de Firebase ya están en `environment.prod.ts`, pero si quieres usar variables de environment:

```
FIREBASE_API_KEY=AIzaSyA7sp5UVJKsbT9STGgPoNo91T1V59MKP5I
FIREBASE_AUTH_DOMAIN=academia-mirzakhani.firebaseapp.com
FIREBASE_PROJECT_ID=academia-mirzakhani
FIREBASE_STORAGE_BUCKET=academia-mirzakhani.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=715154984866
FIREBASE_APP_ID=1:715154984866:web:69a9cf8bc1eff1e4a4acfb
```

---

## Pasos para Deploy

### 1. Subir a GitHub

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"

# Inicializar git
git init
git add .
git commit -m "Initial commit - Firebase Auth integration"

# Crear repositorio en GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/academia-mirzakhani.git
git push -u origin main
```

### 2. Conectar Vercel

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en **New Project**
4. Selecciona tu repositorio `academia-mirzakhani`
5. Configura:
   - **Root Directory**: `package`
   - **Framework**: Angular
   - **Build Command**: `ng build --configuration production`
   - **Output Directory**: `dist/Spike/browser`
6. Click en **Deploy**

### 3. Verificar Deploy

Una vez completado el deploy, tu aplicación estará disponible en:
- `https://academia-mirzakhani.vercel.app` (o el nombre que elijas)

---

## 🔥 Configuración de Firebase Requerida

Antes de deployar, asegúrate de haber configurado Firebase Console:

1. **Authentication**: Email/Password habilitado
2. **Usuario Admin**: `admin@mirzakhani.com` / `admin2026`
3. **Firestore Database**: Creado con reglas publicadas
4. **Storage**: Creado con reglas publicadas
5. **Colecciones**: `cursos`, `usuarios`, `solicitudes`, `contenidos`

Ver `CONFIGURACION_FIREBASE.md` para más detalles.

---

## 🧪 Probar Localmente Antes de Deploy

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"
npm install
ng serve -o
```

Prueba el login con:
- **Admin**: `admin@mirzakhani.com` / `admin2026`

---

## 🐛 Solución de Problemas

### Error: "Build failed"

Verifica que estás usando la versión correcta de Node.js:
```bash
node --version  # Debe ser >= 18.x
npm --version   # Debe ser >= 9.x
```

### Error: "Cannot find module"

Ejecuta:
```bash
npm install
```

### Error: "404 Not Found" en Vercel

Verifica que:
- `vercel.json` esté en la raíz del proyecto (`package/`)
- El **Output Directory** sea `dist/Spike/browser`

### Error: "Firebase: Error (auth/invalid-credential)"

Verifica en Firebase Console:
- Authentication esté habilitado
- Email/Password esté activado
- El usuario exista

---

## 📁 Estructura del Proyecto

```
package/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Firebase Auth
│   │   │   └── firestore.service.ts  # Firestore
│   │   ├── guards/
│   │   │   └── auth.guard.ts         # Guards con Firebase
│   │   └── pages/
│   │       ├── authentication/
│   │       │   └── login/
│   │       │       └── login.component.ts
│   │       └── public/
│   │           └── registro/
│   │               └── registro.component.ts
│   └── environments/
│       ├── environment.ts            # Dev
│       └── environment.prod.ts       # Prod
├── angular.json
├── vercel.json                       # Config Vercel
├── firestore.rules                   # Reglas Firestore
├── firebase.storage.rules            # Reglas Storage
└── package.json
```

---

## ✅ Checklist

- [ ] Firebase Console configurado
- [ ] Authentication habilitado
- [ ] Usuario admin creado
- [ ] Firestore Database creado
- [ ] Reglas de seguridad publicadas
- [ ] Repositorio GitHub creado
- [ ] Vercel conectado
- [ ] Deploy exitoso
- [ ] Login probado en producción

---

## 🔗 URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Firebase Console**: https://console.firebase.google.com/
- **Documentación Vercel Angular**: https://vercel.com/docs/frameworks/angular
