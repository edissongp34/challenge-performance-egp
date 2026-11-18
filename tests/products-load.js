import http from 'k6/http';
import { check } from 'k6';

const rate = Number(__ENV.RATE || 50);

if (rate !== 50 && rate !== 100) {
  throw new Error(
      'RATE debe ser 50 o 100 TPS.'
  );
}

export const options = {
  scenarios: {
    product_creation: {
      executor: 'constant-arrival-rate',

      rate: rate,
      timeUnit: '1s',

      duration: '1m',

      preAllocatedVUs: rate * 2,
      maxVUs: rate * 4,
    },
  },

  thresholds: {
    checks: ['rate > 0.99'],
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 2000'],
    dropped_iterations: ['count == 0'],
  },
};

export function setup() {
  const loginResponse = http.post(
      'https://dummyjson.com/auth/login',
      JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: {
          endpoint: 'login',
        },
      }
  );

  if (loginResponse.status !== 200) {
    throw new Error(
        `Error obteniendo JWT. Código: ${loginResponse.status}`
    );
  }

  const body = loginResponse.json();

  const token =
      body.accessToken || body.token;

  if (!token) {
    throw new Error(
        'No fue posible obtener el JWT.'
    );
  }

  return {
    token,
    runId: `${Date.now()}`,
  };
}

export default function (data) {
  const uniqueTitle =
      `product-${data.runId}-${__VU}-${__ITER}`;

  const response = http.post(
      'https://dummyjson.com/products/add',
      JSON.stringify({
        title: uniqueTitle,
        price: 1.23,
      }),
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          'Content-Type': 'application/json',
        },
        tags: {
          endpoint: 'create_product',
        },
      }
  );

  check(response, {
    'status es 200 o 201': (r) =>
        r.status === 200 || r.status === 201,

    'tiempo respuesta menor a 2 segundos':
        (r) => r.timings.duration < 2000,

    'respuesta contiene id':
        (r) => !!r.json('id'),

    'respuesta contiene title':
        (r) => !!r.json('title'),
  });
}
