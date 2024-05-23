if (args.gmcp_method == "Char.Items.List") {
  let emerald = client.emerald
  emerald.debugmsg(JSON.stringify(args));
  if (emerald.bash.active) {
    args.gmcp_args.items.forEach(item => {
      //If target is on the list
      if (Object.keys(emerald.bash.targets).includes(item.name)) {
        emerald.debugmsg('scanning target list')
        let targetFound = false; //scan current queue for this room item
        emerald.bash.queue.forEach(t => {
          if (t.id == item.id) targetFound = true; emerald.debugmsg('target identified');
        });
        if (!targetFound) {
          emerald.debugmsg(`target ${item.id} not queued`);
          //Push into queue at defined priority.
          emerald.bash.queue.push({
            'id': item.id, //target is attacked by id
            'alias': emerald.bash.targets[item.name].alias, //to watch for kills
            'priority': emerald.bash.targets[item.name].priority //aggro priority
          });
          emerald.debugmsg(JSON.stringify(emerald.bash.queue));
          if (!get_variable('emerald_bash_target')) emerald.bash.retarget();
          //emerald.bash.try();
        }
      }
    });
    emerald.bash.try();
  }
}

if (args.gmcp_method == "Char.Items.Add") {
  let emerald = client.emerald;
  emerald.debugmsg(JSON.stringify(args));
  if (emerald.bash.active) {
    let item = args.gmcp_args.item
    if (emerald.bash.targets[item.name] && !emerald.bash.queue[item.id]) {
      emerald.bash.queue.push({
        'id': item.id,
        'alias': emerald.bash.targets[item.name].alias,
        'priority': emerald.bash.targets[item.name].priority
      });
    }
  }
}

if (args.gmcp_method == "Char.Items.Remove" && args.gmcp_args.location == "room") {
  let emerald = client.emerald;
  emerald.debugmsg(JSON.stringify(args));
  if (emerald.bash.active && emerald.bash.queue.length > 0) {
    let item = args.gmcp_args.item;
    let itemQueued, itemIndex;
    for (let i in emerald.bash.queue) {
      if (i.id == item.id) {
        itemQueued = true;
        itemIndex = i;
      }
    }
    if (itemQueued && itemIndex) {
      emerald.bash.queue.length > 1
        ? emerald.bash.queue[itemIndex] = emerald.bash.queue.pop()
        : emerald.bash.queue.pop();
    }
  }
}
