let emerald = client.emerald
var mapper = emerald.mapper = {
  name:'EmeraldMapper',
  version:'0.0.1',
  rooms: {},
  areas: {}
};

if (get_variable('emerald_mapper_roomweights')) {
  mapper.roomWeights = JSON.parse(get_variable('emerald_mapper_roomweights')) 
} else {
  mapper.roomWeights = {
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
    19765: 999 //air
  }
}

if (get_variable('emerald_mapper_customexits')) {
  mapper.customExits = JSON.parse(get_variable('emerald_mapper_customexits'));
} else {
  mapper.customExits = {};
}

mapper.getArea = (vnum) => {
  return mapper.areas[mapper.rooms[vnum].area];
}

mapper.scentGo = (name, roomName) => {
  let rooms = mapper.rooms;
  let foundRoom = false;
  for (const r of Object.keys(rooms)) {
    if (rooms[r].title.toLowerCase() == roomName.toLowerCase()) {
      emerald.debugmsg(JSON.stringify(rooms[r],null,2))
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
      if (emerald.plugins['factions'] && emerald.factions.names[name]) {
        emerald.note.build(name,emerald.factions.colors[emerald.factions.names[name]],'',': ',emerald.configs.ui_white,'');
      } else {
        emerald.note.build(`${name}: `,emerald.configs.ui_white,'');
      }
      emerald.note.build(`${rooms[r].title} `,emerald.configs.ui_white,'');
      emerald.note.build('[',emerald.configs.ui_white,'',`«path track ${r}»v${r}`,emerald.configs.ui_green,'',']',emerald.configs.ui_white,'');
      emerald.note.display();
      if (emerald.flags.get('scentgo') && name.toLowerCase().startsWith(get_variable('emerald_mapper_scenttarget'))) {
        emerald.debugmsg('scenttarget found');
        send_command(`path track ${r}`);
        set_variable('emerald_mapper_scenttarget','');
      }
      foundRoom = true;
    }
    if (foundRoom) break;
  }
}

Object.filter = (o,p) => {
  Object.keys(o).filter(k => p(o[k])).reduce((r,k)=> Object.assign(r, {[k]:o[k]}, {}));
}

mapper.findAllRooms = (roomName) => {
  //let rooms = mapper.mapxml.querySelectorAll("room");
  let rooms = mapper.rooms;
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${Object.keys(rooms).length} rooms for "`,emerald.configs.ui_white,'');
  emerald.note.build(roomName, emerald.configs.ui_green, '', '"...',emerald.configs.ui_white,'');
  emerald.note.display();
  let foundRooms = Object.filter(rooms, r=>r.title.toLowerCase().includes(roomName.toLowerCase()));
  if (Object.keys(foundRooms).length == 0) {
    emerald.emnote('Room not found.','Mapper');
    emerald.note.clear();
  } else {
    for (const r of Object.keys(foundRooms)) {
      let area = mapper.findArea(r);
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' [','silver','');
      emerald.note.build(`«path track ${r}»v${r}`,emerald.configs.ui_green,'',']: ',emerald.configs.ui_white,'');
      emerald.note.build(rooms[r].title + ' ',emerald.configs.ui_white,'');
      emerald.note.build('[',emerald.configs.ui_blue,'',area,emerald.configs.ui_green,'',']',emerald.configs.ui_blue,'');
      emerald.note.display();
      emerald.emnote(`Found ${Object.keys(foundRooms).length} matching rooms.`,'Mapper');
    }
  }
}

mapper.saveRoomWeights = () => {
  set_variable('emerald_mapper_roomweights',JSON.stringify(mapper.roomWeights));
}

mapper.setRoomWeight = (vnum, value) => {
  mapper.roomWeights[vnum] = value;
  mapper.saveRoomWeights();
}

mapper.getPath = (origin, dest) => {
}

mapper.onPrompt = () => {
  return true;
}

emerald.plugins['mapper'] = mapper;
mapper.saveRoomWeights();
run_function('loadMap','','EmeraldMapper');
client.emerald.emnote(`${mapper.name} v${mapper.version} initialised.`);