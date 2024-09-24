import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DialogBox({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to Make Image URL?</DialogTitle>
          <DialogDescription>
            Visit this site and upload your image there. Then You will get URL.
          </DialogDescription>
        </DialogHeader>
        <Button>
          <Link to={"https://dev-share-bd.vercel.app/"} target="_blank">
            Go There
          </Link>
        </Button>
        <DialogFooter>
          <Button type="submit" onClick={() => onClose(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
