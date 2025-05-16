let emerald = client.emerald
var mapper = emerald.mapper = {
  name:'EmeraldMapper',
  version:'0.0.1',
  rooms: {},
  areas: {}
};

mapper.chase = false;
mapper.elevation = 'ground';
mapper.currentArea = '';
mapper.currentRoom = '';
mapper.currentPlane = '';

if (get_variable('emerald_mapper_roomweights')) {
  mapper.roomWeights = JSON.parse(get_variable('emerald_mapper_roomweights')) 
} else {
  mapper.roomWeights = {
    931: 999, //prime seren nexus
    1337: 999, //prime glom nexus
    4136: 999, //prime mag nexus
    4555: 999, //celestia nexus
    4607: 999, //nil nexus
    4685: 999, //water nexus
    4710: 999, //etherseren nexus
    4847: 999, //etherglom nexus
    4865: 999, //earth nexus
    11152: 999, //prime halli nexus
    11401: 999, //prime gaudi nexus
    19519: 999, //continuum nexus
    19526: 999, //vortex nexus
    19663: 999, //fire nexus
    19765: 999 //air nexus
  }
}

mapper.getArea = (vnum) => {
  return mapper.areas[mapper.rooms[vnum].area];
}

mapper.scentName = (name, roomName) => {
  let rooms = mapper.rooms;
  let foundRoom = false;
  for (const r of Object.keys(rooms)) {
    if (rooms[r].title.toLowerCase() == roomName.toLowerCase()) {
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
      if (mapper.chase && name.toLowerCase().startsWith(get_variable('emerald_mapper_scenttarget').toLowerCase())) {
        emerald.debugmsg('scenttarget found');
        send_command(`path track ${r}`);
        set_variable('emerald_mapper_scenttarget','');
        mapper.chase = false;
      }
      foundRoom = true;
    }
    if (foundRoom) break;
  }
}

mapper.findRoom = (roomName) => {
  //let rooms = mapper.mapxml.querySelectorAll("room");
  let rooms = mapper.rooms;
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${Object.keys(rooms).length} rooms for "`,emerald.configs.ui_white,'');
  emerald.note.build(roomName, emerald.configs.ui_green, '', '"...',emerald.configs.ui_white,'');
  emerald.note.display();
  let foundRooms = 0;
  for (const r of Object.keys(rooms)) {
    if (rooms[r].title.toLowerCase().includes(roomName.toLowerCase())) {
      let area = mapper.getArea(r);
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' [','silver','');
      emerald.note.build(`«path track ${r}»v${r}`,emerald.configs.ui_green,'',']: ',emerald.configs.ui_white,'');
      emerald.note.build(rooms[r].title,emerald.configs.ui_white,'');
      emerald.note.build(' [',emerald.configs.ui_blue,'', area,emerald.configs.ui_green,'',']',emerald.configs.ui_blue,'');
      emerald.note.display();
      foundRooms++;
    }
  }
  if (foundRooms == 0) {
    emerald.emnote('ROOM NOT FOUND!','Mapper');
    emerald.note.clear();
  } else {
    emerald.emnote(`Found ${foundRooms} matching rooms.`,'Mapper');
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
  let r = mapper.mapxml.querySelector(`room#${origin}`)
}

mapper.onPrompt = () => {
  reflex_disable(reflex_find_by_name('trigger','emerald_mapper_scent'));
}

emerald.plugins['mapper'] = mapper;
mapper.saveRoomWeights();
run_function('loadMap','','EmeraldMapper');
client.emerald.emnote(`${mapper.name} v${mapper.version} initialised.`);

/* New WIP version
let emerald = client.emerald
var mapper = emerald.mapper = {
  name:'EmeraldMapper',
  version:'0.0.1',
  rooms: {},
  areas: {},
  distances: {},
  parents: {},
  chase: false,
  elevation: 'ground',
  currentArea: '',
  currentRoom: '',
  currentPlane: ''
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
      if (emerald.flags.get('scentgo') && name.toLowerCase() == get_variable('emerald_mapper_scenttarget')) {
        emerald.debugmsg('scenttarget found');
        send_command(`path track ${r}`);
        set_variable('emerald_mapper_scenttarget','');
      }
      foundRoom = true;
    }
    if (foundRoom) break;
  }
}

mapper.findRoom = (roomName) => {
  //let rooms = mapper.mapxml.querySelectorAll("room");
  let rooms = mapper.rooms;
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${Object.keys(rooms).length} rooms for "`,emerald.configs.ui_white,'');
  emerald.note.build(roomName, emerald.configs.ui_green, '', '"...',emerald.configs.ui_white,'');
  emerald.note.display();
  let foundRooms = 0;
  for (const r of Object.keys(rooms)) {
    if (rooms[r].title.toLowerCase().includes(roomName.toLowerCase())) {
      let area = mapper.getArea(r);
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' [','silver','');
      emerald.note.build(`«path track ${r}»v${r}`,emerald.configs.ui_green,'',']: ',emerald.configs.ui_white,'');
      emerald.note.build(rooms[r].title,emerald.configs.ui_white,'');
      emerald.note.build(' [',emerald.configs.ui_blue,'', area,emerald.configs.ui_green,'',']',emerald.configs.ui_blue,'');
      emerald.note.display();
      foundRooms++;
    }
  }
  if (foundRooms == 0) {
    emerald.emnote('ROOM NOT FOUND!','Mapper');
    emerald.note.clear();
  } else {
    emerald.emnote(`Found ${foundRooms} matching rooms.`,'Mapper');
  }
}

mapper.saveRoomWeights = () => {
  set_variable('emerald_mapper_roomweights',JSON.stringify(mapper.roomWeights));
}

mapper.setRoomWeight = (vnum, value) => {
  mapper.roomWeights[vnum] = value;
  mapper.saveRoomWeights();
}

mapper.scanRoom = (explored, unexplored, currentVnum, currentDistance) => {
  let r = mapper.rooms
  for (let e of r[currentRoom].exits) {
    if (!unexplored.includes(e.target) && !explored.includes(e.target)) {
      unexplored.push(e.target);
      mapper.distances[e.target] = currentDistance + r[e.target].weight;
      mapper.parents[e.target] = currentRoom;
    } else if (unexplored.includes(e.target) && mapper.distances[e.target] > currentDistance + r[e.target].weight) {
      mapper.distances[e.target] = currentDistance + r[e.target].weight;
      mapper.parents[e.target] = currentVnum;
    }
  }
  //current room is explored
  explored.push(currentVnum);
  //remove room from unexplored rooms
  unexplored.shift();
}

mapper.getPath = (origin, dest) => {
  let explored = [];
  let unexplored = [origin];
  let path = [];
  mapper.distances = {[origin]:0}
  mapper.parents = {};

  let currentVnum = origin;

  while (unexplored.length > 0) {
    explored.push(currentVnum);
    currentVnum = unexplored[0];
    mapper.scanRoom(explored, unexplored, currentVnum, mapper.distances[currentVnum]);
  }


}

mapper.getDir = (orig,dest) => {
  let xlate = {
    'up':'u','down':'d','in':'in','out':'out',
    'north':'n','northeast':'ne','east':'e','southeast':'se',
    'south':'s','southwest':'sw','west':'w','northwest':'nw'
  }
  for (const [dir,target] of Object.entries(mapper.rooms[orig].exits)) {
    if (target == dest) {
      return xlate[dir];
    }
  }
}

mapper.onPrompt = () => {
  reflex_disable(reflex_find_by_name('trigger','emerald_mapper_scent'));
}

emerald.plugins['mapper'] = mapper;
mapper.saveRoomWeights();
run_function('loadMap','','EmeraldMapper');
client.emerald.emnote(`${mapper.name} v${mapper.version} initialised.`);*/