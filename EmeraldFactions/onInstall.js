let emerald = client.emerald;
let factions = emerald.factions = {
  name: 'EmeraldFactions',
  version: '0.0.1.20240528'
};

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
emerald.plugins['factions'] = true;
client.emerald.emnote(`${factions.name} v${factions.version} initialised.`);