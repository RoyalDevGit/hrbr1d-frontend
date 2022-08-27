import axios from "axios";
import React, { useState } from "react";
import { LinearProgress, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import DataTable from "../components/DataTable";

const Individual = () => {
  const params = useParams();
  console.log(params);
  const [data, setData] = useState([]);
  const [downFetching, setDownFetching] = useState(true);

  const baseURL = "http://hn.algolia.com/api/v1/items/";

  React.useEffect(() => {
    axios.get(baseURL + params.id).then((response) => {
      setDownFetching(false);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {downFetching && (
        <div className="loadingWrapper">
          <LinearProgress />
        </div>
      )}
      {!downFetching && (
        <>
          <Typography variant="h3" style={{textAlign:"center"}}>Post Details</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Point</TableCell>
                  <TableCell align="right">URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.title}
                  </TableCell>
                  <TableCell align="right">{data.points}</TableCell>
                  <TableCell align="right">{data.url}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h6" style={{textAlign:"center"}}>Comments</Typography>
          <DataTable children={data.children} />
        </>
      )}
    </div>
  );
};

export default Individual;
