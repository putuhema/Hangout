import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormatToIDR } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { categories } from "@/constant";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import services from "@/services";
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Event Type",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = FormatToIDR(row.getValue("price"));
      return formatted;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedDate = format(new Date(row.getValue("date")), "PPP");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = categories.filter(
        (category) => category.value === row.getValue("category"),
      )[0];
      return category.text;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      const { mutate } = useMutation({
        mutationFn: async () => {
          return services.delete(`/events/${event.id}`)
        }
      })

      const handleOnSubmit = (e) => {
        e.preventDefault()
        mutate()
      }


      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to={`/event-form/${event.id}`}>
                Edit</Link>
            </DropdownMenuItem>
            <Link to={`/event/${event.id}`} target="_blank">
              <DropdownMenuItem>
                View Event Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form onSubmit={handleOnSubmit}>
                <button type="submit" className="flex gap-2 items-center text-red-400 text-foreground">
                  <Trash className="w-4 h-4 text-red-500" /> Delete
                </button >
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
