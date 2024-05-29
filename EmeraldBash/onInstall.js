let emerald = client.emerald;
let bash = emerald.bash = {
  name: 'EmeraldBash',
  version: '0.0.1.20240528',
};

bash.reset = () => {
  bash.active = false;
  bash.mode = 'none';
  bash.queue = [];
  bash.noTargetCount = 0;
  bash.targetname = '';
  bash.targetid = '';
}


bash.try = () => {
  if (bash.active && !emerald.flags.get('tryingBash')) {
    if (bash.queue.length > 0){
      let cmd = '';
      emerald.flags.get('targetshielded') ? cmd = get_variable('emerald_bash_raze') : cmd = get_variable('emerald_bash_attack');
      emerald.debugmsg(`attempting bash command: ${cmd}`);
      if (emerald.bals.onbal) {
        emerald.flags.set('tryingBash',true,1500);
        if (get_variable('emerald_bash_beastatk')=='true' && emerald.bals.B) emerald.queue.add(`beast order attack ${bash.targetname + bash.targetid}`,true);
        emerald.queue.add(cmd.replace('@',bash.targetname).replace('#',bash.targetid));
      } 
    } else {
      emerald.emnote('No targets found.','Bash');
      bash.reset();
      emerald.prompt.onPrompt();
    }    
  }
}
bash.retarget = () => {
  if(bash.queue.length > 0) {
    //start scanning queue at 0
    let targetIndex = 0
    if(bash.queue.length > 1) {
      var currentPriority = bash.queue[targetIndex].priority;
      for (let t in bash.queue) {
        //If any target in the queue has a higher priority, that resets the bar.
        if (bash.queue[t].priority > currentPriority) {
          targetIndex = t;
          currentPriority = bash.queue[t].priority;
        }
      } //next t
    }
    bash.targetid = bash.queue[targetIndex].id;
    bash.targetalias = bash.queue[targetIndex].alias;
    bash.try();
  }
}

bash.remove = (id) => {
  emerald.debugmsg(`Removing target ${id}`);
  for (let t in bash.queue) {
    if (bash.queue[t].id == id) {
      if (t == bash.queue.length-1) {
        bash.queue.pop();
      } else {
        bash.queue[t] = bash.queue.pop();
      }
    }
  }
  if (bash.queue.length > 0) {
    bash.retarget();
  } else {
    if (bash.mode == 'room') emerald.emnote('Room cleared.','Bash');
    bash.reset();
  }
  emerald.debugmsg(`Remaining queue: ${JSON.stringify(bash.queue)}`);
}

bash.reset();
emerald.plugins['bash'] = true;
run_function('initTargetList','','EmeraldBash');
client.emerald.emnote(`${bash.name} v${bash.version} initialised.`);