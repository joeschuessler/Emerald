let emerald = client.emerald;
let factions = emerald.factions = {
  name: 'EmeraldFactions',
  version: '0.1.0'
};
set_variable('emerald_factions_version', factions.version);

factions.announceNames = true;
factions.colors = {
  'Serenwilde': 'seagreen',
  'Glomdoring': 'darkviolet',
  'Celest': 'lightyellow',
  'Magnagora': 'crimson',
  'Hallifax': 'dodgerblue',
  'Gaudiguch': 'orange',
  'Divine': 'yellow',
  '(none)': 'olivedrab'
};
factions.names = get_variable('emerald_factions_names') ? JSON.parse(get_variable('emerald_factions_names')) : {};

factions.save = () => {
  set_variable('emerald_factions_colors',JSON.stringify(factions.colors));
  set_variable('emerald_factions_names',JSON.stringify(factions.names));
}
factions.add = (name) => {
  fetch(`https://api.lusternia.com/characters/${name}.json`)
  .then(res => {
    return res.json();
  }).then(data => {
    if (String(data).includes(' was not found')) {
      client.emerald.emnote(`${name} was not found. Removing from name list.`);
      delete factions.names[name];
    } else {
      let org;
      if (['Spindle','Skein','Bobbins'].includes(name) || data.level == 'Infinite') {
        org = 'Divine';
      } else {
        org = data.faction.charAt(0).toUpperCase() + data.faction.substr(1).toLowerCase();
      }
      factions.names[data.name] = org;
      client.emerald.emnote(`${data.name} is of ${org}`, 'Factions');
      factions.save();
    }
  })
}

factions.clearNames = () => {
  emerald.factions.namesEnteringArea = [];
  emerald.factions.namesLeavingArea = [];
  emerald.factions.namesEnteringMeld = []; 
  emerald.factions.namesLeavingMeld = [];
}

factions.callNames = () => {
  let nameArrays = [emerald.factions.namesEnteringArea,
                  emerald.factions.namesLeavingArea,
                  emerald.factions.namesEnteringMeld,
                  emerald.factions.namesLeavingMeld];
  let a;
  let who = '', aux = 'has', action = '';
  let ann = get_variable('emerald_config_announce');
  if (emerald.factions.announceNames) {
    for (let x=0;x <=3;x++) {
      a = nameArrays[x];
      if (a.length > 1) aux = 'have';
      while (a.length > 0) {
        if (who=='') {
          who += a.pop();
        } else {
          if (a.length > 1) {
            who += `, ${a.pop()}`;
          } else {
            who += ` and ${a.pop()}`;
          }
        }
      }
      switch (x) {
        case 0:
          action = `entered ${emerald.plugins['mapper'] ? emerald.mapper.currentArea : 'the area.'}`
          break;
        case 1:
          action = `left ${emerald.plugins['mapper'] ? emerald.mapper.currentArea : 'the area.'}`
          break;
        case 2:
          action = `entered my demesne`
          break;
        case 3:
          action = `left my demesne`
          break;
      }
      if (who != '') send_command(`${ann} ${who} ${aux} ${action}`);
      a = [];
      who = ''
    }
  }
}

factions.onPrompt = () => {
  factions.callNames();
  factions.clearNames();
}

emerald.plugins['factions'] = factions;
client.emerald.emnote(`${factions.name} v${factions.version} initialised.`);
if (!emerald.factions.enemies) {
  get_variable('emerald_factions_enemies')
    ? emerald.factions.enemies = JSON.parse(get_variable('emerald_factions_enemies'))
    : send_command('enemies');
}
factions.clearNames();