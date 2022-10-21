import { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "../styles/TodoCard.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  index: number;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoCard: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
  completedTodos,
  setCompletedTodos,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === id && todo.isDone === false
          ? { ...todo, todo: editTodo }
          : todo
      )
    );
    setIsEditMode(false);
  };
  const handleEdit = (id: number) => {
    if (!isEditMode && !todo.isDone) {
      setIsEditMode(!isEditMode);
    }
  };

  const handleDone = (id: number) => {
    const temp: any[] = [];
    todos.forEach((todo) => {
      if (temp.length > 0 && todo.isDone === false) {
        const isAvailable = temp.filter((temptodo) => temptodo.id === todo.id);
        isAvailable.length === 0 && temp.push(todo);
      } else if (todo.isDone === false) {
        temp.push(todo);
      }
    });
    completedTodos.forEach((todo) => {
      if (temp.length > 0 && todo.isDone) {
        const isAvailable = temp.filter(
          (temptodo) => todo.isDone && temptodo.id === todo.id
        );
        isAvailable.length === 0 && temp.push(todo);
      } else if (todo.isDone) {
        temp.push(todo);
      }
    });
    const modifiedTodos: any[] = temp.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(modifiedTodos.filter((todo) => todo.isDone === false));
    setCompletedTodos(modifiedTodos.filter((todo) => todo.isDone === true));
    temp.length = 0;
    modifiedTodos.length = 0;
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id && todo.isDone === false));
    setCompletedTodos(todos.filter((todo) => todo.id !== id && todo.isDone));
  };
  useEffect(() => {
    isEditMode && inputRef.current?.focus();
  }, [isEditMode]);

  return (
    <Draggable
      key={todo.id.toString()}
      draggableId={todo.id.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging && "drag"}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditMode ? (
            <input
              ref={inputRef}
              className="todos_single--text"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <span className="todos_single--text">{todo.todo}</span>
          )}
          <div>
            <span className="icon" onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
