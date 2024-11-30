import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import classes from "./ResultBlock.module.scss";
export function ResultBlock() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    // Симуляция загрузки данных
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка 2 секунды
      setLoading(false);
      setSuccess(true);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.resultBlock}>
      {loading && <Triangle color="#1b6ab4" />} {/* Индикатор загрузки */}
      {success && (
        <div className={classes.resultInner}>
          <p className={classes.resultTitle}>Результат расчета</p>
          <div
            style={{ width: "100%", height: "50%", background: "grey" }}
          ></div>
          <ul className={classes.resultList}>
            <li>
              Площадь: <b>35 м2</b>
            </li>
            <li>
              Расход ЛКМ: <b>35 м2</b>
            </li>
            <li>
              Время на окраску элемента: <b>35 м2</b>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
