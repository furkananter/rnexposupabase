import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from '@rneui/base';
import { supabase } from '../../lib/initSupabase';
import { useUser } from '../../hooks/useUser';

type Todo = {
  id: number;
  user_id: string;
  task: string;
  is_completed: boolean;
  inserted_at: string;
};

const TodoAdd = () => {
  const { session } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');
  // const [checked, setChecked] = useState(false);

  const submitTodo = async () => {
    if (!todo) return;
    const { error } = await supabase.from('todos').insert([
      {
        user_id: session?.user?.id,
        task: todo,
      },
    ]);
    if (error) {
      console.log('error', error);
      return;
    }
    setTodos(todos);
    setTodo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Todo</Text>
      <Input
        placeholder="Todo"
        onChangeText={(text) => {
          setTodo(text);
        }}
        value={todo}
      />
      <Button
        titleStyle={{ color: 'white', fontSize: 20 }}
        onPress={submitTodo}
        title="Add"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TodoAdd;
