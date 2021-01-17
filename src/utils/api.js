const apiBaseUrl = 'https://api.enye.tech/v1/challenge/records';

async function getRecords(signal) {
  try {
    const resp = await fetch(`${apiUrl}`, {
      method: 'GET',
      signal,
    });
    const { records, status, size } = await resp.json();
    return  {records, status, size};
  } catch (err) {
    console.error(err);
    return err;
  }
}

export { getRecords };
