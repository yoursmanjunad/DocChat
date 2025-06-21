import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DeleteButton() {
  return (
    <div className="">
      <Button
        variant={"destructive"}
        size="icon"
        className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-indigo-600 hover:bg-rose-50"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
