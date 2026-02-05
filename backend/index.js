// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const estudiantes = [
  { id: 1, nombre: "Juan", apellido: "Cedeño" },
  { id: 2, nombre: "María", apellido: "Lopez" }
];

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

// Exportar app para supertest
module.exports = app;

// Solo iniciar el servidor si no se está haciendo test
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
}
