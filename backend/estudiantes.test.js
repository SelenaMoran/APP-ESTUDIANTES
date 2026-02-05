const request = require('supertest');
const app = require('./index'); // importa tu app

describe('API de Estudiantes', () => {
  test('GET /api/estudiantes devuelve la lista de estudiantes', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, nombre: "Juan", apellido: "Cedeño" },
      { id: 2, nombre: "María", apellido: "Lopez" }
    ]);
  });
});
