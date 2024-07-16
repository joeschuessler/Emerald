if (args.gmcp_method == "Char.Items.List") {
  let bash = client.emerald.bash
  if (bash.active) {
    bash.queue = [];
    bash.noTargetCount = 0;
    bash.targetalias = '';
    bash.targetid = '';
    args.gmcp_args.items.forEach(item => {
      //If target is on the list
      if (Object.keys(bash.targets).includes(item.name) && !item.attrib.includes('t')) {
        client.emerald.debugmsg(`target ${item.id} not queued`);
        //Push into queue at defined priority.
        bash.queue.push({
          'id': item.id, //target is attacked by id
          'alias': bash.targets[item.name].alias, //to watch for kills/shield
          'threat': bash.targets[item.name].threat //aggro priority; higher value = target sooner
        });
        client.emerald.debugmsg(JSON.stringify(bash.queue));
      }
    });
    bash.retarget();
    bash.try();
  }
}

if (args.gmcp_method == "Char.Items.Add" && args.gmcp_args.location == "room") {
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
    if (bash.mode == 'wait') bash.retarget();
  }
}

if (client.emerald.bash.active && (args.gmcp_method == "Char.Items.Remove" || args.gmcp_method == 'Char.Items.Update') && args.gmcp_args.location == "room") {
  client.emerald.bash.remove(args.gmcp_args.item.id);
}
