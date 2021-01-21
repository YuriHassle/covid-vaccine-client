import { validate } from "gerador-validador-cpf";

const isValidCPF = (strCPF) => {
  return validate(strCPF);
};

const currentDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

const validateLogin = ({ user, password }) => {
  return user === "semsa" && password === "vacinacovid2021";
};

const formatDate = (dateStr) => {
  const dd = dateStr.slice(0, 2);
  const mm = dateStr.slice(3, 5);
  const aaaa = dateStr.slice(6, 10);
  return `${aaaa}-${mm}-${dd}`;
};

export { isValidCPF, currentDate, validateLogin, formatDate };
