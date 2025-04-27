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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { ColorPicker } from "../custom/color-picker";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obligatorio"),
});

export function CategoryExpenseform() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    // validateOnChange: false,
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
    },
  });

  const { values, errors } = formik;
  console.log({ values, errors });
  return (
    <Card className="w-full h-52 sm:w-[350px]">
      <CardHeader>
        <CardTitle>Registrar categoria de gastos</CardTitle>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-4">
          <div className="w-full space-y-2">
            <Label htmlFor="name">Nombre de la categoria</Label>
            {/* <div className="flex items-center gap-1"> */}
            <Input
              placeholder="Categoria gasto"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={cn(
                formik.touched.name &&
                  formik.errors.name &&
                  "border-destructive text-destructive"
              )}
            />
            {/* <ColorPicker /> */}
            {/* </div> */}
            {formik.touched.name && formik.errors.name && (
              <div className="text-xs text-destructive">
                {formik.errors.name}
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
