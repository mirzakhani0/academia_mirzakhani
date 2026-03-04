# 🚀 GUÍA COMPLETA DE DESPLIEGUE EN VERCEL

## ✅ Lo que se ha implementado

### Reportes Funcionales en Tiempo Real
- ✅ **Estadísticas dinámicas** que se actualizan con Firebase
- ✅ **Ventas del mes** calculadas automáticamente
- ✅ **Total de estudiantes** activos
- ✅ **Cursos disponibles** con conteo real
- ✅ **Matrículas pendientes** de aprobación
- ✅ **Crecimiento mensual** comparado con el mes anterior
- ✅ **Tasa de retención** de estudiantes
- ✅ **Cursos más populares** con ranking en tiempo real
- ✅ **Gráfico de ventas** de los últimos 6 meses
- ✅ **Últimas matrículas** aprobadas con timestamps relativos

---

## 📋 Pasos para Desplegar en Vercel

### 1️⃣ Preparar el Repositorio en GitHub

```bash
# Navegar a la carpeta del proyecto
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"

# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Crear commit inicial
git commit -m "Deploy a Vercel - Reportes funcionales implementados"

# Crear rama principal
git branch -M main

# Crear repositorio en GitHub desde la terminal
# (Reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/academia-mirzakhani.git

# Subir el código
git push -u origin main
```

---

### 2️⃣ Configurar en Vercel

1. **Ir a Vercel**: https://vercel.com
2. **Iniciar sesión** con tu cuenta de GitHub
3. **Click en "New Project"**
4. **Importar el repositorio** `academia-mirzakhani`

#### Configuración del Proyecto:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Angular |
| **Root Directory** | `package` |
| **Build Command** | `ng build --configuration production` |
| **Output Directory** | `dist/Spike/browser` |
| **Install Command** | `npm install` |

5. **Click en "Deploy"**

---

### 3️⃣ Variables de Entorno (Opcional)

Las credenciales de Firebase ya están configuradas en `environment.prod.ts`, pero si prefieres usar variables de entorno en Vercel:

```
FIREBASE_API_KEY=AIzaSyA7sp5UVJKsbT9STGgPoNo91T1V59MKP5I
FIREBASE_AUTH_DOMAIN=academia-mirzakhani.firebaseapp.com
FIREBASE_PROJECT_ID=academia-mirzakhani
FIREBASE_STORAGE_BUCKET=academia-mirzakhani.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=715154984866
FIREBASE_APP_ID=1:715154984866:web:69a9cf8bc1eff1e4a4acfb
```

---

### 4️⃣ Verificar el Deploy

Una vez completado el deploy (aproximadamente 3-5 minutos), tu aplicación estará disponible en:

**URL de Producción:**
```
https://academia-mirzakhani.vercel.app
```

O el nombre personalizado que hayas elegido.

---

## 🔥 Configuración de Firebase Requerida

Antes de desplegar, verifica en Firebase Console:

### ✅ Authentication
- Email/Password habilitado
- Usuario admin creado: `admin@mirzakhani.com` / `admin2026`

### ✅ Firestore Database
- Reglas de seguridad publicadas
- Colecciones creadas:
  - `usuarios`
  - `cursos`
  - `solicitudes`
  - `contenidos`

### ✅ Storage
- Reglas de seguridad publicadas
- Buckets configurados

---

## 🧪 Probar Localmente Antes de Deploy

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"

# Instalar dependencias (si es necesario)
npm install

# Ejecutar en modo desarrollo
ng serve -o

# O crear build de producción local
ng build --configuration production
```

### Credenciales de Prueba:

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | `admin@mirzakhani.com` | `admin2026` |
| Estudiante 1 | `juan@email.com` | `123456782026` |
| Estudiante 2 | `maria@email.com` | `876543212026` |

---

## 📊 Características de los Reportes

### Estadísticas en Tiempo Real

1. **Ventas del Mes**
   - Calculado automáticamente de matrículas aprobadas
   - Comparación con el mes anterior
   - Porcentaje de crecimiento

2. **Estudiantes Activos**
   - Conteo único por email
   - Tasa de retención calculada

3. **Cursos Disponibles**
   - Total de cursos activos
   - Cursos con estudiantes matriculados

4. **Matrículas Pendientes**
   - Solicitudes por aprobar
   - Matrículas aprobadas hoy

5. **Cursos Populares**
   - Ranking top 5
   - Número de estudiantes por curso
   - Barras de progreso visuales

6. **Ventas por Mes**
   - Gráfico de últimos 6 meses
   - Barras proporcionales
   - Valores en dólares

7. **Últimas Matrículas**
   - Lista de aprobaciones recientes
   - Timestamps relativos ("Hace 2 h")
   - Información del estudiante y curso

---

## 🔄 Actualizaciones Automáticas

Los reportes se actualizan automáticamente cuando:

- ✅ Un estudiante se matricula en un curso
- ✅ El administrador aprueba una matrícula
- ✅ Se crea un nuevo curso
- ✅ Se registra un nuevo estudiante

**Para refrescar manualmente:** Click en el botón flotante naranja (esquina inferior derecha)

---

## 🐛 Solución de Problemas

### Error: "Build failed"

```bash
# Verificar versión de Node.js
node --version  # Debe ser >= 18.x

# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Cannot find module"

```bash
npm install
```

### Error: "404 Not Found" en Vercel

Verifica:
- `vercel.json` esté en la carpeta `package/`
- Output Directory: `dist/Spike/browser`
- Root Directory: `package`

### Error: Firebase no conecta

1. Verifica que Firebase Console esté accesible
2. Revisa las reglas de seguridad
3. Confirma que las credenciales en `environment.prod.ts` sean correctas

### Los reportes muestran 0 o datos vacíos

- Es normal la primera vez
- Registra algunos estudiantes y matrículas
- Los datos se actualizan al aprobar matrículas

---

## 📁 Estructura del Proyecto

```
package/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── admin/
│   │   │       └── reportes/
│   │   │           └── reportes.component.ts  ← ⭐ Reportes Funcionales
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── matriculas.service.ts
│   │   │   └── firestore.service.ts
│   │   └── guards/
│   │       └── auth.guard.ts
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
├── angular.json
├── vercel.json              ← Configuración Vercel
├── package.json
└── README.md
```

---

## ✅ Checklist Final

- [ ] Código subido a GitHub
- [ ] Repositorio conectado a Vercel
- [ ] Root Directory: `package`
- [ ] Build de producción exitoso
- [ ] Firebase configurado
- [ ] Usuario admin creado
- [ ] Firestore con reglas publicadas
- [ ] Deploy en Vercel completado
- [ ] URL de producción accesible
- [ ] Login probado en producción
- [ ] Reportes muestran datos reales

---

## 🔗 URLs Importantes

| Servicio | URL |
|----------|-----|
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Firebase Console** | https://console.firebase.google.com/ |
| **Documentación Vercel** | https://vercel.com/docs |
| **Documentación Angular** | https://angular.dev/ |

---

## 🎯 Próximos Pasos

1. **Personalizar dominio** en Vercel (opcional)
2. **Configurar CI/CD** para deploys automáticos
3. **Habilitar Analytics** de Vercel
4. **Monitorear rendimiento** con Vercel Analytics
5. **Agregar más funcionalidades** según necesidades

---

## 💡 Consejos

- ✅ Los cambios en GitHub se despliegan automáticamente en Vercel
- ✅ Usa `git commit -m "descripción"` para cada cambio
- ✅ Prueba localmente antes de subir a producción
- ✅ Mantén actualizadas las dependencias con `npm update`
- ✅ Revisa los logs en Vercel si hay errores

---

**¡Tu aplicación está lista para producción!** 🎉
