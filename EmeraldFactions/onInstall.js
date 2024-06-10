let emerald = client.emerald;
let factions = emerald.factions = {
  name: 'EmeraldFactions',
  version: '0.0.2'
};

factions.colors = {
  'Serenwilde': 'seagreen',
  'Glomdoring': 'darkviolet',
  'Celest': 'lightyellow',
  'Magnagora': 'crimson',
  'Hallifax': 'dodgerblue',
  'Gaudiguch': 'orange',
  'Divine': 'yellow',
  '(none)': 'olivedrab'
};
const isAlpha = (c) => (c >= 65 && c < 91) || (c >= 97 && c < 123)

class TreeNode {
  constructor() {
    this.children = {};
    this.color = null;
    this.output = null;
  }
}

class Tree {
  constructor() {
    this.root = new TreeNode();
  }

  insert(word, color) {
    let node = this.root;
    for (let c of word.toLowerCase()) {
      if (!node.children[c]) {
        node.children[c] = new TreeNode();
      }
      node = node.children[c];
    }
    node.color = color;
    node.output = word;
  }

  search(line) {
    let node = this.root;
    let results = [];

    for (let i = 0; i < line.length; i++) {
      let c = line[i].toLowerCase();
      node = node.children[c]; //move pointer down the node chain
      if (!node) { //end of chain found
        node = this.root; //go back to root of tree
        while (i < line.length && isAlpha(line.charCodeAt(i))) i++; //Skipping past non-alpha chars
        continue;
      }

      //if we've reached the end of the word or line, and the node has an output value, then it's a name with a color
      if (node.output && ((i+1) >= line.length || !isAlpha(line.charCodeAt(i+1)))) { 
        const word = node.output;
        let start = i - word.length + 1;
        if (start === 0 || isAlpha(line.charCodeAt(c))) {
          results.push({
            index: start,
            length: word.length,
            color: node.color
          });
        }
      }
    }
    return results;
  }
}

const rawNames = get_variable('emerald_factions_namesjson');
if (rawNames) {
  const names = JSON.parse(rawNames);
  const tree = new Tree();
  for (let [substring, color] of Object.entries(names)) {
    tree.insert(substring, color);
  }
  emerald.factions.NameManager = tree;
}


/* CHANGES INCOMPLETE!! DO NOT PUSH TO NEXUS YET!! */




//factions.names = get_variable('emerald_factions_names') ? JSON.parse(get_variable('emerald_factions_names')) : {};

factions.save = () => {
  set_variable('emerald_factions_colors',JSON.stringify(factions.colors));
  set_variable('emerald_factions_names',JSON.stringify(factions.names));
}
factions.add = (name) => {
  fetch(`https://api.lusternia.com/characters/${name}.json`)
  .then(res => {
    return res.json();
  }).then(data => {
    if (String(data).includes(' was not found')) {
      client.emerald.emnote(`${name} was not found. Removing from name list.`);
      delete factions.names[name];
    } else {
      let org;
      if (['Spindle','Skein','Bobbins'].includes(name) || data.level == 'Infinite') {
        org = 'Divine';
      } else {
        org = data.faction.charAt(0).toUpperCase() + data.faction.substr(1).toLowerCase();
      }
      factions.names[data.name] = org;
      client.emerald.emnote(`${data.name} is of ${org}`, 'Factions');
      factions.save();
    }
  })
}
emerald.plugins['factions'] = true;
client.emerald.emnote(`${factions.name} v${factions.version} initialised.`);