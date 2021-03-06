import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import { searchImdb } from "../utils/ApiUtils";
import ListItem from "../widgets/ListItem";

const BASE_URL = "https://imdb-api.com/API";
const IMDB_API_KEY = process.env.IMDB_API_KEY;
const query = "lost 2004";

export const ListLayout = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const listFunction = async () => {
    try {
      searchImdb(query).then((data) => {
        setData(data.results);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const renderItem = ({ item }) => <ListItem title={item.title} />;

  useEffect(() => {
    listFunction();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <Text>{"Loading"}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default ListLayout;
