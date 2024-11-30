import React from "react";
import { Triangle } from "react-loader-spinner";
import classes from "./ResultBlock.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
export function ResultBlock() {
  const resultData = useSelector((state: RootState) => state.result);
  const loading = resultData.isLoading;

  return (
    <div className={classes.resultBlock}>
      {loading ? (
        <Triangle color="#1b6ab4" />
      ) : (
        <div className={classes.resultInner}>
          <p className={classes.resultTitle}>Результат расчета</p>
          <div style={{ width: "100%", height: "50%" }}>
            <img
              className={classes.resultImage}
              src={resultData.imageUrl}
              alt="Результат изображения"
            />
          </div>
          <ul className={classes.resultList}>
            <li>
              Площадь: <b>{resultData.area} м2</b>
            </li>
            <li>
              Расход ЛКМ: <b>{resultData.consumption} м2</b>
            </li>
            <li>
              Время на окраску элемента: <b>{resultData.time} м2</b>
            </li>
            <li>
              Расход на покраску:<b>{resultData.money} м2</b>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
