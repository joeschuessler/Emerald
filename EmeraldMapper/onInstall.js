let emerald = client.emerald
var mapper = emerald.mapper = {map: {}};

mapper.roomWeights = JSON.parse(get_variable('emerald_mapper_roomweights')) || {
  931: 999, //prime seren
  1337: 999, //prime glom
  4136: 999, //prime mag
  4555: 999, //celestia
  4607: 999, //nil
  4710: 999, //etherseren
  4847: 999, //etherglom,
  4865: 999, //earth
  11152: 999, //prime halli
  11401: 999, //prime gaudi
  19519: 999, //continuum
  19526: 999, //vortex
  19663: 999, //fire
  19765: 999, //air
};

mapper.getArea = (vnum) => {
  let areas = mapper.map.querySelectorAll("area");
  let returnValue = '';
  areas.forEach(a => {
    if (a.getAttribute('id') == vnum) returnValue = a.getAttribute('name');
  });
  return returnValue;
}

mapper.getRoom = (roomName) => {
  let rooms = mapper.map.querySelectorAll("room");
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${String(mapper.map.getElementsByTagName("room").length)} rooms for "`,emerald.configs.ui_white,'');
  emerald.note.build(roomName, emerald.configs.ui_green, '', '"...',emerald.configs.ui_white,'');
  emerald.note.display();
  let foundRooms = 0;
  rooms.forEach(r => {
    let t = r.getAttribute('title');
    if (r.getAttribute('title').includes(roomName.toLowerCase())) {
      let roomId = r.getAttribute('id');
      let area = mapper.findArea(roomId);
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
      emerald.note.build(`«go ${roomId}»v${roomId}`,emerald.configs.ui_green,'',': ',emerald.configs.ui_white,'');
      emerald.note.build(r.getAttribute('title'),emerald.configs.ui_white,'');
      emerald.note.build(' [',emerald.configs.ui_blue,'', area,emerald.configs.ui_green,'',']',emerald.configs.ui_blue,'');
      emerald.note.display();
      foundRooms++;
    }
  });
  if (foundRooms == 0) {
    emerald.emnote('ROOM NOT FOUND!','Mapper');
    emerald.note.clear();
  } else {
    emerald.emnote(`Found ${foundRooms} matching rooms.`,'Mapper');
  }
}

mapper.getPath = (origin, dest) => {
  let r = mapper.map.querySelector(`room#${origin}`)
}

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
  mapper.map = parser.parseFromString(t, "text/xml");
  emerald.emnote(`Successfully mapped ${mapper.map.getElementsByTagName("room").length} rooms in ${mapper.map.getElementsByTagName("area").length} areas.`,'Mapper');
})
.catch(error => {
  emerald.emnote(`Error parsing master map: ${error}`,'Mapper');
});