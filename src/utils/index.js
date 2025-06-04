export function flattenTree(tree, key = "children") {
  return tree.reduce((acc, node) => {
    const { [key]: children, ...rest } = node;
    return [...acc, rest, ...(children ? flattenTree(children, key) : [])];
  }, []);
}

export function findPathById(tree, id, path = []) {
  for (const node of tree) {
    path.push(node);
    if (node.id == id) return path;
    if (node.children) {
      const found = findPathById(node.children, id, path);
      if (found) return found;
    }
    path.pop();
  }
  return null;
}
