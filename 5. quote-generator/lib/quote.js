export async function getQuote(category) {
  try {
    const url = 'https://api.api-ninjas.com/v1/quotes?category=' + category;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch {
    console.log('error!' + err);
  }
}
