if (args.gmcp_method == "Char.Items.List") {
  let bash = client.emerald.bash
  client.emerald.debugmsg('Querying room list');
  if (bash.active) {
    args.gmcp_args.items.forEach(item => {
      //If target is on the list
      if (Object.keys(bash.targets).includes(item.name)) {
        client.emerald.debugmsg('scanning target list')
        let targetFound = false; //scan current queue for this room item
        bash.queue.forEach(t => {
          if (t.id == item.id) targetFound = true; client.emerald.debugmsg(`target identified: ${JSON.stringify(item)}`);
        });
        if (!targetFound) {
          client.emerald.debugmsg(`target ${item.id} not queued. Adding target`);
          //Push into queue at defined priority.
          bash.queue.push({
            'id': item.id, //target is attacked by id
            'alias': bash.targets[item.name].alias, //to watch for kills/shield
            'threat': bash.targets[item.name].threat //aggro priority; higher value = target sooner
          });
          client.emerald.debugmsg(JSON.stringify(bash.queue));
          bash.retarget();
          bash.try();
        }
      }
    });
    bash.try();
  }
}

if (args.gmcp_method == "Char.Items.Add" && args.gmcp_args.location == "room" && args.gmcp_args.item['attrib'].includes('m')) {
  let bash = client.emerald.bash;
  client.emerald.debugmsg(`Mob arrived ${JSON.stringify(args.gmcp_args.item)}`);
  if (bash.active) {
    let item = args.gmcp_args.item
    if (bash.targets[item.name] && !bash.queue[item.id]) {
      bash.queue.push({
        'id': item.id,
        'alias': bash.targets[item.name].alias,
        'priority': bash.targets[item.name].priority
      });
    }
  }
}

if (args.gmcp_method == "Char.Items.Remove" && args.gmcp_args.location == "room") {
  let bash = client.emerald.bash;
  if (bash.active && bash.queue.length > 0) {
    let item = args.gmcp_args.item;
    if (item.id == bash.targetid) {
      bash.queue = bash.queue.filter(i => item.id != i.id);
      if (bash.queue.length == 0) {
        client.emerald.emnote('Room cleared of targets.','Bash');
        bash.active = false;
      } else {
        bash.retarget();
      }
    }
  }
}
