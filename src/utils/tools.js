export const findPathIndex = (path, keywords, times = 3) => {
  let count = 0;
  let index = 0;
  for (let value of path) {
    if (value === keywords) {
      count++;
      if (count === times) {
        return index;
      }
    }
    index++;
  }
};

export const filterPermissions = (permissions, key) => {
  return permissions.reduce((roles, role) => {
    if (role.indexOf(key) >= 0) {
      roles[role] = true;
    }
    return roles;
  }, {});
};