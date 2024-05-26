type Indexed<T = unknown> = {
  [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    // eslint-disable-next-line
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      let rightData = rhs[p];
      if (
        typeof rightData === "object" &&
        rightData &&
        rightData.constructor === Object
      ) {
        rightData = merge(lhs[p] as Indexed, rightData as Indexed);
      } else {
        lhs[p] = rightData;
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};
