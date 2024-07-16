function htmlChars(str) {
	return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let nexusVersion = 3
if (client.version == undefined) nexusVersion = 2;

if (nexusVersion == 3) {

  client.emerald = client.emerald || {
    name: 'EmeraldCore',
    version: '0.1.0'
  };
  var emerald = client.emerald;

  set_variable('emerald_core_version',emerald.version);
  emerald.vitals = {};
  
  emerald.configs = {
    'debug': false,
    'ui_white':'silver',
    'ui_blue': 'steelblue',
    'ui_green': 'seagreen',
    'ui_yellow': 'lemonchiffon',
    'ui_orange': 'sandybrown',
    'ui_red': 'lightcoral',
    armBals: get_variable('emerald_configs_armbals') || 'auto',
    legBals: get_variable('emerald_configs_legbals') || 'auto',
    psiBals: get_variable('emerald_configs_psibals') || 'auto',
    tea: ''
  };

  set_variable('emerald_configs_armbals',emerald.configs.armBals);
  emerald.showArmBals = ['on','auto'].includes(emerald.configs.armBals);
  set_variable('emerald_configs_legbals',emerald.configs.legBals);
  emerald.showLegBals = ['on','auto'].includes(emerald.configs.legBals)
  set_variable('emerald_configs_psibals',emerald.configs.psiBals);
  emerald.showPsiBals = ['on','auto'].includes(emerald.configs.psiBals)
  
  emerald.cloaked = false;
  emerald.dreamform = false;
  emerald.paused = false;
  emerald.showKataStance = false;
  emerald.showEflow = false;
  emerald.subLocked = false;
  emerald.superLocked = false;
  emerald.idLocked = false
  emerald.beastFollowing = false;
  
  let coremodules = ['Note','Vitals','Bals','Flags','Prompt','Queue','Skills'];

  coremodules.forEach(cm => {
    run_function(`emeraldCoreInit${cm}`,'','EmeraldCore');
  });
               
  
  emerald.wounds = {};
  emerald.defs = [];

  // Used to parse and concat a series of strings with various color sets into a single output
  emerald.html_parse = (...args) => {
    let fg, bg;
    let output = '';
    for (let i = 0; i < args.length; i += 3) {
      let text = htmlChars(args[i]);
      let link = '';
        if (text.startsWith('«') && text.includes('»')) {
          let a = text.split('»');
          link = a[0].substring(1);
          text = a[1];
        }
        i+1 < args.length ? fg = args[i+1] : fg = 'grey';
        i+2 < args.length ? bg = args[i+2] : bg = 'black';
        if (link != '') output += `<a class="mxp.send" href="#" rel="${link}">`;
        output += `<span style="color:${fg};`;
        if (bg != 'black') output += ` background-color:${bg};`;
        output += `">${text}</span>`;
        if (link != '') output += '</a>';
    }
    return output;
  };
  
  // Outputs an Emerald system notice using html
  emerald.emnote = (str, tag='Emerald') => {
    emerald.note.clear();
    emerald.note.build(`[${tag}]:`,'silver','seagreen',' ','silver','',`${str}`,emerald.configs.ui_white,'');
    emerald.note.display();
  }

  // Shorthand function for wrapping debug messages in emnote();
  emerald.debugmsg = (str) => {
    if (emerald.configs.debug) emerald.emnote(str,'Debugs');
  }

  run_function('emeraldSplash','','EmeraldCore');
  emerald.emnote('Emerald Core v'+get_variable('_emerald_core_version')+' initialised.');
  emerald.plugins = {};
  ['Bash','Factions','Mapper','Affs','Influence'].forEach(p => {
    run_function('onInstall','',`Emerald${p}`);
  });
} else {
  /** Handle Nexus 2 client; refer to CrystalNotices
  *
  */
}