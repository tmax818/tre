fetch('https://example.com/profile', {
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})