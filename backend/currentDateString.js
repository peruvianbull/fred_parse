const main = () => {
	const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

module.exports = main;