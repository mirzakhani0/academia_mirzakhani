# 🚀 Script para Migrar Datos a Firebase

## **PASO 1: Instalar Firebase Tools**

En tu terminal, ejecuta:

```bash
npm install -g firebase-tools
```

---

## **PASO 2: Iniciar Sesión en Firebase**

```bash
firebase login
```

Se abrirá tu navegador para autorizar.

---

## **PASO 3: Inicializar Firebase en tu Proyecto**

```bash
cd "C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package"
firebase init
```

**Selecciona:**
- ✅ Firestore
- ✅ Hosting (opcional)

**Configuración:**
- **Project:** `academia-mirzakhani` (usa el existente)
- **Firestore rules:** `firestore.rules` (déjalo por defecto)
- **Firestore indexes:** `firestore.indexes.json`

---

## **PASO 4: Crear Script de Migración**

Crea un archivo llamado `migrate-to-firebase.js` en la raíz del proyecto:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const dbData = require('./db.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateData() {
  try {
    // Migrar cursos
    console.log('Migrando cursos...');
    const cursosBatch = db.batch();
    dbData.cursos.forEach(curso => {
      const docRef = db.collection('cursos').doc(curso.id.toString());
      cursosBatch.set(docRef, curso);
    });
    await cursosBatch.commit();
    console.log('✅ Cursos migrados');

    // Migrar usuarios
    console.log('Migrando usuarios...');
    const usuariosBatch = db.batch();
    dbData.usuarios.forEach(usuario => {
      const docRef = db.collection('usuarios').doc(usuario.id);
      usuariosBatch.set(docRef, usuario);
    });
    await usuariosBatch.commit();
    console.log('✅ Usuarios migrados');

    // Migrar solicitudes
    console.log('Migrando solicitudes...');
    const solicitudesBatch = db.batch();
    dbData.solicitudes.forEach(solicitud => {
      const docRef = db.collection('solicitudes').doc(solicitud.id);
      solicitudesBatch.set(docRef, solicitud);
    });
    await solicitudesBatch.commit();
    console.log('✅ Solicitudes migradas');

    // Migrar contenidos
    console.log('Migrando contenidos...');
    const contenidosBatch = db.batch();
    dbData.contenidos.forEach(contenido => {
      const docRef = db.collection('contenidos').doc(contenido.id);
      contenidosBatch.set(docRef, contenido);
    });
    await contenidosBatch.commit();
    console.log('✅ Contenidos migrados');

    console.log('\n🎉 ¡Migración completada exitosamente!');
  } catch (error) {
    console.error('❌ Error en la migración:', error);
  }
}

migrateData();
```

---

## **PASO 5: Obtener Service Account Key**

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto `academia-mirzakhani`
3. Click en el engranaje ⚙️ → **Project settings**
4. Pestaña **"Service accounts"**
5. Click en **"Generate new private key"**
6. Guarda el archivo como `serviceAccountKey.json` en la carpeta `package`

---

## **PASO 6: Ejecutar Migración**

```bash
node migrate-to-firebase.js
```

Verás:
```
Migrando cursos...
✅ Cursos migrados
Migrando usuarios...
✅ Usuarios migrados
Migrando solicitudes...
✅ Solicitudes migradas
Migrando contenidos...
✅ Contenidos migrados

🎉 ¡Migración completada exitosamente!
```

---

## **PASO 7: Verificar en Firebase Console**

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto
3. Click en **"Firestore Database"**
4. Verás las colecciones:
   - ✅ `cursos`
   - ✅ `usuarios`
   - ✅ `solicitudes`
   - ✅ `contenidos`

---

## 📋 **CHECKLIST:**

- [ ] Firebase Tools instalado
- [ ] Firebase login completado
- [ ] Firebase init realizado
- [ ] serviceAccountKey.json obtenido
- [ ] Script de migración ejecutado
- [ ] Datos verificados en Firebase Console

---

## 📢 **CUANDO TERMINES:**

Responde **"LISTO"** y continuamos con el deploy a Vercel.

**¿Alguna duda?** 🚀
