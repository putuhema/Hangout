import { Badge, X } from "lucide-react";

const FilterBadge = ({ filter, onChange }) => {
  return (
    <Badge className="flex items-center gap-4">
      <span>{filter}</span>
      <X onClick={() => onChange()} className="h-3 w-3 cursor-pointer" />
    </Badge>
  );
};

export default FilterBadge;
