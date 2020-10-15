export const listToTree = (list, parent, level) => {
  const out = [];
  for (const node of list) {
    if (node.parent_id === parent) {
      node.level = level;
      const children = listToTree(list, node.id, level + 1);
      if (children.length) {
        node.children = children
      }
      // delete node.level;
      // delete node.parent_id;
      // delete node.id;
      out.push(node)
    }
  }
  return out
};
