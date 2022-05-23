import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ImageAvatars } from "../../../components/avatars/avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { UpdateDevModal } from "../components/updateDev";
import { columns, rows } from "../../../constants/services";
import { Context } from "../../../store/appContext";
import { DialogAlert } from "../../../components/dialog/dialog";

export const DevsTable = () => {
  const { store, actions } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [id, setId] = useState(null);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleOpen = (userId) => {
    setId(userId);
    setOpen(true);
  };
  const handleClickOpen = (userId) => {
    setId(userId);
    setOpenDelete(true);
  };

  const handleClose = () => setOpen(false);
  const CloseDelete = () => setOpenDelete(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    actions.getAllUsers();
  }, []);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#646161de",
          color: "#fff",
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ color: "#1f2429" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "#fff",
                      backgroundColor: "#c17608",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                backgroundColor: "#999",
              }}
            >
              {store.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value =
                          column.id === "rol" ? row.rols.name : row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              color: "#000",
                              fontWeight: 600,
                              fontSize: "1.1rem",
                              fontFamily: "Roboto Mono",
                            }}
                          >
                            {column.id === "photo" ? (
                              <ImageAvatars
                                url={row.photo}
                                alterName={row.name}
                                width={56}
                                height={56}
                              />
                            ) : column.id === "del" ? (
                              <DeleteOutlineOutlinedIcon
                                fontSize={"medium"}
                                onClick={() => handleClickOpen(row.id)}
                              />
                            ) : column.id === "edit" ? (
                              <ModeEditOutlinedIcon
                                fontSize={"medium"}
                                onClick={() => handleOpen(row.id)}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{
            color: "#fff",
            backgroundColor: "#646161de",
          }}
        />
        <UpdateDevModal open={open} handleClose={handleClose} userId={id} />
        <DialogAlert open={openDelete} handleClose={CloseDelete} userId={id} path={'users'} />
      </Paper>
    </>
  );
};
