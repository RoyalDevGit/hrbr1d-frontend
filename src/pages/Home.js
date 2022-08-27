import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, LinearProgress,makeStyles } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    listRoot: {
      width: "100%",
      marginTop: 12,
      "& .MuiListItem-root": {
        "&:hover": {
          color: "blue",
          cursor: "pointer"
        },
        "&.MuiListItem-divider": {
          borderBottom: "2px solid rgba(0,0,0,0.1)"
        }
      }
    }
}))

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

function Home() {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://hn.algolia.com/api/v1/search",
    { hits: [] }
  );

  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="searchbar">
        <SearchBar
          onRequestSearch={() => {
            doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
          }}
          value={query}
          onChange={(query) => {
            setQuery(query);
          }}
          placeholder="Add some food ..."
          autoFocus
        />
        {isLoading && <LinearProgress />}
      </div>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <List className={classes.listRoot}>
          {data.hits.map((item) => (
            <ListItem key={item.objectID} onClick={() => {navigate(`/detail/${item.objectID}`)}} divider>
              {item.title}
            </ListItem>
          ))}
        </List>
      )}
    </Fragment>
  );
}

export default Home;
