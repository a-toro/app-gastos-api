import { TableMovimientos } from "@/components/custom/movimientos";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex h-full justify-baseline flex-col flex-1 w-full items-center px-5 py-4">
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between gap-4 flex-wrap-reverse">
          <div className="w-full flex-1 rounded-lg border p-3">
            <TableMovimientos />
          </div>
          <div className="w-full sm:w-auto flex sm:flex-col flex-row justify-between sm:gap-2">
            <div className="">
              <Card className="pl-2 pr-14">
                <CardHeader>
                  <CardTitle className="text-sm font-normal">
                    Total Ingresos
                  </CardTitle>
                </CardHeader>
                <CardContent className="-mt-4">
                  <span className="text-2xl font-bold text-green-600">
                    $1.500.000,00
                  </span>
                </CardContent>
                {/* <CardFooter className="flex justify-end">
              <Button variant="outline">Registrar</Button>
            </CardFooter> */}
              </Card>
            </div>
            <div>
              <Card className="pl-2 pr-14">
                <CardHeader>
                  <CardTitle className="text-sm font-normal">
                    Total Gastos
                  </CardTitle>
                </CardHeader>
                <CardContent className="-mt-4">
                  <span className="text-2xl font-bold text-red-600">
                    $1.500.000,00
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div>Grafico</div>
      </div>
    </div>
  );
}
