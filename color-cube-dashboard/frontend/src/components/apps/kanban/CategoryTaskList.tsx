import { SetStateAction, useContext, useEffect, useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import TaskData from './TaskData';
import EditCategoryModal from './task-modal/EditCategoryModal';
import AddNewTaskModal from './task-modal/AddNewTaskModal';
import { KanbanDataContext } from 'src/context/kanban-context/index';
import { postFetcher } from 'src/api/global-fetcher';
import { mutate } from 'swr';
import { Icon } from '@iconify/react/dist/iconify.js';
import img1 from 'src/assets/images/blog/blog-image3.jpg';
import {
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  Tooltip,
} from 'src/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';

function CategoryTaskList({ id }: { id: string }) {
  const { todoCategories, deleteCategory, clearAllTasks, setTodoCategories } =
    useContext(KanbanDataContext);

  const category = todoCategories.find((cat) => cat.id === id) as any;

  const [allTasks, setAllTasks] = useState(category ? category.child : []);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category.name);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showContainer, setShowContainer] = useState(true);

  // Find the category and update tasks
  useEffect(() => {
    const category = todoCategories.find((cat) => cat.id === id);
    if (category) {
      setAllTasks(category.child);
    }
  }, [todoCategories, id]);

  const [newTaskData, setNewTaskData] = useState({
    taskTitle: '',
    taskText: '',
    priority: '',
    dueDate: '',
    taskImage: img1,
    assignedTo: [],
    attachments: [
      {
        url: 'https://adminmart.github.io/template_api/images/website-template/endeavor/endeavor-nextjs-14-website-template.jpg',
      },
    ],
    comments: [],
    subtasks: [],
  });

  //Shows the modal for adding a new task.
  const handleShowModal = () => {
    setShowModal(true);
  };
  // Closes the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //  Shows the modal for editing a category.
  const handleShowEditCategoryModal = () => setShowEditCategoryModal(true);
  //Closes the modal for editing a category.
  const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);

  //Updates the category name
  const handleUpdateCategory = async (updatedName: SetStateAction<string | any>) => {
    try {
      const response = await mutate(
        '/api/kanban',
        postFetcher('/api/kanban/add-category', {
          categoryId: id,
          categoryName: updatedName,
        }),
        false,
      );
      if (response?.status === 200) {
        setNewCategoryName(updatedName);
        const updatedCategories = todoCategories.map((cat) => {
          if (cat.id === id) {
            return { ...cat, name: updatedName };
          }
          return cat;
        });
        setTodoCategories(updatedCategories);
      } else {
        throw new Error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  //Adds a new task to the category.
  const handleAddTask = async () => {
    let counter = 0;
    function generateUniqueNumber() {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      counter = (counter + 1) % 1000; // Ensures counter resets after 1000
      return `${timestamp}${counter.toString().padStart(3, '0')}`; // Example: 1694081234567001
    }
    const newTask = {
      ...newTaskData,
      id: generateUniqueNumber(),
    };
    try {
      const response = await mutate(
        '/api/kanban',
        postFetcher('/api/kanban/add-category', {
          categoryId: id,
          newTaskData: {
            ...newTaskData,
            newTaskData: newTask,
          },
        }),
        false,
      );
      console.log(response);
      if (response.status === 200) {
        handleCloseModal();
        let newUpdatedValue = todoCategories.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              child: [...item.child, newTask],
            };
          } else {
            return item;
          }
        });
        setTodoCategories(newUpdatedValue);
        setAllTasks([...allTasks, newTask]);

        setNewTaskData({
          taskTitle: '',
          taskText: '',
          priority: '',
          dueDate: '',
          taskImage: '',
          assignedTo: [],
          attachments: [
            {
              url: 'https://adminmart.github.io/template_api/images/website-template/endeavor/endeavor-nextjs-14-website-template.jpg',
            },
          ],
          comments: [],
          subtasks: [],
        });
      } else {
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  //Clears all tasks from the current category.
  const handleClearAll = () => {
    clearAllTasks(id);
    setAllTasks([]);
    let remainingTodos = todoCategories.map((item) => {
      if (item.name === category.name) {
        return {
          id: item.id,
          name: item.name,

          child: [],
        };
      } else {
        return item;
      }
    });
    setTodoCategories(remainingTodos);
  };

  // Deletes a specific task.
  const handleDeleteTask = (
    taskId: number | any,
    category: {
      name: string;
    },
  ) => {
    // deleteTodo(taskId);
    setAllTasks((prevTasks: { id: number }[]) =>
      prevTasks.filter((task: { id: number }) => task.id !== taskId),
    );
    let remainingTodos = todoCategories.map((item) => {
      if (item.name === category.name) {
        let updatedChild = item.child.filter((task: { id: number }) => task.id !== taskId);
        return {
          id: item.id,
          name: item.name,

          child: updatedChild,
        };
      } else {
        return item;
      }
    });
    setTodoCategories(remainingTodos);
  };
  //Handles the deletion of the current category.
  const handleDeleteClick = () => {
    setShowContainer(false);
    deleteCategory(id);
  };

  const backgroundColor =
    category.name === 'Complete'
      ? 'bg-lightsuccess dark:bg-lightsuccess'
      : 'bg-primary/5 dark:bg-darkprimary';

  const badgeColor =
    category.name === 'New Request'
      ? 'error'
      : category.name === 'In Progress'
      ? 'purple'
      : category.name === 'Complete'
      ? 'success'
      : category.name === 'BackLog'
      ? 'gray-400'
      : 'primary';

  return (
    <>
      <TooltipProvider>
        {showContainer && category && (
          <div className={`rounded-lg w-[290px] p-1.5 ${backgroundColor}`}>
            <div className="flex justify-between items-center px-3">
              <div className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full bg-${badgeColor}`} />
                <h6 className="text-base">{newCategoryName}</h6>
                <p className="text-sm font-medium text-black/40 dark:text-white/40">
                  {allTasks.length}
                </p>
              </div>
              <div className="flex items-center">
                <div>
                  {category.name === 'New Request' && (
                    <>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="btn-circle-hover cursor-pointer p-0"
                            onClick={handleShowModal}
                          >
                            <Icon icon={'solar:add-circle-line-duotone'} width={24} height={24} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Add Task</TooltipContent>
                      </Tooltip>
                      <AddNewTaskModal
                        show={showModal}
                        onHide={handleCloseModal}
                        onSave={handleAddTask}
                        newTaskData={newTaskData}
                        setNewTaskData={setNewTaskData}
                        updateTasks={() => setAllTasks([...allTasks, newTaskData])}
                      />
                    </>
                  )}
                  <EditCategoryModal
                    showModal={showEditCategoryModal}
                    handleCloseModal={handleCloseEditCategoryModal}
                    initialCategoryName={newCategoryName}
                    handleUpdateCategory={handleUpdateCategory}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="btn-circle-hover cursor-pointer p-0 h-7 w-7">
                      <TbDotsVertical size={20} />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={handleShowEditCategoryModal}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDeleteClick}>Delete</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleClearAll}>Clear All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-3">
              {allTasks?.map((task: { id: any }, index: number) => (
                <TaskData
                  key={task?.id ?? index}
                  task={task}
                  onDeleteTask={() => handleDeleteTask(task.id, category)}
                  index={index}
                  category={category}
                />
              ))}
            </div>
            {category.name === 'New Request' && (
              <div className="mt-3.5 w-fit px-3">
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="flex items-center gap-2.5 cursor-pointer hover:text-primary"
                      onClick={handleShowModal}
                    >
                      <div className="btn-circle-hover">
                        <Icon icon={'solar:add-circle-line-duotone'} width={24} height={24} />
                      </div>
                      <p>Add Task</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Add Task</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </TooltipProvider>
    </>
  );
}
export default CategoryTaskList;
