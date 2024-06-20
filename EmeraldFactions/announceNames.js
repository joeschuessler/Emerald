let emerald = client.emerald;
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
          who += `and ${a.pop()}`;
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
    who = '';
  }
}