/**
 * JSON Response,
 * for mocking fetch.
 */
export const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const listResponse = (objects: unknown[], total = objects.length) =>
  jsonResponse({
    data: {
      objects,
      meta: {
        total,
        count: objects.length,
        limit: 100,
        offset: 0,
        more: false,
      },
    },
  });
