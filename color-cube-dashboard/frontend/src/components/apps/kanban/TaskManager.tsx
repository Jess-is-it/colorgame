import { useContext } from 'react';
import KanbanHeader from './KanbanHeader';
import CategoryTaskList from './CategoryTaskList';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// @ts-ignore
import SimpleBar from 'simplebar-react';
import { KanbanDataContext } from '../../../context/kanban-context';

function TaskManager() {
  const { todoCategories, moveTask } = useContext(KanbanDataContext);

  const onDragEnd = (result: { source: any; destination: any; draggableId: any }) => {
    const { source, destination, draggableId } = result;

    // If no destination is provided or the drop is in the same place, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) {
      return;
    }

    // Extract necessary information from the result
    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // Call moveTask function from context
    moveTask(draggableId, sourceCategoryId, destinationCategoryId, sourceIndex, destinationIndex);
  };

  return (
    <>
      <KanbanHeader />
      <SimpleBar>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 mt-4">
            {Array.isArray(todoCategories) &&
              todoCategories?.map((category) => (
                <Droppable droppableId={category.id.toString()} key={category.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <CategoryTaskList id={category.id} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </div>
        </DragDropContext>
      </SimpleBar>
    </>
  );
}

export default TaskManager;
