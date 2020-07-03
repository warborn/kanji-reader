const requireContextToObject = ({
  requireContext,
  getKeyFromPath,
  prefix = "",
  excludedFiles = ["index.js"],
  msg = "Cannot generate name for unmatched path: {path}",
  exportElement = "default",
  raiseError = true,
}) =>
  requireContext
    .keys()
    .filter((path) => !excludedFiles.includes(path.replace(/^\.\//, "")))
    .reduce((prev, path) => {
      const name = getKeyFromPath(path);

      if (!name && raiseError) {
        console.error(msg.replace(/\{path\}/, path));
        return { ...prev };
      }

      return {
        ...prev,
        [`${prefix}${name}`]: requireContext(path)[exportElement],
      };
    }, {});

const getIconNameFromPath = (str) => str.replace(/(\.\/|\.svg)/g, "");

const kanjiIconsContext = require.context(
  "@svgr/webpack!../assets/kanji",
  true,
  /\.svg$/
);

const kanjiIcons = requireContextToObject({
  requireContext: kanjiIconsContext,
  getKeyFromPath: getIconNameFromPath,
  exportElement: "ReactComponent",
});

export const getKanjiIcon = (name) => {
  const icon = kanjiIcons[name];

  if (!icon) {
    console.error(`Kanji icon with name ${name} not found`);
    return null;
  }

  return icon;
};
