# Challenge Performance - EGP

## Descripción

Este proyecto contiene la solución del challenge de Performance Testing solicitado para el proceso de selección de Monnet Payments.

La implementación utiliza **k6** para ejecutar pruebas de carga sobre el flujo de autenticación y creación de productos utilizando los endpoints definidos en el enunciado del reto.

La solución contempla los dos escenarios requeridos:

| Escenario | TPS | Duración |
|-----------|-----|----------|
| Escenario 1 | 50 solicitudes por segundo | 1 minuto |
| Escenario 2 | 100 solicitudes por segundo | 1 minuto |

---

# Estructura del Proyecto

```text
challenge-performance-egp
│
├── reports
│   ├── Parte 1.pdf
│   └── REPORTE TÉCNICO PRUEBAS DE PERFORMANCE.pdf
│
├── tests
│   └── products-load.js
│
└── README.md
```

---

# Entregables

## Parte 1.pdf

Contiene el análisis y la estrategia de performance propuesta para una plataforma e-commerce con incrementos significativos de demanda durante eventos especiales.

Incluye:

- Análisis del escenario.
- Estrategia de pruebas recomendada.
- Justificación de Load Test.
- Justificación de Spike Test.
- Justificación de Stress Test.
- Justificación de Soak Test.
- Conclusiones y recomendaciones.

---

## REPORTE TÉCNICO PRUEBAS DE PERFORMANCE.pdf

Contiene los resultados obtenidos durante la ejecución de las pruebas solicitadas en el challenge.

Incluye:

- Escenario 50 TPS.
- Escenario 100 TPS.
- Comparación de resultados.
- Hallazgos técnicos.
- Conclusiones.
- Recomendaciones.

---

# Tecnologías Utilizadas

- k6
- JavaScript
- DummyJSON API

---

# Instalación de k6

## Windows

### Winget

```powershell {preview="false"}
winget install k6 --source winget
```

### Chocolatey

```powershell {preview="false"}
choco install k6
```

---

## macOS

```bash {preview="false"}
brew install k6
```

---

---

# Verificar Instalación

Ejecutar:

```bash {preview="false"}
k6 version
```

La consola debe mostrar la versión instalada correctamente.

---

# Ejecución

Ubicarse en la raíz del proyecto:

```bash {preview="false"}
cd challenge-performance-egp
```

---

## Escenario 50 TPS

```bash {preview="false"}
k6 run -e RATE=50 tests/products-load.js
```

---

## Escenario 100 TPS

```bash {preview="false"}
k6 run -e RATE=100 tests/products-load.js
```

---
---

# Flujo Implementado

La prueba realiza las siguientes actividades:

1. Obtiene un JWT mediante autenticación.
2. Utiliza el token para consumir el endpoint de creación de productos.
3. Genera un valor único para el campo `title`.
4. Ejecuta el escenario de carga configurado.
5. Valida:
    - Status HTTP.
    - Tiempo de respuesta.
    - Presencia de `id`.
    - Presencia de `title`.
6. Genera métricas de rendimiento y confiabilidad.

---

# Alcance Implementado

La automatización desarrollada contempla exclusivamente los escenarios solicitados en el challenge:

- 50 TPS durante 1 minuto.
- 100 TPS durante 1 minuto.

---

# Autor

**Edisson Gómez Pinzón**
