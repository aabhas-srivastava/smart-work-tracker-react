import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Stack, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onDelete }: TaskListProps) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
        />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
        />
      ),
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      minWidth: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
        >
          {(params.value as string[]).map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Stack>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/edit/${params.row.id}`}
          size="small"
          variant="contained"
          sx={{ 
            backgroundColor: '#ffffff', 
            color: '#000000',
            '&:hover': {
              backgroundColor: '#f5f5f5', 
            }
          }}
        >
          Edit
        </Button>

          <Button 
            size="small" 
            variant="contained" 
            onClick={() => onDelete(params.row.id)} 
            sx={{ 
              backgroundColor: '#ffffff', 
              color: '#000000',
              '&:hover': {
                backgroundColor: '#f5f5f5', // Slightly darker white/grey on hover
              }
            }}
          >
            Delete
          </Button>

        </Stack>
      ),
    },
  ];

  return (
    <section>
      <h2>Task List</h2>

      {/* Only height is kept – required by DataGrid to work */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </section>
  );
}