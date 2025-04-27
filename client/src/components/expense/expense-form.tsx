"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import DatePicker from "../custom/date-picker";
import Selector from "@/components/custom/selector";

const categories = [
  {
    id: "1",
    value: "Mecato",
    label: "Mecato",
  },
  {
    id: "2",
    value: "Alimentación",
    label: "Alimientación",
  },
];

const validationSchema = Yup.object({
  date: Yup.date()
    .required("Fecha es obligatorio")
    .max(new Date(), "La fecha no puede ser mayor a la actual"),
  categoryId: Yup.string().required("Categoria es obligatorio"),
  description: Yup.string(),
  amount: Yup.number()
    .required("Monto es obligatorio")
    .positive("Monto debe ser positivo")
    .typeError("Monto debe ser un valor númerico"),
});

export default function ExpenseForm() {
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      categoryId: "3",
      description: "",
      amount: "",
    },
    validationSchema,
    // validateOnChange: false,
    onSubmit: async (values) => {
      console.log({ onSubmit: values });
      // setTimeout(() => {}, 3000);
    },
  });

  const { values, errors } = formik;
  console.log({ values, errors });
  return (
    <Card className="w-full sm:w-[350px]">
      <CardHeader>
        <CardTitle>Registrar nuevo gasto</CardTitle>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-4">
          <DatePicker
            id="date"
            date={formik.values.date}
            // date={new Date()}
            label="Fecha de gasto"
            placeholder="Selecciones una fecha"
            isError={formik.touched.date && Boolean(formik.errors.date)}
            messageError={formik.errors.date as string}
            onChange={async (value) => {
              await formik.setFieldValue("date", value ? value : "");
              await formik.setFieldTouched("date", true);
            }}
          />

          <Selector
            label="Categoria"
            data={categories}
            onSelectChange={async (value) => {
              await formik.setFieldValue(
                "categoryId",
                value?.id ? value.id : ""
              );
              await formik.setFieldTouched("categoryId", true);
            }}
            selectedId={formik.values.categoryId}
            isError={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
            errorMessage={formik.errors.categoryId}
          />

          <div className="w-full space-y-2">
            <Label htmlFor="description">
              Descripción <span className="text-xs font-light">(Opcional)</span>
            </Label>
            <Textarea
              placeholder="Breve descripción del gasto"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              type="number"
              id="amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className={cn(
                formik.touched.amount &&
                  formik.errors.amount &&
                  "text-destructive border-destructive"
              )}
            />
            {formik.touched.amount && formik.errors.amount && (
              <div className="text-xs text-destructive">
                {formik.errors.amount}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-6">
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Registrando" : "Registrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
