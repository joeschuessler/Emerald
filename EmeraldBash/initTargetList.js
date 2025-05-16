let emerald = client.emerald;

emerald.bash.targets = {

  //
  'a mighty quinotaur':{alias: 'quinotaur', threat:0},
  'an anglerfish':{alias: 'anglerfish', threat:0},
  'a marine rockeater':{alias: 'rockeater', threat:0},
  'a grinning gulper eel':{alias: 'gulper', threat:0},
  'a sinuous dragonfish':{alias: 'dragonfish',threat:0},
  'a blue-ringed octopus':{alias: 'octopus', threat:0},

  //Grimkeep
  'a stonewrought sentinel':{alias: 'sentinel', threat:1},
  'a misshapen koirakko':{alias: 'koirakko', threat: 2},
  'a putrescent excoropox':{alias: 'excoropox', threat: 3},
  'a ghostly battlecharger':{alias: 'battlecharger', threat:4},
  'a spectral artificer':{alias: 'artificer', threat:5},

  //Astral beasts
  'a ravenous fesix': {alias:'fesix', threat: 1},
  'a robed obesefessor': {alias:'obesefessor', threat: 1},
  'an emaciated virgin': {alias:'virgin', threat: 1},
  'a gargantuan red scorpion': {alias:'scorpion', threat: 1},
  'a floating urn': {alias:'urn', threat: 1},
  'a hulking three-horned bull': {alias:'bull', threat: 1},
  'a two-headed eagle': {alias:'eagle', threat: 1},
  'a bloated parasite': {alias:'parasite', threat: 1},
  'a two-headed abhorrence': {alias:'abhorrence', threat: 1},
  'a sadistic mitran': {alias:'mitran', threat: 1},
  'a stainless steel goat': {alias:'goat', threat: 1},
  'a monstrous lobstrosity': {alias:'lobstrosity', threat: 1},

  //Domoth beasts
  'a king of justice': {alias:'justice', threat:1},
  'a lost soul of death': {alias:'death', threat:1},
  'a radiant defender of life': {alias:'life', threat:1},
  'a willowy fae of nature': {alias:'nature', threat:1},
  'a manifested paradox of knowledge': {alias:'knowledge', threat:1},
  'a champion of war': {alias:'war', threat:1},
  'a glowing sphere of harmony': {alias:'harmony', threat:1},
  'a two-headed hamster of chaos': {alias:'chaos', threat:1},
  'an alluring siren of beauty': {alias:'beauty', threat:1},

  //Elemental beasts
  //Air
  'an aerial stalker': {alias:'stalker', threat: 0},
  'a curlicued stormeater': {alias:'stormeater', threat: 0},
  'a cloud carrion': {alias:'carrion', threat: 0},

  //Water
  'a serpentine starsucker': {alias:'starsucker',threat: 0},
  'a dream leech': {alias:'leech', threat: 0},

  //Fire
  'a flame hog': {alias:'hog', threat: 0},
  'a cinder crawler': {alias:'crawler', threat: 0},
  'a fire mantis': {alias:'mantis', threat: 0},

  //Earth
  'a morbidly tainted grub': {alias:'grub', threat: 0},
  'a huge lindwyrm': {alias:'lindwyrm', threat: 0},
  'a decaying gargoyle': {alias:'gargoyle', threat: 0},
  'a slavering stoneghast': {alias:'stoneghast', threat: 1},

  //Etherwilde
  'an ethereal opossum': {alias:'opossum', threat: 0},
  'an ethereal white peacock': {alias:'peacock', threat: 0},
  'an ethereal stag': {alias:'stag', threat:0},

  //Etherglom
  'a shadow spider': {alias:'spider', threat: 0},
  'a shadow hawk': {alias:'hawk', threat:0},
  'a shadow centipede': {alias:'centipede', threat:0},

  //Mount Dio
  'a snow white skara': {alias:'skara', threat: 0},
  'an ice blue skara': {alias:'skara', threat: 0},
  'a crimson-scaled skara': {alias:'skara', threat: 1},
  'a black-scaled skara': {alias:'skara', threat:0},
  'a bestial garul': {alias:'garul', threat: 2},
  'a massive ice worm': {alias:'worm', threat: 1},
  'an enormous white garul': {alias:'garul', threat:3},
  'Rawari, a wiry garul': {alias:'garul', threat: 3},

  //Undervault
  'a hard-shelled, many-legged cave-fisher': {alias:'fisher', threat: 1},
  'an algae-like phycomid': {alias:'phycomid', threat: 0},
  'a large, hairy solifugid': {alias:'solifugid', threat:0},
  'a giant centipede': {alias:'centipede', threat:0},
  'an inferno beetle': {alias:'beetle', threat:0},
  'a deepstone rockeater': {alias:'rockeater', threat:0},
  'a land urchin': {alias:'urchin', threat:0},

  //Cankermore
  'a vicious allisaur': {alias:'allisaur', threat: 1},

  //Mucklemarsh
  'a bulbous swamp slug': {alias:'slug', threat: 1},

  //The Facility
  'a giant violet slug': {alias:'slug', threat: 0},
  'a giant yellow slug': {alias:'slug', threat: 0},
  'a giant green slug': {alias:'slug', threat: 0},
  'a giant red slug': {alias:'slug', threat: 0},
  'a giant blue slug': {alias:'slug', threat: 0},

  //Workshop of Xion
  'a crystal grodak': {alias:'grodak', threat: 0},
  'an aetherway hynx': {alias:'hynx', threat: 0},
  'a shadow mordrath': {alias:'mordrath',threat:1},

  //Great Illithoid Prison
  'a slithering inner worm': {alias:'worm',threat:1},
  'an illithoid reaper': {alias:'reaper',threat:1},
  'an illithoid ravager': {alias:'ravager',threat:1},
  'an illithoid scavenger': {alias:'scavenger',threat:1},
  'an illithoid marauder': {alias:'marauder',threat:1},
  'a bloated illithoid breeder': {alias:'breeder',threat:1},
  'a gruesome illithoid chef': {alias:'chef',threat:1},
  'an illithoid sapper': {alias:'sapper',threat:1},
  'a Grand Illithoid Cenobite': {alias:'cenobite',threat:2},
  'High Priest Yishughom': {alias:'Yishughom',threat:2},

  //Pandaemonium
  'a contorted minotaur':{alias:'astralbeast',threat:4},
  'a colossal blistering scorpion':{alias:'astralbeast',threat:4},
  'a six-legged vulture':{alias:'astralbeast',threat:4},
  'a broken living amphora':{alias:'astralbeast',threat:4},
  'a hulking abomination':{alias:'astralbeast',threat:4},
  'a nine-armed crabstrosity':{alias:'astralbeast',threat:4},
  'a malevolent adjudicator':{alias:'astralbeast',threat:4},
  'a leering bakeneko':{alias:'astralbeast',threat:4},
  'an iron wool three-horned ram':{alias:'astralbeast',threat:4},
  'an engorged anisakis':{alias:'astralbeast',threat:4},
  'a wretched damsel':{alias:'astralbeast',threat:4},
  'a decaying shogothessor':{alias:'astralbeast',threat:4},

  'the Baron of Cancer':{alias:'baron',threat:1},
  'a Steward of Pincers':{alias:'steward',threat:2},
  'a Jester of Many Legs':{alias:'jester',threat:3},

  //Project Eternity
  'a mutated, undead cave-fisher':{alias:'fisher',threat:1},

  //Lucidian Mesa Compound
  'a twisted dracnari':{alias:'twisted',threat:1},

  //Transphenortex Grid
  'a crackling red joule':{alias:'joule',threat:0},
  'a crackling blue joule':{alias:'joule',threat:0},
  'a crackling yellow joule':{alias:'joule',threat:0},
  'a crackling black joule':{alias:'joule',threat:0},
  'a crackling white joule':{alias:'joule',threat:0},
  'a diamond luminox':{alias:'luminox',threat:0},
  'an emerald luminox':{alias:'luminox',threat:0},
  'an amethyst luminox':{alias:'luminox',threat:0},
  'an onyx luminox':{alias:'luminox',threat:0},
  'a ruby luminox':{alias:'luminox',threat:0},
  'a beryl luminox':{alias:'luminox',threat:0},

  //Skarch Desert
  'a lumbering sandojin':{alias:'sandojin',threat:0},
  'a sand cobra':{alias:'cobra',threat:0},
  'a gila lizard':{alias:'gila',threat:0},

  //Upper Peaks of the Razines
  'a fierce and enormous roc':{alias:'roc',threat:0},
  'an adolescent roc':{alias:'roc',threat:0}
}

emerald.emnote(`${Object.keys(emerald.bash.targets).length} bash targets loaded.`,'Bash');