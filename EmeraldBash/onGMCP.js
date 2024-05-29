if (args.gmcp_method == "Char.Items.List") {
  let bash = client.emerald.bash
  client.emerald.debugmsg(JSON.stringify(args));
  if (bash.active) {
    args.gmcp_args.items.forEach(item => {
      //If target is on the list
      if (Object.keys(bash.targets).includes(item.name)) {
        client.emerald.debugmsg('scanning target list')
        let targetFound = false; //scan current queue for this room item
        bash.queue.forEach(t => {
          if (t.id == item.id) targetFound = true; client.emerald.debugmsg('target identified');
        });
        if (!targetFound) {
          client.emerald.debugmsg(`target ${item.id} not queued`);
          //Push into queue at defined priority.
          bash.queue.push({
            'id': item.id, //target is attacked by id
            'alias': bash.targets[item.name].alias, //to watch for kills/shield
            'priority': bash.targets[item.name].priority //aggro priority; higher value = target sooner
          });
          client.emerald.debugmsg(JSON.stringify(bash.queue));
          //if (!get_variable('emerald_bash_target')) emerald.bash.retarget();
          //emerald.bash.try();
        }
      }
    });
    bash.try();
  }
}

if (args.gmcp_method == "Char.Items.Add") {
  let bash = client.emerald.bash;
  client.emerald.debugmsg(JSON.stringify(args));
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
  client.emerald.debugmsg(JSON.stringify(args));
  if (bash.active && bash.queue.length > 0) {
    let item = args.gmcp_args.item;
    let itemQueued, itemIndex;
    for (let i in bash.queue) {
      if (i.id == item.id) {
        itemQueued = true;
        itemIndex = i;
      }
    }
    if (itemQueued && itemIndex) {
      bash.queue.length > 1
        ? bash.queue[itemIndex] = bash.queue.pop()
        : bash.queue.pop();
    }
  }
}
