export const runMakeScenario = async (scenarioId: string, parameters: object) => {
  const { default: fetch } = await import('node-fetch');

  const baseUrl = `https://${process.env.MAKE_ZONE}/api`;

  const response = await fetch(`${baseUrl}/v2/scenarios/${scenarioId}/run`, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.MAKE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ parameters })
  });

  if (!response.ok) {
    throw new Error(`Erreur Make: ${response.statusText}`);
  }

  return response.json();
};
