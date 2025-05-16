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
  if (window.DOMParser) {
    let parser = new DOMParser();
    mapper.mapxml = parser.parseFromString(t, "text/xml");
  } else {
    mapper.mapxml = new ActiveXObject("Microsoft.XMLDOM");
    mapper.mapxml.async = false;
    mapper.mapxml.loadXML(t);
  }
})
.then(() => {
  let xmlareas = mapper.mapxml.getElementsByTagName("area");
  for (let a of xmlareas){
    mapper.areas[a.getAttribute('id')] = a.getAttribute('name');
  }
  let xmlrooms = mapper.mapxml.getElementsByTagName("room");
  for (let r of xmlrooms) {
    mapper.rooms[r.getAttribute('id')] = {
      area: r.getAttribute('area'),
      title: r.getAttribute('title'),
      exits: {},
      weight: mapper.roomWeights[r.id] ? mapper.roomWeights[r.id] : 1
    };
    for (let c of r.children) {
      if (c.tagName === "exit") {
        let dir = c.getAttribute('direction');
        mapper.rooms[r.id].exits[dir] = {target: c.getAttribute('target')};
        if (c.getAttribute('tgarea') !== null) {mapper.rooms[r.id].exits[dir]["tgarea"] = c.getAttribute('tgarea')}
      }
    }
  }
  emerald.emnote(`Successfully mapped ${Object.keys(mapper.rooms).length} rooms in ${Object.keys(mapper.areas).length} areas.`,'Mapper');
})
.then(() => {
  delete mapper.mapxml;
})
.catch(error => {
  emerald.emnote(`Error parsing master map: ${error}`,'Mapper');
});