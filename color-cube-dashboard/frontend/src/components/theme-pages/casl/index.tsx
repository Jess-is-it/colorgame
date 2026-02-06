import React from 'react';
import { Can } from '@casl/react';
import { defineAbility } from '@casl/ability';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';

interface ActionType {
  action: string;
  subject: string;
}

interface PermissionType {
  [key: string]: ActionType;
}

const permissions: PermissionType = {
  CanEdit: {
    action: 'Can-Edit',
    subject: 'address',
  },
  CanDelete: {
    action: 'Can-Delete',
    subject: 'address',
  },
};

interface UserType {
  [key: string]: {
    permissions: Array<string>;
  };
}

const users: UserType = {
  Admin: {
    permissions: ['CanEdit', 'CanDelete'],
  },
  Manager: {
    permissions: ['CanEdit'],
  },
  Subscriber: {
    permissions: [],
  },
};

interface addressType {
  city: string;
  street: string;
  type: string;
}

const addresses: addressType[] = [
  {
    city: 'New York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Manhatten York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Canada street York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Delhi street',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'UP Chawk',
    street: '5684 Max Summit',
    type: 'address',
  },
];

const RollBaseIndex = () => {
  const [userId, setUserId] = React.useState(Object.keys(users)[0]);
  const userPermissions = users[userId].permissions.map((id) => permissions[id]);

  const actions = [
    ...userPermissions.reduce((collection: Set<string>, { action }: ActionType) => {
      collection.add(action);

      return collection;
    }, new Set<string>()),
  ];

  const ability = defineAbility((can) => {
    userPermissions.forEach(({ action, subject }: ActionType) => {
      can(action, subject);
    });
  });
  return (
    <>
      <Card>
        <div className="flex gap-2">
          {Object.entries(users).map(([id]) => {
            return (
              <>
                {userId !== id ? (
                  <Button variant={'outline'} key={id} onClick={() => setUserId(id)}>
                    {id}
                  </Button>
                ) : (
                  <Button key={id} onClick={() => setUserId(id)}>
                    {id}
                  </Button>
                )}
              </>
            );
          })}
        </div>

        <div className="bg-lightprimary dark:bg-lightprimary p-4 rounded-md my-2">
          {users[userId].permissions.map((permission: string) => (
            <h5 key={permission} className="text-sm opacity-80">
              {permission}
            </h5>
          ))}
        </div>

        <ul className="border-0 dark:bg-transparent p-2">
          {addresses.map(({ city, street, type }) => (
            <li key={city} className="mb-3">
              <div className="flex items-center gap-3">
                <span className="text-black dark:text-darklink font-normal">
                  {city}, {street}
                </span>
                {actions.map((action) => (
                  <Can I={action} a={type} ability={ability} key={action}>
                    <Button variant={'lightprimary'}>{action}</Button>
                  </Can>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default RollBaseIndex;
