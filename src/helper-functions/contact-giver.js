// utils/theGiver.js
// Sends a { command, data } payload to the “the-giver” API and returns the JSON response.
export async function sendToTheGiver(command, data, opts = {}) {
  const endpoint =process.env.NEXT_PUBLIC_BACKEND_API_URL+'/command'; // fallback for Next.js API route
  
  console.log(endpoint)


  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    body: JSON.stringify({ command, data }),
    signal: opts.signal, // optional AbortController
    ...opts.fetch,        // e.g. { cache: "no-store" } for Next.js
  });


  


  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`the-giver error ${res.status}: ${text}`);
  }

  return (await res.json()).response; // parsed response body
}
