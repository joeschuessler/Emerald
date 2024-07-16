if (args.gmcp_method == "Char.Skills.List" && args.gmcp_args.group == "influence") {
  let influence = client.emerald.influence;
  let xlate = influence.xlate;
  influence.attacks = {'charity':[],'paranoia':[],'weakening':[],'empowering':[],'seduction':[],'village':[]};
  args.gmcp_args.list.forEach(s => {
    let skl = s.toLowerCase()
    if (xlate.hasOwnProperty(skl)) influence.attacks[xlate[skl]].push(skl);
  });
}