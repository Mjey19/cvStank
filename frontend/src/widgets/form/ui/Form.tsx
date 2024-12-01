import React from "react";
import classes from "./Form.module.scss";
import Label from "@/shared/ui/label";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import useForm from "@/features/form/use-form";

const inputForm = [
  {
    labelName: "Стоимость 1л ЛКМ",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "lkm",
    mandatory: true,
  },
  {
    labelName: "Стоимость 1 нормо-часа",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "timePrice",
    mandatory: true,
  },
  {
    labelName: "Изображение",
    inputType: "file",
    placeholder: "Загрузите фотографию",
    inputName: "photo",
    mandatory: true,
  },
  {
    labelName: "Количество слоев",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "slice",
    mandatory: false,
  },
  {
    labelName: "Расход ЛКМ 1-го слоя на 1м2",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "consumption",
    mandatory: false,
  },
  {
    labelName: "Трудоемкость нанесение 1-го слоя на 1м2",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "complexity",
    mandatory: false,
  },
  {
    labelName: "Физическая площадь передней двери",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "doorArea",
    mandatory: false,
  },
  {
    labelName: "Физическая площадь крышки багажник",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "roofArea",
    mandatory: false,
  },
  {
    labelName: "Физическая площадь капота",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "hoodArea",
    mandatory: false,
  },
  {
    labelName: "Ширина факела",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "flameWidth",
    mandatory: false,
  },
  {
    labelName: "Вылет факела за границы элемента ",
    inputType: "number",
    placeholder: "Введите значение",
    inputName: "flareDeparture",
    mandatory: false,
  },
  {
    labelName: "Дверь ",
    inputType: "string",
    placeholder: "Введите значение",
    inputName: "detail",
    mandatory: false,
  },
];
export function Form() {
  const { handleChange, handleSubmit } = useForm(inputForm);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div>
        <div className={classes.formInner}>
          {inputForm.map((item, index) => {
            return (
              <Label key={index} className={classes.inputBlock} id="">
                <div className={classes.labelTitle}>
                  {item.labelName}
                  {item.mandatory && <div style={{ color: "red" }}>*</div>}
                </div>
                <Input
                  min={0}
                  step = {0.01}
                  required={item.mandatory}
                  className={classes.input}
                  type={item.inputType}
                  name={item.inputName}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  {...(item.inputType === "file" && { accept: "image/*" })}
                />
              </Label>
            );
          })}
        </div>
        <p className={classes.formPar}>* – обязательные для заполнения поля</p>
      </div>
      <Button
        onClick={() => handleSubmit}
        type="submit"
        className={classes.button}
      >
        Отправить
      </Button>
    </form>
  );
}
