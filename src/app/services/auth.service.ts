import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Estudiante {
  uid?: string;
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  password?: string;
  cursosMatriculados: number[];
  fechaRegistro: string;
  activo: boolean;
  rol: 'estudiante' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estudianteSubject = new BehaviorSubject<Estudiante | null>(null);
  public estudiante$ = this.estudianteSubject.asObservable();
  
  // Estado de inicialización
  private isInitializing = true;
  public isInitializing$ = new BehaviorSubject<boolean>(true);

  private adminUser: Estudiante = {
    uid: 'admin',
    id: 'admin',
    nombre: 'Administrador',
    email: 'admin@mirzakhani.com',
    dni: '00000000',
    telefono: '+51 999 999 999',
    password: 'admin2026',
    cursosMatriculados: [],
    fechaRegistro: new Date().toISOString(),
    activo: true,
    rol: 'admin'
  };

  private estudiantes: Estudiante[] = [
    {
      uid: '2',
      id: '2',
      nombre: 'Juan Pérez García',
      email: 'juan@email.com',
      dni: '12345678',
      telefono: '+51 999 999 999',
      password: '123456782026',
      cursosMatriculados: [1],
      fechaRegistro: new Date().toISOString(),
      activo: true,
      rol: 'estudiante'
    },
    {
      uid: '3',
      id: '3',
      nombre: 'María López Rodríguez',
      email: 'maria@email.com',
      dni: '87654321',
      telefono: '+51 888 888 888',
      password: '876543212026',
      cursosMatriculados: [2, 3],
      fechaRegistro: new Date().toISOString(),
      activo: true,
      rol: 'estudiante'
    }
  ];

  private firebaseAuth: any = null;
  private firebaseFirestore: any = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    console.log('✅ AuthService inicializado');
    this.initPromise = this.initializeFirebase();
  }

  private async initializeFirebase() {
    try {
      const { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } = await import('firebase/auth');
      const { getFirestore } = await import('firebase/firestore');
      const { getApps, initializeApp } = await import('firebase/app');
      
      const { environment } = await import('../../environments/environment');
      
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }

      this.firebaseAuth = getAuth();
      this.firebaseFirestore = getFirestore();

      // IMPORTANT: Set persistence to LOCAL so session survives page reload
      await setPersistence(this.firebaseAuth, browserLocalPersistence);
      console.log('🔒 Persistencia de sesión configurada');

      // Escuchar cambios en autenticación - ESTO PERSISTE LA SESIÓN
      onAuthStateChanged(this.firebaseAuth, async (user: any) => {
        console.log('🔄 onAuthStateChanged:', user ? user.email : 'null');
        
        if (user) {
          const { doc, getDoc } = await import('firebase/firestore');
          const userDocRef = doc(this.firebaseFirestore, 'usuarios', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const data = userDoc.data() as Estudiante;
            console.log('✅ Usuario cargado desde Firebase:', data.nombre);
            this.estudianteSubject.next({ ...data, uid: user.uid });
          } else if (user.email === this.adminUser.email) {
            console.log('✅ Admin cargado');
            this.estudianteSubject.next(this.adminUser);
          } else {
            // Usuario en Auth pero no en Firestore - cargar datos por defecto
            console.log('⚠️ Usuario en Auth pero no en Firestore, usando datos básicos');
            this.estudianteSubject.next({
              uid: user.uid,
              id: user.uid,
              nombre: user.displayName || 'Usuario',
              email: user.email,
              dni: '',
              telefono: '',
              cursosMatriculados: [],
              fechaRegistro: new Date().toISOString(),
              activo: true,
              rol: 'estudiante'
            });
          }
        } else {
          console.log('❌ Usuario no autenticado');
          this.estudianteSubject.next(null);
        }
        
        // Marcar como inicializado después del primer onAuthStateChanged
        this.isInitializing = false;
        this.isInitializing$.next(false);
        console.log('✅ Firebase inicializado correctamente');
      });

      this.initialized = true;
    } catch (error) {
      console.error('❌ Error inicializando Firebase:', error);
      console.log('⚠️ Usando autenticación local');
      this.isInitializing = false;
      this.isInitializing$.next(false);
    }
  }

  // Esperar a que Firebase esté listo
  private async waitForFirebase() {
    if (this.initPromise) {
      await this.initPromise;
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string; estudiante?: Estudiante }> {
    await this.waitForFirebase();

    // Si Firebase está disponible, usarlo SIEMPRE
    if (this.initialized && this.firebaseAuth) {
      try {
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        
        // Intentar login con Firebase
        const credential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
        console.log('✅ Firebase login exitoso:', credential.user.email);
        
        if (credential.user) {
          const { doc, getDoc } = await import('firebase/firestore');
          const userDocRef = doc(this.firebaseFirestore, 'usuarios', credential.user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const estudiante = { ...userDoc.data()!, uid: credential.user.uid } as Estudiante;
            if (!estudiante.activo) {
              await this.logout();
              return { success: false, message: 'Usuario deshabilitado' };
            }
            this.estudianteSubject.next(estudiante);
            return { success: true, message: 'Login exitoso', estudiante };
          } else if (email === this.adminUser.email) {
            // Admin especial - no está en Firestore pero usa Firebase Auth
            this.estudianteSubject.next(this.adminUser);
            return { success: true, message: 'Login exitoso', estudiante: this.adminUser };
          } else {
            return { success: false, message: 'Usuario no encontrado en Firestore' };
          }
        }
      } catch (error: any) {
        console.error('Error Firebase login:', error.code, error.message);
        return { success: false, message: this.getFirebaseErrorMessage(error.code) };
      }
    }

    // Fallback local (solo si Firebase no está disponible)
    console.log('⚠️ Usando login local (Firebase no disponible)');
    if (email === this.adminUser.email && password === this.adminUser.password) {
      this.estudianteSubject.next(this.adminUser);
      return { success: true, message: 'Login exitoso (local)', estudiante: this.adminUser };
    }

    const estudiante = this.estudiantes.find(e => e.email === email && e.password === password && e.activo);
    if (estudiante) {
      this.estudianteSubject.next(estudiante);
      return { success: true, message: 'Login exitoso (local)', estudiante };
    }

    return { success: false, message: 'Email o contraseña incorrectos' };
  }

  async register(solicitudData: any): Promise<{ success: boolean; message: string; estudiante?: Estudiante }> {
    await this.waitForFirebase();

    if (this.initialized && this.firebaseAuth) {
      try {
        const { createUserWithEmailAndPassword } = await import('firebase/auth');
        const { doc, setDoc } = await import('firebase/firestore');
        
        const credential = await createUserWithEmailAndPassword(
          this.firebaseAuth,
          solicitudData.email,
          solicitudData.password || this.generateRandomPassword()
        );

        const estudiante: Estudiante = {
          uid: credential.user.uid,
          id: credential.user.uid,
          nombre: solicitudData.nombre,
          email: solicitudData.email,
          dni: solicitudData.dni,
          telefono: solicitudData.telefono,
          password: '',
          cursosMatriculados: [solicitudData.cursoId],
          fechaRegistro: new Date().toISOString(),
          activo: true,
          rol: 'estudiante'
        };

        await setDoc(doc(this.firebaseFirestore, 'usuarios', credential.user.uid), estudiante);
        this.estudianteSubject.next(estudiante);
        
        return { success: true, message: 'Registro exitoso', estudiante };
      } catch (error: any) {
        console.error('Error Firebase register:', error);
        return { success: false, message: error.message };
      }
    }

    // Fallback local
    const estudiante: Estudiante = {
      uid: Date.now().toString(),
      id: Date.now().toString(),
      nombre: solicitudData.nombre,
      email: solicitudData.email,
      dni: solicitudData.dni,
      telefono: solicitudData.telefono,
      password: solicitudData.password || '',
      cursosMatriculados: [solicitudData.cursoId],
      fechaRegistro: new Date().toISOString(),
      activo: true,
      rol: 'estudiante'
    };

    this.estudiantes.push(estudiante);
    this.estudianteSubject.next(estudiante);
    
    return { success: true, message: 'Registro exitoso', estudiante };
  }

  async registrarEstudiante(solicitudData: any): Promise<{ success: boolean; message: string; estudiante?: Estudiante }> {
    return this.register(solicitudData);
  }

  async logout(): Promise<void> {
    if (this.initialized && this.firebaseAuth) {
      const { signOut } = await import('firebase/auth');
      await signOut(this.firebaseAuth);
    }
    this.estudianteSubject.next(null);
  }

  async resetPassword(email: string): Promise<{ success: boolean; message: string }> {
    await this.waitForFirebase();
    
    if (this.initialized && this.firebaseAuth) {
      try {
        const { sendPasswordResetEmail } = await import('firebase/auth');
        await sendPasswordResetEmail(this.firebaseAuth, email);
        return { success: true, message: 'Correo enviado. Revisa tu bandeja de entrada.' };
      } catch (error: any) {
        return { success: false, message: error.message };
      }
    }
    return { success: true, message: 'Correo enviado (simulado)' };
  }

  getEstudianteActual(): Estudiante | null {
    let estudiante: Estudiante | null = null;
    this.estudiante$.subscribe(e => estudiante = e).unsubscribe();
    return estudiante;
  }

  isLoggedIn(): boolean {
    return this.getEstudianteActual() !== null;
  }

  isAdmin(): boolean {
    return this.getEstudianteActual()?.rol === 'admin';
  }

  isEstudiante(): boolean {
    return this.getEstudianteActual()?.rol === 'estudiante';
  }

  getCursosMatriculados(): number[] {
    return this.getEstudianteActual()?.cursosMatriculados || [];
  }

  async matricularEnCurso(email: string, cursoId: number): Promise<boolean> {
    const estudiante = this.estudiantes.find(e => e.email === email);
    if (estudiante && !estudiante.cursosMatriculados.includes(cursoId)) {
      estudiante.cursosMatriculados.push(cursoId);
      return true;
    }
    return false;
  }

  async getAllEstudiantes(): Promise<Estudiante[]> {
    return this.estudiantes.filter(e => e.activo);
  }

  async getEstudiantePorEmail(email: string): Promise<Estudiante | undefined> {
    return this.estudiantes.find(e => e.email === email);
  }

  async actualizarCursosMatriculados(email: string, cursoIds: number[]): Promise<boolean> {
    const estudiante = this.estudiantes.find(e => e.email === email);
    if (estudiante) {
      estudiante.cursosMatriculados = cursoIds;
      return true;
    }
    return false;
  }

  private generateRandomPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  private getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/weak-password':
        return 'Contraseña muy débil (mínimo 6 caracteres)';
      case 'auth/user-disabled':
        return 'Usuario deshabilitado';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-credential':
        return 'Email o contraseña incorrectos';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intente más tarde.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet.';
      default:
        return 'Error: ' + code;
    }
  }
}
