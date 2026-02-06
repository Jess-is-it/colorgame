import { KanbanDataContextProvider } from 'src/context/kanban-context/index';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import TaskManager from 'src/components/apps/kanban/TaskManager';
import { Card } from 'src/components/ui/card';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Kanban',
  },
];

function kanban() {
  return (
    <>
      <KanbanDataContextProvider>
        <BreadcrumbComp title="Kanban app" items={BCrumb} />
        <Card>
          <TaskManager />
        </Card>
      </KanbanDataContextProvider>
    </>
  );
}
export default kanban;
