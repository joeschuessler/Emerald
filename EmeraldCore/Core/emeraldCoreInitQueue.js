function QueueManager(core) {
  this.q = [];
  this.qf = [];
  this.repeat = false;
  this.core = core;
}

QueueManager.prototype.add = (cmd, free = false) => {
  if (free) {
    this.core.debugmsg(`Action queued free - ${cmd}`);
    queue.qf.push(cmd);
  } else {
    emerald.debugmsg(`Action queued - ${cmd}`);
    queue.q.push(cmd);
  }
}

QueueManager.prototype.run = () => {
  if (emerald.paused || !(queue.q.length > 0 || queue.qf.length > 0)) return;

  //Roadmap: beastbal and mounted status
  let cmds = [];
  if (emerald.bals.onbal) {
    while (queue.qf.length > 0) {
      cmds.push(queue.qf.shift());
    }
    if (queue.q.length > 0 && !emerald.flags.get('tryqueue')) {
      let curCmd = queue.q.shift();
      cmds.push(curCmd);
      if (queue.repeat) queue.q.push(curCmd);
      emerald.flags.set('tryqueue',true,250);
    }
    while (cmds.length > 0) send_command(cmds.shift());
  }
}

queue.reset = () => {
  queue.q = [];
  queue.qf = [];
  queue.repeat = false;
  emerald.emnote('Action queues reset!');
}