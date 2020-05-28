export const getElClass = (type, name) => {
  switch (type) {
    case 'page':
      return `DLPage-${name}`;
    case 'chart':
      return `DLChart-${name}`;
    case 'component':
      return `DLComp-${name}`;
    case 'element':
      return `DLEl-${name}`;
    case 'app':
      return `DLApp-${name}`;
    default:
      return `DL-${name}`;
  }
};

export const getElId = (type, id) => {
  const prefix = 'dl-';
  type = type ? `${type}-` : '';
  return `${prefix}${type}${id || Math.random() * 100000}`;
};
export const preventDefault = (event) => event.preventDefault();
