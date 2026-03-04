import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  rol: 'admin' | 'estudiante';
  cursosMatriculados?: string[];
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    // Escuchar cambios en autenticación
    this.afAuth.authState.subscribe(user => {
      this.usuarioActual = user;
    });
  }

  // Login con email y contraseña
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);

      if (credential.user) {
        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await this.firestore.collection('usuarios').doc(credential.user.uid).get().toPromise();

        return {
          success: true,
          message: 'Login exitoso',
          user: {
            uid: credential.user.uid,
            email: credential.user.email,
            ...userDoc?.data()
          }
        };
      }

      return {
        success: false,
        message: 'Error al iniciar sesión'
      };
    } catch (error: any) {
      return {
        success: false,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Registro de usuario
  async register(email: string, password: string, userData: Usuario): Promise<{ success: boolean; message: string }> {
    try {
      // Crear usuario en Firebase Auth
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (credential.user) {
        // Guardar datos adicionales en Firestore
        await this.firestore.collection('usuarios').doc(credential.user.uid).set({
          ...userData,
          id: credential.user.uid,
          createdAt: new Date().toISOString()
        });

        return {
          success: true,
          message: 'Usuario registrado exitosamente'
        };
      }

      return {
        success: false,
        message: 'Error al registrar usuario'
      };
    } catch (error: any) {
      return {
        success: false,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Logout
  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.usuarioActual = null;
  }

  // Reset de contraseña
  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return {
        success: true,
        message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.'
      };
    } catch (error: any) {
      return {
        success: false,
        message: this.getErrorMessage(error.code)
      };
    }
  }

  // Obtener usuario actual
  getCurrentUser(): any {
    return this.usuarioActual;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  // Obtener email de error
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      case 'auth/weak-password':
        return 'Contraseña muy débil';
      case 'auth/user-disabled':
        return 'Usuario deshabilitado';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-credential':
        return 'Email o contraseña incorrectos';
      default:
        return 'Error desconocido';
    }
  }
}
