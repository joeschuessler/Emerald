if (client.emerald.factions.NameManager) {
  nexus.current_block.forEach(l => {
    const names = client.emerald.factions.NameManager.search(line.parsed_line.text());
    for (const name of names) {
      line.parsed_line.colorize(name.index, name.index + name.length, name.color);
    }
  })
}