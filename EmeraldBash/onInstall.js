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
    if (bash.queue.length > 0){
      let cmd = '';
      emerald.flags.get('targetshielded') 
        ? cmd = get_variable('emerald_bash_raze') == 'rune' 
          ? get_variable('emerald_bash_attack') 
          : get_variable('emerald_bash_raze') 
        : cmd = get_variable('emerald_bash_attack');
      emerald.debugmsg(`attempting bash command: ${cmd}`);
      if (emerald.bals.onbal) {
        emerald.flags.set('tryingBash',true,250);
        if (get_variable('emerald_bash_beastatk')=='true' && emerald.bals.B) emerald.queue.add(`beast order attack ${bash.targetalias + bash.targetid}`,true);
        send_command(cmd.replace('@',bash.targetalias).replace('#',bash.targetid));
      } 
    } else if (emerald.flags.get('gettingGMCP')) {
      setTimeout(() => {bash.try()}, 300);
    } else if (bash.mode == 'room') {
      emerald.emnote('No targets found.','Bash');
      bash.active = false;
    } else if (bash.noTargetCount >= 2) {
      bash.retarget();
    }
  }
}
bash.retarget = () => {
  if (bash.queue.length > 0) {
    //start scanning queue at 0
    emerald.emnote(`${bash.queue.length} target${bash.queue.length > 1 ? 's' : ''} remaining.`, 'Bash');
    let targetIndex = 0
    if(bash.queue.length > 1) {
      let currentThreat = bash.queue[targetIndex].threat;
      for (let t in bash.queue) {
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

bash.remove = (id) => {
  let bash = client.emerald.bash;
  if (bash.active) {
    bash.queue = bash.queue.filter(i => i.id != id);
    if (bash.queue.length == 0 && bash.mode != 'wait') {
      client.emerald.emnote('Room cleared of targets.','Bash');
      bash.active = false;
    } else {
      bash.retarget();
    }
  }
}

bash.onPrompt = () => {
  if (bash.active) bash.try();
}

bash.reset();
emerald.plugins['bash'] = bash;
run_function('initTargetList','','EmeraldBash');
client.emerald.emnote(`${bash.name} v${bash.version} initialised.`);