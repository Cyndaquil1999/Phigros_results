'use client';

import { Header } from "app/_component/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

export default function ScorePage() {
  useEffect(() => {
    fetch("api/test")
    .then((res) => res.json())
    .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center text-5xl">Score</div>
      <div className="mt-12 flex justify-center">
        <p className="text-3xl">
          Your Ranking Score:　15.52
        </p>
      </div>
      <div className="mt-12 mx-12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>MusicTitle</TableHead>
              <TableHead>Composer</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Accuracy(%)</TableHead>
              <TableHead>RS Each Music</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>DESTRUCTION 3,2,1</TableCell>
              <TableCell>aaa</TableCell>
              <TableCell>IN</TableCell>
              <TableCell>99.86</TableCell>
              <TableCell>15.77</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
