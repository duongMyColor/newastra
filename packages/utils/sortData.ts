export const sortData = (res: any) => {
  let data = [];
  if (res.length > 0) {
    let position = res.map((value: any) => value.id);
    res.sort((a: any, b: any) => a.id - b.id);

    for (let i = 0; i < res.length; i++) {
      res[i].no = i + 1;
    }

    for (let i = 0; i < position.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (position[i] === res[j].id) {
          data.push(res[j]);
          break;
        }
      }
    }
  }

  return data;
};
