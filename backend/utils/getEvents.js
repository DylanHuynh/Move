const getEvents = (location, time) => {
  fetch(`http://127.0.0.1:8000/get-events/?city=${encodeURIComponent(location)}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data;
  });
};

exports.getEvents = getEvents;
