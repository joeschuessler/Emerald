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
  let areas = mapper.mapxml.querySelectorAll("area");
  let returnValue = '';
  areas.forEach(a => {
    if (a.getAttribute('id') == vnum) returnValue = a.getAttribute('name');
  });
  return returnValue;
}

mapper.getRoom = (roomName) => {
  let rooms = mapper.mapxml.querySelectorAll("room");
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${String(mapper.mapxml.getElementsByTagName("room").length)} rooms for "`,emerald.configs.ui_white,'');
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
  let r = mapper.mapxml.querySelector(`room#${origin}`)
}

//Load and parse map
emerald.emnote('Cartographing the Basin of Life...', 'Mapper');
mapper.loadmap = () => {
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
    emerald.emnote(`Successfully mapped ${mapper.mapxml.getElementsByTagName("room").length} rooms in ${mapper.mapxml.getElementsByTagName("area").length} areas.`,'Mapper');
  })
  .then(() => {
    let rooms = mapper.mapxml.getElementsByTagName("room");
    rooms.forEach(r => {
      let id = r.getAttribute('id');
      mapper.rooms[id] = {
        area: r.getAttribute('area'),
        title: r.getAttribute('title'),
        exits: {}
      };
      r.children.forEach(c => {
        if (c.tagName === "exit") {
          let dir = c.getAttribute('direction');
          mapper.rooms[id].exits[dir] = {target : c.getAttribute('target'), weight: 1};
          if (c.getAttribute('tgarea') !== null) {mapper.rooms[id].exits[dir]["tgarea"] = c.getAttribute('tgarea')}
          /*mapper.rooms[35].exits["east"] = {target: "41", weight: 1};
          mapper.rooms = {
            "35" : {
              area: "2",
              title: "before Avechna the Avenger"
              exits: {
                "east" : {
                  target: "41",
                  weight: 1
                },
                "down" : {
                  target: "6154",
                  weight: 1,
                  tgarea: "10"
                }
              }
            }
          }*/
        }
      })
    })
  })
  .catch(error => {
    emerald.emnote(`Error parsing master map: ${error}`,'Mapper');
  });
}
