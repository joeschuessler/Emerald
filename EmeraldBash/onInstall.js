let emerald = client.emerald;
let bash = emerald.bash = {
  name: 'EmeraldBash',
  version: '0.1.0',
};
set_variable('emerald_bash_version', bash.version);

bash.reset = () => {
  bash.active = false;
  bash.mode = 'none';
  bash.queue = [];
  bash.noTargetCount = 0;
  bash.targetalias = '';
  bash.targetid = '';
}

bash.try = () => {
  if (!emerald.flags.get('tryingBash')) {
    if (bash.queue.length > 0) {
      let cmd = '';
      emerald.flags.get('targetshielded') 
        ? cmd = get_variable('emerald_bash_raze') == 'rune' 
          ? get_variable('emerald_bash_attack') 
          : get_variable('emerald_bash_raze') 
        : cmd = get_variable('emerald_bash_attack');
      if (emerald.bals.onbal && (emerald.plugins.affs ? !emerald.affs.has('entangled') : true)) {
        emerald.flags.set('tryingBash',true,250);
        let atk = cmd.replace('@',bash.targetalias).replace('#',bash.targetid)
        emerald.debugmsg(`attempting bash command: ${atk}`);
        send_command(`sm replace 1 ${get_variable('emerald_bash_beastatk') && emerald.bals.B ? `beast order attack ${bash.targetalias}|` : ''}${atk}`);
      } 
    } else if (emerald.flags.get('gettingGMCP')) {
      setTimeout(() => {bash.try()}, 300);
    } else if (bash.noTargetCount >= 3) {
      bash.retarget();
    } else if (bash.mode != 'wait') {
      emerald.emnote('No targets found.','Bash');
      bash.active = false;
    }
  }
}
bash.retarget = () => {
  if (bash.queue.length > 0) {
    bash.noTargetCount = 0;
    //start scanning queue at 0
    emerald.emnote(`${bash.queue.length} target${bash.queue.length > 1 ? 's' : ''} remaining.`, 'Bash');
    let targetIndex = 0
    if(bash.queue.length > 1) {
      let currentThreat = bash.queue[targetIndex].threat;
      for (let t=0;t<bash.queue.length;t++) {
        //If any target in the queue has a higher threat, that resets the bar.
        if (bash.queue[t].threat > currentThreat) {
          targetIndex = t;
          currentThreat = bash.queue[t].threat;
        }
      } //next t
    }
    bash.targetid = bash.queue[targetIndex].id;
    bash.targetalias = bash.queue[targetIndex].alias;
    bash.try();
  } else {
    if (bash.mode != 'wait') bash.active = false;
  }
}

bash.add = (item) => {
  bash.queue.push({
    'id': item.id, //target is attacked by id
    'alias': bash.targets[item.name].alias, //to watch for kills/shield
    'threat': bash.targets[item.name].threat //aggro priority; higher value = target sooner
  });
  bash.retarget();
}

bash.remove = (id) => {
  let bash = client.emerald.bash;
  bash.queue = bash.queue.filter(i => i.id != id);
  if (bash.queue.length == 0) {
    client.emerald.emnote('Room cleared of targets.','Bash');
    if (bash.mode != 'wait') bash.active = false;
  }
  bash.retarget();
}

bash.onPrompt = () => {
  if (bash.active && (emerald.plugins.affs ? !emerald.affs.has('aeon') : true)) bash.try();
}

bash.reset();
emerald.plugins['bash'] = bash;
run_function('initTargetList','','EmeraldBash');
client.emerald.emnote(`${bash.name} v${bash.version} initialised.`);