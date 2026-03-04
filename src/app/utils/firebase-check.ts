import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

/**
 * Verifica la conexión con Firebase
 * Ejecutar en el navegador con: checkFirebaseConnection()
 */
export function checkFirebaseConnection(): Promise<{
  connected: boolean;
  authEnabled: boolean;
  firestoreEnabled: boolean;
  message: string;
}> {
  return new Promise(async (resolve) => {
    const result = {
      connected: false,
      authEnabled: false,
      firestoreEnabled: false,
      message: ''
    };

    try {
      // Inicializar Firebase si no está inicializado
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }

      const auth = getAuth();
      const firestore = getFirestore();

      // Verificar Auth
      result.authEnabled = auth !== null;

      // Verificar Firestore
      result.firestoreEnabled = firestore !== null;

      // Verificar conexión
      result.connected = result.authEnabled && result.firestoreEnabled;

      if (result.connected) {
        result.message = '✅ Firebase conectado correctamente';
      } else {
        result.message = '❌ Error en la conexión con Firebase';
      }

      console.log('=== ESTADO DE FIREBASE ===');
      console.log('Conectado:', result.connected ? '✅' : '❌');
      console.log('Auth:', result.authEnabled ? '✅' : '❌');
      console.log('Firestore:', result.firestoreEnabled ? '✅' : '❌');
      console.log('Project ID:', environment.firebase.projectId);
      console.log('========================');

      resolve(result);
    } catch (error: any) {
      result.message = '❌ Error: ' + error.message;
      console.error('Error verificando Firebase:', error);
      resolve(result);
    }
  });
}

/**
 * Verifica si el usuario admin existe en Authentication
 */
export async function checkAdminUser(): Promise<boolean> {
  const auth = getAuth();
  
  try {
    // Intentar login con admin
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(auth, 'admin@mirzakhani.com', 'admin2026');
    
    console.log('✅ Usuario admin verificado');
    await auth.signOut();
    return true;
  } catch (error: any) {
    console.error('❌ Error verificando admin:', error.message);
    console.log('El usuario admin NO existe o la contraseña es incorrecta');
    console.log('Crea el usuario en: https://console.firebase.google.com/project/academia-mirzakhani/authentication/users');
    return false;
  }
}

/**
 * Verifica si existen las colecciones requeridas en Firestore
 */
export async function checkFirestoreCollections(): Promise<{
  cursos: boolean;
  usuarios: boolean;
  solicitudes: boolean;
}> {
  const firestore = getFirestore();
  const { collection, getDocs } = await import('firebase/firestore');
  
  const result = {
    cursos: false,
    usuarios: false,
    solicitudes: false
  };

  try {
    // Verificar cursos
    const cursosSnapshot = await getDocs(collection(firestore, 'cursos'));
    result.cursos = !cursosSnapshot.empty;
    console.log(`Colección 'cursos': ${result.cursos ? '✅' : '❌'} (${cursosSnapshot.size} documentos)`);

    // Verificar usuarios
    const usuariosSnapshot = await getDocs(collection(firestore, 'usuarios'));
    result.usuarios = !usuariosSnapshot.empty;
    console.log(`Colección 'usuarios': ${result.usuarios ? '✅' : '❌'} (${usuariosSnapshot.size} documentos)`);

    // Verificar solicitudes
    const solicitudesSnapshot = await getDocs(collection(firestore, 'solicitudes'));
    result.solicitudes = !solicitudesSnapshot.empty;
    console.log(`Colección 'solicitudes': ${result.solicitudes ? '✅' : '❌'} (${solicitudesSnapshot.size} documentos)`);

  } catch (error: any) {
    console.error('Error verificando colecciones:', error.message);
  }

  return result;
}

/**
 * Función principal para verificar todo
 */
export async function verificarFirebase(): Promise<void> {
  console.log('🔍 Verificando configuración de Firebase...\n');
  
  const connection = await checkFirebaseConnection();
  
  if (connection.connected) {
    console.log('\n🔍 Verificando usuario admin...');
    await checkAdminUser();
    
    console.log('\n🔍 Verificando colecciones de Firestore...');
    await checkFirestoreCollections();
    
    console.log('\n✅ Verificación completada');
  } else {
    console.log('\n❌ Firebase no está conectado correctamente');
    console.log('Verifica que:');
    console.log('1. Las credenciales en environment.ts sean correctas');
    console.log('2. El proyecto Firebase exista');
    console.log('3. Authentication y Firestore estén habilitados');
  }
}

// Hacer la función disponible globalmente para usar en la consola del navegador
if (typeof window !== 'undefined') {
  (window as any).verificarFirebase = verificarFirebase;
  (window as any).checkFirebaseConnection = checkFirebaseConnection;
  (window as any).checkAdminUser = checkAdminUser;
  (window as any).checkFirestoreCollections = checkFirestoreCollections;
}
