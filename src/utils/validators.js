export function cpfIsValid(cpf) {
  if (!cpf) return false;
  const onlyNums = cpf.replace(/\D/g, "");
  if (onlyNums.length !== 11) return false;
  if (/^([0-9])\1{10}$/.test(onlyNums)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(onlyNums.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(onlyNums.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(onlyNums.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(onlyNums.charAt(10))) return false;
  return true;
}

export function dateIsValid(d) {
  if (!d) return false;
  const date = new Date(d);
  return !Number.isNaN(date.getTime());
}
