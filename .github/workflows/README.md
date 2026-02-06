# Documentación de Workflows CI/CD

Este directorio contiene los workflows de GitHub Actions para el proyecto.

---

## 1. CI - Frontend React
**Qué hace:**  
- Instala dependencias de frontend.  
- Ejecuta tests unitarios (`npm test`).  
- (Opcional) Ejecuta linter ESLint y verifica calidad de código.  
- Genera build de producción (`npm run build`).

**Triggers:**  
- `push` a la rama `main` en la carpeta `frontend/**`.  
- `pull_request` hacia `main`.

---

## 2. CI - Backend Node
**Qué hace:**  
- Instala dependencias de backend.  
- Ejecuta tests unitarios (`npm test`).  
- (Opcional) Ejecuta linter ESLint para verificar calidad de código.  

**Triggers:**  
- `push` a la rama `main` en la carpeta `backend/**`.  
- `pull_request` hacia `main`.

---

## 3. Deploy Simulado
**Qué hace:**  
- Construye los artifacts del frontend y backend.  
- Copia los builds a la carpeta `deploy/`.  
- Simula un despliegue mostrando mensajes en consola.  

**Triggers:**  
- `workflow_run` de ambos CI (`CI - Frontend React` y `CI - Backend Node`) **solo si ambos pasaron**.  
- `workflow_dispatch` para ejecución manual en cualquier momento.

**Cómo probar deploy manual:**  
1. Ir a la pestaña **Actions** en GitHub.  
2. Seleccionar el workflow **Deploy Simulado**.  
3. Clic en **Run workflow** y seleccionar la rama `main`.  
4. Observar que los pasos de construcción y despliegue se ejecuten en la consola.

---

> Con esta documentación, cualquier miembro del equipo puede entender el flujo CI/CD y probarlo sin leer los archivos YAML completos.
