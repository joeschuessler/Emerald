if (args.gmcp_method == "Char.Items.List" && args.gmcp_args.location == 'room' && client.emerald.mapper.currentPlane == 'the Aetherways') {
  client.emerald.ship.module = 'none';
//TODO: Cache ship module IDs for easy aliases

  args.gmcp_args.items.forEach(item => {
    if (item.name == 'the command chair') client.emerald.ship.module = 'chair';
    else if (item.name == 'the empathic grid') client.emerald.ship.module = 'grid';
    else if (item.name == 'a battle turret') client.emerald.ship.module = 'turret';
    else if (item.name == 'an energy collector') client.emerald.ship.module = 'collector';
  });
}