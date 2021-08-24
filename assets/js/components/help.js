import React from "react";
import Container from "react-bootstrap/Container";

/**
 * 1. Кои сме?
 * 2. Цел на проекта
 * 3. Сменяне на парола и аватар
 * 4. Добавяне на приятел
 * 5. Създаване на група
 * 6. Добавяне на задача
 * 7. Изтриване и маркиране на задача
 *
 */
const questions = [
  {
    question: "Кои сме ние?",
    answer:
      "Ние сме ученици от X и XI клас в Профисионална гимназия по икономика - гр. Перник със специалност икономическа-информатика.",
  },
  {
    question: "Как да добавим приятели",
    answer: "",
  },
];

const QuestionItem = () => {};

function Help() {
  return (
    <Container fluid>
      <Col md="4"></Col>
      <Col md="8"></Col>
    </Container>
  );
}

export default Help;
