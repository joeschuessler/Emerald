let emerald = client.emerald;

emerald.bash = {};

emerald.bash.reset = () => {
  emerald.bash.active = false;
  emerald.bash.mode = 'none';
  emerald.bash.queue = [];
  emerald.bash.noTargetCount = 0;
  set_variable('emerald_bash_target','');
}


emerald.bash.try = () => {
  if (emerald.bash.active && !emerald.flags.get('tryingBash')) {
    if (emerald.bash.queue.length > 0){
      let cmd = '';
      emerald.flags.get('targetshielded') ? cmd = get_variable('emerald_bash_raze') : cmd = get_variable('emerald_bash_attack');
      emerald.debugmsg(`attempting bash command: ${cmd}`);
      if (emerald.bals.onbal) {
        emerald.flags.set('tryingBash',true,1500);
        if (get_variable('emerald_bash_beastatk')=='true' && emerald.bals.B) emerald.queue.add(`beast order attack ${get_variable('target')}`,true);
        emerald.queue.add(cmd.replace('@',get_variable('emerald_bash_target')));
      } 
    } else {
      emerald.emnote('No targets found.','Bash');
      emerald.bash.reset();
      emerald.prompt.onPrompt();
    }    
  }
}
emerald.bash.retarget = () => {
  if(emerald.bash.queue.length > 0) {
    //start scanning queue at 0
    let targetIndex = 0
    if(emerald.bash.queue.length > 1) {
      var currentPriority = emerald.bash.queue[targetIndex].priority;
      for (let t in emerald.bash.queue) {
        //If any target in the queue has a higher priority, that resets the bar.
        if (emerald.bash.queue[t].priority > emerald.bash.queue[targetIndex].priority) {
          targetIndex = t;
          currentPriority = emerald.bash.queue[t].priority;
        }
      } //next t
    }
    set_variable('emerald_bash_target',emerald.bash.queue[targetIndex].id);
    set_variable('emerald_bash_targetalias',emerald.bash.queue[targetIndex].alias);
    //emerald.bash.try();
  }
}

emerald.bash.remove = (id) => {
  emerald.debugmsg(`Removing target ${id}`);
  for (let t in emerald.bash.queue) {
    if (emerald.bash.queue[t].id == id) {
      if (t == emerald.bash.queue.length-1) {
        emerald.bash.queue.pop();
      } else {
        emerald.bash.queue[t] = emerald.bash.queue.pop();
      }
    }
  }
  if (emerald.bash.queue.length > 0) {
    emerald.bash.retarget();
  } else {
    if (emerald.bash.mode == 'room') emerald.emnote('Room cleared.','Bash');
    emerald.bash.reset();
  }
  emerald.debugmsg(`Remaining queue: ${JSON.stringify(emerald.bash.queue)}`);
}

emerald.bash.reset();
emerald.plugins['bash'] = true;
run_function('initTargetList','','EmeraldBash');
client.emerald.emnote('EmeraldBash plugin initialised');