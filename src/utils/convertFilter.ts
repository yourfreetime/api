const convertFilter = (filter: any, attr: string[], newAttr: string[]) => {
  if (!filter) {
    return {};
  }

  if (attr.length != newAttr.length) {
    throw new Error('Attribute array is different from that of new attributes');
  }

  for (let i = 0; i < attr.length; i++) {
    if (filter[attr[i]]) {
      filter[newAttr[i]] = filter[attr[i]];
      delete filter[attr[i]];
    }
  }

  return filter;
};

export default convertFilter;
