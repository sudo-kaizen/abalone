let apiBaseUrl;
if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = 'http://localhost:3001';
} else {
  apiBaseUrl = 'https://api.enye.tech/v1/challenge';
}

async function getRecords(signal) {
  try {
    const resp = await fetch(`${apiBaseUrl}/records`, {
      method: 'GET',
      signal,
    });
    if (process.env.NODE_ENV === 'development') {
      const records = await resp.json();
      const jsonData = {
        records,
        size: records.profiles.length,
        status: 'success',
      };
      return jsonData;
    } else {
      const jsonData = await resp.json();
      if (jsonData.status !== 'success') {
        throw new Error('An error occured while fetching data');
      } else {
        return jsonData;
      }
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export { getRecords };
