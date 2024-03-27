import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

const ProjectTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">Avatar</TableHead>
        <TableHead>Project Type</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="capitalize">Status</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ProjectTableHeader;
