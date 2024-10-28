import React, { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MoreHorizontal, Plus, Calendar, Clock } from 'lucide-react'
import Layout from '../Layout'
import axios from 'axios'
import { ApiRoutes } from '../../utils/routeAPI'
import Loader from '../component/Loader'
import { Navigate, useNavigate } from 'react-router-dom'

const priorityColors = {
  Low: 'bg-gray-200 text-gray-700',
  Medium: 'bg-yellow-200 text-yellow-700',
  High: 'bg-red-200 text-red-700'
}

const ItemType = {
  TODO: 'todo'
}

// Helper function to calculate time ago
const getTimeAgo = dateString => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

const TodoCard = ({ todo, onDropTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.TODO,
    item: { ...todo },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      className={`bg-gray-50 border border-gray-200 rounded-md mb-2 p-3 hover:bg-gray-100 transition-colors duration-150 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3 className='font-medium text-sm'>{todo.title}</h3>
      <p className='text-gray-500 text-xs mt-1'>{todo.description}</p>
      <div className='flex items-center mt-2 space-x-2'>
        <span
          className={`${
            priorityColors[todo.priority]
          } text-xs px-2 py-0.5 rounded-full`}
        >
          {todo.priority}
        </span>
        <div className='flex items-center text-gray-400 text-xs'>
          <Calendar className='w-3 h-3 mr-1' />
          <span>{new Date(todo.date).toLocaleDateString('en-GB')}</span>
        </div>
        <div className='flex items-center text-gray-400 text-xs'>
          <Clock className='w-3 h-3 mr-1' />
          <span>{getTimeAgo(todo.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

const Column = ({ title, todos, onAddTodo, onDropTodo }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemType.TODO,
    drop: item => onDropTodo(item, title),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div
      key={title}
      ref={drop}
      className={`rounded-md w-full sm:w-80 p-4 transition-colors duration-150 ${
        isOver ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-medium text-sm text-gray-700 flex items-center'>
          {title}
        </h2>
        <MoreHorizontal className='text-gray-400 w-5 h-5' />
      </div>
      {todos.map(todo => (
        <TodoCard key={todo._id} todo={todo} />
      ))}
      <button
        className='text-gray-100 w-full py-2 rounded mt-2 flex items-center justify-center text-sm bg-gray-800 hover:bg-gray-600 transition-colors duration-150'
        onClick={() => onAddTodo(title)}
      >
        <Plus className='w-4 h-4 mr-1' /> New
      </button>
    </div>
  )
}

const NewTodoModal = ({ onClose, onSave, status }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Low')
  const [dueDate, setDueDate] = useState('')

  const handleSave = () => {
    if (title && description && dueDate) {
      onSave({ title, description, priority, dueDate, status })
      onClose()
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-md w-80 max-w-full'>
        <h2 className='text-lg font-medium mb-4'>Add New Todo</h2>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-2'
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-2'
          rows={3}
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-2'
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
        <input
          type='date'
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-2'
        />
        <div className='flex justify-end space-x-2 mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-300 text-gray-700 px-3 py-1 rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TodoBoard () {
  const [todos, setTodos] = useState([
    {}
    // {
    //   id: '1',
    //   title: 'Design new landing page',
    //   description: 'Create wireframes and mockups',
    //   priority: 'High',
    //   dueDate: '2024-07-31',
    //   createdAt: new Date().toISOString(),
    //   status: 'To Do',
    // },
    // {
    //   id: '2',
    //   title: 'Update user documentation',
    //   description: 'Review and update all sections',
    //   priority: 'Medium',
    //   dueDate: '2024-08-15',
    //   createdAt: new Date().toISOString(),
    //   status: 'In Progress',
    // },
  ])
  const [loading, setLoading] = useState(true) // State to manage loading state
  const [error, setError] = useState(null) // State to manage errors
  const [newDataUpdated, setNewDataUpdated] = useState(0);
  const [loader, serLoader] = useState(true);

  // const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('')

  const handleAddTodo = status => {
    setCurrentStatus(status)
    setIsModalOpen(true)
  }

  const handleSaveTodo = async ({
    title,
    description,
    priority,
    dueDate,
    status
  }) => {
    const userData = JSON.parse(localStorage.getItem('user')); // Replace with your key
    const userId = userData ? userData.id : null;
  
    const newTodo = {
      title,
      description,
      priority,
      date: dueDate,
      progress: status,
      createdAt: { type: Date, default: Date.now },
      userId, // Include userId when saving the todo
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const res = await axios.post(ApiRoutes.todocreate, newTodo, config);
      const data = await res.data;

      console.log(data);
  
      // Update state with the newly saved todo returned from the API
      setTodos(prevTodos => [...prevTodos, data]); // Using functional update here
      setNewDataUpdated(c => c+1);

    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
  

  const handleDropTodo = async (draggedTodo, newProgress) => {
    try {
      // Make the PUT request to update the todo on the server
      const config ={
        headers: {
          'Content-Type': 'application/json',
          // Include the authorization token if needed
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
      const body =  {
        id: draggedTodo._id,
        progress: newProgress,
      };
      
      const response = await axios.put(ApiRoutes.changeProgress, JSON.stringify(body), config );
  
      // Get the updated todo data
      const updatedTodo = response.data;
      console.log("todo got updated")
      // console.log('updatedTodo:', updatedTodo);
      // Update the local state with the updated todo
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === updatedTodo.id ? { ...todo, progress: newProgress } : todo
        )
      );

      setNewDataUpdated(c=>c+1);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const userData = JSON.parse(localStorage.getItem('user')) // Retrieve user data from local storage
      const userId = userData ? userData.id : null // Get user ID

      if (userId) {
        try {
          setLoading(true); // Set loading to true before fetching
          const response = await axios.get(ApiRoutes.todos, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Include your JWT token if needed
            },
            params: {
              userId: userId // Send the userId as a query parameter
            }
          })
          setTodos(response.data) // Set todos in state
        } catch (error) {
          setError('Failed to fetch todos') // Handle any errors
          console.error('Error fetching todos:', error)
        }  finally {
          setLoading(false); // Set loading to false after fetching
      }
      } else {
        setError('User ID not found') // Handle case where user ID is not available
        setLoading(false)
      }
    }

    fetchTodos() // Call the fetch function
  }, [newDataUpdated]) // Empty dependency array to run once on mount


  if (loading) {
    return <Loader />; // Render loader while loading
  }

  return (
    <Layout user={JSON.parse(localStorage.getItem('user'))}>
      <div className='p-4 flex justify-center '>
        {/* <button className='bg-red-300' onClick={getUserTodos}>get todos</button> */}
        <DndProvider backend={HTML5Backend}>
          <div className='flex flex-wrap gap-4'>
            {['To Do', 'In Progress', 'Under Review', 'Completed'].map(
              status => (
                <Column
                  key={status}
                  title={status}
                  todos={todos.filter(todo => todo.progress === status)}
                  onAddTodo={handleAddTodo}
                  onDropTodo={handleDropTodo}
                />
              )
            )}
          </div>
        </DndProvider>
        {isModalOpen && (
          <NewTodoModal
            status={currentStatus}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTodo}
          />
        )}
      </div>
    </Layout>
  )
}
