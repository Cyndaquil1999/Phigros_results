import { Header } from "../_component/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export default function Rating() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center my-10">
        <div className="text-5xl">レート計算</div>
      </div>

      {/* TODO: shadcnのテーブルを使ってここにべ枠と計算値を表示させる */}
      <div>
      </div>
    </div>
  );
}
