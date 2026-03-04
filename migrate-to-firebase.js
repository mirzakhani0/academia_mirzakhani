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
