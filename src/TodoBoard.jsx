import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MoreHorizontal, Plus, Calendar, Clock } from 'lucide-react';
import Layout from './Layout';

const priorityColors = {
  Low: 'bg-gray-200 text-gray-700',
  Medium: 'bg-yellow-200 text-yellow-700',
  High: 'bg-red-200 text-red-700',
};

const ItemType = {
  TODO: 'todo',
};

// Helper function to calculate time ago
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const TodoCard = ({ todo, onDropTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TODO,
    item: { ...todo },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-gray-50 border border-gray-200 rounded-md mb-2 p-3 hover:bg-gray-100 transition-colors duration-150 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className="font-medium text-sm">{todo.title}</h3>
      <p className="text-gray-500 text-xs mt-1">{todo.description}</p>
      <div className="flex items-center mt-2 space-x-2">
        <span className={`${priorityColors[todo.priority]} text-xs px-2 py-0.5 rounded-full`}>
          {todo.priority}
        </span>
        <div className="flex items-center text-gray-400 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{todo.dueDate}</span>
        </div>
        <div className="flex items-center text-gray-400 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          <span>{getTimeAgo(todo.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

const Column = ({ title, todos, onAddTodo, onDropTodo }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.TODO,
    drop: (item) => onDropTodo(item, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`rounded-md w-80 p-4 max-w-7xl transition-colors duration-150 ${
        isOver ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-sm text-gray-700 flex items-center">
          {title} 
        </h2>
        <MoreHorizontal className="text-gray-400 w-5 h-5" />
      </div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
      <button
        className="text-gray-100 w-full py-2 rounded mt-2 flex items-center justify-center text-sm bg-gray-800 hover:bg-gray-600 transition-colors duration-150"
        onClick={() => onAddTodo(title)}
      >
        <Plus className="w-4 h-4 mr-1" /> New
      </button>
    </div>
  );
};

const NewTodoModal = ({ onClose, onSave, status }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (title && description && dueDate) {
      onSave({ title, description, priority, dueDate, status });
      onClose();
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-lg font-medium mb-4">Add New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          rows={3}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TodoBoard() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups',
      priority: 'High',
      dueDate: '2024-07-31',
      createdAt: new Date().toISOString(),
      status: 'To Do',
    },
    {
      id: '2',
      title: 'Update user documentation',
      description: 'Review and update all sections',
      priority: 'Medium',
      dueDate: '2024-08-15',
      createdAt: new Date().toISOString(),
      status: 'In Progress',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

  const handleAddTodo = (status) => {
    setCurrentStatus(status);
    setIsModalOpen(true);
  };

  const handleSaveTodo = ({ title, description, priority, dueDate, status }) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      status,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDropTodo = (draggedTodo, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === draggedTodo.id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const user = {
    id: '123456',
    name: 'Mahendra dewangan',
    username: 'mahendra123',
    email: 'mahendra@example.com',
    avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250', // Replace with an actual image URL for profile picture
    role: 'user', // could be 'admin', 'editor', etc.
    createdAt: '2024-01-01T08:30:00.000Z',
    updatedAt: '2024-10-26T14:00:00.000Z',
    bio: 'Frontend developer with a passion for building intuitive interfaces and seamless user experiences.',
    lastLogin: '2024-10-26T09:00:00.000Z',
    isVerified: true, // Indicates if the user has verified their email
    preferences: {
      theme: 'dark',
      notifications: true,
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mahendra123',
      twitter: 'https://twitter.com/mahendra123',
    },
  };
  

  return (
    <Layout user={user} >
      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-center gap-1 p-6 bg-white min-h-screen overflow-x-auto">
          {['To Do', 'In Progress', 'Under Review', 'Finished'].map((column) => (
            <Column
              key={column}
              title={column}
              todos={todos.filter((todo) => todo.status === column)}
              onAddTodo={handleAddTodo}
              onDropTodo={handleDropTodo}
            />
          ))}
          {isModalOpen && (
            <NewTodoModal
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveTodo}
              status={currentStatus}
            />
          )}
        </div>
      </DndProvider>
    </Layout>
  );
}
