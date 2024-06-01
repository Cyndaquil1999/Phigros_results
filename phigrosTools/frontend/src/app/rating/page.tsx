import { Header } from "../_component/header";

export default function Rating() {
  return (
    <div>
      <Header />
      <div className="flex-col justify-center items-center my-10">
        <div className="text-5xl">レート計算</div>
        <div className="flex-col">
          <div>レートの計算方法は</div>
        </div>
      </div>

      {/* TODO: shadcnのテーブルを使ってここにべ枠と計算値を表示させる */}
      <div>
        <div className="flex justify-center items-center space-y-4">
          <div></div>
        </div>
      </div>
    </div>
  );
}
