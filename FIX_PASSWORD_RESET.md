# 🔧 CAMBIOS PARA CORREGIR RECUPERACIÓN DE CONTRASEÑA

---

## **PROBLEMA:**
El link de "¿Olvidaste tu contraseña?" está navegando a `/inicio` en lugar de abrir el diálogo.

---

## **SOLUCIÓN:**

### **Archivo: `src/app/pages/authentication/login/login.component.ts`**

**Busca esta línea (alrededor de la línea 48):**
```typescript
<a href="javascript:void(0)" class="forgot-password" (click)="openResetPassword()">
  ¿Olvidaste tu contraseña?
</a>
```

**Cámbiala por:**
```typescript
<button type="button" class="forgot-password-btn" (click)="openResetPassword()">
  ¿Olvidaste tu contraseña?
</button>
```

---

### **En los Estilos (CSS):**

**Busca esto:**
```css
.forgot-password {
  color: #f97316;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}
```

**Cámbialo por:**
```css
.forgot-password-btn {
  background: none;
  border: none;
  color: #f97316;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password-btn:hover {
  color: #ea580c;
  text-decoration: underline;
}
```

---

## **CÓMO APLICAR LOS CAMBIOS:**

### **Opción 1: GitHub Desktop (Recomendado)**

1. **Abre el archivo** en tu editor de código:
   ```
   C:\Users\CARLOS\Downloads\spike-angular-free-main\spike-angular-free-main\package\src\app\pages\authentication\login\login.component.ts
   ```

2. **Busca y reemplaza** las líneas como te indiqué arriba

3. **Guarda** el archivo

4. **Abre GitHub Desktop**

5. **Verás los cambios** en la lista

6. **Summary:** `Fix password reset link navigation`

7. **Click en:** "Commit to main"

8. **Click en:** "Push origin"

---

### **Opción 2: Subir Manual desde GitHub.com**

1. **Ve a:** https://github.com/mirzakhani0/academia_mirzakhani
2. **Navega a:** `src/app/pages/authentication/login/`
3. **Click en:** `login.component.ts`
4. **Click en:** Ícono de lápiz ✏️ (Edit)
5. **Haz los cambios** manualmente
6. **Click en:** "Commit changes"

---

## **DESPUÉS DE APLICAR LOS CAMBIOS:**

1. **Espera 5-8 minutos** a que Vercel redeploye
2. **Ve a:** https://academia-mirzakhani.vercel.app/authentication/login
3. **Click en:** "¿Olvidaste tu contraseña?"
4. **Debería abrirse** el diálogo modal (no navegar a otra página)

---

## 📢 **¿PUDISTE APLICAR LOS CAMBIOS?**

Confírmame:
1. ¿Editaste el archivo?
2. ¿Subiste los cambios a GitHub?
3. ¿Vercel está redeployando?

**¡Avísame y verificamos que funcione!** 🚀
