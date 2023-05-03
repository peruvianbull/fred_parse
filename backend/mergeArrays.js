const main = (arr1, arr2) => {
	const result = [...arr1];

  arr2.forEach(obj2 => {
    const obj1 = result.find(obj1 => obj1.DATE === obj2.DATE);

    if (obj1) {
      Object.assign(obj1, obj2);
    } else {
      result.push(obj2);
    }
  });

  return result;
}

module.exports = main;