const getActivities = (location) => fetch(`http://127.0.0.1:8000/get-events/?city=${encodeURIComponent(location)}`)
  .then(res => res.json())
  .then(data => {
    result = data.map(({_, title, date, address, description}) => (JSON.stringify({
      title, date, address, description
    }).replace(/"/g, '\\"')))
    return result;
  });

module.exports = {getActivities};
