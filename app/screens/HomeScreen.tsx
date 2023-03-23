import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import { supabase } from '../lib/initSupabase';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Todo = {
  user_id: string;
  task: string;
  is_completed: boolean;
  date_created: string;
};

const HomeScreen = () => {
  const { session } = useContext(AppContext);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  useFocusEffect(
    React.useCallback(() => {
      if (session) {
        fetchTodos();
      }
    }, [session])
  );

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('inserted_at', { ascending: false });

    if (error) {
      console.log('Error fetching todos:', error.message);
    } else {
      setTodos((data as Todo[]) || []);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todos</Text>
      <ScrollView style={styles.todoScrollView}>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoView}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="checkmark" size={24} color="white" />
              <Text key={index} style={styles.todoTask}>
                {todo.task}
              </Text>
            </View>
            <View>
              <Ionicons name="trash" size={24} color="white" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoScrollView: {
    height: '100%',
  },
  todoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  todoTask: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});

export default HomeScreen;
