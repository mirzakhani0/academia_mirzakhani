# 🚀 Guía de Uso - Academia MIRZAKHANI

## ✅ Configuración Completada

Tu aplicación ahora tiene:
- ✅ Base de datos local con JSON Server
- ✅ Servicios de API configurados
- ✅ HttpClient configurado
- ✅ Datos de ejemplo incluidos

---

## 🎯 CÓMO EJECUTAR LA APLICACIÓN

### **Opción 1: Solo la App Angular**

```bash
npm start
```

La app abrirá en: http://localhost:4200

---

### **Opción 2: App + Base de Datos (RECOMENDADO)**

```bash
npm run start:all
```

Esto ejecuta:
- **Angular** en: http://localhost:4200
- **JSON Server** en: http://localhost:3000

---

### **Opción 3: Servidores por Separado**

**Terminal 1 - Angular:**
```bash
npm start
```

**Terminal 2 - JSON Server:**
```bash
npm run server
```

---

## 📊 BASE DE DATOS

El archivo `db.json` contiene:

### **Colecciones:**

1. **cursos** - Todos los cursos disponibles
2. **usuarios** - Admin y estudiantes
3. **solicitudes** - Solicitudes de inscripción
4. **contenidos** - PDFs y videos de cada curso

---

## 🔐 USUARIOS DE PRUEBA

### **Admin:**
- Email: `admin@mirzakhani.com`
- Contraseña: `admin2026`
- URL: http://localhost:4200/admin/dashboard

### **Estudiante 1:**
- Email: `juan@email.com`
- Contraseña: `123456782026`
- Cursos: Álgebra Lineal (ID: 1)

### **Estudiante 2:**
- Email: `maria@email.com`
- Contraseña: `876543212026`
- Cursos: Cálculo (ID: 2), Física (ID: 3)

---

## 🌐 URLs DE LA APLICACIÓN

| Página | URL |
|--------|-----|
| **Inicio** | http://localhost:4200/inicio |
| **Cursos** | http://localhost:4200/cursos-public |
| **Login** | http://localhost:4200/authentication/login |
| **Dashboard Admin** | http://localhost:4200/admin/dashboard |
| **Matrículas** | http://localhost:4200/admin/matriculas |
| **Dashboard Estudiante** | http://localhost:4200/estudiante/dashboard |

---

## 🔧 VERIFICAR QUE FUNCIONA

### **1. Verificar JSON Server:**

Abre en tu navegador:
- http://localhost:3000/cursos
- http://localhost:3000/usuarios
- http://localhost:3000/solicitudes

Deberías ver los datos en formato JSON.

---

### **2. Verificar la App:**

1. Abre http://localhost:4200
2. Deberías ver la landing page
3. Navega a diferentes páginas
4. Prueba el login con las credenciales de arriba

---

## 📝 PRÓXIMOS PASOS

### **Para Conectar con la Base de Datos:**

Actualiza los componentes para usar `ApiService`:

```typescript
import { ApiService } from 'src/app/services/api.service';

constructor(private api: ApiService) {}

ngOnInit() {
  this.api.getCursos().subscribe(cursos => {
    this.cursos = cursos;
  });
}
```

---

## 🚀 DEPLOY A VERCEL

Cuando estés listo para subir a producción:

### **1. Subir a GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/academia-mirzakhani.git
git push -u origin main
```

### **2. Conectar en Vercel:**

1. Ve a https://vercel.com
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona tu repositorio
5. Click en "Deploy"

### **3. Para Producción:**

Necesitarás cambiar JSON Server por Firebase o una base de datos real en la nube.

---

## 🎉 ¡LISTO!

Tu aplicación está funcionando con base de datos local.

**¿Alguna duda?** Revisa esta guía o pregunta lo que necesites.
