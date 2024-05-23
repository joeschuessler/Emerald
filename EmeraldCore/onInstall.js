set_variable('_emerald_core_version','0.0.1');
set_variable('_emerald_core_versiondate','2024-05-01');
run_function('_emerald_core_chkupdates','Core','EmeraldCore')

function htmlChars(str) {
	return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let nexusVersion = 3
if (client.version == undefined) nexusVersion = 2;

if (nexusVersion == 3) {

  //retain old data if reset, new obj if fresh load
  client.emerald = client.emerald || {};

  var emerald = client.emerald;
  
  emerald.configs = {
    'debug': false,
    'ui_white':'silver',
    'ui_blue': 'steelblue',
    'ui_green': 'seagreen',
    'ui_yellow': 'lemonchiffon',
    'ui_orange': 'sandybrown',
    'ui_red': 'lightcoral'
  };

  emerald.cloaked = false;
  emerald.dreamform = false;
  emerald.paused = false;
  
  ['Note','Vitals','Bals','Flags','Prompt','Queue','Skills'].forEach(coreModule => {
    run_function(`emeraldCoreInit${coreModule}`,'','EmeraldCore');
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
  send_command('');

  emerald.plugins = {};
  ['Bash'].forEach(p => {
    run_function('onInstall','',`Emerald${p}`);
  }); 
} else {
  /** Handle Nexus 2 client; refer to CrystalNotices
  *
  */
}
