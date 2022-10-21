import { Todo } from "../model";
import "../styles/TodoList.css";
import TodoCard from "./TodoCard";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver && "dragActive"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="todos__heading">Active tasks</p>
            {todos.map((todo, index) => (
              <TodoCard
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemoved">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver && "dragComplete"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="todos__heading">Completed tasks</p>
            {completedTodos.map((todo, index) => (
              <TodoCard
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
