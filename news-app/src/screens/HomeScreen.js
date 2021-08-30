import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const token = navigation.getParam('token', 'NO-User');
  const userName = navigation.getParam('userName', 'NO-User');
  const userId = navigation.getParam('userId', 'NO-User');

  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    if (token) {
      getAllPost();
    }
  }, []);

  const getAllPost = () => {
    fetch('http://192.168.0.103:8000/api/post/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        let postsData = JSON.parse(responseJson);
        setPosts(postsData.data);
        setPostCount(postsData.data.length);
      });
  };

  const Vote = (postId, type) => {
    fetch(`http://192.168.0.103:8000/api/post/${type}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        postId,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        console.log(responseJson);
        getAllPost();
      })
      .catch((error) => {
        //Hide Loader
        console.error(error);
      });
  };
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
      <View>
        <Text onPress={() => Vote(item._id, 'upvote')}>
          {' '}
          Upvote {item.upvote.length}
        </Text>
        <Text onPress={() => Vote(item._id, 'downvote')}>
          {' '}
          downvote {item.downvote.length}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  ListItem: {
    marginBottom: 20,
  },
  qs: {
    color: 'red',
  },
  ans: {
    color: 'green',
  },
});

export default HomeScreen;
