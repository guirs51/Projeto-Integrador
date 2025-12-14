import TableAdmin from "@/components/tableAdmin";
import CardRequest from "@/components/cardRequest";
import { ChartArea } from "@/components/chartArea";

export default function Admin() {
  return (
    <div className="w-full h-full p-10 flex flex-col gap-8">

      {/* GRÁFICO + CARD LADO A LADO */}
      <div className="flex flex-row items-start gap-6 w-full">

        <div className="w-[30vw] max-w-5xl bg-accent rounded-xl">
          <ChartArea />
        </div>

        <div className="w-[12vw] max-w-[180px] bg-accent rounded-xl p-2 flex items-center justify-center">
          <CardRequest value={0}/>
        </div>

      </div>


    </div>
  );
}
