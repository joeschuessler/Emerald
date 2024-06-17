let emerald = client.emerald;
let mapper = emerald.mapper;
//Load and parse map
emerald.emnote('Cartographing the Basin of Life...', 'Mapper');

fetch('https://www.lusternia.com/maps/map.xml')
.then(res => {
  if (!res.ok) {
    emerald.emnote('Error retrieving master map.', 'Mapper');
  }
  return res.text();
})
.then(mapText => {
  let t = String(mapText);
  let parser = new DOMParser();
  mapper.mapxml = parser.parseFromString(t, "text/xml");
})
.then(() => {
  let xmlareas = mapper.mapxml.getElementsByTagName("area");
  for (a=0;a<xmlareas.length;a++){
    mapper[xmlareas[a].getAttribute('id')] = xmlareas[a].getAttribute('name');
  };
  let rooms = mapper.mapxml.getElementsByTagName("room");
  rooms.forEach(r => {
    mapper.rooms[r.getAttribute('id')] = {
      area: r.getAttribute('area'),
      title: r.getAttribute('title'),
      exits: {},
      weight: mapper.roomWeights[r.id] ? mapper.roomWeights[r.id] : 1
    };
    r.children.forEach(c => {
      if (c.tagName === "exit") {
        let dir = c.getAttribute('direction');
        mapper.rooms[r.id].exits[dir] = {target: c.getAttribute('target')};
        if (c.getAttribute('tgarea') !== null) {mapper.rooms[r.id].exits[dir]["tgarea"] = c.getAttribute('tgarea')}
      }
    })
  });
  emerald.emnote(`Successfully mapped ${Object.keys(mapper.rooms).length} rooms in ${Object.keys(mapper.areas).length} areas.`,'Mapper');
})
.then(() => {
  delete mapper.mapxml;
})
.catch(error => {
  emerald.emnote(`Error parsing master map: ${error}`,'Mapper');
});