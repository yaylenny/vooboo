import Home from "./sections/main.vue";

import Components from "./sections/components/components.vue";
import ComponentsOverview from "./sections/components/overview.vue";
import Table from "./sections/components/table.vue"
import Tree from "./sections/components/tree.vue"
import Modal from "./sections/components/modal.vue"

import Forms from "./sections/forms.vue";
import Models from "./sections/models.vue";

const routes=[
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/components',
    component: Components,
    children:[
      {
        path: '',
        name: 'components',
        component: ComponentsOverview
      },
      {
        path: 'modal',
        name: 'components/modal',
        component: Modal
      },
      {
        path: 'table',
        name: 'components/table',
        component: Table
      },
      {
        path: 'tree',
        name: 'components/tree',
        component: Tree
      },
    ]
  },
  {
    path: '/forms',
    component: Forms,
    name: 'forms'
  },
  {
    path: '/models',
    component: Models,
    name: 'models'
  },
];

export default routes;
