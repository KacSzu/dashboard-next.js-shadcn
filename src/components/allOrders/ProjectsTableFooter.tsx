import { TableFooter, TableRow, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/utils/utils";

const ProjectTableFooter = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={6}>Total</TableCell>
        <TableCell className="text-right">
          {formatCurrency(totalPrice)}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default ProjectTableFooter;
