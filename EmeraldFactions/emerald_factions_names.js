/**
 * Script component of the emerald_factions_names trigger. Will split and parse every word of every line
 * Trigger line: ^.*?$
 */

let factions = client.emerald.factions
const words = [...args[0].matchAll(/\b(.+?)\b/gi)];
words.forEach(w => {
  if (factions.names.hasOwnProperty(w[0])) {
    colorize_current_line(w.index,w[0].length,factions.colors[factions.names[w[0]]])
  }
})