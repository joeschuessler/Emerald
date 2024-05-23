let emerald = client.emerald
let note = emerald.note = {};

var multinote = '';

note.clear = () => {
  multinote = '';
}

note.build = (...args) => {
  multinote += emerald.html_parse(...args);
}

note.display = () => {
  display_html_line(multinote);
}

note.pctcolor = (pct) => {
  let clr;
  switch (true) {
    case (pct > 100):
      clr = emerald.configs.ui_blue;
      break;
    case (pct >= 70):
      clr = emerald.configs.ui_green;
      break;
    case (pct >= 30):
      clr = emerald.configs.ui_yellow;
      break;
    case (pct > 0):
      clr = emerald.configs.ui_red;
      break;
    default:
      clr = emerald.configs.ui_white;
  }
  return clr;
}